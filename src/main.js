import "./electron-pipe.js";
import "./common.less";

import * as d3 from "../node_modules/d3/index.js";

import * as bg from "./fancybg.js";
import * as trend from "./trend.js";

function animate() {
  var t = Date.now() / 1000;
  global.t = t;
  trend.render();
  bg.render();
  return requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
// animate();

// var svg = d3.select("body").append("svg");
// var points = [
// 	[0, 80],
// 	[100, 100],
// 	[200, 30],
// 	[300, 50],
// 	[400, 40],
// 	[500, 80]
// ];

// var line = d3.line()
// 	.curve(d3.curveCardinal);

// var intelo = d3.interpolateBasis(points.map(val => val[0]));

// svg.append('path')
// 	.attr('d', line(points));
