import path from 'path';
import { TEMPLATE_PATH } from "./constants";
import { readdir } from "fs/promises";

// Determines the template file of a given feature (from the exported config)
export const featureToTemplate = async (feature: string): Promise<string> => {
    const dir = await readdir(`./${TEMPLATE_PATH}`);
    let templateFilename = 'index.tsx'; // fallback to index page
    for (const fileName of dir) {
        const filepath = path.resolve(process.cwd(),`${TEMPLATE_PATH}/${fileName}`);

        // Cache bust the module so a page refresh gets the updated module data
        // (such as a change to the config's name).
        const component = await importFresh(filepath);

        if (feature === component.config?.name?.replace(/\s/g,'').toLowerCase()) {
            templateFilename = fileName;
            break;
        }
    }

    return templateFilename;
};

// Cache busts imported modules to allow for HMR.
// https://ar.al/2021/02/22/cache-busting-in-node.js-dynamic-esm-imports/
async function importFresh(modulePath: string) {
    const cacheBustingModulePath = `${modulePath}?update=${Date.now()}`
    return await import(cacheBustingModulePath);
};