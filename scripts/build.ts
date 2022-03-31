#! /usr/bin/env node
import { build } from 'vite'
import react from '@vitejs/plugin-react';
import yextSSG from 'ssg-plugin';

export default async () => {
  await build({
    // root: path.resolve(__dirname, './project'),
    // base: '/foo/',
    plugins: [react(), yextSSG.default()],
  });
};