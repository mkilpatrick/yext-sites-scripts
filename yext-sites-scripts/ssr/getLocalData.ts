import path from 'path';
import fs from 'fs';
import { readdir } from 'fs/promises';

const LOCAL_DATA_PATH = 'localData';

export const getLocalData = async (entityId: string) => {
  const dir = await readdir(LOCAL_DATA_PATH);

  for (const fileName of dir) {
    const data = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), `${LOCAL_DATA_PATH}/${fileName}`)).toString());

    if (data.id?.toString() === entityId) {
      return data;
    }
  }

  return null;
};
