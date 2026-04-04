#!/usr/bin/env node

const path = require('path');
const pluginDir = path.resolve(__dirname, '..');

console.log(`
Software Engineering Skills - Claude Code Plugin

Multi-agent pipeline: REFINE → PLAN → BUILD → TEST → REVIEW

To add this plugin to Claude Code, run:

  claude plugin add ${pluginDir}

Then use it with:

  /swe:pipeline <feature description>
`);
