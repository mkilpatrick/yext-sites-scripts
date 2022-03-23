#! /usr/bin/env node
import shell from 'shelljs';

shell.exec("tsc && vite build");