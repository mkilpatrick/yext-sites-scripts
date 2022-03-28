#! /usr/bin/env node

import { program } from "commander";
import fs from "fs";
import { runGenerate } from "./init/interface";


parseCommandLineArgs();

function parseCommandLineArgs() {
  program
    .name("yext-sites-scripts init")
    .description("Generate a new Yext Sites project")
    .action(
      async () => {
        const files = await fs.promises.readdir(".");
        if (files.length) {
          process.stderr.write(
            "Refusing to generate project: Directory not empty.\n",
          );
          process.exit(1);
        }

        runGenerate();
      }
    );

  return program.parse();
}


