#!/usr/bin/env node --experimental-specifier-resolution=node

import build from  "../scripts/build.js";
import dev from  "../scripts/dev.js";
import preview from  "../scripts/preview.js";

const [, , ...args] = process.argv;

const [command] = args;

if (!args.some(arg => ["dev", "build", "preview"].includes(arg))) {
    process.stderr.write("Command not found");
    process.exit(1);
}

switch (command) {
    case "build":
        build();
        break;
    case "dev":
        dev();
        break;
    case "preview":
        preview();
        break;
}