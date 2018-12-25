const {
    Color, Text, Rectangle, GraphicNode,
} = require('scenegraph');
const commands = require('commands');

/*
 * Sample plugin scaffolding for Adobe XD.
 *
 * Visit http://adobexdplatform.com/ for API docs and more sample code.
 */

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

    submitButton.onclick = async (e) => {
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

    cancelButton.onclick = (e) => {
        // TODO
        // Call e.preventDefault()
        // otherwise, dialog.close() is called with nothing; will fix docs
        e.preventDefault();

        dialog.close('cancelButton');
    };

    // handle dialog by ENTER key
    // Will work soon.
    form.onsubmit = (e) => {
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
