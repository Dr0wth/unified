import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'  // <-- Important: imports our Tailwind + theme CSS
import App from './App.tsx'

/**
 * Entry point of the app
 * Mounts the React app to the #root div in index.html
 */
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>,
)