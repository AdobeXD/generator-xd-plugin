/*
 * Sample plugin scaffolding for Adobe XD.
 *
 * Visit http://adobexdplatform.com/ for API docs and more sample code.
 */

const { Color, Text } = require('scenegraph');

let dialogInstance;

function drawMessageOnScenegraph(selection, messageText) {
  const textNode = new Text();

  textNode.text = messageText;
  const textColor = new Color({
    r: 255,
    g: 0,
    b: 0,
    a: 255,
  });

  textNode.styleRanges = [
    {
      length: textNode.text.length,
      fill: textColor,
      fontSize: 72,
      fontFamily: 'Helvetica Neue',
      underline: false,
      fontStyle: 'Bold',
    },
  ];

  selection.insertionParent.addChild(textNode);

  // Place this node's top-left corner at the origin of its parent
  const nodeBounds = textNode.localBounds; // node's bounds in its own local coordinates
  const nodeTopLeft = { x: nodeBounds.x, y: nodeBounds.y };
  textNode.placeInParentCoordinates(nodeTopLeft, { x: 0, y: 0 });
}

function createForm(dialog, selection) {
  //  create the form element
  //  the form element has default styling and spacing
  const form = document.createElement('form');

  //  don't forget to set your desired width
  form.style.width = 200;

  //  add your content
  const hello = document.createElement('h1');
  hello.textContent = 'Type your message';
  form.appendChild(hello);

  const textInput = document.createElement('input');
  textInput.type = 'text';
  // Set ID for querySelector
  textInput.id = 'messageInput';
  form.appendChild(textInput);

  //  create a footer to hold your form submit and cancel buttons
  const footer = document.createElement('footer');
  form.appendChild(footer);

  //  include at least one way to close the dialog
  const submitButton = document.createElement('button');
  submitButton.uxpVariant = 'cta';
  submitButton.type = 'submit';
  submitButton.textContent = 'Submit';

  submitButton.onclick = async e => {
    // TODO
    // Call e.preventDefault()
    // otherwise, dialog.close() is called with nothing; will fix docs
    e.preventDefault();
    const message = dialog.querySelector('#messageInput').value;
    drawMessageOnScenegraph(selection, message);
    dialog.close('submit');
  };

  const cancelButton = document.createElement('button');
  cancelButton.uxpVariant = 'primary';
  cancelButton.textContent = 'Cancel';

  cancelButton.onclick = e => {
    // TODO
    // Call e.preventDefault()
    // otherwise, dialog.close() is called with nothing; will fix docs
    e.preventDefault();

    dialog.close('cancelButton');
  };

  // handle dialog by ENTER key
  // Will work soon.
  form.onsubmit = e => {
    // TODO
    // otherwise, dialog.close() is called with nothing; will fix docs
    e.preventDefault();
    console.log('ENTER pressed');
    dialog.close('submit');
  };

  footer.appendChild(cancelButton);
  footer.appendChild(submitButton);

  return form;
}

function initializeDialog(selection) {
  //  create the dialog
  const dialog = document.createElement('dialog');
  dialog.appendChild(createForm(dialog, selection));
  return dialog;
}

async function getDialog(selection) {
  if (dialogInstance == null) {
    dialogInstance = initializeDialog(selection);
  }

  try {
    document.body.appendChild(dialogInstance);
    // use async await until submit/close the dialog
    return await dialogInstance.showModal();
  } catch (e) {
    return e;
  } finally {
    dialogInstance.remove();
  }
}

async function main(selection, documentRoot) {
  const response = await getDialog(selection);
  // check how use submit/close the dialog
  if (response === 'reasonCanceled') {
    console.log('Dialog dismissal by pressing ESC Key');
  } else if (response === 'submit') {
    console.log('Dialog closed by pressing submit button');
  }
}

module.exports = {
  commands: {
    menuCommand: main,
  },
};
