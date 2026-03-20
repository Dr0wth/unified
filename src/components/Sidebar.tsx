import {
    LayoutDashboard,
    BookOpen,
    Calendar,
    NotebookPen,
    MessageSquare,
    GraduationCap,
    Bot,
    Settings,
    ChevronLeft,
    Building2
} from 'lucide-react'  // Icon library
import { NavLink } from 'react-router-dom'

/**
 * Props interface - defines what props this component accepts
 */
interface SidebarProps {
    collapsed: boolean    // Is the sidebar collapsed?
    onToggle: () => void  // Function to call when toggle button is clicked
}

/**
 * Navigation items configuration
 * Each item has an icon, label, and path (URL)
 * This makes it easy to add/remove/reorder nav items
 */
const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: BookOpen, label: 'Courses', path: '/courses' },
    { icon: Calendar, label: 'Calendar', path: '/calendar' },
    { icon: NotebookPen, label: 'Notebook', path: '/notebook' },
    { icon: GraduationCap, label: 'Grades', path: '/grades' },
    { icon: MessageSquare, label: 'Discussions', path: '/discussions' },
    { icon: Building2, label: 'Departments', path: '/departments' },
    { icon: Bot, label: 'AI Assistant', path: '/assistant' },
]

/**
 * Sidebar Component
 *
 * A collapsible navigation sidebar with:
 * - Logo area at top
 * - Navigation links in the middle
 * - Settings and collapse button at bottom
 */
export function Sidebar({ collapsed, onToggle }: SidebarProps) {
    return (
        <aside
            className={`
        fixed left-0 top-0 h-screen z-40
        flex flex-col
        transition-all duration-300 ease-in-out
        ${collapsed ? 'w-[72px]' : 'w-[260px]'}
      `}
            style={{
                background: 'var(--bg-secondary)',
                borderRight: '1px solid var(--border-color)'
            }}
        >
            {/* ========== Logo Area ========== */}
            <div
                className="h-16 flex items-center px-4 gap-3"
                style={{ borderBottom: '1px solid var(--border-color)' }}
            >
                {/* McMaster "M" logo box */}
                <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white shrink-0"
                    style={{ background: 'var(--mc-maroon)' }}
                >
                    M
                </div>
                {/* Text next to logo - hidden when collapsed */}
                {!collapsed && (
                    <div className="flex flex-col overflow-hidden">
                        <span className="font-semibold text-sm truncate">McMaster</span>
                        <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>Student Portal</span>
                    </div>
                )}
            </div>

            {/* ========== Navigation Links ========== */}
            <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        /**
                         * NavLink provides isActive - true when this link matches current URL
                         * We use this to style the active link differently (maroon background)
                         */
                        className={({ isActive }) => `
              flex items-center gap-3 px-3 py-2.5 rounded-lg
              transition-all duration-150
              ${isActive
                            ? 'text-white'
                            : 'hover:bg-[var(--bg-hover)]'
                        }
            `}
                        style={({ isActive }) => ({
                            background: isActive ? 'var(--mc-maroon)' : 'transparent',
                            color: isActive ? 'white' : 'var(--text-secondary)'
                        })}
                    >
                        {/* Icon - shrink-0 prevents icon from shrinking */}
                        <item.icon size={20} className="shrink-0" />
                        {/* Label - hidden when collapsed */}
                        {!collapsed && <span className="text-sm font-medium truncate">{item.label}</span>}
                    </NavLink>
                ))}
            </nav>

            {/* ========== Bottom Section ========== */}
            <div className="p-3 space-y-1" style={{ borderTop: '1px solid var(--border-color)' }}>
                {/* Settings Link */}
                <NavLink
                    to="/settings"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 hover:bg-[var(--bg-hover)]"
                    style={{ color: 'var(--text-secondary)' }}
                >
                    <Settings size={20} className="shrink-0" />
                    {!collapsed && <span className="text-sm font-medium">Settings</span>}
                </NavLink>

                {/* Collapse/Expand Button */}
                <button
                    onClick={onToggle}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 hover:bg-[var(--bg-hover)]"
                    style={{ color: 'var(--text-secondary)' }}
                >
                    {/* Chevron rotates 180deg when collapsed */}
                    <ChevronLeft
                        size={20}
                        className={`shrink-0 transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`}
                    />
                    {!collapsed && <span className="text-sm font-medium">Collapse</span>}
                </button>
            </div>
        </aside>
    )
}