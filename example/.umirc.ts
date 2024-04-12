import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
    { path: "/docs", component: "docs" },
  ],
  npmClient: 'pnpm',
  plugins: ['../dist/cjs/index.js'],
  buildInfo: {
    injectAlways: true
  }
});
