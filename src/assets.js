//prerendered resources

export var assets = {};

function renderToTexture(w, h, text, fill, style) {
  var canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  var ctx = canvas.getContext("2d");
  ctx.save();
  ctx.translate(w / 2, h / 2);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = style || "30px 'PingFang SC'";
  ctx.fillStyle = fill || "rgba(255,255,255,1)";
  ctx.fillText(text, 0, 0);
  ctx.restore();
}


assets["整体趋势"] = renderToTexture(128, 128, "整体趋势");