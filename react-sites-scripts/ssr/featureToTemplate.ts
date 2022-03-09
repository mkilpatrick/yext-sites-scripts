import { TEMPLATE_PATH } from "./constants";
import { readdir } from "fs/promises";

export const featureToTemplate = async (feature: string): Promise<string> => {
    const dir = await readdir(`./${TEMPLATE_PATH}`);
    let templateFilename = 'index.tsx'; // fallback to index page
    for (const fileName of dir) {
        const filepath = `../../${TEMPLATE_PATH}/${fileName}`;

        // Delete the cached module so a page refresh gets the updated module data (such as a change to the config's name)
        delete require.cache[require.resolve(filepath)];

        const component = await import(filepath);

        if (feature === component.config?.name?.replace(/\s/g,'').toLowerCase()) {
            templateFilename = fileName;
            break;
        }
    }

    return templateFilename;
};
