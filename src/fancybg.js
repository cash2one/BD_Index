import * as three from "three";
import * as shared from "./shared.js";
import { MeshLine, MeshLineMaterial } from "three.meshline";
import * as fieldfx from "./fieldfx.js";

global.CAM_BASE = 30;
// init renderer
var renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true
});
renderer.setClearColor(new THREE.Color(0x0f0f0f), 1);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
// renderer.shadowMapType = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);
// init scene and camera
var scene = shared.scene;
var camera = shared.camera;
// camera.position.set(50, 10, 0);
camera.position.z = CAM_BASE;

var resolution = new THREE.Vector2(window.innerWidth, window.innerHeight);
var controls = new THREE.OrbitControls(camera, renderer.domElement);
//////////////////////////////////////////////////////////////////////////////////
//		add an object in the scene
//////////////////////////////////////////////////////////////////////////////////
// add a torus

// var geometry = new THREE.TorusKnotGeometry(0.5 - 0.12, 0.12, 210, 201);
// var material = new THREE.MeshNormalMaterial();
// var mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

var managedPanels = [];

function shieldSpace(scx, scy, sz) {
  var group = new THREE.Group();
  var sz = sz || 40;
  var geom = new THREE.Geometry();
  var mat = new THREE.LineBasicMaterial({
    blending: THREE.AdditiveBlending,
    opacity: 0.3,
    transparent: true,
    color: new THREE.Color(0xffffff)
  });
  var step = 1;
  for (var g = -sz; g <= sz; g += step) {
    var geometry = new THREE.PlaneGeometry(2 * scx * sz, 0.4);
    var material = new THREE.MeshBasicMaterial({
      transparent: true,
      blending: THREE.AdditiveBlending,
      opacity: g % 2 == 0 ? 1 : 0.2,
      color: 0x111111,
      side: THREE.DoubleSide
    });
    var plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = Math.PI / 2;
    plane.position.z = g * scy;
    group.add(plane);
    managedPanels.push(plane);
    // geom.vertices.push(new THREE.Vector3(-scx * sz, 0, g * scy));
    // geom.vertices.push(new THREE.Vector3(scx * sz, 0, g * scy));
    if (g % 2 == 0) {
      geom.vertices.push(new THREE.Vector3(g * scx, 0, -scy * sz));
      geom.vertices.push(new THREE.Vector3(g * scx, 0, scy * sz));
    }
  }
  var mesh = new THREE.LineSegments(geom, mat);
  group.add(mesh);
  scene.add(group);
  return group;
}

var top = shieldSpace(0.5, 1);
var bottom = shieldSpace(0.5, 1);
var left = shieldSpace(0.375, 1);
var right = shieldSpace(0.375, 1);

top.position.y = -15;
bottom.position.y = 15;
left.rotation.z = -Math.PI / 2;
left.position.x = -20;
right.rotation.z = Math.PI / 2;
right.position.x = 20;

top.position.z = -20;
left.position.z = -20;
right.position.z = -20;
bottom.position.z = -20;

// function buildGrid(size, scale) {
//   scale = scale || 2;
//   var geometry = new THREE.Geometry();
//   geometry.vertices.push(new THREE.Vector3(0, -size * scale, 0));
//   geometry.vertices.push(new THREE.Vector3(0, size * scale, 0));
//   var grid = new THREE.Group();
//   for (var c = -size; c <= size; c += 4) {
//     var line = new THREE.Line(geometry, material);
//     line.position.x = c * 1;
//     grid.add(line);
//   }
//   var geometry = new THREE.Geometry();
//   geometry.vertices.push(new THREE.Vector3(-size, 0, 0));
//   geometry.vertices.push(new THREE.Vector3(size, 0, 0));
//   for (var c = -size; c <= size; c += 4) {
//     var line = new THREE.Line(geometry, material);
//     line.position.y = c * scale;
//     grid.add(line);
//   }
//   scene.add(grid);
//   return grid;
// }

// var s0 = 50;

// var l = buildGrid(s0);
// l.rotation.y = -Math.PI / 2;
// l.rotation.x = -Math.PI / 2;
// l.position.x = -s0;

// var r = buildGrid(s0);
// r.rotation.y = +Math.PI / 2;
// r.rotation.x = -Math.PI / 2;
// r.position.x = +s0;

// var u = buildGrid(s0);
// u.rotation.x = +Math.PI / 2;
// u.position.y = +s0;

// var d = buildGrid(s0);
// d.rotation.x = -Math.PI / 2;
// d.position.y = -s0;

// var c = buildGrid(s0, 1);
// // l.rotation.y = -Math.PI / 2;
// c.position.z = -s0 * 2;

//////////////////////////////////////////////////////////////////////////////////
//		render the whole thing on the page
//////////////////////////////////////////////////////////////////////////////////
// handle window resize
window.addEventListener(
  "resize",
  function() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  },
  false
);

export function render() {
  for (var i = 0; i < managedPanels.length; i++) {
    var cur = managedPanels[i];
    var blend = Math.pow(Math.abs(Math.sin(cur.position.z / 100 + t / 3)), 15);
    cur.material.color.setHSL(0.56, 0.9, blend * blend * 0.9 + 0.1);
    cur.material.needsUpdate = true;
    cur.scale.y = blend * 0.1 + 0.3;
    cur.needsUpdate = true;
  }
  fieldfx.update();
  renderer.render(scene, camera);
}
