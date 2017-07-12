var canvas = document.createElement("canvas");
document.querySelector("body").appendChild(canvas);
canvas.height = window.innerHeight * window.devicePixelRatio;
canvas.width = window.innerWidth * window.devicePixelRatio;
canvas.style.pointerEvents = "none";
var ctx = canvas.getContext("2d");

window.addEventListener(
  "resize",
  function() {
    canvas.height = window.innerHeight * window.devicePixelRatio;
    canvas.width = window.innerWidth * window.devicePixelRatio;
  },
  false
);

var pt = [];
for (var i = 0.05; i < 0.95; i += 0.05) {
  pt.push({ x: i, y: (Math.random() - 0.5) * 0.3 + 0.4 });
}
pt = JSON.stringify(pt);

export function render() {
  ctx.save();
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  var points = JSON.parse(pt);

  for (var p = 0; p < points.length; p++) {
    points[p].x *= window.innerWidth;
    points[p].y *= window.innerHeight;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
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
  ctx.filter = "blur(" + (Math.abs(Math.sin(t)) * 10 + 20) + "px)";

  var gradient = ctx.createLinearGradient(0, 0, window.innerWidth, 0);
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
}
