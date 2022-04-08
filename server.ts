import express from 'express';
import { createServer as createViteServer } from 'vite';
import { serverRenderRoute } from './yext-sites-scripts/ssr/serverRenderRoute.js';
import { getServerSideProps } from './yext-sites-scripts/ssr/getServerSideProps.js';
import react from '@vitejs/plugin-react';
import i18n from 'i18next';
import fsBackend from 'i18next-fs-backend';
import { getLocalizationResources, I18N_PATH } from './yext-sites-scripts/ssr/getLocalizationResources.js';
import path from 'path';

const i18nOptions = {
  lng: 'en',
  fallbackLng: 'en',
  resources: getLocalizationResources(),
  interpolation: {
    escapeValue: false // react is already safe from xss
  },
  debug: true,
  backend: {
    addPath: path.resolve(process.cwd(), `${I18N_PATH}/missing/missing.json`),
  },
  saveMissing: true,
};

export const createServer = async (dynamicGenerateData: boolean) => {
  // creates a standard express app
  const app = express();
  i18n.use(fsBackend).init(i18nOptions);

  // create vite using ssr mode
  const vite = await createViteServer({
    server: { middlewareMode: 'ssr' },
    plugins: [react()],
    // Temporary solution https://github.com/vitejs/vite/issues/6215
    optimizeDeps: {
      include: ['react/jsx-runtime'],
    },
  });
  // register vite's middleware
  app.use(vite.middlewares);

  // Ignore favicon requests if it doesn't exist
  app.use(ignoreFavicon);

  app.use('/data/*', getServerSideProps({ vite }));

  // when a page is requested, call our serverRenderRoute method
  app.use('*', serverRenderRoute({ vite, i18n, dynamicGenerateData }));

  // start the server on port 3000
  app.listen(3000, () => process.stdout.write('listening on :3000\n'));
};

function ignoreFavicon(req: any, res: any, next: any) {
  if (req.originalUrl.includes('favicon')) {
    res.status(204).end();
    return;
  }
  next();
}
