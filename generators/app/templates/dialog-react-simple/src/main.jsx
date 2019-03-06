/**
 * Sample plugin scaffolding for Adobe XD.
 *
 * Visit http://adobexdplatform.com/ for API docs and more sample code.
 */

/**
 * temporary stubs required for React.
 * These will not be required as soon as the XD environment provides setTimeout/clearTimeout
 * DO THIS SHIM STUB before you call const React = require("react");
 */

const reactShim = require('./react-shim');
const React = require('react');
const ReactDOM = require('react-dom');
const PropTypes = require('prop-types');
const { selection, Color, Text } = require('scenegraph');
const style = require('./styles.css');

let dialogInstance;

function drawMessageOnScenegraph(messageText) {
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

class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: '' };

    this.onInputChange = this.onInputChange.bind(this);
    this.onCancelButtonClick = this.onCancelButtonClick.bind(this);
    this.onSubmitButtonClick = this.onSubmitButtonClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onInputChange(e) {
    this.setState({ message: e.target.value });
  }

  onCancelButtonClick(e) {
    // TODO
    // Call e.preventDefault()
    // otherwise, dialog.close() is called with nothing; will fix docs
    e.preventDefault();

    const { dialog } = this.props;
    dialog.close('cancelButton');
  }

  async onSubmitButtonClick(e) {
    // TODO
    // Call e.preventDefault()
    // otherwise, dialog.close() is called with nothing; will fix docs
    e.preventDefault();
    console.log('submitButton');
    const { dialog } = this.props;
    const { message } = this.state;
    drawMessageOnScenegraph(message);
    dialog.close('submit');
  }

  onSubmit(e) {
    // TODO
    // Call e.preventDefault()
    // otherwise, dialog.close() is called with nothing; will fix docs
    // NOT working yet.
    e.preventDefault();
    // console.log('submitEvent');
    const { dialog } = this.props;
    const { message } = this.state;
    drawMessageOnScenegraph(message);
    dialog.close('submit');
  }

  render() {
    const { message } = this.state;
    return (
      <form style={{ width: 200 }} onSubmit={this.onSubmit}>
        <h1>Type your message</h1>
        <label htmlFor="messageText">
          <span>What is your name?</span>
          <input type="text" onChange={this.onInputChange} id="messageText" />
        </label>
        <p>{`Message ${message}`}</p>
        <footer>
          <button
            type="button"
            uxp-variant="primary"
            onClick={this.onCancelButtonClick}
          >
            Cancel
          </button>
          <button
            type="submit"
            uxp-variant="cta"
            onClick={this.onSubmitButtonClick}
          >
            Submit
          </button>
        </footer>
      </form>
    );
  }
}

function initializeDialog() {
  //  create the dialog
  const dialogNode = document.createElement('dialog');
  ReactDOM.render(
    <MessageForm dialog={dialogNode} selection={selection} />,
    dialogNode
  );
  return dialogNode;
}

async function getDialog() {
  if (dialogInstance == null) {
    dialogInstance = initializeDialog();
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

async function main() {
  const response = await getDialog();
  // check how was the dialog submitted/closed
  if (response === 'reasonCanceled') {
    console.log('Dialog dismissal by pressing ESC Key');
  } else if (response === 'submit') {
    console.log('Dialog closed by pressing Submit button');
  }
}

module.exports = {
  commands: {
    menuCommand: main,
  },
};

// Specifies the default values for props:
MessageForm.defaultProps = {
  dialog: document.createElement('dialog'),
};

MessageForm.propTypes = {
  dialog: PropTypes.object,
};
