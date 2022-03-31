#!/usr/bin/env node --loader=ts-node/esm --experimental-specifier-resolution=node

import build from  "../scripts/build";
import dev from  "../scripts/dev";
import preview from  "../scripts/preview";

const [, , ...args] = process.argv;

const [command] = args;

if (!args.some(arg => ["dev", "build", "preview"].includes(arg))) {
    process.stderr.write("Command not found");
    process.exit(1);
}

switch (command) {
    case "build":
        await build();
        break;
    case "dev":
        await dev();
        break;
    case "preview":
        await preview();
        break;
}