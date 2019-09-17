/*
 * Sample plugin scaffolding for Adobe XD.
 *
 * Visit http://adobexdplatform.com/ for API docs and more sample code.
 */

const { selection, Rectangle } = require('scenegraph');
const { editDocument } = require('application');

let panel;

function create() {
  console.log('Create');
  const HTML = `<style>
          .break {
              flex-wrap: wrap;
          }
          label.row > span {
              color: #8E8E8E;
              width: 20px;
              text-align: right;
              font-size: 9px;
          }
          label.row input {
              flex: 1 1 auto;
          }
          .show {
              display: block;
          }
          .hide {
              display: none;
          }
      </style>
      <form method="dialog" id="main">
          <div class="row break">
              <label class="row">
                  <span>↕︎</span>
                  <input type="number" uxp-quiet="true" id="txtV" value="10" placeholder="Height" />
              </label>
              <label class="row">
                  <span>↔︎</span>
                  <input type="number" uxp-quiet="true" id="txtH" value="10" placeholder="Width" />
              </label>
          </div>
          <footer><button id="ok" type="submit" uxp-variant="cta">Apply</button></footer>
      </form>
      <p id="warning">This plugin requires you to select a rectangle in the document. Please select a rectangle.</p>
      `;
  function increaseRectangleSize() {

    const h = Number(document.querySelector('#txtV').value);
    const w = Number(document.querySelector('#txtH').value);

    editDocument({ editLabel: 'Increase rectangle size' }, s => {
      const selectedRectangle = s.items[0];
      selectedRectangle.width += w;
      selectedRectangle.height += h;
    });
  }

  panel = document.createElement('div');
  panel.innerHTML = HTML;
  panel.querySelector('form').addEventListener('submit', increaseRectangleSize);

  return panel;
}

function show(event) {
  console.log('SHOW');
  if (!panel) event.node.appendChild(create());
}

function hide(event) {
  console.log('Hide');
  // This function triggers when the panel is hidden by user
}

function update() {
  console.log('Rectagnle update');
  const form = document.querySelector('form');
  const warning = document.querySelector('#warning');
  if (!selection || !(selection.items[0] instanceof Rectangle)) {
    form.className = 'hide';
    warning.className = 'show';
  } else {
    form.className = 'show';
    warning.className = 'hide';
  }
}

module.exports = {
  panels: {
    enlargeRectangle: {
      show,
      hide,
      update,
    },
  },
};
