import EventEmitter from "event-emitter";

export var events = EventEmitter();
export var scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x000, 50, 80);
const TIME_OUT = 15000;
export var camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

var ambientLight = new THREE.AmbientLight(0x000000);
scene.add(ambientLight);

var lights = [];
lights[0] = new THREE.PointLight(0xffffff, 1, 0);
lights[1] = new THREE.PointLight(0xffffff, 1, 0);
lights[2] = new THREE.PointLight(0xffffff, 1, 0);

lights[0].position.set(-190, 290, 0);
lights[1].position.set(190, 290, 190);
lights[2].position.set(-190, -290, -190);
scene.add(lights[0]);
scene.add(lights[1]);
scene.add(lights[2]);

export var mouse = {
  x: 0,
  y: 0,
  vec: new THREE.Vector3(),
  up: false,
  raycaster: new THREE.Raycaster()
};

export function render() {
  mouse.up = false;
}

global.mouse = mouse;
document.addEventListener("mouseup", e => {
  mouse.up = true;
});
document.addEventListener("mousemove", e => {
  mouse.x = e.x;
  mouse.y = e.y;

  mouse.vec = new THREE.Vector3(
    e.clientX / window.innerWidth * 2 - 1,
    -(e.clientY / window.innerHeight) * 2 + 1,
    0.5
  );

  mouse.vec.unproject(camera);

  mouse.raycaster = new THREE.Raycaster(
    camera.position,
    mouse.vec.sub(camera.position).normalize()
  );

  var float = document.getElementById("floater");
  float.style.transform = `translate(${mouse.x + 2}px, ${mouse.y + 2}px)`;
});

//UI Stuff & Bindings
import "./ui.less";
import $ from "jQuery";
import * as shared from "./shared.js";

export var data = {
  tab: 0,
  runtime: {
    state: 0
  },
  visual: {},
  protobuf: {},
  purposedWord: "",
  loading: false,
  statusMessage: "已加载",
  toolTip: ""
};

var app = new Vue({
  el: "#vue-main",
  data: data,
  methods: {
    setTab: t => {
      data.tab = t;
    },
    ll: t=>{
      logout();
    },
    trySearch: e => {
      if (e.code == "Enter" && !data.loading) {
        //
        data.protobuf = {
          todo: [],
          word: data.purposedWord,
          stage: 0,
          stages: ["trend", "demand", "sentiment", "crowd"],
          stage_req: [
            ["Search/getAllIndex/", "Newwordgraph/getNewsByDateList/"],
            ["Newwordgraph/"],
            [
              "search/getNews/",
              "Zhidao/getZhidao/",
              "News/getNews/",
              "News/getNews/"
            ],
            ["Region/getRegion/", "Social/getSocial/"]
          ],
          list: []
        };
        data.statusMessage = "数据加载中...";
        data.loading = true;
        setWatch();
        req();
      }
    }
  }
});

var watch;
function setWatch() {
  cancelWatch();
  watch = setTimeout(function() {
    data.statusMessage = "网络故障 超时";
    data.loading = false;
  }, TIME_OUT);
}

function cancelWatch() {
  clearTimeout(watch);
}

function parseDate(str) {
  var y = str.substr(0, 4),
    m = str.substr(4, 2),
    d = str.substr(6, 2);
  return new Date(y, m - 1, d);
}

function periodParser(p) {
  return [parseDate(p.split("|")[0]), parseDate(p.split("|")[1])];
}

global.periodParser = periodParser;

function parseData() {
  var lst = data.protobuf.list;
  var d = {};
  for (var i = 0; i < lst.length; i++) {
    if (d[lst[i].path] && lst[i].path == "News/getNews/") {
      var n = periodParser(lst[i].data.data[0].period)[0];
      var p = periodParser(d[lst[i].path].period)[0];
      if (n > p) {
        d[lst[i].path + "history"] = d[lst[i].path];
        d[lst[i].path] = Array.isArray(lst[i].data.data)
          ? lst[i].data.data[0]
          : lst[i].data.data;
      } else {
        d[lst[i].path + "history"] = Array.isArray(lst[i].data.data)
          ? lst[i].data.data[0]
          : lst[i].data.data;
      }
    } else {
      d[lst[i].path] = Array.isArray(lst[i].data.data)
        ? lst[i].data.data[0]
        : lst[i].data.data;
    }
  }
  data.visual = d;
  events.emit("data", data.visual);
}

function req() {
  data.statusMessage = "请求 " + data.protobuf.stages[data.protobuf.stage];
  gotoTab(data.protobuf.stages[data.protobuf.stage], data.purposedWord);
}
function march(path, d, c) {
  if (data.protobuf.stage > 3 || !data.loading) return; //malfunction
  var cur = data.protobuf.stage_req[data.protobuf.stage];
  var i = cur.indexOf(path);
  if (i < 0) {
    return; //throw!
  }
  cur.splice(i, 1);
  data.protobuf.list.push({
    path: c.name,
    data: d
  });
  data.statusMessage = ".. " + path;
  if (cur.length == 0) {
    //advance
    if (data.protobuf.stage >= 3) {
      data.loading = false;
      data.statusMessage = "已加载";
      cancelWatch();
      parseData();
    } else {
      data.protobuf.stage++;
      return req();
    }
  } else {
    //wait
  }
}

webview.addEventListener("ipc-message", function(e) {
  switch (e.channel) {
    case "data":
      var c = e.args[0].c;
      var d = e.args[0].d;
      if (d.data.code) {
      } else {
        console.log(c.name);
        march(c.name, d, c);
        // console.log(d);
      }
      break;
    case "state":
      // console.log("state updated");
      // console.log(e.args[0]);
      var s = e.args[0];
      if (s.state == 1) {
        document.querySelector("webview").classList.remove("render");
        document.querySelector("webview").style.visibility = "collapse";
        //good..
      } else if (s.state == -2) {
        data.loading = false;
        data.statusMessage = "* 关键词暂未收录 *";
        document.querySelector("webview").classList.remove("render");
        document.querySelector("webview").style.visibility = "collapse";
      } else if (s.state == -1) {
        data.loading = false;
        data.statusMessage = "* 需重新登陆 *";
        // window.location.href = "./#login";
        // document.querySelector("webview").classList.add("render");
        // remote.getCurrentWindow().loadUrl("./#login")
        if (window.location.search.indexOf("reload") < 0) {
          alert("请重新登陆");
          electron.ipcRenderer.send("reload", "reload");
        }
      } else if (s.state == 0) {
        data.loading = false;
        data.statusMessage = "无数据";
        document.querySelector("webview").classList.remove("render");
        document.querySelector("webview").style.visibility = "collapse";
      }
      data.runtime.state = s.state;
      // _state = e.args[0];
      break;
    // case "loaded":
    //   console.log("inner page loaded");
    //   break;
  }
});

window.addEventListener("load", function() {
  if (window.location.search.indexOf("reload") < 0) {
    //alright ok
    document.querySelector("webview").style.visibility = "collapse";
  } else {
    document.querySelector("webview").classList.add("render");
  }
});
