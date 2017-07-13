//prerendered resources

export var assets = {};

function renderToTexture(w, h, text, fill, style) {
  var canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  var ctx = canvas.getContext("2d");
  ctx.translate(w / 2, h / 2);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = style || "lighter 36px 'PingFang SC'";
  ctx.fillStyle = fill || "white";
  ctx.fillText(text, 0, 0);
  document.body.appendChild(canvas);
  return canvas;
}

global.assets = assets;

assets["trend-pc"] = renderToTexture(256, 128, "PC端趋势", "#fff", "40px Nexa Bold, PingFang SC");
assets["trend-mob"] = renderToTexture(256, 128, "移动端趋势", "#fff", "40px Nexa Bold, PingFang SC");
assets["trend-all"] = renderToTexture(256, 128, "整体趋势", "#fff", "40px Nexa Bold, PingFang SC");