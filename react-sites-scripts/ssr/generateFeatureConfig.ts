import { TEMPLATE_PATH } from "./constants";
import { readdir } from "fs/promises";

// Generates a feature config from the src/templates for use in generate-test-data
export const generateFeatureConfig = async (): Promise<any> => {
    const dir = await readdir(`./${TEMPLATE_PATH}`);
    let features = [];

    for (const fileName of dir) {
        const filepath = `../../${TEMPLATE_PATH}/${fileName}`;

        // Delete the cached module so a page refresh gets the updated module data (such as a change to the config's name)
        delete require.cache[require.resolve(filepath)];

        const component = await import(filepath);

        if (component.config) {
            features.push(component.config);
        }
    }

    return {
        features: features
    };
};