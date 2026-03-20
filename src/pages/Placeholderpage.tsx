/**
 * Props interface for PlaceholderPage
 */
interface PlaceholderPageProps {
    title: string         // Page title
    description?: string  // Optional subtitle/description
}

/**
 * PlaceholderPage Component
 *
 * A reusable placeholder for pages that aren't built yet.
 * Shows the page title and a dashed border "content area"
 * where you'll add the real content later.
 */
export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold">{title}</h1>
                {description && (
                    <p style={{ color: 'var(--text-secondary)' }}>{description}</p>
                )}
            </div>

            {/* Placeholder content area with dashed border */}
            <div
                className="rounded-xl p-8 flex flex-col items-center justify-center min-h-[400px]"
                style={{
                    background: 'var(--bg-card)',
                    border: '2px dashed var(--border-color)'  // Dashed = "this is a placeholder"
                }}
            >
                <div
                    className="text-6xl mb-4"
                    style={{ color: 'var(--text-secondary)' }}
                >
                    🚧
                </div>
                <p className="text-lg font-medium mb-2">Content Area</p>
                <p style={{ color: 'var(--text-secondary)' }}>
                    This is where the {title.toLowerCase()} content will go.
                </p>
            </div>
        </div>
    )
}