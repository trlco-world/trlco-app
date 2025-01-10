import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const API_URL = env.VITE_SERVERLESS_URL

  return {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    plugins: [TanStackRouterVite(), react()],
    server: {
      proxy: {
        '/api': {
          target: `${API_URL}`,
          changeOrigin: true,
          configure: (proxy) => {
            proxy.on('proxyRes', (proxyRes) => {
              proxyRes.headers['Cache-Control'] =
                'no-cache, no-store, must-revalidate'
              proxyRes.headers['Pragma'] = 'no-cache'
              proxyRes.headers['Expires'] = '0'
            })
          },
        },
      },
    },
  }
})
