if (window.setTimeout == null) {
  window.setTimeout = function setTimeout(fn) {
    fn();
  };
}

if (window.clearTimeout == null) {
  window.clearTimeout = function clearTimeout() {
  };
}

//  this is a temporary shim for the latest versions of react.
if (window.cancelAnimationFrame == null) {
  window.cancelAnimationFrame = function cancelAnimationFrame() {
  };
}
if (window.requestAnimationFrame == null) {
  window.requestAnimationFrame = function requestAnimationFrame() {
    console.log('requestAnimationFrame is not supported yet');
  };
}
if (window.HTMLIFrameElement == null) {
  window.HTMLIFrameElement = class HTMLIFrameElement {
  };
}
