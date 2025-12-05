// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'
import { globSync } from 'glob' // Import glob

// Find all HTML files in the root
// (You can change the pattern to 'src/pages/*.html' or similar if needed)
const htmlFiles = globSync('*.html')

// Create the input object for Rollup
const rollupInputs = htmlFiles.reduce((acc, file) => {
  // Create a name for the entry (e.g., 'index.html' -> 'index')
  // (e.g., 'setting.html' -> 'setting')
  const name = file.replace(/\.html$/, '')

  // Add it to the accumulator object
  acc[name] = resolve(__dirname, file)
  return acc
}, {})

export default defineConfig({
  build: {
    rollupOptions: {
      input: rollupInputs, // Use the generated object
    },
  },
})