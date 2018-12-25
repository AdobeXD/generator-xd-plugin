# generator-xd-plugin

[Yeoman](http://yeoman.io) generator for creating [Adobe XD Plugin](https://adobexdplatform.com/) projects.

> XD plugins extend the capabilities of Adobe XD by adding new features to the app, automating workflows, connecting the app to external services, and more.

This generator simply creates the scaffolding of files for XD Plugin using [webpack](https://webpack.github.io/) and [xdpm (Adobe XD Plugin Manager Command Line Tool)](https://github.com/AdobeXD/xdpm).

Also, this project  provides live-reloading of plugins. So that developers do not have to copy their plugin project files into develop folder. Developers may start coding almost as same style as webpack-dev-server.

## About Adobe XD

[Adobe XD](https://www.adobe.com/products/xd.html) is made for designers, by designers. It’s the fastest way to design, prototype, and share any user experience, from websites and mobile apps to voice interactions, and more.

## Installation

First, install [Yeoman](http://yeoman.io) and generator-xd using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-xd-plugin
```

## Usage

### Create an XD plugin project

```bash
yo xd-plugin
```

### Developing plugins

Move to the project folder created by `yo xd-plugin`, and run following commands.

#### Install generated plugin

```bash
npm start
```

You have to reload the plugin for Adobe XD by `Ctrl/Cmd+Shift+R`

#### Package into an xdx file

```bash
npm run package
```

#### Validate manifest.json

```bash
npm run validate
```

manifest.json is in `static` folder.


## Contributing

If you are interested in contributing, please start by reading the [Contributing Guidelines](.github/CONTRIBUTING.md).

### Development

Build your own generator and link updates.

```bash
git clone git@github.com:adobexd/generator-xd-plugin
cd generator-xd-plugin
npm link
cd ..
yo xd-plugin
```

## License

Apache-2.0 © [Adobe](https://www.adobe.com/)

## DISCLAIMER

You use this utility at your own risk. Under no circumstances shall Adobe be held liable for the use, misuse, or abuse of this utility.

Use of this utility means that you agree to Adobe's [Terms of Use](https://www.adobe.com/legal/terms.html) and the [Adobe Developer Additional Terms](https://wwwimages2.adobe.com/content/dam/acom/en/legal/servicetou/Adobe-Developer-Additional-Terms_en_US_20180605_2200.pdf).
