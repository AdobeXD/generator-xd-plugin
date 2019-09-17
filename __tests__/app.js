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
        assert.file(['.editorconfig']);
        assert.file(['.eslintignore']);
        assert.file(['.eslintrc']);
        assert.file(['.gitignore']);
        assert.file(['README.md']);
        assert.file(['package.json']);
        assert.file(['webpack.config.js']);
        assert.file(['src/main.js']);
        assert.file(['static/manifest.json']);
        assert.file(['static/images/icon@0.5x.png']);
        assert.file(['static/images/icon@1x.png']);
        assert.file(['static/images/icon@2x.png']);
        assert.file(['static/images/icon@3x.png']);
        assert.file(['static/images/icon@4x.png']);
      });
  });

  it('generating template of plugin with dialog of react', () => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({ name: answers.projectDisplayName })
      .withPrompts({ scriptType: answers.framework.react.dialog })
      .then(() => {
        assert.file(['.editorconfig']);
        assert.file(['.eslintignore']);
        assert.file(['.eslintrc']);
        assert.file(['.gitignore']);
        assert.file(['.stylelintrc']);
        assert.file(['README.md']);
        assert.file(['package.json']);
        assert.file(['webpack.config.js']);
        assert.file(['src/main.jsx']);
        assert.file(['src/react-shim.js']);
        assert.file(['src/styles.css']);
        assert.file(['static/manifest.json']);
        assert.file(['static/images/icon@0.5x.png']);
        assert.file(['static/images/icon@1x.png']);
        assert.file(['static/images/icon@2x.png']);
        assert.file(['static/images/icon@3x.png']);
        assert.file(['static/images/icon@4x.png']);
      });
  });

  it('generating template of plugin with dialog of plain js', () => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({ name: answers.projectDisplayName })
      .withPrompts({ scriptType: answers.framework.plain.dialog })
      .then(() => {
        assert.file(['.editorconfig']);
        assert.file(['.eslintignore']);
        assert.file(['.eslintrc']);
        assert.file(['.gitignore']);
        assert.file(['README.md']);
        assert.file(['package.json']);
        assert.file(['webpack.config.js']);
        assert.file(['src/main.js']);
        assert.file(['static/manifest.json']);
        assert.file(['static/images/icon@0.5x.png']);
        assert.file(['static/images/icon@1x.png']);
        assert.file(['static/images/icon@2x.png']);
        assert.file(['static/images/icon@3x.png']);
        assert.file(['static/images/icon@4x.png']);
      });
  });

  it('generating template of plugin with panel ui with plain js', () => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({ name: answers.projectDisplayName })
      .withPrompts({ scriptType: answers.framework.panelplain.dialog })
      .then(() => {
        assert.file(['.editorconfig']);
        assert.file(['.eslintignore']);
        assert.file(['.eslintrc']);
        assert.file(['.gitignore']);
        assert.file(['README.md']);
        assert.file(['package.json']);
        assert.file(['webpack.config.js']);
        assert.file(['src/main.js']);
        assert.file(['static/manifest.json']);
        assert.file(['static/images/icon@0.5x.png']);
        assert.file(['static/images/icon@1x.png']);
        assert.file(['static/images/icon@2x.png']);
        assert.file(['static/images/icon@3x.png']);
        assert.file(['static/images/icon@4x.png']);
      });
  });
});
