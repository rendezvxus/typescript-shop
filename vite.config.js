import { defineConfig } from "vite";
import path from "path"
export default defineConfig({
    base: "/vistegra-shop",
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '$': path.resolve(__dirname, './public')
        }
    }
})