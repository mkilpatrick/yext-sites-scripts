import path from 'path';
import { TEMPLATE_PATH } from './constants';

// Gets the templates's config for use in generate-test-data
export const getTemplateConfig = async (templateFilename: string): Promise<any> => {

  const filepath = path.resolve(process.cwd(), `${TEMPLATE_PATH}/${templateFilename}`);

  // Cache bust the module so a page refresh gets the updated module data
  // (such as a change to the config's name).
  const component = await importFresh(filepath);

  if (component.config) {
    return component.config;
  }
};

// Cache busts imported modules to allow for HMR.
// https://ar.al/2021/02/22/cache-busting-in-node.js-dynamic-esm-imports/
async function importFresh(modulePath: string) {
  const cacheBustingModulePath = `${modulePath}?update=${Date.now()}`;
  return await import(cacheBustingModulePath);
}
