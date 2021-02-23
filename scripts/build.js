/* eslint-disable @typescript-eslint/no-var-requires */
const { execSync } = require('child_process');
const Mustache = require('mustache');
const fs = require('fs');
const path = require('path');

try {
  execSync('yarn webpack');
  execSync('yarn workspace solutions-templates run build');
} catch (err) {
  if (err.stdout) {
    console.log(err.stdout.toString());
  } else {
    console.log(err);
  }
}
