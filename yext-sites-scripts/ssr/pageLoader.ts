import { getLocalData } from './getLocalData.js';
import { TEMPLATE_PATH } from './constants';
import fs from 'fs';
import path from 'path';
import { ViteDevServer } from 'vite';
import { __dirname } from 'esm-module-paths';
import { generateTestData } from './generateTestData.js';

type Props = {
  url: string;
  vite: ViteDevServer;
  templateFilename: string;
  entityId: string;
  featureConfig: any;
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  featureConfig,
}: Props): Promise<PageLoaderResult> => {
  // 1. Read index.html
  let template = fs.readFileSync(path.resolve(process.cwd(), 'index.html'), 'utf-8');

  // 2. Apply vite HTML transforms. This injects the vite HMR client, and
  //    also applies HTML transforms from Vite plugins, e.g. global preambles
  //    from @vitejs/plugin-react-refresh
  template = await vite.transformIndexHtml(url, template);

  // Get the entry file's directory relative to the current file's directory
  const entryDir = __dirname().replace(/\/[^/]+$/, '');

  // 3. Load the server entry. vite.ssrLoadModule automatically transforms
  //    your ESM source code to be usable in Node.js! There is no bundling
  //    required, and provides efficient invalidation similar to HMR.
  const [{ default: Page, getServerSideProps }, { App }] = await Promise.all([
    vite.ssrLoadModule(`/${TEMPLATE_PATH}/${templateFilename}`),
    vite.ssrLoadModule(`${entryDir}/entry`),
  ]);

  // Call generate-test-data
  // let dataDoc = await generateTestData(featureConfig, entityId);

  // Get the data from the generate-test-data file
  let dataDoc = await getLocalData(entityId);
  if (getServerSideProps) {
    dataDoc = await getServerSideProps();
  }

  const props = { data: { document: { streamOutput: dataDoc } }, __meta: { mode: 'development' } };

  return { template, Page, props, App };
};
