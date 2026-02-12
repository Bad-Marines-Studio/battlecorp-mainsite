import { defineConfig, loadEnv } from 'vite';
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {

    // Load env file based on `mode` in the current working directory.
    // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
    // https://vitejs.dev/guide/env-and-mode.html#modes
    const env = loadEnv(mode, process.cwd(), '');

    return {
        define: {
            'process.env': process.env,
        },
        server: {
            host: false, // disables local dev network server ...
            port: parseInt(env.PORT),
            hmr: {
                overlay: false,
            },
        },
        plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
            },
        },
        logLevel: 'info',
    }
});
