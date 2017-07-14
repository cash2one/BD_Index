import * as shared from "./shared.js";
import { TweenLite, Bounce, Cubic, Quad, Expo } from "gsap";
import { assets } from "./assets.js";
import * as mapjson from "./map-lowres.json";

var GROUP = new THREE.Group();


var prov = {};
class province {

  constructor() {}

  pushPoint() {

  }
}

function buildMap() {
    for(var i = 0; i < mapjson.length; i++) {

    }
}

export function render() {}

shared.events.on("data", d => {
  console.log(JSON.stringify(d["Region/getRegion/"]));
});

shared.scene.add(GROUP);
