import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from '../components/Sidebar'
import { Header } from '../components/Header'

/**
 * MainLayout Component
 *
 * This is the "shell" of our app - it contains:
 * - Sidebar (left navigation)
 * - Header (top bar with search/profile)
 * - Main content area (where page content renders)
 *
 * <Outlet /> is a special React Router component that renders
 * whatever child route is currently active (Dashboard, Courses, etc.)
 */
export function MainLayout() {
    // State to track if sidebar is collapsed or expanded
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

    return (
        <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
            {/* Sidebar - fixed on the left */}
            <Sidebar
                collapsed={sidebarCollapsed}
                onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
            />

            {/* Header - fixed at the top, adjusts based on sidebar width */}
            <Header sidebarCollapsed={sidebarCollapsed} />

            {/* Main Content Area */}
            {/* pt-16 = padding-top for header height (64px / 4 = 16) */}
            {/* pl-[260px] or pl-[72px] = padding-left for sidebar width */}
            <main
                className={`
          pt-16 min-h-screen
          transition-all duration-300
          ${sidebarCollapsed ? 'pl-[72px]' : 'pl-[260px]'}
        `}
            >
                <div className="p-6">
                    {/* Outlet renders the current page (Dashboard, Courses, etc.) */}
                    <Outlet />
                </div>
            </main>
        </div>
    )
}