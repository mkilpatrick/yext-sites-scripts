import { getLocalData } from './getLocalData';
import { TEMPLATE_PATH } from './constants';
import fs from "fs";
import path from "path";
import { ViteDevServer } from "vite";

type Props = {
  url: string;
  vite: ViteDevServer;
  templateFilename: string;
  entityId: string;
};

type PageLoaderResult = {
  template: string;
  Page: any;
  App: any;
  props: any;
};

export const pageLoader = async ({
  url,
  vite,
  templateFilename,
  entityId,
}: Props): Promise<PageLoaderResult> => {
  // 1. Read index.html
  let template = fs.readFileSync(
    path.resolve(process.cwd(), "index.html"),
    "utf-8"
  );

  // 2. Apply vite HTML transforms. This injects the vite HMR client, and
  //    also applies HTML transforms from Vite plugins, e.g. global preambles
  //    from @vitejs/plugin-react-refresh
  template = await vite.transformIndexHtml(url, template);
  // 3. Load the server entry. vite.ssrLoadModule automatically transforms
  //    your ESM source code to be usable in Node.js! There is no bundling
  //    required, and provides efficient invalidation similar to HMR.

  const [{ default: Page, getServerSideProps, config }, { App }] = await Promise.all([
    vite.ssrLoadModule(`/${TEMPLATE_PATH}/${templateFilename}`),
    vite.ssrLoadModule(`/react-sites-scripts/entry.tsx`),
  ]);

  // TODO: Get the props dynamically here
  let props = {};
  // Currently assuming the entityId matches the uid of the stream data
  props = await getLocalData(entityId);
  if (getServerSideProps) props = await getServerSideProps();

  return { template, Page, props, App };
};