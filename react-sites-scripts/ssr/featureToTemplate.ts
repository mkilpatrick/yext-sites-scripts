import { TEMPLATE_PATH } from "./constants";
import { readdir } from "fs/promises";

export const featureToTemplate = async (feature: string): Promise<string> => {
    const dir = await readdir(`./${TEMPLATE_PATH}`);
    let templateFilename = 'index.tsx'; // fallback to index page
    for (const fileName of dir) {
        const component = await import(`../../${TEMPLATE_PATH}/${fileName}`);
        if (feature === component.config?.name.replace(/\s/g,'').toLowerCase()) {
            templateFilename = fileName;
            break;
        }
    }

    return templateFilename;
};
