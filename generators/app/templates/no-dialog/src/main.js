/*
 * Sample plugin scaffolding for Adobe XD.
 *
 * Visit http://adobexdplatform.com/ for API docs and more sample code.
 */

const { Rectangle, Color } = require('scenegraph');

function main(selection, documentRoot) {
  // Go to Plugins > Development > Developer Console to see this log output
  console.log('No dialog is running!');

  // Insert a red square at (0, 0) in the current artboard or group/container
  const shape = new Rectangle();
  shape.width = 100;
  shape.height = 100;
  shape.fill = new Color('#ff0000');
  selection.insertionParent.addChild(shape);
}

module.exports = {
  commands: {
    menuCommand: main,
  },
};
