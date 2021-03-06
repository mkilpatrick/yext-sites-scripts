import { buildFeatureConfig } from './buildFeatureConfig.js';
import { getTemplateConfig } from './getTemplateConfig.js';
import { RequestHandler } from 'express-serve-static-core';
import React from 'react';
import ReactDOMServer from 'react-dom/server.js';
import { ViteDevServer } from 'vite';
import { featureToTemplate } from './featureToTemplate.js';
import { pageLoader } from './pageLoader.js';
import { urlToFeature } from './urlToFeature.js';
import fs from 'fs';

type Props = {
  vite: ViteDevServer;
  dynamicGenerateData: boolean;
  i18n?: any
};

export const serverRenderRoute =
  ({ vite, i18n, dynamicGenerateData }: Props): RequestHandler =>
    async (req, res, next) => {
      const url = req.originalUrl;

      const { feature, entityId } = urlToFeature(url);
      const templateFilename = await featureToTemplate(vite, feature);
      if (!templateFilename) {
        return res.status(404).end(fs.readFileSync('node_modules/@yext/yext-sites-scripts/dist/404.html').toString());
      }
      const templateConfig = await getTemplateConfig(vite, templateFilename);
      const featureConfig = buildFeatureConfig(templateConfig);

      try {
        const { template, Page, App, props } = await pageLoader({
          url,
          vite,
          templateFilename,
          entityId,
          featureConfig,
          dynamicGenerateData,
        });

        // Change the langauge on the i18n object based on entity data
        const { data } = props;
        const { document } = data;
        const { streamOutput } = document;
        const { locale } = streamOutput;
        // TODO: validate this is a valid langauge?
        i18n.changeLanguage(locale);

        // render the component to its html
        // Since we are on the server using plain TS, and outside
        // of Vite, we are not using JSX here
        const appHtml = await ReactDOMServer.renderToString(
          React.createElement(App, {
            page: {
              props,
              path: req.originalUrl,
              component: Page,
            },
            i18n,
          }),
        );

        // Inject the app-rendered HTML into the template.
        const html = template.replace(`<!--app-html-->`, appHtml).replace(
          '</head>',
          `<script type="text/javascript">
            window._RSS_PROPS_ = ${JSON.stringify(props)};
            window._RSS_TEMPLATE_ = '${templateFilename}';
            window._RSS_I18N_ = ${JSON.stringify(i18n.getDataByLanguage(locale))};
            window._RSS_LOCALE_ = '${locale}';
          </script></head>`,
        );

        // Send the rendered HTML back.
        res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
      } catch (e: any) {
        // If an error is caught, let vite fix the stracktrace so it maps back to
        // your actual source code.
        vite.ssrFixStacktrace(e);
        next(e);
      }
    };
