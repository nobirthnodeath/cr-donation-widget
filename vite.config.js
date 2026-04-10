import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { execSync } from 'child_process'
import path from 'path'

// Derive base path from git remote URL
function getRepoName() {
  try {
    const remoteUrl = execSync('git remote get-url origin', { encoding: 'utf-8' }).trim()
    const match = remoteUrl.match(/\/([^/]+?)(?:\.git)?$/)
    return match ? `/${match[1]}/` : '/'
  } catch {
    return '/'
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: getRepoName(),
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
