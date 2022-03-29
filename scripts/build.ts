#! /usr/bin/env node
import { build } from 'vite'
import react from '@vitejs/plugin-react';
/* eslint-disable */
import yextSSG from 'ssg-plugin';
/* eslint-enable */

(async () => {
  await build({
    // root: path.resolve(__dirname, './project'),
    // base: '/foo/',
    plugins: [react(), yextSSG.default()],
  })
})();