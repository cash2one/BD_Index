export var scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x000, 50, 80);

export var camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

var light = new THREE.AmbientLight(0xffffff); // soft white light
scene.add(light);

export var mouse = {
  x: 0,
  y: 0,
  vec: new THREE.Vector3(),
  raycaster: new THREE.Raycaster()
};

global.mouse = mouse;

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
});


//UI Stuff & Bindings
import "./ui.less";
import $ from "jQuery";
import * as shared from "./shared.js";

export var data = {
  tab: 0,
  runtime: {}
};
var app = new Vue({
  el: "#vue-main",
  data: data,
  methods: {
    setTab: t => {
      data.tab = t;
      console.log(t);
    }
  }
});
