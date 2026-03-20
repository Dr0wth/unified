import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Vite configuration file
// This sets up the build tool with React and Tailwind CSS support
export default defineConfig({
    plugins: [
        react(),      // Enables React JSX and fast refresh
        tailwindcss() // Enables Tailwind CSS processing
    ],
})