import * as shared from "./shared.js";
import { TweenLite, Bounce, Cubic, Quad, Expo } from "gsap";
import { assets } from "./assets.js";
import * as mapjson from "./map-lowres.json";
var state = {
  visibility: 0,
  visibilityX: 0,
  selection: 0
};
var cities = [
  "911,北京,514,北京",
  "910,上海,57,上海",
  "913,广东,95,广州,94,深圳,196,佛山,199,惠州,212,汕头,133,东莞,203,茂名,198,江门,200,珠海,197,湛江,209,肇庆,205,揭阳,207,中山,201,韶关,202,阳江,195,云浮,211,梅州,208,清远,204,潮州,213,汕尾,210,河源",
  "923,天津,164,天津",
  "927,河南,168,郑州,378,洛阳,262,南阳,263,新乡,373,信阳,370,安阳,266,平顶山,371,驻马店,265,焦作,381,三门峡,375,周口,268,许昌,264,开封,376,商丘,380,濮阳,379,漯河,374,鹤壁",
  "914,四川,97,成都,98,绵阳,107,乐山,106,德阳,103,泸州,113,达州,291,眉山,111,自贡,104,南充,102,内江,96,宜宾,108,广安,114,雅安,109,资阳,99,广元,100,遂宁,112,攀枝花,101,巴中,417,甘孜,479,凉山,457,阿坝",
  "904,重庆,11,重庆",
  "916,江苏,126,苏州,125,南京,127,无锡,161,徐州,169,镇江,160,盐城,163,南通,162,常州,158,扬州,159,泰州,156,连云港,172,宿迁,157,淮安",
  "906,湖北,28,武汉,35,宜昌,31,荆州,32,襄樊,36,十堰,34,荆门,33,黄冈,41,孝感,30,黄石,40,咸宁,38,恩施,37,随州,39,鄂州,42,仙桃,74,潜江,73,天门",
  "917,浙江,138,杭州,149,温州,289,宁波,135,金华,287,台州,304,嘉兴,303,绍兴,305,湖州,134,丽水,288,衢州,306,舟山",
  "909,福建,50,福州,55,泉州,54,厦门,56,漳州,87,宁德,52,三明,51,莆田,253,南平,53,龙岩",
  "921,黑龙江,152,哈尔滨,153,大庆,324,绥化,319,齐齐哈尔,320,佳木斯,322,牡丹江,300,黑河,323,鸡西,295,伊春,301,鹤岗,359,双鸭山,302,七台河,297,大兴安岭",
  "901,山东,1,济南,77,青岛,80,潍坊,78,烟台,79,临沂,81,淄博,353,泰安,352,济宁,83,聊城,82,东营,88,威海,86,德州,76,滨州,356,莱芜,85,枣庄,84,菏泽,366,日照",
  "924,陕西,165,西安,275,渭南,277,咸阳,273,宝鸡,276,汉中,278,榆林,272,安康,401,延安,274,商洛,271,铜川",
  "920,河北,141,石家庄,261,唐山,259,保定,148,沧州,292,邯郸,143,衡水,146,秦皇岛,147,廊坊,293,邢台,145,承德,144,张家口",
  "907,辽宁,150,沈阳,29,大连,217,锦州,215,鞍山,224,辽阳,219,丹东,221,营口,220,本溪,218,铁岭,222,抚顺,216,朝阳,223,阜新,225,葫芦岛,151,盘锦",
  "922,吉林,154,长春,270,吉林,525,延边,155,四平,410,白城,407,通化,194,松原,408,白山,191,辽源",
  "915,云南,117,昆明,337,红河,123,玉溪,339,曲靖,334,大理,437,文山,438,保山,342,丽江,335,昭通,662,思茅,350,临沧,124,楚雄",
  "926,新疆,467,乌鲁木齐,280,石河子,563,塔城,317,克拉玛依,315,阿克苏,312,哈密,499,巴音郭楞,383,阿勒泰,311,昌吉,660,伊犁哈萨克,310,吐鲁番,384,喀什,318,博尔塔拉,653,克孜勒苏柯尔克孜,386,和田,661,五家渠",
  "912,广西,90,南宁,89,柳州,91,桂林,131,百色,119,河池,132,梧州,93,贵港,118,玉林,128,北海,129,钦州,506,来宾,92,贺州,130,防城港",
  "929,山西,231,太原,233,运城,237,吕梁,230,晋中,232,临汾,227,大同,234,晋城,228,长治,229,忻州,236,阳泉,235,朔州",
  "908,湖南,43,长沙,46,株洲,45,衡阳,49,郴州,68,常德,44,岳阳,269,永州,405,邵阳,67,怀化,48,益阳,47,湘潭,66,娄底,226,张家界,65,湘西",
  "903,江西,5,南昌,10,赣州,6,九江,9,上饶,137,景德镇,115,吉安,7,鹰潭,256,宜春,8,抚州,136,萍乡,246,新余",
  "928,安徽,189,合肥,182,滁州,179,宿州,186,安庆,181,六安,187,蚌埠,391,亳州,184,阜阳,188,芜湖,176,宣城,177,巢湖,173,铜陵,178,淮南,185,马鞍山,183,淮北,174,黄山,175,池州",
  "905,内蒙古,20,呼和浩特,25,呼伦贝尔,21,赤峰,13,包头,15,巴彦淖尔,22,通辽,14,鄂尔多斯,16,乌海,331,乌兰察布,333,兴安盟,19,锡林郭勒盟,17,阿拉善盟",
  "925,甘肃,166,兰州,283,武威,285,张掖,286,嘉峪关,308,天水,307,平凉,344,陇南,281,庆阳,282,定西,284,酒泉,309,白银,343,金昌,346,临夏",
  "930,海南,239,海口,243,三亚,244,儋州,241,万宁,582,五指山,242,琼海,456,东方",
  "902,贵州,2,贵阳,59,遵义,4,六盘水,3,黔南,426,毕节,424,安顺,422,铜仁,61,黔东南,588,黔西南",
  "919,宁夏,140,银川,395,吴忠,472,石嘴山,396,固原,480,中卫",
  "918,青海,139,西宁,608,海西,659,玉树,652,海东",
  "931,台湾",
  "932,西藏,466,拉萨,655,那曲,656,林芝,516,日喀则",
  "933,香港,663,香港",
  "934,澳门,664,澳门"
];

var provMap = {};
var revMap = {};
var geojson = mapjson.geojson;
for (var i in geojson.features) {
  var cur = (provMap[geojson.features[i].properties.id] = {
    name: geojson.features[i].properties.name,
    id: -1,
    pid: i
  });
  for (var i = 0; i < cities.length; i++) {
    var q = cities[i].split(",");
    var pv = q[0];
    var pvn = q[1];
    if (cur.name.indexOf(pvn) >= 0) {
      cur.id = pv;
      break;
    }
  }
  revMap[cur.id] = cur;
}

var map = mapjson.map;
var GROUP = new THREE.Group();
var prov = {};
class province {
  constructor(name) {
    this.canvas = document.createElement("canvas");
    // document.body.appendChild(this.canvas);
    this.canvas.width = 512;
    this.canvas.height = 128;
    this.ctx = this.canvas.getContext("2d");
    this.ctx.font = "40px Nexa Bold, PingFang SC";
    this.ctx.textBaseline = "middle";
    this.ctx.textAlign = "center";
    this.name = name;
    this.PROV = new THREE.Group();
    this.points = [];
    this.PSYS = new THREE.Geometry();
    this.PSYS_Shadow = new THREE.Geometry();
    this.PMAT = new THREE.PointsMaterial({
      sizeAttenuation: true,
      size: 0.2,
      color: new THREE.Color().setHSL(
        0.55,
        Math.random() * 0.3 + 0.5,
        Math.random() * 0.3 + 0.2
      ),
      transparent: true,
      blending: THREE.AdditiveBlending,
      opacity: 0.7
    });
    this.PMAT_Shadow = new THREE.PointsMaterial({
      sizeAttenuation: true,
      size: 0.1,
      blending: THREE.AdditiveBlending,
      vertexColors: THREE.VertexColors,
      transparent: true,
      opacity: 1
    });
    this.z = Math.random();

    GROUP.add(this.PROV);
  }

  render() {
    var z = this.z * state.visibilityX;
    this.PS.position.z = -1;
    this.TUBE.scale.z = this.TUBESHINE.scale.z = z * 14;
    this.TUBE.position.z = this.TUBESHINE.position.z = z * 14 / 2;
    this.TUBEMAT.opacity = 1;
    this.TUBEMAT.color.setHSL(0.56, 0.8, z);
    this.TUBE.visible = z > 0.1;
    this.TUBESHINE.visible = z > 0.1;
    this.TUBEMATSHINE.opacity = 0.1;
    this.LABEL.position.z = z * 15;

    //check collision
    var intersects = shared.mouse.raycaster.intersectObject(
      this.TUBESHINE,
      true
    );
    if (intersects.length > 0) {
      shared.data.toolTip = this.name + "<br>" + Math.round(this.z * 1000);
      this.TUBEMATSHINE.opacity = 1;
    }
    for (var i = 0; i < this.PSYS_Shadow.vertices.length; i++) {
      var v = this.PSYS_Shadow.vertices[i];
      var x = v.x;
      var y = v.y;
      var sc = Math.round(noise.perlin3(x / 5, y / 5, t / 3) * 5) / 5;
      v.z = sc * 0.5 + 1;
      this.PSYS_Shadow.colors[i].setHSL(0.56, sc + 0.3, sc + 0.5);
    }
    this.PS.geometry.colorsNeedUpdate = true;
    this.PS.geometry.verticesNeedUpdate = true;
  }

  pushPoint(pt) {
    // var mat = new THREE.MeshBasicMaterial({
    //   color: 0xf0f0f0,
    //   shading: THREE.FlatShading
    // });
    // var geo = new THREE.TetrahedronGeometry(0.01, 1);
    // var mesh = new THREE.Mesh(geo, mat);
    // mesh.position.x = (pt.x / 1080 - 0.5) * 30;
    // mesh.position.y = (0.5 - pt.y / 1080) * 30;
    // this.PROV.add(mesh);

    this.PSYS.vertices.push(
      new THREE.Vector3((pt.x / 1080 - 0.5) * 30, (0.5 - pt.y / 1080) * 30, 0)
    );
    this.PSYS_Shadow.vertices.push(
      new THREE.Vector3((pt.x / 1080 - 0.5) * 30, (0.5 - pt.y / 1080) * 30, 0)
    );
    this.PSYS_Shadow.colors.push(new THREE.Color(1, 1, 1));
  }

  bindData(d) {
    TweenLite.to(this, 5, {
      z: d
    });
    // console.log(d);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "#fff";
    // this.ctx.fillRect(0, 0, 256, 256);
    this.ctx.fillText(this.name, this.canvas.width / 2, this.canvas.height / 2 - 30);
    this.ctx.fillText(Math.round(d * 1000), this.canvas.width / 2, this.canvas.height / 2 + 30);
    this.LABELTEXTURE.needsUpdate = true;
  }

  show() {
    //rough center pt
    var x = 0;
    var y = 0;
    for (var v = 0; v < this.PSYS.vertices.length; v++) {
      x += this.PSYS.vertices[v].x;
      y += this.PSYS.vertices[v].y;
    }
    x /= this.PSYS.vertices.length;
    y /= this.PSYS.vertices.length;

    this.TUBEGEO = new THREE.BoxGeometry(0.15, 0.15, 1);
    this.TUBEMAT = new THREE.MeshLambertMaterial({
      color: 0xffffff, //0x0fa9ff
      transparent: true,
      side: THREE.DoubleSide,
      opacity: 0.3
      // blending: THREE.AdditiveBlending
    });
    this.TUBE = new THREE.Mesh(this.TUBEGEO, this.TUBEMAT);
    this.PROV.add(this.TUBE);

    this.TUBEGEOSHINE = new THREE.BoxGeometry(0.6, 0.6, 1.1);
    this.TUBEMATSHINE = new THREE.MeshLambertMaterial({
      color: 0x0fa9ff,
      transparent: true,
      side: THREE.DoubleSide,
      opacity: 0.1,
      blending: THREE.AdditiveBlending
    });
    this.TUBESHINE = new THREE.Mesh(this.TUBEGEOSHINE, this.TUBEMATSHINE);
    this.PROV.add(this.TUBE);
    this.PROV.add(this.TUBESHINE);


    this.LABELGEO = new THREE.PlaneGeometry(5.12, 1.28);
    this.LABELTEXTURE = new THREE.CanvasTexture(this.canvas);
    this.LABELMAT = new THREE.MeshBasicMaterial({
      // color: 0xffffff,
      map: this.LABELTEXTURE,
      side: THREE.DoubleSide,
      depthTest: false,
      transparent: true,
      opacity: 0.8,
      blend: THREE.AdditiveBlending
    });
    this.LABEL = new THREE.Mesh(this.LABELGEO, this.LABELMAT);
    this.PROV.add(this.LABEL);


    this.LABEL.position.x = x;
    this.LABEL.position.y = y;
    this.LABEL.position.z = 0.5;

    this.TUBE.position.x = x;
    this.TUBE.position.y = y;
    this.TUBE.position.z = 0;

    this.TUBESHINE.position.x = x;
    this.TUBESHINE.position.y = y;
    this.TUBESHINE.position.z = 0;

    this.P = new THREE.Points(this.PSYS, this.PMAT);
    this.PS = new THREE.Points(this.PSYS_Shadow, this.PMAT_Shadow);
    this.PROV.add(this.P);
    this.PROV.add(this.PS);
  }
}

function buildMap() {
  for (var i = 0; i < map.length; i++) {
    // console.log(i);
    var owner = provMap[map[i].id].id;
    if (!prov[owner]) {
      prov[owner] = new province(provMap[map[i].id].name);
    }
    var cur = prov[owner];
    cur.pushPoint(map[i]);
  }
  for (var i in prov) {
    prov[i].show();
  }
}

export function render() {
  TweenLite.to(state, 0.5, { visibility: shared.data.tab == 3 ? 1 : 0 });
  TweenLite.to(state, 2, { visibilityX: shared.data.tab == 3 ? 1 : 0 });
  GROUP.visible = state.visibility < 0.1 ? 0 : 1;
  if (state.visibility < 0.2) return;
  shared.data.toolTip = "";
  GROUP.position.z = 50 - state.visibility * 50;
  for (var i in prov) {
    prov[i].render();
  }
  GROUP.rotation.y = -shared.mouse.vec.x;
  GROUP.rotation.x = shared.mouse.vec.y;
  shared.camera.position.z = CAM_BASE + 5 - 5 * state.visibility; // + state.selection * STEP;
}

shared.events.on("data", d => {
  var provs = d["Region/getRegion/"].region[0].prov_real;
  for (var i in prov) {
    if (prov[i]) {
      prov[i].bindData(0);
    }
  }
  for (var i in provs) {
    var data = Math.sqrt(parseFloat(provs[i]) / 1000);
    if (prov[i]) {
      prov[i].bindData(data);
    }
  }
});

shared.scene.add(GROUP);

buildMap();
// console.log(Object.keys(prov));

for (var i in prov) {
  prov[i].bindData(0);
}
