import { Search, Bell, User, Sun, Moon } from 'lucide-react'
import { useState } from 'react'

/**
 * Props interface
 */
interface HeaderProps {
    sidebarCollapsed: boolean  // Needed to adjust header position
}

/**
 * Header Component
 *
 * The top bar containing:
 * - Search input
 * - Theme toggle (dark/light mode - visual only for now)
 * - Notifications bell
 * - User profile
 */
export function Header({ sidebarCollapsed }: HeaderProps) {
    // Track dark mode state (just for UI, doesn't actually switch themes yet)
    const [darkMode, setDarkMode] = useState(true)

    return (
        <header
            className={`
        fixed top-0 right-0 h-16 z-30
        flex items-center justify-between px-6
        transition-all duration-300
        ${sidebarCollapsed ? 'left-[72px]' : 'left-[260px]'}
      `}
            style={{
                background: 'var(--bg-secondary)',
                borderBottom: '1px solid var(--border-color)'
            }}
        >
            {/* ========== Search Bar ========== */}
            <div className="flex-1 max-w-xl">
                <div
                    className="flex items-center gap-3 px-4 py-2.5 rounded-lg"
                    style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
                >
                    <Search size={18} style={{ color: 'var(--text-secondary)' }} />
                    <input
                        type="text"
                        placeholder="Search courses, assignments, people..."
                        className="flex-1 bg-transparent border-none outline-none text-sm"
                        style={{ color: 'var(--text-primary)' }}
                    />
                    {/* Keyboard shortcut hint - hidden on small screens */}
                    <kbd
                        className="hidden sm:inline-flex px-2 py-0.5 rounded text-xs"
                        style={{ background: 'var(--bg-hover)', color: 'var(--text-secondary)' }}
                    >
                        ⌘K
                    </kbd>
                </div>
            </div>

            {/* ========== Right Side Actions ========== */}
            <div className="flex items-center gap-2 ml-4">
                {/* Theme Toggle Button */}
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="p-2.5 rounded-lg transition-colors hover:bg-[var(--bg-hover)]"
                    style={{ color: 'var(--text-secondary)' }}
                >
                    {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                {/* Notifications Button */}
                <button
                    className="relative p-2.5 rounded-lg transition-colors hover:bg-[var(--bg-hover)]"
                    style={{ color: 'var(--text-secondary)' }}
                >
                    <Bell size={20} />
                    {/* Red notification dot */}
                    <span
                        className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
                        style={{ background: 'var(--mc-maroon)' }}
                    />
                </button>

                {/* Profile Button */}
                <button
                    className="flex items-center gap-3 p-1.5 pr-3 rounded-lg transition-colors hover:bg-[var(--bg-hover)]"
                >
                    {/* Avatar circle */}
                    <div
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ background: 'var(--mc-maroon)' }}
                    >
                        <User size={16} className="text-white" />
                    </div>
                    {/* User info - hidden on small screens */}
                    <div className="hidden sm:flex flex-col items-start">
            <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
              Haoning Wu
            </span>
                        <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              Student
            </span>
                    </div>
                </button>
            </div>
        </header>
    )
}