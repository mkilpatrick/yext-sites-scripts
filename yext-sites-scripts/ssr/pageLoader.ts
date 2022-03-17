import { generateTestData } from './generateTestData';
import { getLocalData } from './getLocalData';
import { TEMPLATE_PATH } from './constants';
import fs from "fs";
import path from "path";
import { ViteDevServer } from "vite";
import { __dirname } from 'esm-module-paths';

type Props = {
  url: string;
  vite: ViteDevServer;
  templateFilename: string;
  entityId: string;
  featureConfig: any,
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
  featureConfig,
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

  // Get the entry file's directory relative to the current file's directory
  const entryDir = __dirname().replace(/\/[^\/]+$/,"");

  // 3. Load the server entry. vite.ssrLoadModule automatically transforms
  //    your ESM source code to be usable in Node.js! There is no bundling
  //    required, and provides efficient invalidation similar to HMR.
  const [{ default: Page, getServerSideProps, config }, { App }] = await Promise.all([
    vite.ssrLoadModule(`/${TEMPLATE_PATH}/${templateFilename}`),
    vite.ssrLoadModule(`${entryDir}/entry`),
  ]);

  let props = {};

  // Call generate-test-data
  await generateTestData(featureConfig, entityId);

  // Get the props from the generate-test-data file
  props = await getLocalData(entityId);

  if (getServerSideProps) props = await getServerSideProps();

  return { template, Page, props, App };
};