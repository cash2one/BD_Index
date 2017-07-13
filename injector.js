var r = require("electron");

window.sendToHost = (a, b) => {
  console.log("Reporting Data (ipc) evt:", a)
  r.ipcRenderer.sendToHost(a, b); //jail break
};

var ipcRenderer = r.ipcRenderer;

document.addEventListener("DOMContentLoaded", function(event) {
  console.log("Patch - jQuery for Baidu");
  window.$ = window.jQuery = require("./node_modules/jquery/dist/jquery.min.js");
  console.log("Read Current Href: ", window.location.href);
  console.log("Read Current Page State: ", checkStatus());
  console.log("PPval (Baidu)");
  console.log(PPval);
  sendToHost('state', checkStatus());
});

document.addEventListener("load", function(event) {
  sendToHost('loaded');
});

var urlencode = require("urlencode");

function checkStatus() {
  const STATE_NO_LOGIN = -1;
  const STATE_BAD_KW = -2;
  const STATE_NO_KW = 0;
  const STATE_OK = 1;

  var state = {
    state: STATE_NO_LOGIN,
    tab: null,
    word: null
  };

  var qs =
    window.location.search.length > 0
      ? urlencode.parse(window.location.search.substring(1), { charset: "gbk" })
      : {};
  var tab = qs ? qs["tpl"] : null;
  var word = qs ? qs["word"] : null;
  if (!document.getElementById("ubarUname")) {
    state.state = STATE_NO_LOGIN;
  } else if (!PPval.ppt) {
    state.state = STATE_BAD_KW;
  } else if (
    !qs.word ||
    !qs.tpl ||
    window.location.href === "http://index.baidu.com/"
  ) {
    state.state = STATE_NO_KW;
  } else {
    state.state = STATE_OK;
  }
  state.word = word;
  state.tab = tab;
  return state;
}



window.requestAnimationFrame = null;