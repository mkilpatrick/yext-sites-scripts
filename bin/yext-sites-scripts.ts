#!/usr/bin/env node --loader=ts-node/esm --experimental-specifier-resolution=node

export { }

const [, , ...args] = process.argv;

const [command] = args;

if (!args.some(arg => ["dev", "build", "preview"].includes(arg))) {
    process.stderr.write("Command not found");
    process.exit(1);
}

await import(`../scripts/${command}.js`);