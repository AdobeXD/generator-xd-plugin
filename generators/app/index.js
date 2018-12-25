/**
 * Copyright 2018 Adobe Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const _ = require('lodash');
const uuid = require('uuid/v4');
var path = require('path');

const noui = `Plugin without dialog`;
const plain = `Plugin with dialog by plain javascript`;
const react = `Plugin with dialog by React`;

module.exports = class extends Generator {
    _copyAllFiles(params, templateDir) {
        this.fs.copyTpl(
            this.templatePath(path.join(templateDir, './**')),
            this.destinationPath(this.destinationRoot()),
            params,
            undefined,
            { globOptions: { dot: true } }
        );
    }

    prompting() {
        // Have Yeoman greet the user.
        this.log(
            yosay(
                `Welcome to the ${chalk.rgb(235, 38, 190).bold('XD')} plugin generator!`
            )
        );

        const prompts = [
            {
                type: 'input',
                name: 'name',
                message: 'What is Your XD plugin name?',
                default: 'My Adobe XD Plug-in'
            },
            {
                type: 'list',
                name: 'scriptType',
                message: 'Choose type of the plugin:',
                choices: [react, plain, noui],
                default: react
            }
        ];

        return this.prompt(prompts).then(props => {
            // To access props later use this.props.someAnswer;
            this.props = props;
        });
    }

    writing() {
        let projectPath = this.props.name;
        this.destinationRoot(projectPath);

        const params = {
            name: this.props.name,
            id: uuid().substr(0, 8),
            packageName: _.snakeCase(this.props.name)
        };

        switch (this.props.scriptType) {
            case noui:
                this._copyAllFiles(params, 'no-dialog');
                break;
            case plain:
                this._copyAllFiles(params, 'dialog-plain-js');
                break;
            case react:
                this._copyAllFiles(params, 'dialog-react');
                break;
            default:
                break;
        }
    }

    install() {
        this.installDependencies({
            npm: true,
            bower: false,
            yarn: false
        });
    }

    end() {
        let name = this.props.name;
        this.log(
            `-∴-∵-∴-∵-∴-∵-∴-∵-∴-∵-∴-∵-∴-∵-∴-∵-∴-∵-∴-∵-∴-∵-∴-∵-∴-∵-∴-∵-∴-∵-∴-∵-∴-∵-∴-∵-∴-∵-∴-`
        );
        this.log(``);
        this.log(`    Congratulations! Your plugin has been created! and next steps are`);
        this.log(``);
        this.log(
            `    1. Visit ${chalk.underline(
                'https://console.adobe.io/plugins'
            )} and get a new plugin ID.`
        );
        this.log(`    2. Open static/manifest.json and paste your new plugin ID.`);
        this.log(
            `    3. Install your plugin to Adobe XD via ${chalk.inverse('npm start')}.`
        );
        this.log(
            `    4. Launch Adobe XD or press [cmd/ctrl+R] to reload your Plugin to Adobe XD.`
        );
        this.log(
            `    5. Run your plugin from menu item ${chalk.inverse(
                'Plugins'
            )} > ${chalk.inverse(name)}`
        );
        this.log(``);
        this.log(
            `    Please visit ${chalk
                .rgb(235, 38, 190)
                .underline('https://adobexdplatform.com/')} for more information.`
        );
        this.log(``);
        this.log(
            `-∴-∵-∴-∵-∴-∵-∴-∵-∴-∵-∴-∵-∴-∵-∴-∵-∴-∵-∴-∵-∴-∵-∴-∵-∴-∵-∴-∵-∴-∵-∴-∵-∴-∵-∴-∵-∴-∵-∴-`
        );
    }
};
