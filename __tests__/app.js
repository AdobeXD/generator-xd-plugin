'use strict';

const answers = require('../generators/prompts/answers');
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-xd-plugin:app', () => {
  it('generating template of plugin with no dialog', () => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({ name: answers.projectDisplayName })
      .withPrompts({ scriptType: answers.framework.noui.dialog })
      .then(() => {
        assert.file(['static/manifest.json']);
        assert.file(['static/images/icon@1x.png']);
        assert.file(['static/images/icon@2x.png']);
        assert.file(['static/images/icon@3x.png']);
        assert.file(['static/images/icon@4x.png']);
        assert.file(['package.json']);
        assert.file(['README.md']);
        assert.file(['src/main.js']);
      });
  });

  it('generating template of plugin with dialog of react', () => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({ name: answers.projectDisplayName })
      .withPrompts({ scriptType: answers.framework.react.dialog })
      .then(() => {
        assert.file(['static/manifest.json']);
        assert.file(['static/images/icon@1x.png']);
        assert.file(['static/images/icon@2x.png']);
        assert.file(['static/images/icon@3x.png']);
        assert.file(['static/images/icon@4x.png']);
        assert.file(['package.json']);
        assert.file(['README.md']);
        assert.file(['src/main.jsx']);
      });
  });

  it('generating template of plugin with dialog of plain js', () => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({ name: answers.projectDisplayName })
      .withPrompts({ scriptType: answers.framework.plain.dialog })
      .then(() => {
        assert.file(['static/manifest.json']);
        assert.file(['static/images/icon@1x.png']);
        assert.file(['static/images/icon@2x.png']);
        assert.file(['static/images/icon@3x.png']);
        assert.file(['static/images/icon@4x.png']);
        assert.file(['package.json']);
        assert.file(['README.md']);
        assert.file(['src/main.js']);
      });
  });
});
