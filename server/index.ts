// Import h3 as npm dependency
import { createServer } from "vite";
import {
  createApp,
  createRouter,
  fromNodeMiddleware,
  defineEventHandler,
  useBase,
} from "h3";

export const app = createApp();

const api = createRouter().get(
  "/hello",
  defineEventHandler((event) => {
    return { say: "hi" };
  })
);

// https://cn.vite.dev/config/server-options.html#server-middlewaremode
const vite = await createServer({
  server: { middlewareMode: true },
  // appType: "custom",
});

app.use(useBase("/api", api.handler)).use(fromNodeMiddleware(vite.middlewares));
