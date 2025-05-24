import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    proxy: {
      "/api": "http://localhost:5000",
      "/get_note": "http://127.0.0.1:5000",
      "/create": "http://127.0.0.1:5000",
    },
  },
});
