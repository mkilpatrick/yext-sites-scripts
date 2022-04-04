import fs from "fs";
import { runGenerate } from "./init/interface.js";

export default async () => {
  const files = await fs.promises.readdir(".");
  if (files.length) {
    process.stderr.write(
      "Refusing to generate project: Directory not empty.\n",
    );
    process.exit(1);
  }

  runGenerate();
}
