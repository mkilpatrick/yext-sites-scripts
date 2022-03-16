#!/usr/bin/env node --loader=ts-node/esm --experimental-specifier-resolution=node

export {}

const [, , ...args] = process.argv;

const [command] = args;

if (!args.some(arg => ["dev", "build", "preview"].includes(arg))) {
    console.error("Command not found");
    process.exit();
}

await import(`../scripts/${command}.js`);