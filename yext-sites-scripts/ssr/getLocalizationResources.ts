import fs from 'fs';
import path from 'path';

export const I18N_PATH = 'src/i18n';
// Expects a file structure in the project `src` directory like
// i18n/
//  ├── en/
//  │   └── translation.json
//  └── [locale]/
//      └── [namespace].json
export const getLocalizationResources = () => {
  // Skips parsing any directories in 'blacklistDirs'
  const blacklistDirs = ['missing', 'smartling'];

  const i18nDir = path.resolve(process.cwd(), `${I18N_PATH}`);
  let resources = {} as any;
  fs.readdirSync(i18nDir, {withFileTypes: true}).forEach(localeDir => {
    if (!localeDir.isDirectory) { return; }
    if (blacklistDirs.includes(localeDir.name)) { return; }

    resources[localeDir.name] = {};
    const i18nLocalePath = path.resolve(process.cwd(), `${I18N_PATH}`, localeDir.name);
    fs.readdirSync(i18nLocalePath).forEach(namespace => {
      const namespacePath = path.resolve(process.cwd(), `${I18N_PATH}`, localeDir.name, namespace);
      const translations = fs.readFileSync(namespacePath, 'utf-8');
      resources[localeDir.name][path.parse(namespace).name] = JSON.parse(translations);
    });
  });

  return resources;
}