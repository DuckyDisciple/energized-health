import { resolve } from 'path'
import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import graphql from '@rollup/plugin-graphql'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [graphql(), reactRefresh()],
  resolve: {
    alias: [
      { find: 'animation', replacement: resolve(__dirname, 'src/animation') },
      { find: 'components', replacement: resolve(__dirname, 'src/components') },
      { find: 'context', replacement: resolve(__dirname, 'src/context') },
      { find: 'styles', replacement: resolve(__dirname, 'src/styles') },
      { find: 'hooks', replacement: resolve(__dirname, 'src/hooks') },
      { find: 'global', replacement: resolve(__dirname, 'src/global') },
      { find: 'utilities', replacement: resolve(__dirname, 'src/utilities') },
      { find: 'pages', replacement: resolve(__dirname, 'src/pages') },
      { find: 'layouts', replacement: resolve(__dirname, 'src/layouts') },
    ],
  },
})
