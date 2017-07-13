import * as three from "three";
import * as shared from "./shared.js";

var GROUP = new THREE.Group();
const MINLEN = 5;
var LST = [];

var DUST = [];
class dustParticle {
  constructor() {
    this.ellipseMat = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: .2,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending
    });
    DUST.push(this);
    this.ellipseGeom = new THREE.CubeGeometry(1, 1, 1)
    this.ellipse = new THREE.Mesh(this.ellipseGeom, this.ellipseMat);
    this.v = 0;
    this.w = 0;
    this.life = 0;
    this.vlife = 0;
    this.ellipse.rotation.y = Math.random();
    this.ellipse.rotation.x = Math.random();
    this.ellipse.rotation.z = Math.random();
    GROUP.add(this.ellipse);
    this.setup();
  }

  setup() {
    this.ellipse.position.z = Math.random() * 70 - 100;
    this.ellipse.position.x = (Math.random() - 0.5) * 40;
    this.ellipse.position.y = (Math.random() - 0.5) * 30;
    this.ellipse.scale.x = this.ellipse.scale.y = this.ellipse.scale.z = Math.random() * 0.3 + 0.1;
    this.life = 1;
    this.vlife = Math.random() * 0.9 + 0.1;
    this.vlife *= 0.001;
    this.w = (Math.random() - 0.5) * 0.01;
    this.v = Math.random() * 0.1;
  }

  update() {
    this.life -= this.vlife;
    if (this.life < 0) {
      this.setup();
    }
    this.ellipseMat.opacity = 0.5 * (1 - Math.abs(this.life * 2 - 1));
    this.ellipse.position.z += this.v;
    this.ellipse.rotation.y += this.w;
    this.ellipse.rotation.y = this.ellipse.rotation.y % (Math.PI * 2);
  }
}

class crawler {
  constructor() {
    LST.push(this);
    this.max = 0;
    this.v = 0;
    this.a = 0;
    this.b = 0;
    this.geom = new THREE.Geometry();
    this.mat = new THREE.LineBasicMaterial({
      // color: 0xff0000,
      vertexColors: THREE.VertexColors,
      blending: THREE.AdditiveBlending
    });
    this.geom.vertices.push(new THREE.Vector3(0, 0, 0));
    this.geom.vertices.push(new THREE.Vector3(0, 0, 0));
    this.geom.colors.push(new THREE.Color(1, 0, 0));
    this.geom.colors.push(new THREE.Color(1, 0, 0));
    this.line = new THREE.Line(this.geom, this.mat);

    GROUP.add(this.line);
    this.setup();
  }
  setup() {
    this.geom.colors[0].setHSL(
      0.4 + Math.random() * 0.2,
      1,
      Math.random() * 0.5 + 0.5
    );
    this.geom.colors[1].setHSL(0.4 + Math.random() * 0.2, 1, 0);
    this.max = Math.random() * 60 + 10;
    this.v = (Math.random() + 0.1) * 0.5;
    this.a = 0;
    this.b = 0;
    this.line.position.z = Math.random() * 70 - 100;
    this.line.position.x = (Math.random() - 0.5) * 40;
    this.line.position.y = (Math.random() - 0.5) * 30;
  }
  update() {
    if (this.b >= this.a && this.a == this.max) {
      //dead
      this.setup();
    } else {
      this.a += this.v;
      this.b += this.v;
      this.a = Math.min(this.max, this.a);
      if (this.a < this.max) {
        this.b = Math.max(Math.min(this.a - MINLEN), 0);
      } else {
        this.b = Math.min(this.max, this.b);
      }
      this.geom.vertices[0].z = this.a;
      this.geom.vertices[1].z = this.b;
      this.geom.verticesNeedUpdate = true;
    }
  }
}

export function update() {
  for (var i = 0; i < LST.length; i++) {
    LST[i].update();
  }
  for (var i = 0; i < DUST.length; i++) {
    DUST[i].update();
  }
}

for (var i = 0; i < 50; i++) {
  new crawler();
}

for (var i = 0; i < 50; i++) {
  new dustParticle();
}

shared.scene.add(GROUP);
