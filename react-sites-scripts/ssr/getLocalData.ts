import fs from 'fs';
import { readdir } from "fs/promises";

const LOCAL_DATA_PATH = 'localData';

export const getLocalData = async (uid: string) => {
    const dir = await readdir(LOCAL_DATA_PATH);

    for (const fileName of dir) {
        const data = JSON.parse(fs.readFileSync(`${LOCAL_DATA_PATH}/${fileName}`).toString());

        if (data.uid?.toString() === uid) {
            return data;
        } 
    }

    return null;
};