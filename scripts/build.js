/* eslint-disable @typescript-eslint/no-var-requires */
const { execSync } = require('child_process');
const Mustache = require('mustache');
const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(path.join(__dirname, '../src'))
  .filter(filename => filename.includes('.js'))

try {
  execSync('rm -rf dist');
  execSync('yarn webpack');
  execSync('mkdir -p dist');

  for (const file of files) {
    const data = {
      lib: fs.readFileSync(path.join(__dirname, `../tmp/${file}`), { encoding: 'utf-8' }),
      runtime: '',
    };
    const template = `
(function() {
  {{{ lib }}}
  {{{ runtime }}}
})();
    `
    const output = JSON.parse(execSync(`yarn jsdoc -X ${path.join(__dirname, `../src/${file}`)}`).toString())
    const tag = output[0].tags ? output[0].tags.filter(tag => tag.title === 'runtime')[0] : null;

    if (tag) {
      data.runtime = `\n${tag.text}\n`;

      fs.writeFileSync(path.join(__dirname, `../dist/${file}`), Mustache.render(template, data), {
        encoding: 'utf-8',
      });
    }
  }
} catch (err) {
  if (err.stdout) {
    console.log(err.stdout.toString());
  } else {
    console.log(err);
  }
}
