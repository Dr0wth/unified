/**
 * ============================================================================
 * DASHBOARD PAGE - REDESIGNED
 * ============================================================================
 *
 * This is the main landing page that shows:
 * 1. Smart Bookmark Bar (top) - Quick links like Chrome bookmarks
 * 2. Four Interactive Tiles:
 *    - Smart Navigator (where to go next)
 *    - Assignment Pressure Meter (what's due + time suggestions)
 *    - Unread Messages
 *    - AI Suggestions (with game loot rarity colors)
 * 3. Upcoming Deadlines
 * 4. Recent Activity Feed
 *
 * LEARNING CONCEPTS USED HERE:
 * - useState: Creates reactive variables (when they change, UI updates)
 * - Array.map(): Loops through arrays and creates UI elements
 * - Conditional rendering: {condition && <Component />}
 * - Event handlers: onClick, onMouseEnter, onMouseLeave
 * - CSS-in-JS: style={{ property: value }}
 */

import { useState } from 'react'
import {
    MapPin,           // Icon for location/navigation
    Clock,            // Icon for time
    MessageSquare,    // Icon for messages
    Sparkles,         // Icon for AI suggestions
    ChevronRight,     // Arrow icon
    AlertTriangle     // Warning icon
} from 'lucide-react'

/**
 * ============================================================================
 * TYPE DEFINITIONS
 * ============================================================================
 * These define the "shape" of our data objects.
 * Like defining a class structure in Java or a dataclass in Python.
 */

// Defines what an AI suggestion looks like
interface AISuggestion {
    id: string                    // Unique identifier
    message: string               // The full suggestion text
    keywords: KeywordHighlight[]  // Which words to color-code
    rarity: RarityLevel          // Overall importance level
}

// Defines individual highlighted keywords
interface KeywordHighlight {
    text: string        // The word to highlight
    rarity: RarityLevel // Its importance color
}

// All possible importance levels (like game loot rarities)
type RarityLevel = 'white' | 'green' | 'blue' | 'purple' | 'pink' | 'red'

/**
 * ============================================================================
 * COLOR CONFIGURATION
 * ============================================================================
 * Game loot-style rarity system:
 * - White: Common/informational
 * - Green: Positive/good news
 * - Blue: Important reminder
 * - Purple: Urgent action needed
 * - Pink: Critical deadline approaching
 * - Red: EMERGENCY (failing/missed)
 */
const RARITY_COLORS: Record<RarityLevel, string> = {
    white: '#e5e5e5',
    green: '#4ade80',
    blue: '#60a5fa',
    purple: '#a78bfa',
    pink: '#f472b6',
    red: '#ef4444'
}

/**
 * ============================================================================
 * MOCK DATA
 * ============================================================================
 * This is fake data to make the prototype look real.
 * Later, this would come from a real API/database.
 */

// Quick access links (like Chrome bookmarks)
const QUICK_LINKS = [
    'Mosaic',
    'Avenue to Learn',
    'Library',
    'Student Centre',
    'Email',
    'Campus Map'
]

// AI-generated suggestions with color-coded keywords
const AI_SUGGESTIONS: AISuggestion[] = [
    {
        id: '1',
        message: 'Warning! Your MATH 2Z03 midterm on Mar 25 is worth 30%, but your current average is 68%.',
        keywords: [
            { text: 'Warning', rarity: 'pink' },
            { text: 'midterm', rarity: 'purple' },
            { text: '30%', rarity: 'red' },
            { text: '68%', rarity: 'blue' }
        ],
        rarity: 'pink'
    },
    {
        id: '2',
        message: 'Great! You\'re ahead of schedule on COMP 2XC3 Lab 4. Consider helping classmates in the discussion forum.',
        keywords: [
            { text: 'Great', rarity: 'green' },
            { text: 'ahead of schedule', rarity: 'green' }
        ],
        rarity: 'green'
    },
    {
        id: '3',
        message: 'Reminder: SFWR 3A04 Design Document is due in 3 days. You have 2 sections remaining.',
        keywords: [
            { text: 'Reminder', rarity: 'blue' },
            { text: '3 days', rarity: 'purple' },
            { text: '2 sections remaining', rarity: 'blue' }
        ],
        rarity: 'blue'
    }
]

/**
 * ============================================================================
 * HELPER FUNCTION: Highlight Keywords in Text
 * ============================================================================
 * This function takes a sentence and replaces specific keywords with
 * colored <span> elements.
 *
 * Example:
 * Input: "Your midterm is worth 30%"
 * Keywords: [{ text: "midterm", rarity: "purple" }, { text: "30%", rarity: "red" }]
 * Output: "Your <span style="color: purple">midterm</span> is worth <span style="color: red">30%</span>"
 */
function highlightKeywords(message: string, keywords: KeywordHighlight[]): React.ReactNode {
    // Start with the original message
    let parts: React.ReactNode[] = [message]

    // For each keyword we want to highlight...
    keywords.forEach((keyword, index) => {
        const newParts: React.ReactNode[] = []

        // Go through each existing part
        parts.forEach((part) => {
            // If this part is a string (not already a <span>)...
            if (typeof part === 'string') {
                // Split it by the keyword
                const segments = part.split(keyword.text)

                // Put the segments back together with colored <span> in between
                segments.forEach((segment, i) => {
                    newParts.push(segment)

                    // Add the colored keyword (except after the last segment)
                    if (i < segments.length - 1) {
                        newParts.push(
                            <span
                                key={`${index}-${i}`}
                                style={{
                                    color: RARITY_COLORS[keyword.rarity],
                                    fontWeight: 600  // Make it bold
                                }}
                            >
                {keyword.text}
              </span>
                        )
                    }
                })
            } else {
                // If it's already a <span>, keep it as is
                newParts.push(part)
            }
        })

        parts = newParts
    })

    // Return the final mix of text and colored <span> elements
    return <>{parts}</>
}

/**
 * ============================================================================
 * MAIN DASHBOARD COMPONENT
 * ============================================================================
 */
export function Dashboard() {
    /**
     * STATE MANAGEMENT
     * ----------------
     * useState creates a "reactive" variable. When it changes, React
     * automatically re-renders the UI to reflect the new value.
     *
     * Syntax: const [value, setValue] = useState(initialValue)
     * - value: The current value
     * - setValue: Function to update the value
     */

        // Tracks which tile is being hovered (for animations)
    const [hoveredTile, setHoveredTile] = useState<string | null>(null)

    // Tracks if the navigator tile is expanded (will use this in Phase 2)
    const [navigatorExpanded, setNavigatorExpanded] = useState(false)

    // Cycles through AI suggestions (currently just shows first one)
    const [currentSuggestionIndex, setCurrentSuggestionIndex] = useState(0)

    /**
     * Get the current AI suggestion to display
     * This uses array indexing - just like Python/Java
     */
    const currentSuggestion = AI_SUGGESTIONS[currentSuggestionIndex]

    return (
        <div className="space-y-6">

            {/* ========================================================================
          SECTION 1: SMART BOOKMARK BAR
          ========================================================================
          Like Chrome's bookmark bar - always visible quick links
      */}
            <div
                className="rounded-xl p-4"
                style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)'
                }}
            >
                {/* Flexbox: arrange items in a row with space between them */}
                <div className="flex items-center gap-2 flex-wrap">
          <span
              className="text-sm font-medium mr-2"
              style={{ color: 'var(--text-secondary)' }}
          >
            Quick Access:
          </span>

                    {/*
            Array.map() - IMPORTANT CONCEPT!
            --------------------------------
            This loops through QUICK_LINKS array and creates a button for each item.

            In Python, this would be:
            for link in QUICK_LINKS:
                create_button(link)

            The (link, index) parameters are:
            - link: Current item in the array
            - index: Position in array (0, 1, 2, ...)

            key={index}: React needs this to track which button is which
          */}
                    {QUICK_LINKS.map((link, index) => (
                        <button
                            key={index}
                            className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105"
                            style={{
                                background: 'var(--bg-hover)',
                                color: 'var(--text-secondary)'
                            }}
                            // Event handler - runs when button is clicked
                            onClick={() => console.log(`Clicked: ${link}`)}
                        >
                            {link}
                        </button>
                    ))}
                </div>
            </div>

            {/* ========================================================================
          SECTION 2: FOUR INTERACTIVE TILES
          ========================================================================
          Grid layout: 1 column on mobile, 2 on medium screens, 4 on large
      */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                {/* ====================================================================
            TILE 1: SMART NAVIGATOR
            ====================================================================
            Shows where to go next based on schedule, location, assignments
        */}
                <div
                    className="p-5 rounded-xl cursor-pointer transition-all duration-300 relative overflow-hidden"
                    style={{
                        background: 'var(--mc-maroon)',
                        // transform changes based on hover state (grows when hovered)
                        transform: hoveredTile === 'navigator' ? 'scale(1.02)' : 'scale(1)',
                        // Shadow gets bigger on hover for "lifting" effect
                        boxShadow: hoveredTile === 'navigator'
                            ? '0 8px 16px rgba(122, 0, 60, 0.3)'
                            : '0 2px 4px rgba(0, 0, 0, 0.1)'
                    }}
                    // Event handlers for hover state
                    onMouseEnter={() => setHoveredTile('navigator')}
                    onMouseLeave={() => setHoveredTile(null)}
                    onClick={() => setNavigatorExpanded(!navigatorExpanded)}
                >
                    {/* Icon and label */}
                    <div className="flex items-center gap-2 mb-3">
                        <MapPin size={20} className="text-white/70" />
                        <p className="text-sm text-white/70">Next Destination</p>
                    </div>

                    {/* Main content */}
                    <p className="text-2xl font-bold text-white mb-2">ITB 137</p>
                    <p className="text-sm text-white/80">COMP 2XC3 in 45 mins</p>

                    {/*
            Corner hint icon (will animate in Phase 2)
            Positioned absolutely in top-right corner
          */}
                    <div
                        className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center"
                        style={{ background: 'rgba(255, 255, 255, 0.2)' }}
                    >
                        <ChevronRight size={14} className="text-white" />
                    </div>

                    {/* Subtle decorative element */}
                    <div
                        className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full"
                        style={{ background: 'rgba(255, 255, 255, 0.05)' }}
                    />
                </div>

                {/* ====================================================================
            TILE 2: ASSIGNMENT PRESSURE METER
            ====================================================================
            Shows due assignments + smart time window suggestions
        */}
                <div
                    className="p-5 rounded-xl cursor-pointer transition-all duration-300"
                    style={{
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border-color)',
                        transform: hoveredTile === 'assignments' ? 'scale(1.02)' : 'scale(1)'
                    }}
                    onMouseEnter={() => setHoveredTile('assignments')}
                    onMouseLeave={() => setHoveredTile(null)}
                >
                    <div className="flex items-center gap-2 mb-3">
                        <Clock size={20} style={{ color: 'var(--mc-gold)' }} />
                        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                            Smart Scheduler
                        </p>
                    </div>

                    <p className="text-3xl font-bold mb-2">3</p>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                        Assignments Due This Week
                    </p>

                    {/* Time window suggestion */}
                    <div
                        className="mt-4 p-3 rounded-lg"
                        style={{ background: 'var(--bg-hover)' }}
                    >
                        <p className="text-xs font-medium" style={{ color: 'var(--mc-gold)' }}>
                            💡 Smart Suggestion
                        </p>
                        <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                            You have a 2.5hr gap before next class. Work on Lab 4?
                        </p>
                    </div>
                </div>

                {/* ====================================================================
            TILE 3: UNREAD MESSAGES
            ====================================================================
            Shows unread message count
        */}
                <div
                    className="p-5 rounded-xl cursor-pointer transition-all duration-300"
                    style={{
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border-color)',
                        transform: hoveredTile === 'messages' ? 'scale(1.02)' : 'scale(1)'
                    }}
                    onMouseEnter={() => setHoveredTile('messages')}
                    onMouseLeave={() => setHoveredTile(null)}
                >
                    <div className="flex items-center gap-2 mb-3">
                        <MessageSquare size={20} style={{ color: 'var(--text-secondary)' }} />
                        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                            Unread Messages
                        </p>
                    </div>

                    <p className="text-3xl font-bold mb-2">12</p>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                        3 from professors
                    </p>
                </div>

                {/* ====================================================================
            TILE 4: AI SUGGESTIONS
            ====================================================================
            Dynamic alerts with game loot rarity color system
        */}
                <div
                    className="p-5 rounded-xl cursor-pointer transition-all duration-300 relative overflow-hidden"
                    style={{
                        background: 'var(--bg-card)',
                        border: `2px solid ${RARITY_COLORS[currentSuggestion.rarity]}`,
                        transform: hoveredTile === 'ai' ? 'scale(1.02)' : 'scale(1)',
                        // Subtle glow effect based on rarity
                        boxShadow: hoveredTile === 'ai'
                            ? `0 0 20px ${RARITY_COLORS[currentSuggestion.rarity]}40`
                            : 'none'
                    }}
                    onMouseEnter={() => setHoveredTile('ai')}
                    onMouseLeave={() => setHoveredTile(null)}
                >
                    <div className="flex items-center gap-2 mb-3">
                        <Sparkles
                            size={20}
                            style={{ color: RARITY_COLORS[currentSuggestion.rarity] }}
                        />
                        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                            AI Assistant
                        </p>
                    </div>

                    {/*
            The magic happens here!
            highlightKeywords() replaces keywords with colored <span> elements
          */}
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                        {highlightKeywords(currentSuggestion.message, currentSuggestion.keywords)}
                    </p>

                    {/* Rarity indicator dots (visual feedback for importance) */}
                    <div className="flex gap-1 mt-4">
                        {AI_SUGGESTIONS.map((suggestion, index) => (
                            <div
                                key={suggestion.id}
                                className="w-2 h-2 rounded-full transition-all duration-200"
                                style={{
                                    background: index === currentSuggestionIndex
                                        ? RARITY_COLORS[suggestion.rarity]
                                        : 'var(--border-color)',
                                    // Current suggestion dot is bigger
                                    transform: index === currentSuggestionIndex ? 'scale(1.5)' : 'scale(1)'
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* ========================================================================
          SECTION 3: UPCOMING DEADLINES
          ========================================================================
          Shows assignments/exams coming up
      */}
            <div
                className="rounded-xl p-5"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
            >
                <h2 className="text-lg font-semibold mb-4">Upcoming Deadlines</h2>
                <div className="space-y-3">
                    {[
                        { course: 'COMPSCI 2XC3', task: 'Lab 4 Submission', due: 'Tomorrow, 11:59 PM', urgent: true },
                        { course: 'MATH 2Z03', task: 'Problem Set 7', due: 'Mar 22, 11:59 PM', urgent: false },
                        { course: 'SFWRENG 3A04', task: 'Design Document', due: 'Mar 25, 5:00 PM', urgent: false },
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="flex items-center justify-between p-4 rounded-lg transition-all duration-200 hover:scale-[1.01]"
                            style={{ background: 'var(--bg-hover)' }}
                        >
                            <div className="flex items-center gap-3">
                                {/* Show warning icon for urgent items */}
                                {item.urgent && (
                                    <AlertTriangle size={18} style={{ color: 'var(--mc-maroon)' }} />
                                )}
                                <div>
                                    <p className="font-medium">{item.task}</p>
                                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                                        {item.course}
                                    </p>
                                </div>
                            </div>

                            {/* Due date badge - red if urgent */}
                            <span
                                className="text-sm px-3 py-1 rounded-full"
                                style={{
                                    background: item.urgent ? 'var(--mc-maroon)' : 'var(--bg-secondary)',
                                    color: item.urgent ? 'white' : 'var(--text-secondary)'
                                }}
                            >
                {item.due}
              </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* ========================================================================
          SECTION 4: RECENT ACTIVITY FEED
          ========================================================================
          Shows what happened recently (grades posted, announcements, etc.)
      */}
            <div
                className="rounded-xl p-5"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
            >
                <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
                <div className="space-y-4">
                    {[
                        { action: 'Grade posted', detail: 'COMPSCI 2XC3 - Midterm: 85%', time: '2 hours ago' },
                        { action: 'New announcement', detail: 'MATH 2Z03 - Tutorial cancelled this week', time: '5 hours ago' },
                        { action: 'Assignment submitted', detail: 'SFWRENG 3A04 - Requirements Doc', time: 'Yesterday' },
                    ].map((activity, i) => (
                        <div key={i} className="flex items-start gap-4">
                            {/* Gold dot indicator */}
                            <div
                                className="w-2 h-2 rounded-full mt-2 shrink-0"
                                style={{ background: 'var(--mc-gold)' }}
                            />
                            <div className="flex-1">
                                <p className="font-medium">{activity.action}</p>
                                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                                    {activity.detail}
                                </p>
                            </div>
                            <span className="text-xs shrink-0" style={{ color: 'var(--text-secondary)' }}>
                {activity.time}
              </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}