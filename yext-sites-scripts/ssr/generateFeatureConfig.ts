import path from 'path';
import { TEMPLATE_PATH } from './constants.js';
import { readdir } from 'fs/promises';

// Generates a feature config from the src/templates for use in generate-test-data
export const generateFeatureConfig = async (): Promise<any> => {
  const dir = await readdir(`./${TEMPLATE_PATH}`);
  const features = [];

  for (const fileName of dir) {
    const filepath = path.resolve(process.cwd(), `${TEMPLATE_PATH}/${fileName}`);

    // Cache bust the module so a page refresh gets the updated module data
    // (such as a change to the config's name).
    const component = await importFresh(filepath);

    if (component.config) {
      features.push(component.config);
    }
  }

  return {
    features,
  };
};

// Cache busts imported modules to allow for HMR.
// https://ar.al/2021/02/22/cache-busting-in-node.js-dynamic-esm-imports/
async function importFresh(modulePath: string) {
  const cacheBustingModulePath = `${modulePath}?update=${Date.now()}`;
  return await import(cacheBustingModulePath);
}
