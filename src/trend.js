import * as shared from "./shared.js";
import { TweenLite, Bounce, Cubic, Quad, Expo } from "gsap";
import { assets } from "./assets.js";
var state = {
  visibility: 0,
  selection: 0
};

var selectState = x => {
  TweenLite.to(state, 0.8, {
    selection: x,
    ease: Expo.easeOut
  });
};
// window.addEventListener(
//   "resize",
//   function() {
//     canvas.height = window.innerHeight * window.devicePixelRatio;
//     canvas.width = window.innerWidth * window.devicePixelRatio;
//   },
//   false
// );

class trendy {
  bindData(arr) {
    this.points = JSON.parse(JSON.stringify(arr));
    for (var p = 0; p < this.points.length; p++) {
      this.points[p].x *= 0.9;
      this.points[p].x += 0.05;
      this.points[p].x *= 1024 / this.SCALER;
      this.points[p].y = 1024 - 256 - this.points[p].y * (512 / this.SCALER);
      this.points[p].sel = 0;
    }
  }

  generateDummyData() {
    var pt = [];
    for (var i = 0.05; i < 0.95; i += 0.05) {
      pt.push({
        x: i,
        y: (Math.random() - 0.5) * 0.3 + 0.5,
        q: "30%",
        d: "2017-7-12"
      });
    }
    return pt;
  }

  constructor(id, TEXT) {
    this.canvas = document.createElement("canvas");
    this.SCALER = 1;
    this.id = id;
    this.visibility = 0;
    this.bindData(this.generateDummyData());

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
    this.geometry = new THREE.PlaneGeometry(40, 40);
    this.textureMesh = new THREE.Mesh(this.geometry, this.material);
    this.QUAD = new THREE.Group();
    this.QUAD.add(this.textureMesh);

    this.managedLines = [];
    for (var x = -20 + 5; x < 20; x += 5) {
      var geometry = new THREE.Geometry();
      geometry.vertices.push(new THREE.Vector3(0, -15, 0));
      geometry.vertices.push(new THREE.Vector3(0, 15, 0));
      geometry.colors.push(new THREE.Color().setHSL(0.2, 1, 0.8));
      geometry.colors.push(new THREE.Color().setHSL(0, 0, 0));
      var mat = new THREE.LineBasicMaterial({
        transparent: true,
        color: 0xffffff,
        blending: THREE.AdditiveBlending,
        vertexColors: THREE.VertexColors
      });
      var line = new THREE.Line(geometry, mat);
      line.position.x = x;
      this.QUAD.add(line);
      this.managedLines.push(line);
    }

    var geometry = new THREE.PlaneGeometry(40, 0.3);
    var mat = new THREE.MeshBasicMaterial({
      transparent: true,
      color: 0xefef11,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending
    });
    var bar = new THREE.Mesh(geometry, mat);
    bar.position.y = -14.99;
    bar.rotation.x = -Math.PI / 2;
    this.bar = bar;
    this.QUAD.add(bar);

    var btn = new THREE.Group();

    var geometry = new THREE.PlaneGeometry(6, 3);
    var mat = new THREE.MeshBasicMaterial({
      transparent: true,
      //   vertexColors: THREE.VertexColors,
      blending: THREE.AdditiveBlending,
      map: new THREE.CanvasTexture(assets[TEXT])
    });

    var text = new THREE.Mesh(geometry, mat);
    btn.add(text);

    var mat = new THREE.MeshBasicMaterial({
      transparent: true,
      vertexColors: THREE.VertexColors,
      blending: THREE.AdditiveBlending,
      opacity: 0.5
      //   map: new THREE.CanvasTexture(assets["trend-all"])
    });

    geometry.faces[0].vertexColors[0] = new THREE.Color(0x0050a4);
    geometry.faces[0].vertexColors[1] = new THREE.Color(0x0050a4);
    geometry.faces[0].vertexColors[2] = new THREE.Color(0x4fa8b6);
    geometry.faces[1].vertexColors[0] = new THREE.Color(0x0050a4);
    geometry.faces[1].vertexColors[1] = new THREE.Color(0x0050a4);
    geometry.faces[1].vertexColors[2] = new THREE.Color(0x4fa8b6);

    for (var i = 0; i < 1; i += 0.3) {
      var mat = new THREE.MeshBasicMaterial({
        transparent: true,
        vertexColors: THREE.VertexColors,
        blending: THREE.AdditiveBlending,
        opacity: 0.3
        //   map: new THREE.CanvasTexture(assets["trend-all"])
      });
      var bg = new THREE.Mesh(geometry, mat);
      bg.position.z = -0.5 + i * 3;
      btn.add(bg);
    }

    btn.position.z = -9;
    btn.position.x = 13;
    btn.position.y = -10;
    this.tag = btn;
    this.QUAD.add(btn);
  }

  render() {
    this.visibility =
      state.visibility * (1 - Math.min(1, Math.abs(this.id - state.selection)));

    var intersection = null;
    if (this.visibility && this.id == state.selection) {
      var intersects = shared.mouse.raycaster.intersectObject(
        this.QUAD.children[0],
        true
      );
      if (intersects.length > 0) {
        intersects[0].point.y *= -1;
        intersects[0].point.add(new THREE.Vector3(20, -20, 0));
        intersects[0].point.multiplyScalar(1 / 40 * 1024);
        intersects[0].point.y += 1024;
        intersection = intersects[0].point;
      }
    }
    var intersects = shared.mouse.raycaster.intersectObjects(
      this.tag.children,
      true
    );
    var viz = this.visibility;
    if (intersects.length > 0) {
      viz += 0.3;
      if (shared.mouse.up) {
        selectState(this.id);
      }
    }
    // this.tag.children[1].position.x = 5 - this.visibility * 5;
    // this.tag.children[1].material.opacity = this.visibility * 0.5 + 0.5;
    // this.tag.children[0].position.x = 5 - this.visibility * 5;
    // this.tag.children[0].position.z = -(1-this.visibility) * 1.5;
    this.tag.children[0].material.opacity = viz * 0.8 + 0.2;
    for (var i = 1; i < this.tag.children.length; i++) {
      this.tag.children[i].position.z = (-2.5 + i) * (viz + 0.5);
      this.tag.children[i].material.opacity = viz * 0.3 + 0.2;
    }

    this.canvas.height = 1024 * this.SCALER;
    this.canvas.width = 1024 * this.SCALER;
    let ctx = this.ctx;
    let texture = this.texture;
    let canvas = this.canvas;
    ctx.globalAlpha = this.visibility * 0.9 + 0.1;
    ctx.save();
    ctx.scale(this.SCALER, this.SCALER);
    var points = this.points;

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
    var offset = t / 3 % (1 + 0.2) - 0.1;
    var dim = "black";
    var lig = "#efef00";
    gradient.addColorStop(Math.max(0, offset - 0.1), dim);
    gradient.addColorStop(Math.min(Math.max(offset, 0), 1), lig);
    gradient.addColorStop(Math.min(1, offset + 0.1), dim);

    for (var i = 0; i < this.managedLines.length; i++) {
      var d =
        1 -
        Math.abs(
          Math.max(
            -0.2,
            Math.min(0.2, (this.managedLines[i].position.x + 20) / 40 - offset)
          )
        ) *
          5;
      this.managedLines[i].material.opacity = d * 0.5 + 0.5;
    }

    this.bar.material.opacity = this.visibility * 0.3 + 0.2;

    var col = new THREE.Color()
      .setHSL(0.56, 1, this.visibility * 0.28 + 0.2)
      .getStyle();

    // var lig = new THREE.Color().setHSL(0.56, 0.8, 0.8 - this.visibility * 0.48).getStyle();

    // gradient.addColorStop(Math.max(0, offset - 0.1), dim);
    // gradient.addColorStop(offset, lig);
    // gradient.addColorStop(Math.min(1, offset + 0.1), dim);

    ctx.strokeStyle = gradient;
    ctx.lineWidth = 6;
    ctx.lineCap = "round";
    if (this.visibility > 0.5) {
      ctx.stroke();
    }
    ctx.filter = "none";
    ctx.stroke();
    ctx.strokeStyle = col;
    ctx.lineWidth = this.visibility * 3 + 3;
    ctx.stroke();

    ctx.globalCompositeOperation = "normal";
    ctx.closePath();

    for (var i = 0; i < points.length; i++) {
      var selected =
        intersection &&
        (points[i].x - intersection.x) * (points[i].x - intersection.x) +
          (points[i].y - intersection.y) * (points[i].y - intersection.y) <
          200;
      var j = points[i];
      TweenLite.to(j, 0.5, {
        sel: selected ? 1 : 0
      });
    }

    ctx.globalCompositeOperation = "lighter";
    //max
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
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
      color.setHSL(0.55, sc, sc + points[i].sel);
      ctx.strokeStyle = color.getStyle();
      ctx.lineWidth = sc * 3;
      ctx.stroke();
      ctx.closePath();

      if (this.visibility > 0.7) {
        ctx.font = "15px Nexa Bold";
        ctx.translate(0, -30 - points[i].sel * 20);
        ctx.scale(points[i].sel + 1, points[i].sel + 1);
        ctx.fillStyle = color.getStyle();
        ctx.fillText(points[i].q, 0, 0);
        if (points[i].sel > 0.3) {
          ctx.font = "7px Nexa Light";
          ctx.fillText(points[i].d, 0, -15);
        }
      }
      ctx.restore();
    }

    for (var i = 0; i < points.length; i++) {
      ctx.save();
      ctx.translate(points[i].x, points[i].y);
      ctx.scale(points[i].sel * 3 + 1, points[i].sel * 3 + 1);
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

    ctx.restore();
    texture.needsUpdate = true;
  }
}

var GROUP = new THREE.Group();

var trendAll = new trendy(0, "trend-all");
var trendPC = new trendy(1, "trend-pc");
var trendMobile = new trendy(2, "trend-mob");

shared.scene.add(GROUP);
GROUP.add(trendAll.QUAD);
GROUP.add(trendPC.QUAD);
GROUP.add(trendMobile.QUAD);

var STEP = -15;
trendPC.QUAD.position.z = STEP;
trendMobile.QUAD.position.z = STEP * 2;

export function render() {
  TweenLite.to(state, 0.5, { visibility: shared.data.tab == 0 ? 1 : 0 });
  GROUP.visible = state.visibility < 0.1 ? 0 : 1;
  GROUP.position.z = -50 + state.visibility * 50;
  if (state.visibility < 0.2) return;
  trendAll.render();
  trendPC.render();
  trendMobile.render();
  shared.camera.position.z =
    CAM_BASE + 5 - 5 * state.visibility + state.selection * STEP;
}

shared.events.on("data", d => {
  var toInt = (v, i, a) => {
    v = v == "" ? 0 : v;
    var i = parseInt(v);
    if (!Number.isFinite(i)) {
      return 0;
    }
    return i;
  };
  var proc = (v, i, a) => {
    v = toInt(v, i, a);
    var x = i / a.length;
    var y = parseInt(v) / 100;
    var actualD = new Date(
      new Date().getTime() - (a.length - 1 - i) * 100 * 24 * 60 * 60 * 1000
    );
    return {
      x: x,
      y: y,
      q: parseInt(v) + "%",
      d: actualD.getFullYear() + "-" + (actualD.getMonth() + 1)
    };
  };
  var all = d["Search/getAllIndex/"].all[0].userIndexes_100
    .split(",")
    .map(proc);
  var pc = d["Search/getAllIndex/"].pc[0].userIndexes_100.split(",").map(proc);
  var mob = d["Search/getAllIndex/"].wise[0].userIndexes_100
    .split(",")
    .map(proc);
  trendAll.bindData(all);
  trendPC.bindData(pc);
  trendMobile.bindData(mob);
});
