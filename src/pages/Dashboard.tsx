/**
 * Dashboard Page
 *
 * The main landing page after login showing:
 * - Welcome message
 * - Quick stats cards
 * - Upcoming deadlines
 * - Quick links
 * - Recent activity feed
 */
export function Dashboard() {
    return (
        <div className="space-y-6">

            {/* ========== Page Header ========== */}
            <div>
                <h1 className="text-2xl font-bold">Welcome back, Haoning</h1>
                <p style={{ color: 'var(--text-secondary)' }}>
                    Here's what's happening with your courses today.
                </p>
            </div>

            {/* ========== Quick Stats Row ========== */}
            {/* Grid: 1 column on mobile, 2 on medium, 4 on large screens */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Active Courses', value: '5', accent: true },  // accent = maroon background
                    { label: 'Assignments Due', value: '40' },
                    { label: 'Unread Messages', value: '999' },
                    { label: 'GPA', value: '0.5', accent: true },
                ].map((stat, i) => (
                    <div
                        key={i}
                        className="p-5 rounded-xl"
                        style={{
                            background: stat.accent ? 'var(--mc-maroon)' : 'var(--bg-card)',
                            border: stat.accent ? 'none' : '1px solid var(--border-color)'
                        }}
                    >
                        <p
                            className={`text-sm ${stat.accent ? 'text-white/70' : ''}`}
                            style={{ color: stat.accent ? undefined : 'var(--text-secondary)' }}
                        >
                            {stat.label}
                        </p>
                        <p className={`text-3xl font-bold mt-1 ${stat.accent ? 'text-white' : ''}`}>
                            {stat.value}
                        </p>
                    </div>
                ))}
            </div>

            {/* ========== Main Content Grid ========== */}
            {/* 3-column grid on large screens */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Upcoming Deadlines - Takes 2 columns */}
                <div
                    className="lg:col-span-2 rounded-xl p-5"
                    style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
                >
                    <h2 className="text-lg font-semibold mb-4">Upcoming Deadlines</h2>
                    <div className="space-y-3">
                        {[
                            { course: 'SFWRENG 2GA3', task: 'Assignment 3 Submission', due: 'Tomorrow, 11:59 PM', urgent: true },
                            { course: 'ENGINEER 2PX3', task: 'Pre-read Worksheet 5  (AI Suggestion) ', due: 'Mar 19, 08:30 AM', urgent: false },
                            { course: 'ECON 1B03', task: 'MyLab Assignment 9\n *CLICK ME* to redirect to assignment page (ai suggestion)', due: 'Mar 25, 5:00 PM', urgent: false },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="flex items-center justify-between p-4 rounded-lg"
                                style={{ background: 'var(--bg-hover)' }}
                            >
                                <div>
                                    <p className="font-medium">{item.task}</p>
                                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                                        {item.course}
                                    </p>
                                </div>
                                {/* Due date badge - red if urgent */}
                                <span
                                    className={`text-sm px-3 py-1 rounded-full ${item.urgent ? 'text-white' : ''}`}
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

                {/* Quick Links - Takes 1 column */}
                <div
                    className="rounded-xl p-5"
                    style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
                >
                    <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
                    <div className="space-y-2">
                        {[
                            'Unwind',
                            'Mosaic',
                            'Avenue to Learn',
                            'CrowdMark',
                            'Student Centre',
                            'Outlook',
                            'Campus Map'
                        ].map((link, i) => (
                            <button
                                key={i}
                                className="w-full text-left px-4 py-3 rounded-lg transition-colors hover:bg-[var(--bg-hover)]"
                                style={{ color: 'var(--text-secondary)' }}
                            >
                                {link}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* ========== Recent Activity ========== */}
            <div
                className="rounded-xl p-5"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
            >
                <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
                <div className="space-y-4">
                    {[
                        { action: 'Grade posted', detail: 'SFWRENG 2GA3 - Midterm: 15% (AI suggestion) *Click AI assisstant to apply to work in McDonalds NOW*', time: '2 hours ago' },
                        { action: 'New announcement', detail: 'STAT 3Y03 - Tutorial cancelled this week', time: '5 hours ago' },
                        { action: 'Assignment submitted', detail: 'SFWRENG 2AA4 - Drop out letter', time: 'Yesterday' },
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