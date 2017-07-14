var electron = require('electron');

var urlencode = require("urlencode");

var webview = document.getElementById("view");

function gotoTab(tab, keyword) {
  var word = urlencode(keyword, "gbk");
  var build = "?tpl=" + tab + "&word=" + word;
  webview.loadURL("http://index.baidu.com/" + build);
}

global.gotoTab = gotoTab;

webview.addEventListener("dom-ready", () => {
  console.log("Resource Loaded..");
  // webview.openDevTools();
});

// webview.addEventListener("ipc-message", e => {
//   switch (e.channel) {
//     case "data":
//       var c = e.args[0].c;
//       var data = e.args[0].d;
//       if (data.data.code) {
//       } else {
//         console.log(c);
//         console.log(data);
//       }
//       break;
//     case "state":
//       console.log("state updated");
//       console.log(e.args[0]);
//       _state = e.args[0];
//       break;
//     case "loaded":
//       console.log("inner page loaded");
//       break;
//   }
// });
