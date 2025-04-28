import {defineConfig} from 'vite'
import {dirname, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from "vite-tsconfig-paths";
import {dependencies, devDependencies} from "./package.json"

// https://vite.dev/config/
const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    build: {
        lib: {
            entry: resolve(__dirname, 'lib/main.js'),
            name: 'ui-core',
            // the proper extensions will be added
            fileName: 'ui-core',
        },
        rollupOptions: {
            // make sure to externalize deps that shouldn't be bundled
            // into your library
            external: [...Object.keys(dependencies), ...Object.keys(devDependencies), 'react', 'react-dom', 'react/jsx-runtime'],
            output: {
                // Provide global variables to use in the UMD build
                // for externalized deps
                globals: {
                    react: 'React',
                    "react-dom": 'ReactDOM',
                    "react/jsx-runtime": 'jsxRuntime',
                },
            },
        },
    },
})
