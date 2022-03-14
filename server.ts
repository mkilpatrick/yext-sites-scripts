import express from "express";
import { createServer as createViteServer } from "vite";
import { serverRenderRoute } from "./react-sites-scripts/ssr/serverRenderRoute";
import { getServerSideProps } from "./react-sites-scripts/ssr/getServerSideProps";

async function createServer() {
  // creates a standard express app
  const app = express();
  
  // create vite using ssr mode
  const vite = await createViteServer({
    server: { middlewareMode: "ssr" },
  });
  // register vite's middleware
  app.use(vite.middlewares);
  
  // Ignore favicon requests if it doesn't exist
  app.use(ignoreFavicon);

  app.use("/data/*", getServerSideProps({ vite }));

  // when a page is requested, call our serverRenderRoute method
  app.use("*", serverRenderRoute({ vite }));

  // start the server on port 3000
  app.listen(3000, () => console.log("listening on :3000"));
}

createServer();

function ignoreFavicon(req: any, res: any, next: any) {
  if (req.originalUrl.includes('favicon')) {
    res.status(204).end();
    return;
  }
  next();
}