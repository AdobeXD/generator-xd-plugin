'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

const noui = `Plugin with No UI`;

describe('generator-xd-plugin:app', () => {
    beforeAll(() => {
        return helpers
            .run(path.join(__dirname, '../generators/app'))
            .withPrompts({ name: 'Hello' })
            .withPrompts({ scriptType: noui });
    });

    it('creates files', () => {
        assert.file(['src/main.js']);
        assert.file(['static/manifest.json']);
        assert.file(['static/images/icon.png']);
        assert.file(['package.json']);
        assert.file(['README.md']);
    });
});
