var r = require("electron");
r.ipcRenderer.on("cmd", (event, args) => {
  try {
    r.ipcRenderer.sendToHost("resp", { result: eval(args) });
  } catch (e) {
    r.ipcRenderer.sendToHost("resp", { error: e });
  }
});

document.addEventListener("DOMContentLoaded", function(event) {
  console.log("Patch - jQuery for Baidu");
  window.$ = window.jQuery = require("./node_modules/jquery/dist/jquery.min.js");
  console.log("Read Current Href: ", window.location.href);
  console.log("Read Current Page State: ", checkStatus());
  console.log("PPval (Baidu)");
  console.log(PPval);
});


function checkStatus() {
  const STATE_NO_LOGIN = -1;
  const STATE_BAD_KW = -2;
  const STATE_NO_KW = 0;
  const STATE_OK = 1;
  var state = 0;
  if (!document.getElementById("ubarUname")) {
    state = STATE_NO_LOGIN;
  } else if (!PPval.ppt) {
    state = STATE_BAD_KW;
  } else if (window.location.href === "http://index.baidu.com/") {
    state = STATE_NO_KW;
  } else {
    state = STATE_OK;
  }
  return state
}
