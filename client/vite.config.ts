import { defineConfig,loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [tsconfigPaths(), react()],
    server: {
      proxy: {
        "/api": {
          target: env.VITE_BACKEND_IP,
          changeOrigin: true,
          secure: false,
          ws: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
});
