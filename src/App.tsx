import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MainLayout } from './layouts/MainLayout'
import { Dashboard } from './pages/Dashboard'
import { PlaceholderPage } from './pages/PlaceholderPage'

/**
 * App Component - The root of our application
 *
 * BrowserRouter: Enables client-side routing (no page reloads)
 * Routes: Container for all our route definitions
 * Route: Maps a URL path to a component
 *
 * The nested structure means MainLayout wraps all child routes,
 * so the sidebar/header appear on every page.
 */
function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* MainLayout is the parent - it contains sidebar + header */}
                <Route path="/" element={<MainLayout />}>

                    {/* index = default route when visiting "/" */}
                    <Route index element={<Dashboard />} />

                    {/* Each path maps to a page component */}
                    <Route path="courses" element={
                        <PlaceholderPage title="Courses" description="Your enrolled courses and learning materials." />
                    } />
                    <Route path="calendar" element={
                        <PlaceholderPage title="Calendar" description="Your schedule and upcoming events." />
                    } />
                    <Route path="notebook" element={
                        <PlaceholderPage title="Notebook" description="Your notes and study materials." />
                    } />
                    <Route path="grades" element={
                        <PlaceholderPage title="Grades" description="Your academic transcript and grades." />
                    } />
                    <Route path="discussions" element={
                        <PlaceholderPage title="Discussions" description="Course discussions and forums." />
                    } />
                    <Route path="departments" element={
                        <PlaceholderPage title="Departments" description="Department information and contacts." />
                    } />
                    <Route path="assistant" element={
                        <PlaceholderPage title="AI Assistant" description="Your personal AI study helper." />
                    } />
                    <Route path="settings" element={
                        <PlaceholderPage title="Settings" description="Customize your portal experience." />
                    } />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App