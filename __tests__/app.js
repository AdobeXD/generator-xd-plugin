'use strict';

const answers = require('../generators/prompts/answers');
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-xd-plugin:app', () => {
  Object.values(answers.version).forEach(version => {
    // Regex for /"minVersion"\s*:\s*"16\.0.\d"/
    const _manifestMinVersion = new RegExp(
      `"minVersion"\\s*:\\s*"${version}.\\d"`.replace('.', '\\.')
    );

    it(`generating template of plugin with no dialog for v${version}`, () => {
      return helpers
        .run(path.join(__dirname, '../generators/app'))
        .withPrompts({ name: answers.projectDisplayName })
        .withPrompts({ minVersion: version })
        .withPrompts({ scriptType: answers.framework.noui.dialog })
        .then(() => {
          assert.file(['static/manifest.json']);
          assert.file(['static/images/icon.png']);
          assert.file(['package.json']);
          assert.file(['README.md']);
          assert.file(['src/main.js']);
          // Check minVersion of manifest.json
          assert.fileContent('static/manifest.json', _manifestMinVersion);
        });
    });

    it(`generating template of plugin with dialog of react for v${version}`, () => {
      return helpers
        .run(path.join(__dirname, '../generators/app'))
        .withPrompts({ name: answers.projectDisplayName })
        .withPrompts({ minVersion: version })
        .withPrompts({ scriptType: answers.framework.react.dialog })
        .then(() => {
          assert.file(['static/manifest.json']);
          assert.file(['static/images/icon.png']);
          assert.file(['package.json']);
          assert.file(['README.md']);
          assert.file(['src/main.jsx']);
          // Check minVersion of manifest.json
          assert.fileContent('static/manifest.json', _manifestMinVersion);
        });
    });

    it(`generating template of plugin with dialog of plain js for v${version}`, () => {
      return helpers
        .run(path.join(__dirname, '../generators/app'))
        .withPrompts({ name: answers.projectDisplayName })
        .withPrompts({ minVersion: version })
        .withPrompts({ scriptType: answers.framework.plain.dialog })
        .then(() => {
          assert.file(['static/manifest.json']);
          assert.file(['static/images/icon.png']);
          assert.file(['package.json']);
          assert.file(['README.md']);
          assert.file(['src/main.js']);
          // Check minVersion of manifest.json
          assert.fileContent('static/manifest.json', _manifestMinVersion);
        });
    });
  });
});
