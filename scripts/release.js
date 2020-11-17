/* eslint-disable @typescript-eslint/no-var-requires */
const { execSync } = require('child_process');

execSync('git add -f ./dist');
execSync('git commit -m "Release" -m "[skip ci]"');
execSync('git push');
