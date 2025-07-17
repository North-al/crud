import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig({
    plugins: [
        vue(),
        vueJsx(),
        dts({
            insertTypesEntry: true,
            copyDtsFiles: false,
            outDir: 'dist',
            include: ['src/**/*']
        })
    ],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'NorthalCrudElementPlus',
            fileName: format => `index.${format}.js`
        },
        rollupOptions: {
            external: ['vue', 'element-plus'],
            output: {
                globals: {
                    vue: 'Vue',
                    'element-plus': 'ElementPlus'
                },
                assetFileNames: chunkInfo => {
                    if (chunkInfo.name?.endsWith('.css')) {
                        return 'index.css'
                    }
                    return '[name][extname]'
                }
            }
        }
    }
})
