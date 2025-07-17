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
            copyDtsFiles: false
        })
    ],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'NorthalCrudElementPlus',
            fileName: 'index'
        },
        rollupOptions: {
            external: ['vue', 'element-plus'],
            output: {
                globals: {
                    vue: 'Vue',
                    'element-plus': 'ElementPlus'
                }
            }
        }
    }
})
