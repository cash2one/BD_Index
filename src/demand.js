import * as shared from "./shared.js";
import { TweenLite, Bounce, Cubic, Quad, Expo } from "gsap";
import { assets } from "./assets.js";

var mapHeight = new THREE.TextureLoader().load("./assets/noiseBumpMap.jpg");

var state = {
  visibility: 0,
  visibilityX: 2,
  bad: true
};
//warp text machine
// ctx.font = 20 + "px Arial";

function wrap(ctx, str, width) {
  var words = str.split(" ");
  var lines = [];
  var line = "";
  var lineTest = "",
    currentY = 0;
  var fontSize = "20px";
  for (var i = 0, len = words.length; i < len; i++) {
    lineTest = line + words[i] + " ";
    if (ctx.measureText(lineTest).width > width) {
      currentY = lines.length * fontSize + fontSize;
      lines.push({ text: line, height: currentY });
      line = words[i] + " ";
    } else {
      line = lineTest;
    }
  }

  if (line.length > 0) {
    currentY = lines.length * fontSize + fontSize;
    lines.push({ text: line.trim(), height: currentY });
  }
  return lines;
}

// // Visually output text
// ctx.clearRect(0, 0, 500, 500);
// for (var i = 0, len = lines.length; i < len; i++) {
//   ctx.fillText(lines[i].text, 0, lines[i].height);
// }

var blobs = [];

class blob {
  constructor(PLANE) {
    this.a = Math.random();
    this.av = Math.random() / 1000;
    this.GROUP = new THREE.Group();
    this.canvas = document.createElement("canvas");
    this.canvas.height = 128; //2 lane
    this.canvas.width = 256;
    this.ctx = this.canvas.getContext("2d");
    this.visible = 0;
    this.LABELTEXTURE = new THREE.CanvasTexture(this.canvas);
    this.LABELMAT = new THREE.SpriteMaterial({
      //   depthTest: false,
      color: 0xffffff,
      transparent: true,
      map: this.LABELTEXTURE
    });
    this.r = (Math.random() + 1) * 10;

    this.LABEL = new THREE.Sprite(this.LABELMAT);
    this.LABEL.position.y = -2.5;
    this.LABEL.scale.set(256 / 30, 128 / 30, 1);
    this.GROUP.add(this.LABEL);

    this.SPHEREGEO = new THREE.SphereGeometry(1, 33, 33, 33);
    this.SPHEREMAT = new THREE.MeshPhongMaterial({
      color: 0x1199ee,
      // specular: 0x11ee99,
      shininess: 0,
      bumpMap: mapHeight,
      bumpScale: 0.03,
      map: mapHeight,
      //   shading: THREE.FlatShading,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending
    });
    this.SPHERE = new THREE.Mesh(this.SPHEREGEO, this.SPHEREMAT);
    this.GROUP.add(this.SPHERE);

    var CIRCLEGEO = new THREE.Geometry();
    var CIRCLEMAT = new THREE.LineBasicMaterial({
      color: 0xffffff,
      opacity: 0.1,
      blending: THREE.AdditiveBlending,
      transparent: true
    });
    var resolution = 100;
    var amplitude = 1;
    var size = 360 / resolution;
    for (var i = 0; i <= resolution; i++) {
      var segment = i * size * Math.PI / 180;
      CIRCLEGEO.vertices.push(
        new THREE.Vector3(
          Math.cos(segment) * amplitude,
          0,
          Math.sin(segment) * amplitude
        )
      );
    }

    var CIRCLE = new THREE.Line(CIRCLEGEO, CIRCLEMAT);
    this.CIRCLE = CIRCLE;
    PLANE.add(CIRCLE);
    this.GROUP.add(this.SPHERE);
    PLANE.add(this.GROUP);
    blobs.push(this);
  }

  bindData(d, r) {
    this.shiftY = (Math.random() - 0.5) * 10;
    this.r = r || Math.random() * 10 + 10;
    if (!d) {
      this.visible = 0;
      this.LABEL.visible = 0;
      this.CIRCLE.visible = 0;
      this.GROUP.visible = 0;
      return;
    }
    this.LABEL.visible = 1;
    this.CIRCLE.visible = 1;
    this.GROUP.visible = 1;
    this.visible = 1;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.width);
    this.ctx.save();
    // this.ctx.fillStyle = "#f00";
    // this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "#fff";
    this.ctx.font = "20px Nexa Bold, PingFang SC";
    var lines = wrap(this.ctx, d, this.canvas.width - 20);
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle;";
    this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
    for (var i = 0, len = lines.length; i < len; i++) {
      this.ctx.fillText(lines[i].text, 0, 0);
      this.ctx.translate(0, 21);
    }
    this.ctx.restore();
    this.LABELTEXTURE.needsUpdate = true;
  }

  render() {
    if (!this.visible) {
      return;
    }
    //do stuff, like rotate
    var ang = this.a * Math.PI * 2;
    this.GROUP.position.x = Math.cos(ang) * this.r;
    this.GROUP.position.z = Math.sin(ang) * this.r;
    this.SPHERE.rotation.z = ang;
    this.SPHERE.rotation.x = ang;
    this.CIRCLE.scale.z = this.r;
    this.CIRCLE.scale.x = this.r;
    this.GROUP.position.y = this.shiftY;
    this.CIRCLE.position.y = this.GROUP.position.y;

    this.a += this.av;
    this.a = this.a % (Math.PI * 2);
  }
}
shared.events.on("data", d => {
  try {
    var t = d["Newwordgraph/"][Object.keys(d["Newwordgraph/"])[0]];
    var keys = {};
    for (var i = 0; i < t.length; i++) {
      keys[t[i].split("\t")[0]] = t[i].split("\t")[1];
    }

    var k = Object.keys(keys);
    k.length = Math.min(k.length, 20);
    for (var i = k.length; k < blobs.length; i++) {
      blobs[k].bindData("");
    }

    for (var i = 0; i < k.length; i++) {
      if (!blobs[i]) {
        blobs[i] = new blob(PLANES[Math.floor(Math.random() * PLANES.length)]);
      }
      blobs[i].bindData(k[i]);
    }
    state.bad = false;
  } catch (e) {
    for (var i = 0; i < blobs.length; i++) {
      blobs[i].bindData("");
    }
    state.bad = true;
  }
  //   var k = keys[t[i].split("\t")[0]];
});

var GROUP = new THREE.Group();
shared.scene.add(GROUP);

var PLANES = [];
for (var i = 0; i < 5; i++) {
  var PLANE = new THREE.Group();
  GROUP.add(PLANE);
  PLANE.rotation.y = Math.random() * 0.7 - 0.35;
  PLANE.rotation.x = Math.random() * 0.7 - 0.35;
  PLANE.rotation.z = Math.random() * 0.7 - 0.35;
  PLANES.push(PLANE);
}

export function render() {
  TweenLite.to(state, 0.5, { visibility: shared.data.tab == 1 ? 1 : 0 });
  TweenLite.to(state, 2, { visibilityX: shared.data.tab == 1 ? 1 : 0 });
  GROUP.visible = state.visibility < 0.1 ? 0 : 1;
  if (state.visibility < 0.2) return;
  shared.data.toolTip = state.bad ? "< 暂无数据 >" : "";
  for (var i = 0; i < blobs.length; i++) {
    blobs[i].render();
  }
  //   shared.camera.position.z = CAM_BASE + 30 - 15 * state.visibility; // + state.selection * STEP;
}
