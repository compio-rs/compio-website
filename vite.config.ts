import react from '@vitejs/plugin-react-swc'
import { resolve } from 'node:path'
import { type Plugin, defineConfig } from 'vite'
import vitePluginFaviconsInject from 'vite-plugin-favicons-inject'
import { markdownToHtml } from './src/build/vite-plugin'

export default defineConfig({
  plugins: [
    vitePluginFaviconsInject('assets/colored-bold.svg') as unknown as Plugin,
    markdownToHtml(),
    react(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      'content': resolve(__dirname, 'content'),
    },
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
  },
})
