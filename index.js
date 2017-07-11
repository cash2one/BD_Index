var r = require("electron");

var webview = document.getElementById("view");
webview.addEventListener("load-commit", () => {
  console.log("loaded");
  let session = webview.getWebContents().session;
  session.cookies.get({ url: "http://www.baidu.com" }, function(
    error,
    cookies
  ) {
    console.log(cookies);
    let cookieStr = "";
    for (var i = 0; i < cookies.length; i++) {
      let info = cookies[i];
      cookieStr += `${info.name}=${info.value};`;
      console.log(info.value, info.name);
    }
    console.log(cookieStr);
  });
});


function command(code) {
    webview.send('cmd', code);
}

webview.addEventListener("ipc-message", (e) => {
    console.log(e.args[0].result);
});