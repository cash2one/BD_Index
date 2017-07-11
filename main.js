const electron = require("electron");
const app = electron.app;
const session = electron.session;
const BrowserWindow = electron.BrowserWindow;
const express = require('express');
const serveStatic = require('serve-static');

const path = require("path");
const url = require("url");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: "Baidu Index - Injector"
  });

  const ses = session.fromPartition('persist:baidu')
  ses.setProxy({
    pacScript: url.format({
      pathname: path.join(__dirname, "proxy.pac"),
      protocol: "file:",
      slashes: true
    })
  }, () =>{
      console.log(';done;');
  })

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file:",
      slashes: true
    })
  );
  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  mainWindow.on("closed", function() {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", function() {
  app.quit();
});


var expapp = express();
// expapp.use(serveStatic(__dirname + "/proxy"));
expapp.get("/static/js/funs.js", (req, res) => {
    res.sendFile(__dirname + "/proxy/funs.js");
});
expapp.listen(8899);