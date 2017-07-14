import * as shared from "./shared.js";
import { TweenLite, Bounce, Cubic, Quad, Expo } from "gsap";
import { assets } from "./assets.js";

var state = {
  visibility: 0,
  visibilityX: 2
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
    this.canvas = document.createElement("canvas");
    this.canvas.height = 128; //2 lane
    this.canvas.width = 256;
    this.ctx = this.canvas.getContext("2d");
    this.visible = 0;
    this.LABELGEO = new THREE.PlaneGeometry(8, 8 / 2);
    this.LABELTEXTURE = new THREE.CanvasTexture(this.canvas);
    this.LABELMAT = new THREE.MeshBasicMaterial({
      depthTest: false,
      color: 0xffffff,
      transparent: true,
      map: this.LABELTEXTURE
    });
    this.LABEL = new THREE.Mesh(this.LABELGEO, this.LABELMAT);
    PLANE.add(this.LABEL);
  }

  bindData(d) {
    if (!d) {
      this.visible = 0;
      this.LABEL.visible = 0;
      return;
    }
    this.LABEL.visible = 1;
    this.visible = 1;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.width);
    this.ctx.save();
    this.ctx.fillStyle = "#f00";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
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
    //do stuff, like rotate
  }
}
shared.events.on("data", d => {
  var t = d["Newwordgraph/"][Object.keys(d["Newwordgraph/"])[0]];
  var keys = {};
  for (var i = 0; i < t.length; i++) {
    keys[t[i].split("\t")[0]] = t[i].split("\t")[1];
  }
  var k = keys[t[i].split("\t")[0]];
});

var GROUP = new THREE.Group();
shared.scene.add(GROUP);

var PLANE = new THREE.Group();
GROUP.add(PLANE);

var b = new blob(PLANE);
b.bindData(`绝地求生test server`);

export function render() {
  TweenLite.to(state, 0.5, { visibility: shared.data.tab == 1 ? 1 : 0 });
  TweenLite.to(state, 2, { visibilityX: shared.data.tab == 1 ? 1 : 0 });

  GROUP.visible = state.visibility < 0.1 ? 0 : 1;
  if (state.visibility < 0.2) return;
  for (var i = 0; i < blobs.length; i++) {
    blobs[i].render();
  }
  shared.camera.position.z = CAM_BASE + 15 - 15 * state.visibility; // + state.selection * STEP;
}
