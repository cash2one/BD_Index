var r = require("electron");
r.ipcRenderer.on("cmd", (event, args) => {
  try {
    r.ipcRenderer.sendToHost("resp", { result: eval(args) });
  } catch (e) {
    r.ipcRenderer.sendToHost("resp", { error: e });
  }
});
