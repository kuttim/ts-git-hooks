#!/usr/bin/env node

const { install } = require('../dist/index');

const cwd = process.cwd();

install(cwd);
