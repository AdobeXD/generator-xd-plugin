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

const {
    Color, Text, Rectangle, GraphicNode,
} = require('scenegraph');
const commands = require('commands');

const style = require('./styles.css');


let dialogInstance;

function drawMessageOnScenegraph(selection, messageText) {
    const textNode = new Text();

    textNode.text = messageText;
    const colorRed = Math.floor(Math.random() * 255);
    const colorGreen = Math.floor(Math.random() * 255);
    const colorBlue = Math.floor(Math.random() * 255);
    const colorAlpha = Math.floor(255 * 0.6);

    const textColor = new Color({
        r: colorRed,
        g: colorGreen,
        b: colorBlue,
        a: colorAlpha,
    });

    textNode.styleRanges = [{
        length: textNode.text.length,
        fill: textColor,
        fontSize: 72,
        fontFamily: 'Helvetica Neue',
        underline: false,
        fontStyle: 'Bold',
    }];

    const rectangleColor = new Color({
        r: 255 - colorRed,
        g: 255 - colorGreen,
        b: 255 - colorBlue,
        a: colorAlpha,
    });

    const boxPadding = 20;
    const strokeWidth = 10;

    const rectangleElement = new Rectangle();
    rectangleElement.width = textNode.localBounds.width + boxPadding * 2;
    rectangleElement.height = textNode.localBounds.height + boxPadding * 2;
    rectangleElement.fill = rectangleColor;
    rectangleElement.stroke = textColor;
    rectangleElement.strokeWidth = strokeWidth;
    rectangleElement.strokePosition = GraphicNode.OUTER_STROKE;
    rectangleElement.setAllCornerRadii(Math.floor(boxPadding / 2.0));

    selection.insertionParent.addChild(rectangleElement);
    selection.insertionParent.addChild(textNode);

    const insertionParentBounds = selection.insertionParent.localBounds;

    const basePoint = {
        x: Math.floor(Math.random() * (insertionParentBounds.width - strokeWidth * 2
                - rectangleElement.localBounds.width)),
        y: Math.floor(Math.random() * (insertionParentBounds.height - strokeWidth * 2
                - rectangleElement.localBounds.height)),
    };

    console.log(basePoint);

    // Move Left top of Corner to the basepoint
    const rectangleLeftTop = {
        x: rectangleElement.localBounds.x,
        y: rectangleElement.localBounds.y,
    };

    const textLeftTop = {
        x: textNode.localBounds.x,
        y: textNode.localBounds.y,
    };

    rectangleElement.placeInParentCoordinates(rectangleLeftTop, basePoint);
    textNode.placeInParentCoordinates(textLeftTop,
        { x: basePoint.x + boxPadding, y: basePoint.y + boxPadding });

    // group a text and a rectangle
    selection.items = [textNode, rectangleElement];
    commands.group();

    // rename the created group
    selection.items[0].name = `Message - ${messageText}`;
}


class MessageForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { message: '' };

        this.onInputChange = this.onInputChange.bind(this);
        this.onCancelButtonClick = this.onCancelButtonClick.bind(this);
        this.onSubmitButtonClick = this.onSubmitButtonClick.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.getMessage = this.getMessage.bind(this);
    }


    onInputChange(e) {
        this.setState({ message: e.target.value });
    }

    onCancelButtonClick(e) {
        // TODO
        // Call e.preventDefault()
        // otherwise, dialog.close() is called with nothing; will fix docs
        e.preventDefault();


        this.props.dialog.close('cancelButton');
    }

    /**
     * Trigger inserting an object into elementNode
     * @param e
     * @returns {Promise<void>}
     */
    async onSubmitButtonClick(e) {
        // TODO
        // Call e.preventDefault()
        // otherwise, dialog.close() is called with nothing; will fix docs
        e.preventDefault();
        console.log('submitButton');
        const { selection } = this.props;
        drawMessageOnScenegraph(selection, this.state.message);
        this.props.dialog.close('submit');
    }

    onSubmit(e) {
        // TODO
        // Call e.preventDefault()
        // otherwise, dialog.close() is called with nothing; will fix docs
        // NOT working yet.
        e.preventDefault();
        console.log('submitEvent');
        const { selection } = this.props;
        drawMessageOnScenegraph(selection, this.state.message);
        this.props.dialog.close('submit');
    }

    getMessage() {
        return this.state.message;
    }

    render() {
        return (
            <form style={{ width: 200 }} onSubmit={this.onSubmit}>
                <h1>Type your message</h1>
                <label htmlFor="messageText">
                    <span>What is your name?</span>
                    <input type="text" onChange={this.onInputChange} id="messageText" />
                </label>
                <p>{`Message ${this.state.message}`}</p>
                <footer>
                    <button type="button" uxp-variant="primary" onClick={this.onCancelButtonClick}>Cancel</button>
                    <button type="submit" uxp-variant="cta" onClick={this.onSubmitButtonClick}>Submit</button>
                </footer>
            </form>
        );
    }
}

function initializeDialog(selection) {
    //  create the dialog
    const dialogNode = document.createElement('dialog');
    ReactDOM.render(<MessageForm dialog={dialogNode} selection={selection} />, dialogNode);
    return dialogNode;
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
    // check how was the dialog submitted/closed
    if (response === '"reasonCanceled"') {
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
