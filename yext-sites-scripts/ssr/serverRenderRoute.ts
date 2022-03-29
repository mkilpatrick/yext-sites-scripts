import { buildFeatureConfig } from './buildFeatureConfig';
import { getTemplateConfig } from './getTemplateConfig';
import { RequestHandler } from 'express-serve-static-core';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { ViteDevServer } from 'vite';
import { featureToTemplate } from './featureToTemplate';
import { pageLoader } from './pageLoader';
import { urlToFeature } from './urlToFeature';

type Props = {
  vite: ViteDevServer;
};

export const serverRenderRoute =
  ({ vite }: Props): RequestHandler =>
    async (req, res, next) => {
      const url = req.originalUrl;

      const { feature, entityId } = urlToFeature(url);
      const templateFilename = await featureToTemplate(feature);
      const templateConfig = await getTemplateConfig(templateFilename);
      const featureConfig = buildFeatureConfig(templateConfig);

      try {
        const { template, Page, App, props } = await pageLoader({
          url,
          vite,
          templateFilename,
          entityId,
          featureConfig,
        });

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
          }),
        );

        // Inject the app-rendered HTML into the template.
        const html = template.replace(`<!--app-html-->`, appHtml).replace(
          '</head>',
          `<script type="text/javascript">
            window._RSS_PROPS_ = ${JSON.stringify(props)};
            window._RSS_TEMPLATE_ = '${templateFilename}';
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
