import * as shared from "./shared.js";
import { TweenLite, Bounce, Cubic, Quad, Expo } from "gsap";

global.state = {
  visibility: 1,
  selection: 0
};

global.selectState = (x)=>{
    TweenLite.to(state, 0.8, {
        selection : x,
        ease: Expo.easeOut
    });
}
// window.addEventListener(
//   "resize",
//   function() {
//     canvas.height = window.innerHeight * window.devicePixelRatio;
//     canvas.width = window.innerWidth * window.devicePixelRatio;
//   },
//   false
// );

class trendy {
  constructor(id) {
    this.pt = [];
    this.canvas = document.createElement("canvas");
    this.SCALER = 1;
    this.id = id;
    this.visibility = 0;
    for (var i = 0.05; i < 0.95; i += 0.05) {
      this.pt.push({ x: i, y: (Math.random() - 0.5) * 0.3 + 0.5 });
    }
    this.pt = JSON.stringify(this.pt);
    // document.querySelector("body").appendChild(canvas);
    this.canvas.style.pointerEvents = "none";
    this.ctx = this.canvas.getContext("2d");
    this.texture = new THREE.Texture(this.canvas);
    this.material = new THREE.MeshBasicMaterial({
      map: this.texture,
      transparent: true,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      shading: THREE.FlatShading,
      depthTest: false
    });
    this.geometry = new THREE.PlaneGeometry(30, 30);
    this.QUAD = new THREE.Mesh(this.geometry, this.material);
  }

  render() {
    this.visibility = state.visibility * (1 - Math.min(1, Math.abs(this.id - state.selection)));
    this.canvas.height = 1024 * this.SCALER;
    this.canvas.width = 1024 * this.SCALER;
    let ctx = this.ctx;
    let pt = this.pt;
    let texture = this.texture;
    let canvas = this.canvas;
    ctx.globalAlpha = this.visibility * 0.8 + 0.2;
    ctx.save();
    ctx.scale(this.SCALER, this.SCALER);
    var points = JSON.parse(pt);

    for (var p = 0; p < points.length; p++) {
      points[p].x *= canvas.width / this.SCALER;
      points[p].y *= canvas.height / this.SCALER;
    }

    ctx.clearRect(
      0,
      0,
      canvas.width / this.SCALER,
      canvas.height / this.SCALER
    );
    ctx.beginPath();

    ctx.moveTo(points[0].x, points[0].y);
    for (i = 1; i < points.length - 2; i++) {
      var xc = (points[i].x * 1 + points[i + 1].x * 1) / 2;
      var yc = (points[i].y * 1 + points[i + 1].y * 1) / 2;
      ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
    }
    // curve through the last two points
    ctx.quadraticCurveTo(
      points[i].x,
      points[i].y,
      points[i + 1].x,
      points[i + 1].y
    );
    ctx.globalCompositeOperation = "lighter";
    ctx.filter = "blur(" + (Math.abs(Math.sin(t)) * 10 + 10) + "px)";

    var gradient = ctx.createLinearGradient(
      0,
      0,
      canvas.width / this.SCALER,
      0
    );
    var offset = Math.abs(Math.sin(t / 3) * 0.5) + 0.25;
    gradient.addColorStop(Math.max(0, offset - 0.1), "#009af5");
    gradient.addColorStop(offset, "#7ccbf2");
    gradient.addColorStop(Math.min(1, offset + 0.1), "#009af5");

    ctx.strokeStyle = gradient;
    ctx.lineWidth = 6;
    ctx.lineCap = "round";
    ctx.stroke();
    ctx.filter = "none";
    ctx.stroke();
    ctx.strokeStyle = "rgba(255,255,255,0.2)";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.globalCompositeOperation = "normal";
    ctx.closePath();

    for (var i = 0; i < points.length; i++) {
      ctx.save();
      ctx.translate(points[i].x, points[i].y);
      ctx.scale(1, 1);
      ctx.beginPath();
      ctx.arc(0, 0, 5, 0, Math.PI * 2);
      ctx.fillStyle = "#fff";
      ctx.fill();
      ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.closePath();
      ctx.restore();
    }

    //max
    ctx.globalCompositeOperation = "lighter";

    for (var i = 0; i < points.length; i++) {
      ctx.save();
      ctx.translate(points[i].x, points[i].y);
      var sc = Math.sin(-t * 2 + points[i].x / 100) * 0.5 + 0.5;
      // ctx.scale(sc, sc);
      ctx.beginPath();
      ctx.arc(0, 0, 12, 0, Math.PI * 2);
      // ctx.fillStyle = "#fff";
      // ctx.fill();
      var color = new THREE.Color();
      color.setHSL(0.55, sc, sc);
      ctx.strokeStyle = color.getStyle();
      ctx.lineWidth = sc * 3;
      ctx.stroke();
      ctx.closePath();
      ctx.restore();
    }
    ctx.restore();
    texture.needsUpdate = true;
  }
}

var GROUP = new THREE.Group();

var trendAll = new trendy(0);
var trendPC = new trendy(1);
var trendMobile = new trendy(2);

shared.scene.add(GROUP);
GROUP.add(trendAll.QUAD);
GROUP.add(trendPC.QUAD);
GROUP.add(trendMobile.QUAD);

var STEP = -15;
trendPC.QUAD.position.z = STEP;
trendMobile.QUAD.position.z = STEP * 2;

export function render() {
  trendAll.render();
  trendPC.render();
  trendMobile.render();
  shared.camera.position.z = CAM_BASE + state.selection * STEP;
}
