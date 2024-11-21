/// <reference types="vitest" />
/// <reference types="vite/client" />

import checker from 'vite-plugin-checker'
import { defineConfig, loadEnv } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { configDefaults } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    assetsInclude: ['**/*.mp3'],
    plugins: [
      react({
        jsxRuntime: 'automatic'
      }),
      checker({ typescript: true, eslint: { lintCommand: 'eslint ./src' } }),
      tsconfigPaths()
    ],
    define: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...Object.keys(env).reduce((prev: any, key) => {
        prev[`process.env.${key}`] = JSON.stringify(env[key])
        return prev
      }, {})
    },
    server: {
      port: 3000 // Optional: Set a custom port
    },
    test: {
      globals: true,
      environment: 'jsdom',
      css: true,
      setupFiles: './vitest.setup.ts',
      exclude: [...configDefaults.exclude],
      coverage: {
        provider: 'istanbul', // or 'v8',
        reporter: ['text', 'json', 'html']
      }
    },
    resolve: {
      alias: {
        crypto: 'crypto-browserify',
        stream: 'stream-browserify',
        vm: 'vm-browserify',
        buffer: 'buffer',
        path: 'path-browserify'
      }
    },
    optimizeDeps: {
      esbuildOptions: {
        plugins: [
          NodeGlobalsPolyfillPlugin({ process: true, buffer: true }),
          NodeModulesPolyfillPlugin()
        ]
      }
    }
  }
})
