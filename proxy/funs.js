function searchDemoWords() {
  var a = BID.getEvt(),
    b = a.target;
  "A" == b.tagName && T(b).hasClass("item")
    ? (
        T("#schword").val(T(b).text()).focus().closest("form").submit(),
        6 == T.browser.ie && (a.stopPropagation(), a.preventDefault())
      )
    : "INPUT" == b.tagName &&
      "submit" == b.type &&
      (T.string(T("#schword").val()).trim() ||
        T("#schword").val(T("#demoWords_toe a.item").eq(0).text()).focus());
}
((T.url || (T.url = {})).getQueryValue = function(a, b) {
  b = b || location.href;
  var c = new RegExp(
      "(^|&|\\?|#)" + baidu.string(a).escapeReg() + "=([^&#]*)(&|$|#)",
      ""
    ),
    d = b.match(c);
  return d ? d[2] : "";
}), (T.url.escapeSymbol = function(a) {
  return String(a).replace(/[#%&+=\/\\\ \　\f\r\n\t]/g, function(a) {
    return "%" + (256 + a.charCodeAt()).toString(16).substring(1).toUpperCase();
  });
}), (T.url.jsonToQuery = function(a, b) {
  var c,
    d = [],
    e =
      b ||
      function(a) {
        return T.url.escapeSymbol(a);
      };
  return T.object.each(a, function(a, b) {
    if (T.lang.isArray(a)) {
      c = a.length;
      for (var f = 0; c > f; f++) d.push(b + "=" + e(a[f], b));
    } else d.push(b + "=" + e(a, b));
  }), d.join("&");
}), (T.url.queryToJson = function(a) {
  for (
    var b,
      c,
      d,
      e,
      f = a || location.href,
      g = f.substr(f.lastIndexOf("?") + 1),
      h = g.split("&"),
      i = h.length,
      j = {},
      k = 0;
    i > k;
    k++
  )
    h[k] &&
      (
        (e = h[k].split("=")),
        (b = e[0]),
        (c = e[1]),
        (d = j[b]),
        "undefined" == typeof d
          ? (j[b] = c)
          : T.lang.isArray(d) ? d.push(c) : (j[b] = [d, c])
      );
  return j;
});
try {
  document.execCommand("BackgroundImageCache", !1, !0);
} catch (e) {}
if (window.Raphael) {
  var attrs = Raphael._availableAttrs;
  (attrs.font = '12px "Arial", "Microsoft Yahei"'), (attrs["font-size"] =
    "12"), Raphael.svg ||
    ((attrs.font = '12px "Microsoft Yahei"'), (attrs["font-size"] = "12"));
}
var BID = (BaiduIndex = BID || {});
!(function(a) {
  a = a || window;
  var b = ["#3ec7f5", "#2cc312", "#e7882e", "#f362a5", "#b16ec2"],
    c = b.length,
    d = function(a) {
      return b[(a || 0) % c];
    };
  (d.colors = b), (a.getColor = d);
  var e = {
    noData: "暂无相关数据",
    noDataP: '<p class="nodata">暂无相关数据</p>',
    noDataSpan: '<span title="暂无数据" style="font-family:simsun;">－</span>',
    noDataAttr: { fill: "#666666" },
    noType2: "当前页无法按地域对比",
    noCmsg: "您还没有填写反馈意见",
    tooCmsg: "很抱歉，我们限制了字数为 1000 以内，超长部分将被丢弃。",
    lVerify: "验证码不正确",
    xVerify: "验证码输入错误，请重新输入",
    xVerify5: "验证码错误次数太多，请稍后再试",
    tVerify: "请输入验证码",
    nVerify: "请输入验证码",
    hptp_myIndus: "本报告助您分析：<br />供您查看行业权限状态。",
    hptp_myAdds:
      "本报告助您分析：<br />可以将百度指数未收录的关键词加入百度指数。请注意：<br />            1、创建新词后，从第二天起指数为该词提供1年的数据计算服务，并且该词相关数据将向所有用户公开。服务到期后，若该词未被指数或其他用户收录，需重新创建；<br />            2、关键词一经添加，即被视为消费完毕，无法删除或更改；<br />            3、服务状态包括“正常”和“已过期”，创建新词后的1年内都属于正常服务期，1年后服务过期；<br />            4、关键词状态包括“已收录”和“未收录”。“已收录”代表关键词已被指数机器人自动收录或用户人工收录，“未收录”则代表机器人和用户均未创建该词。",
    hptp_myAtts: "本报告助您分析：<br />将经常查看的关键词放入“我收藏的指数”，供您随时查看趋势。最多可以收藏50个关键词。",
    hptp_hours:
      "本报告助您分析：<br />提供在自定义时间段内，行业搜索时间分布特征。助您按时段精细化投放广告。若在13:00~14:00间，行业搜索指数A为最高，那么我们会将该时段的指数视为100；其他时间段的指数按比例折算，比如9:00~10:00量为B，则其指数=100*(B/A)。",
    hptp_IndSub: "本报告助您分析：<br />提供细分行业搜索份额排行，助您了解行业需求格局。",
    hptp_IndCrowd: "本报告助您分析：<br />提供在自定义时间段内，行业人群性别、年龄、兴趣分布数据。助您精确定位潜在人群。",
    hptp_IndTrend:
      "本报告助您分析：<br />提供行业搜索热度数据，可按搜索来源分开查看整体/桌面端/移动端趋势。行业指数与关键词搜索指数计算方法不同，图中行业指数的数字表示相对于图表中的峰值的搜索热度。如果在指定时间范围内，10月1日量A最高，那么我们会将10月1日的指数视为 100；其他时间指数按比例折算，比如9月30日量为B，则其指数=100*(B/A)。",
    hptp_cMap:
      "该数据为您显示：关注该关键词的用户来自哪些地域<br />算法说明：根据百度用户搜索数据，采用数据挖掘方法，对关键词的人群属性进行聚类分析，给出用户所属的省份、城市，及城市级别的分布及排名",
    hptp_RS:
      "该数据为您显示：通过用户搜索行为，细分搜索中心词的相关需求中，来源词、去向词、最热门词及上升最快词<br />算法说明：将所有与中心检索词相关的需求按不同衡量标准排序区分展现。",
    hptp_IndRS:
      "本报告助您分析：<br />提供在自定义时间段，行业内用户关注度最高的TOP搜索词，以及用户关注度上升最快的TOP搜索词。助您及时获取行业热词。",
    hptp_demand:
      '该数据为您显示：通过用户在搜索该词的前后的搜索行为变化中表现出来的相关检索词需求<br />算法说明：综合计算关键词与相关词的相关程度，以及相关词自身的搜索需求大小得出。<br /><span style="visibility: hidden">算法说明：</span>相关词距圆心的距离表示相关词与中心检索词的相关性强度；<br /><span style="visibility: hidden">算法说明：</span>相关词自身大小表示相关词自身搜索指数大小，红色代表搜索指数上升，绿色代表搜索指数下降。',
    hptp_bbs:
      "本报告助您分析：<br />提供百度收录的最新的TOP10论坛帖子，论坛数据按日更新，不支持自定义时间段筛选。采用论坛帖子标题包含关键词的统计标准。提供原文跳转。",
    hptp_news:
      "该数据为您显示：媒体在互联网上对特定关键词的关注及报道程度及持续变化情况<br />算法说明：媒体指数是以各大互联网媒体报道的新闻中，与关键词相关的，被百度新闻频道收录的数量，采用新闻标题包含关键词的统计标准，数据来源、计算方法与搜索指数无直接关系",
    hptp_weibo:
      "本报告助您分析：<br />根据自定义时间段，查询关键词相关热门微博。采用微博正文包含关键词的统计标准，提供微博原文地址跳转。",
    hptp_zhidao:
      "该数据为您显示：反映该关键词在百度知道上的相关提问内容<br />算法说明：获取百度知道提问中包含该关键字的问题，展示一部分热门问题。",
    hptp_interest:
      "本报告助您分析：<br />提供关键词访问人群的兴趣分布情况，每个关键词展现人群最关注的四个兴趣点。比如关键词“美股”在图表上对应四边形覆盖的兴趣分别为“影视Fans”、“理财精英”、“家庭医生”、“网络小说迷”，这代表关注“美股”的网民平时对影视节目、理财知识、健康护理、网络文学等关注程度最高。图表中，兴趣人群连线距离越小，差异度越小，反之越大。",
    hptp_social:
      "该数据为您显示：关注该关键词的用户的性别、年龄分布<br />算法说明：根据百度用户搜索数据，采用数据挖掘方法，对关键词的人群属性进行聚类分析，给出用户所属的年龄及性别的分布及排名。",
    hptp_tProfile: "该数据为您显示：<br />关键词最近一周或一个月的总体搜索指数表现。",
    hptp_trend:
      "该数据为您显示：互联网用户对关键词搜索关注程度及持续变化情况<br />算法说明：以网民在百度的搜索量为数据基础，以关键词为统计对象，科学分析并计算出各个关键词在百度网页搜索中搜索频次的加权。根据数据来源的不同，搜索指数分为PC搜索指数和移动搜索指数。",
    hptp_myorders:
      "本报告助您分析：<br />我的购买记录：可以查看创建新词服务购买情况。请您在创建新词权限有效期内新增关键词，过期无效。",
    tpl_addFav: "您已收藏[0]个关键词，还能收藏[1]个关键词，当前收藏请求超过[2]个，请缩减收藏词量。",
    tpl_addWord: "您已添加[0]个关键词，还能添加[1]个关键词，当前添加请求超过[2]个，请缩减添加词量。",
    _end_: ""
  };
  (a.sTips = e), (a.stpl_sTips = function(a, b) {
    for (var c = e[a], d = b.length; d--; )
      c = c.replace(new RegExp("\\[" + d + "\\]", "gi"), b[d]);
    return c;
  });
  var f = function() {
      T("#sTipbox").fadeOut();
    },
    g = function(a) {
      var b = T("#sTipbox");
      return b.length ||
        (b = T('<div id="sTipbox"></div>').appendTo(document.body)), b.data(
        "tipKey"
      ) != a && b.data("tipKey", a).html(e[a]), b;
    };
  a.showTip = function(b) {
    if (e[b]) {
      var c = a.getEvt(),
        d = c.target,
        h = c.pageX,
        i = c.pageY,
        j = g(b);
      d.onmouseout || (d.onmouseout = f), j
        .css({ left: h + 20, top: i - 45 })
        .stop(!0, !0)
        .show();
    }
  };
})(BID), (function(a) {
  a = a || window;
  var b,
    c = "cityIDname",
    d = function() {
      if (b) return d;
      b = d.datas = {};
      for (var a, c = -1; (a = strArr[++c]); ) {
        var e = a.split(","),
          f = "c" + e[0],
          g = 1,
          h = 0,
          i = "",
          j = {};
        for (b[f] = { pid: "c0", name: e[1], subs: j }; (h = e[++g]); )
          (h = "c" + h), (i = e[++g]), (j[h] = i), (b[h] = { pid: f, name: i });
      }
      return d;
    },
    e = (
      (d.citys = function(a, c) {
        "c" != String(a).charAt(0) && (a = "c" + a);
        var d = b[a] || {};
        if ("c0" !== d.pid) return "";
        if (!c) return d.name;
        var e = d.subs;
        for (var f in e) {
          var a = f.slice(1);
          if (c(a, e[f])) break;
        }
      }),
      (d.city = function(a) {
        "c" != String(a).charAt(0) && (a = "c" + a);
        var c = b[a];
        return c && "c0" !== c.pid ? { name: c.name, pid: c.pid.slice(1) } : {};
      })
    ),
    f = (d.getName = function(a) {
      return "c" != String(a).charAt(0) && (a = "c" + a), (b[a] || {}).name ||
        "";
    });
  d.get_name = function(b, c, d) {
    if ("0" == b) return "全国";
    var g = e(b);
    return g.pid ? f(g.pid) + (c || " - ") + a.subStr(g.name, d || 10) : f(b);
  };
  return (strArr = d.strArr = {
    a: [
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
    ]
  }.a), (a[c] = d);
})(BID), (function(a) {
  (a = a || window), (a.each = function(a, b) {
    var c = {}.toString.call(a);
    if (c.indexOf("Array") > 0)
      for (var d = 0, e = a.length; e > d && !b.call(a, d, a[d]); d++);
    else if (c.indexOf("Object") > 0 || c.indexOf("Function") > 0)
      for (var f in a) if (b.call(a, f, a[f])) break;
  }), (a.sCopy = function(a, b) {
    for (var c in b) c in a || (a[c] = b[c]);
    return a;
  }), (a.nCopy = function(b, c) {
    var d = a.sCopy({}, b);
    return a.sCopy(d, c);
  }), (a.gsid = (function(a) {
    var b = 0;
    return (a += "_gsid_"), function(c) {
      var d = c ? c.id || "" : "";
      return "" === d && ((d = a + b++), c && (c.id = d)), d;
    };
  })("auto")), (a.getEvt = function(b) {
    for (
      var c = 32, d = window.event, e = arguments.callee;
      !d && c-- && (e = e.caller);

    )
      (d = e.arguments[0]), ("" + d).indexOf("Event]") < 1 && (d = 0);
    return d
      ? ((d = T.event(d)), b && (d.target = a.tcFilt(d.target, b)), d)
      : void 0;
  }), (a.tcFilt = function(a, b) {
    var c = b.split(".");
    return c[0] &&
      a.tagName &&
      c[0] !== a.tagName.toLowerCase() &&
      (a = null), c[1] &&
      a &&
      (a.className || "").indexOf(c[1]) < 0 &&
      (a = null), a;
  }), (a.getPnode = function(b, c, d, e) {
    d = d || -1;
    var f = b;
    do {
      if ((b = a.tcFilt(f, c))) return b;
      d-- ? e && e == f && (f = {}) : (f = {});
    } while ((f = f.parentNode));
    return f;
  }), (a.getAh = function(a, b) {
    a = "string" == typeof a ? a : a.href;
    var c = a.lastIndexOf("#");
    return b && T.event(b).preventDefault(), 0 > c ? "" : a.slice(c + 1);
  }), (a.byteLength = function(a) {
    return a.replace(/[^\x00-\xff]/g, "UU").length;
  }), (a.subStr = function(b, c) {
    if (((c = c || 16), a.byteLength(b) <= c)) return b;
    c -= 2;
    for (
      var d = (c / 2) | 0, e = b.slice(0, d), f = a.byteLength(e), g = [e];
      c > f;

    )
      g.push(b.charAt(d)), f++, b.charCodeAt(d++) > 255 && f++;
    return f > c && g.pop(), g.join("") + "…";
  }), (a.Commafy = function(b, c) {
    return isNaN(b)
      ? a.sTips.noDataSpan
      : String(b).replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, "$1,") + (c || "");
  }), (a.Rommafy = function(b, c) {
    b = Math.round(b);
    var d = "" + b,
      e = 1e3;
    return b != b
      ? a.sTips.noDataSpan
      : (b > e ? (d = "大于" + e) : -e > b && (d = "小于-" + e), d + (c || ""));
  }), (a.Rommafy_img = function(b, c) {
    var d = { "%": 10, ",": 12 };
    return (b = a.Rommafy(b, c)), (b = b.replace(/[0-9,%]/g, function(a) {
      return (
        '<i style="background-position:-' + 8 * (d[a] || a) + 'px -2px;"></i>'
      );
    }));
  }), (a.rat_0 = function(a) {
    return (a = parseFloat(a)), isNaN(a)
      ? "ratNaN"
      : 0 == a ? "rat__" : a > 0 ? "ratUp" : "ratDown";
  }), (a.hi_lite = function(a, b) {
    if (((a = String(a)), a.indexOf("+") <= 0))
      return b.replace(
        new RegExp(T.string(a).escapeReg(), "gi"),
        "<em>" + a + "</em>"
      );
    a = a.split("+");
    for (var c = a.length; c--; )
      b = b.replace(
        new RegExp(T.string(a[c]).escapeReg(), "gi"),
        "<em>" + a[c] + "</em>"
      );
    return b;
  });
})(BID), (function(a) {
  a = a || window;
  var b = "evts",
    c = {},
    d = function(a, b, c) {
      return (c = [].slice.call(arguments, 2)), e(a, function(a, d) {
        var e = d.scope || b;
        if (d.gt)
          return clearTimeout(d.timer), void (d.timer = setTimeout(function() {
            d.fun.apply(e, c);
          }, d.gt));
        if (d.lt) {
          var f = d.lastTime || -d.lt,
            g = +new Date();
          return clearTimeout(d.timer), void (g - f >= d.lt
            ? (d.fun.apply(e, c), (d.lastTime = g))
            : (d.timer = setTimeout(function() {
                d.fun.apply(e, c);
              }, d.lt)));
        }
        d.fun.apply(e, c);
      });
    },
    e = (d.each = function(a, b) {
      for (
        var e = c[a] || (c[a] = []), f = -1, g = 0;
        (g = e[++f]) && !b(f, g);

      );
      return d;
    });
  return (d.abort = function(a) {
    return e(a, function(a, b) {
      clearTimeout(b.timer);
    });
  }), (d.care = function(a, b, f) {
    (f = f || {}), (f.fun = b);
    var g = -1;
    return e(a, function(a, c) {
      return c.fun === b ? ((g = a), 1) : void 0;
    }), 0 > g && (g = c[a].length), (c[a][g] = f), d;
  }), (d.ease = function(a, b) {
    var f = -1;
    return e(a, function(a, c) {
      return c.fun === b ? ((f = a), 1) : void 0;
    }), f >= 0 && c[a].splice(f, 1), d;
  }), (a[b] = d);
})(BID), (function(a) {
  a = a || window;
  var b = "fnsDate",
    c = "yyyymmdd",
    d = "yyyy-mm-dd",
    e = 0,
    f = function(a) {
      return (a = a ? j(a) : g()), a !== a && (a = g()), new k(a);
    },
    g = (
      (f.adjust = function(a) {
        return (e = 1e3 * a - new Date());
      }),
      (f.cNow = function() {
        return +new Date() + e;
      })
    ),
    h = (f.monthHead = function(a) {
      var b = new Date(a);
      return +new Date(
        b.getFullYear() + "/" + ("0" + (b.getMonth() + 1)).slice(-2) + "/01"
      );
    }),
    i = (f.monthEnd = function(a) {
      var b = new Date(h(a));
      return (b = new Date(b.setMonth(b.getMonth() + 1))), +new Date(
        b.setDate(b.getDate() - 1)
      );
    }),
    j = (f.parse = function(a) {
      if ("number" == typeof a) return new Date(a);
      if (" Date]" === {}.toString.call(a).slice(-6)) return a;
      var b = String(a);
      if (/^\d*$/.test(b))
        switch (b.length) {
          case 4:
          case 6:
          case 8:
            (b += "0101".slice(0, 8 - b.length)), (b =
              b.slice(0, 4) + "/" + b.slice(4, 6) + "/" + b.slice(-2));
            break;
          default:
            b = "";
        }
      else if (
        (
          (b = b.replace(/[年月-]/g, "/").replace("日", " ")),
          (b = b.replace(/[时分]/, ":").replace("秒", "")),
          (b = b
            .replace(/\s+/, " ")
            .replace(/^ | $/, "")
            .replace(/ ?\/ ?/, "/")),
          b.indexOf(" ") < 0
        )
      ) {
        var c = b.split("/");
        (c[1] = c[1] || "01"), (c[2] = c[2] || "01"), (b = c.join("/"));
      }
      return new Date(b);
    }),
    k = (f.init = function(a) {
      (this.stamp = +a), (this.Date = new Date(this.stamp));
    }),
    l = k.prototype;
  return (l.setval = function(a) {
    return (this.stamp = a), this;
  }), (l.settpl = function(a) {
    return (this.tpl = a), this;
  }), (l.valueOf = function() {
    return this.stamp;
  }), (l.toString = function() {
    return this.format(d);
  }), (l.format = function(a) {
    a = a || this.tpl || c;
    var b = new Date(this.stamp),
      d = "" + b.getFullYear(),
      e = ("0" + (b.getMonth() + 1)).slice(-2),
      f = ("0" + b.getDate()).slice(-2),
      g = ("0" + b.getHours()).slice(-2),
      h = ("0" + b.getMinutes()).slice(-2),
      i = ("0" + b.getSeconds()).slice(-2);
    return (a = a
      .replace("yyyy", d)
      .replace("yy", d.slice(-2))), (a = a
      .replace("mm", e)
      .replace("dd", f)), a.replace("hh", g).replace("nn", h).replace("ss", i);
  }), (l.monthHead = function() {
    return (this.stamp = h(this.stamp)), this;
  }), (l.monthEnd = function() {
    return (this.stamp = i(this.stamp)), this;
  }), (l.diff = function(a, b) {
    var c = new Date(this.stamp);
    return "number" != typeof b
      ? c["get" + a]()
      : ((this.stamp = c["set" + a](c["get" + a]() + b)), this);
  }), (l.year = function(a) {
    return this.diff("FullYear", a);
  }), (l.month = function(a) {
    return this.diff("Month", a);
  }), (l.date = function(a) {
    return this.diff("Date", a);
  }), (l.difs = function(a, b) {
    a = a ? j(a) : g();
    var c = (this.stamp - a) / 1e3;
    return (c /= { s: 1, n: 60, h: 3600, d: 86400 }[b] || 1);
  }), (l.smart = function(a) {
    var b = this.difs(a, "n"),
      c = b > 0 ? "后" : "前",
      d = "数秒";
    return (b = Math.abs(b)), b > 525600
      ? this.format("yyyy年mm月")
      : (
          b > 43200
            ? (d = parseInt(b / 43200) + " 个月")
            : b > 1440
              ? (d = parseInt(b / 1440) + " 天")
              : b > 60
                ? (d = parseInt(b / 60) + " 小时")
                : b > 1 && (d = parseInt(b) + " 分钟"),
          d + c
        );
  }), (l.months = function(a) {
    a = a ? j(a) : g();
    var b = 12 * a.getFullYear() + a.getMonth(),
      c = 12 * this.Date.getFullYear() + this.Date.getMonth(),
      d = c - b;
    return d + (0 > d ? -1 : 1);
  }), (a[b] = f);
})(BID), (function(a, b) {
  (a = a || window), (b = b || "cjax");
  var c = 50,
    d = 15e3,
    e = {},
    f = {},
    g = [],
    h = function(a, b, c) {
      var g = f[a];
      if (g) return i(a), b(g);
      var h = e[a] || (e[a] = []);
      h.push(b) > 1 ||
        (
          (c = c || {}),
          T.ajax(a, {
            async: c.async === !1 ? !1 : !0,
            timeout: c.timeout || d,
            error: c.error,
            success: function(b) {
              j(a, b);
              for (var c = 0; c < h.length; c++) h[c](b);
              delete e[a];
            }
          })
        );
    },
    i = function(a) {
      for (var b = g.length; b--; )
        if (g[b] === a) {
          g.splice(b, 1), g.push(a);
          break;
        }
    },
    j = (h.setCach = function(a, b) {
      if (f[a]) return (f[a] = b), void i(a);
      if (g.length >= c) {
        var d = g.shift();
        delete f[d];
      }
      g.push(a), (f[a] = b);
    });
  a[b] = h;
})(BID), (function(a) {
  var b,
    c,
    d,
    e,
    f = "nearStep",
    g = (a[f] = function(a, f, g) {
      if ((h(a, f, g), 0 == e)) {
        if (0 == c) return [0, d, 1];
        (e = (0 > c ? -1 : 1) * c / d), (c += e / 2), (b -= e / 2);
      }
      return i();
    });
  g.intg = function(a, e, f) {
    if ((h(a, e, f), d > c - b)) {
      var g = (d - (c - b)) / 2;
      return (c = Math.round(c + g)), (b = Math.round(b - g)), 0 > b &&
        ((c -= b), (b = 0)), [b, c, 1];
    }
    return i();
  };
  var h = function(a, f, g) {
      (d = g || 5), (b = a || 0), (c = f || 0), b > c &&
        (c = [b, (b = c)][0]), (e = c - b);
    },
    i = function() {
      for (
        var a = Math.floor(Math.log(e) / Math.LN10),
          f = Math.pow(10, a - 1),
          g = e / f,
          h = f * Math.ceil(g / d),
          i = Math.floor(b / f) * f,
          j = i + h * d;
        c > j;

      )
        (h += f), (j = i + h * d);
      var k = 0;
      return String(h).indexOf(".") >= 0 &&
        (
          (k = Math.abs(a) + 4),
          (h = +h.toFixed(k)),
          (k = String(h).split(".").pop().length),
          (i = +i.toFixed(k)),
          (j = +j.toFixed(k))
        ), [i, j, h, k];
    };
})(BID), (function(a) {
  var b = "MNKO",
    c = (a[b] = {});
  (c.MM = function(a) {
    return [Math.min.apply(0, a), Math.max.apply(0, a)];
  }), (c.MN = function(a) {
    for (var b = 2e9, c = -b, d = a.length, e = d; d--; )
      (e = a[d]), b > e && (b = e), e > c && (c = e);
    return [b, c];
  }), (c.MK = function(a, b) {
    b = b || c.MM(a);
    for (var d = b[0], e = b[1] - d, f = [], g = a.length; g--; )
      f[g] = (a[g] - d) / e;
    return f;
  }), (c.MO = function(a, b) {
    b = b || c.MM(a);
    for (var d = b[1], e = [], f = a.length; f--; ) e[f] = a[f] / d;
    return e;
  });
})(BID), (function(a) {
  a = a || window;
  var b = "tabFun",
    c = function() {
      var b = a.getEvt(),
        c = a.getPnode(b.target, ".tabLi");
      if (c && !T(c).hasClass("curr") && !T(c).hasClass("dsab")) {
        var d = -1,
          e = a.getPnode(c, ".tabUl"),
          f = a.getPnode(e, ".tabUnit");
        T(e).children(".tabLi").removeClass("curr").each(function(a) {
          return this === c
            ? ((d = a), T(this).addClass("curr"), "break")
            : void 0;
        }), T(f)
          .children(".tabConts")
          .children(".tabCont")
          .addClass("dsn")
          .eq(d)
          .removeClass("dsn"), e.id && a.evts(e.id + "_tabClick", e, d);
      }
    };
  return (a[b] = c);
})(BID), (function(a) {
  a = a || window;
  var b = "placehold",
    c = "hold_label",
    d = "input.hold_efkt",
    e = function() {
      T("#" + this.getAttribute("hold_label")).hide();
    },
    f = function() {
      "" == this.value && T("#" + this.getAttribute("hold_label")).show();
    };
  return (a[b] = function(b, g) {
    return (b = b || d), (g = g || {}), T(b).each(function() {
      var b = T(this),
        d = b.attr("hold_txt"),
        h = T("#" + b.attr(c)),
        i = a.gsid(this);
      return g.text &&
        (d =
          g.text), d ? (h.length || ((h = T('<label class="' + c + '" for="' + i + '"></label>')), b.attr(c, a.gsid(h[0])), g.cssText && (h[0].style.cssText = g.cssText), b.before(h), b.on("focus", e).on("blur", f)), b.val() && h.hide(), (d = d.replace(/\\n/g, "<br />")), void h.html(d)) : (h.remove(), void b.off("focus", e).off("blur", f));
    });
  });
})(BID), (BID.schnav_click = function() {
  var a = BID.getEvt().target,
    b = a.getAttribute("name"),
    c = {
      news: "ns?tn=news&cl=2&rn=20&ct=1&ie=utf-8&word=",
      baidu: "s?fr=index&wd=",
      tieba: "f?ie=utf-8&kw=",
      zhidao: "search?pn=0&rn=10&lm=0&word=",
      music: "search/tag/",
      image:
        "i?ct=201326592&cl=2&nc=1&lm=-1&st=-1&tn=baiduimage&istype=2&fm=&pv=&z=0&ie=utf-8&word=",
      wenku: "search?ie=utf-8&lm=0&od=0&word=",
      baike: "search/word?pic=1&sug=1&enc=utf8&word=",
      "": ""
    };
  if ("A" == a.tagName && c[b]) {
    var d = T("#schword").val().replace(/^\s+|\s+$/, ""),
      e = a.href.split("/");
    (e.length = 3), (e = e.join("/") + "/"), d &&
      (e += c[b] + encodeURIComponent(d)), (a.href = e);
  }
}), (BID.rTools_pos = function(a) {
  var b = 0,
    c = 0,
    d = 0,
    e = 0;
  BID.evts
    .care("width_resize_all", function(b) {
      (d = Math.max(
        0,
        (b - 1300) / 2
      )), 1e3 > b && (d = b - 1e3), T("#" + a).css({ right: d });
    })
    .care("height_resize", function(c) {
      (b = c), T("#" + a).css({ top: b / 2 - 50 });
    })
    .care("window_scroll", function(f, g) {
      var h = T("#" + a);
      g > 90 && 90 >= c
        ? (h.find(".toTop")[0].style.display = "block")
        : 90 > g &&
          c >= 90 &&
          h
            .find(".toTop")
            .hide(), (c = g), 6 == T.browser.ie && h.css({ top: c + b / 2 }), f != e && ((e = f), h.css({ right: d + Math.max(0, f) }));
    })("width_resize_all", window, T(window).width())(
    "height_resize",
    window,
    T(window).height()
  );
}), (BID.lTool_fix = function(a, b) {
  var c = 130,
    d = a > 0 ? -a : "",
    e = 0,
    f = T("#lTools_c"),
    g = f[0].scrollHeight,
    h = (T("#mainWrap").height(), BID.w_size),
    i = g - h.height,
    j = f.data("lastTop") || 0;
  if (c > b) e = -Math.max(0, b);
  else if (0 >= i) e = -c;
  else {
    var k = j - h.dirTop;
    e = -i - c > k ? -i - c : -c > k ? k : -c;
  }
  f.css({ top: e, left: d }), f.data("lastTop", e);
}), (BID.lTool_fix_height = function(a) {
  var b = 130,
    c = T("#lTools_c"),
    d = c[0].scrollHeight,
    e = T("#mainWrap"),
    f = e.height();
  T("#footer")[0];
  return a > f + b
    ? ((d = a - b), (c[0].style.height = d + "px"))
    : (c[0].style.height = ""), d;
}), 6 != T.browser.ie && T("#lTools_c").length, (BID.lToolslide = function() {
  var a = (T("#lTools"), T("#lTools_c")),
    b = parseInt(a.css("left")),
    c = -190;
  0 > b && (c = 0), a.stop(!0).animate({ left: c }, function() {
    var a = T("#mainWrap"),
      c = 240;
    b >= 0 && (c = 50), a.css({ "padding-left": c }), BID.evts("width_resize");
  }), (a = null);
}), (BID.newSuggestion = function(a, b) {
  return "string" != typeof a &&
    (a = BID.gsid(a)), (b = baidu.object.extend(b || {}, {
    getData: function(a) {
      var b = this,
        c = T.string(a).trim();
      c &&
        (
          (window.baidu.sug = function(d) {
            (d.s && d.s.length) || (d.s = []);
            for (var e = [], f = 0; f < d.s.length; f++) {
              var g = d.s[f],
                h = BID.subStr(g, 64),
                i = h.replace(c, '<span style="color:#c00;">' + c + "</span>");
              (i = '<span title="' + g + '">' + i + "<span>"), e.push({
                value: g,
                content: i
              });
            }
            b.receiveData(a, e);
          }),
          T("#indexSugSc").remove(),
          T(document.createElement("script"))
            .attr("id", "indexSugSc")
            .attr(
              "src",
              "http://nssug.baidu.com/su?prod=index&wd=" +
                encodeURIComponent(c) +
                "&" +
                ((new Date() / 864e5) | 0)
            )
            .appendTo(document.body)
        );
    }
  })), magic.setup.suggestion(a, b);
}), (BID.createScroll = function(a) {
  var b = BID.createScroll,
    c = b.inis || (b.inis = {}),
    d = BID.gsid(a);
  return (a.onmouseover = null), T(a)
    .mouseenter(b.fnHover)
    .mouseleave(b.fnHover), (c[d] = magic.setup.scrollPanel(d, {
    autoUpdateDelay: !1
  }));
}), (BID.createScroll.fnHover = function(a) {
  T(this)["mouseenter" === a.type ? "removeClass" : "addClass"](
    "hide_slider"
  ), T(this).find("a.tang-knob").css({ left: 0 });
}), (BID.popLogin = function() {
  var a = BID.popLogin.passv3,
    b = "passport-login-pop",
    c = "passport-login-pop-api",
    d = "cas_loginForm",
    e = PPval.hostUrl + PPval.staticUrl + "v3Jump.htm";
  return a
    ? void a.show()
    : (
        (a = BID.popLogin.passv3 = passport.pop.init({
          apiOpt: {
            product: "index",
            loginType: 1,
            safeFlag: 0,
            sms: 0,
            u: location.href,
            staticPage: e
          },
          cache: !1,
          tangram: !0,
          registerLink: T("#pas_regLink").attr("href"),
          onLoginSuccess: function(a) {},
          onSubmitStart: function(a) {},
          onSubmitedErr: function(a) {},
          onSystemErr: function(a) {},
          onShow: function() {
            var a = T("#" + b),
              e = a.find("ul.tab"),
              f = T(
                '<li class="tab-item"><a onclick="return false;" hidefocus="true">推广帐号</a></li>'
              ),
              g = e.find("li.tab-item");
            2 == g.length &&
              T("#" + c)[0] &&
              (
                T("#cas_imgValid").click(),
                T("#cas_fromu").val(location.href),
                g.click(function() {
                  T("#" + c).show(), T("#" + d).hide();
                }),
                f.click(function() {
                  e
                    .find(".tab-item")
                    .removeClass(
                      "tab-selected"
                    ), f.addClass("tab-selected"), T("#" + c).hide(), T("#" + d).show();
                }),
                e.append(f),
                e.parent().append(T("#" + d))
              );
          },
          onHide: function() {},
          onDestroy: function() {}
        })),
        void a.show()
      );
}), (BID.cas_submit = function() {
  var a = "";
  return T("#cas_loginForm input").each(function() {
    var b = T(this).attr("chk_typ"),
      c = this.value,
      d = T(this).prevAll("label").text();
    if (b) {
      if (!c) return (a = "请填写" + d), "break";
      switch (b) {
        case "name":
          if (c.length < 3) return (a = d + "格式错误"), "break";
          break;
        case "pass":
          if (c.length < 6) return (a = d + "不符合要求"), "break";
          break;
        case "code":
          if (((this.value = c = c.replace(/^\s+|\s+$/, "")), 4 != c.length))
            return (a = d + "有误"), "break";
      }
    }
  }), a ? (T("#cas_Error").html(a), !1) : !0;
}), (function(a) {
  a = a || window;
  var b = "selectA",
    c = "",
    d = "",
    e = 0,
    f = 6 == T.browser.ie,
    g = function() {
      var b = a.getEvt(),
        d = b.target,
        f = " " + d.className + " ";
      e || (T(document.body).click(k), (e = 1)), (c = a.gsid(
        a.getPnode(d, ".selectA")
      )), / (selectA|sltTxt) /.test(f) ||
      T(d).hasClass("selectA") ||
      T(d.parentNode).hasClass("selectA")
        ? h(b)
        : "A" == d.tagName && i(b);
    },
    h = (
      (g.setVal = function(b, c) {
        c || "" === c ? (b.value = c) : (c = b.value);
        var d = j(b);
        return c.length > 2
          ? (
              (d.opts.last()[0].href = "#" + c),
              (c = c.split("|")),
              void d.txt.html(
                a.fnsDate(c[0]).format("yyyy年mm月") +
                  "-" +
                  a.fnsDate(c[1]).format("yyyy年mm月")
              )
            )
          : void d.opts.each(function() {
              return c === a.getAh(this)
                ? (d.txt.html(T(this).text()), "break")
                : void 0;
            });
      }),
      (g.slide = function(b) {
        var d = j(b.target),
          e = d.val.val();
        return d.box.hasClass("slided")
          ? void (c = "")
          : (
              d.opts.each(function() {
                var b = a.getAh(this);
                b === e
                  ? T(this).addClass("curr")
                  : T(this).removeClass("curr");
              }),
              f &&
                d.box.hasClass("width_ie6") &&
                d.box.css({ width: d.box[0].clientWidth }),
              void d.box.addClass("slided")
            );
      })
    ),
    i = (g.clickA = function(b) {
      var d = b.target,
        e = a.getAh(d, b);
      if (!T(d).hasClass("dsab") && ((c = ""), !T(d).hasClass("curr"))) {
        var f = j(d);
        f.val.val(e), f.txt.html(T(d).text()), f.val.change();
        var g = $(d).parents(".selectA");
        if ($(d).attr("href").length <= 3)
          g.hasClass("monthA") || BID.advSearch();
        else if (g.length > 0) {
          var h = g.find("dt a").text();
          "所有城市" === h ? BID.advSearch() : "" === h && (BID._refresh = !0);
        }
      }
    }),
    j = (g.getNodes = function(b) {
      var c = T(a.getPnode(b, ".selectA"));
      return {
        box: c,
        val: c.find(".sltVal"),
        txt: c.find(".sltTxt"),
        opts: c.find(".sltOpt a")
      };
    }),
    k = (g.slideUp = function() {
      if (d && d !== c) {
        var b = T("#" + d);
        b.removeClass("slided"), f &&
          b.hasClass("width_ie6") &&
          b.css({ width: "" }), a.evts && a.evts("selectA_slideUp", null, b[0]);
      }
      (d = c), (c = "");
    });
  return (a[b] = g);
})(BID), (function(a) {
  a = a || window;
  var b = "rangeDate",
    c = function() {
      var b = a.getEvt(),
        c = b.target;
      return "A" == c.tagName && a.getAh(c).length > 2
        ? (b.preventDefault(), void d(c))
        : void a.selectA();
    },
    d = (c.showPanel = function(b) {
      var c = T(a.getPnode(b, ".rangeDate")),
        d = c.find(".sltVal");
      a.rangePanel(
        c.offset(),
        [c.attr("limitB"), c.attr("limitE"), d.val()],
        function(e) {
          if (e) {
            var f = a.fnsDate,
              g = e.split("|"),
              h = f(g[0]),
              i = f(g[1]);
            c
              .find(".sltTxt")
              .html(
                h.format("yyyy") +
                  "年" +
                  h.format("mm") +
                  "月-" +
                  i.format("yyyy") +
                  "年" +
                  i.format("mm") +
                  "月"
              ), (b.href = "#" + e), d.val(e).change(), BID.advSearch();
          }
        }
      );
    });
  return (a[b] = c);
})(BID), (function(a) {
  a = a || window;
  var b = "ymDateA",
    c = a.fnsDate().month(-3),
    d = a.fnsDate().date(-1),
    e = function() {
      var b = a.getEvt(),
        c = b.target,
        d = a.getPnode(c, ".ymDateA");
      if (!T(d).attr("initD")) {
        var e = f(d);
        g(d, e), h(d, e), T(d).attr("initD", "initD");
      }
      a.getPnode(c, ".selectA") && a.selectA();
    },
    f = (e.getLimits = function(a) {
      a = T(a);
      var b = a.find(".yearA .sltVal").val(),
        c = a.find(".monthA .sltVal", a).val();
      return [a.attr("limitB"), a.attr("limitE"), b + ("0" + c).slice(-2)];
    }),
    g = (e.limitYear = function(b, e) {
      (e = e || f(b)), (b = T(b));
      var g = a.fnsDate,
        h = g(e[0] || c).year(),
        i = g(e[1] || d).year(),
        j = b.find(".yearA .sltOpt a");
      if (!j.length) {
        for (var k = "", l = h; i >= l; l++)
          k += '<a href="#' + l + '">' + l + "年</a>";
        j = b.find(".yearA .sltOpt").html(k).find("a");
      }
      j.each(function() {
        var b = a.getAh(this);
        h > b || b > i ? T(this).addClass("dsab") : T(this).removeClass("dsab");
      });
    }),
    h = (e.limitMonth = function(b, e) {
      (e = e || f(b)), (b = T(b));
      var g = a.fnsDate,
        h = g(e[0] || c).monthHead(),
        i = g(e[1] || d).monthHead(),
        j = g(e[2]).year(),
        k = b.find(".monthA .sltOpt a");
      if (!k.length) {
        for (var l = "", m = 1; 12 >= m; m++)
          7 == m && (l += "</li><li>"), (l +=
            '<a href="#' +
            ("0" + m).slice(-2) +
            '">' +
            ("0" + m).slice(-2) +
            "<i>月</i></a>");
        k = b.find(".monthA .sltOpt").html("<li>" + l + "</li>").find("a");
      }
      k.each(function() {
        var b = g(j + ("0" + a.getAh(this)).slice(-2));
        h > b || b > i ? T(this).addClass("dsab") : T(this).removeClass("dsab");
      });
    });
  e.change = function() {
    var b = a.getEvt(),
      e = b.target,
      g = e.value,
      i = T(a.getPnode(e, ".ymDateA")),
      j = i.find("input.ymValue");
    if (g.length < 4) j.val(j.val().slice(0, 4) + ("0" + g).slice(-2));
    else {
      var k = a.fnsDate,
        l = f(i[0]),
        m = k(l[0] || c),
        n = k(l[1] || d),
        o = k(g + k(l[2]).format("mm")),
        p = o;
      if ((h(i[0], l), m > o && (p = m), o > n && (p = n), p != o)) {
        var q = p.format("mm"),
          r = a.selectA.getNodes(i.find(".monthA")[0]);
        r.val.val(q), r.txt.html(q + "月");
      }
      j.val(p.format("yyyymm"));
    }
    T(j).change();
  };
  return (a[b] = e);
})(BID), (function(a) {
  a = a || window;
  var b = "rangePanel",
    c = a.fnsDate().month(-3),
    d = a.fnsDate().date(-1),
    e = "",
    f = 0,
    g = "",
    h = 0,
    i = 0;
  PPval && PPval.dataStm && (d = a.fnsDate(PPval.dataStm));
  var j = function(a, b, c) {
      var d = p();
      k(d, b), l(d, b), T(d)
        .css({ left: a.left + 1, top: a.top + 24 })
        .show(), (i = h = 1), (f = c);
    },
    k = (j.setLimit = function(b, e) {
      var f = a.fnsDate,
        g = f(e[0] || c).format(),
        h = f(e[1] || d).format();
      T(b).find(".ymDateA").each(function() {
        T(this).attr("limitB", g).attr("limitE", h).attr("initD", "");
      });
    }),
    l = (j.setRange = function(b, e) {
      b = T(b);
      var f = a.fnsDate,
        g = [c, d];
      if (e[2]) {
        var h = (e[2] + "|").split("|");
        h[0].length > 3 && (g[0] = f(h[0])), h[1].length > 3 &&
          (g[1] = f(h[1]));
      }
      e[0] && g[0] < f(e[0]) && (g[0] = f(e[0])), e[1] &&
        g[1] > f(e[1]) &&
        (g[1] = f(e[1]));
      var i,
        j = g[0].format("yyyy"),
        k = g[0].format("mm"),
        l = g[1].format("yyyy"),
        m = g[1].format("mm");
      (i = b.find(
        ".ymValue"
      )), (i[0].value = g[0].format()), (i[1].value = g[1].format()), (i = b.find(
        ".yearA .sltVal"
      )), (i[0].value = j), (i[1].value = l), (i = b.find(
        ".yearA .sltTxt"
      )), (i[0].innerHTML = j + "年"), (i[1].innerHTML = l + "年"), (i = b.find(
        ".monthA .sltVal"
      )), (i[0].value = k), (i[1].value = m), (i = b.find(
        ".monthA .sltTxt"
      )), (i[0].innerHTML = k + "月"), (i[1].innerHTML = m + "月");
    }),
    m = (j.clickRange = function() {
      h = 1;
      var b = a.getEvt("input"),
        c = b.target;
      c &&
        ("取消" == c.value || "确定" == c.value) &&
        ((h = 0), "确定" == c.value && n());
    }),
    n = (j.applyRange = function(b) {
      var f = a.fnsDate,
        h = T("#" + e + " .ymDateA .ymValue"),
        i = f(T(a.getPnode(h[0], ".ymDateA")).attr("limitB") || c),
        j = f(T(a.getPnode(h[1], ".ymDateA")).attr("limitE") || d),
        k = h[0].value,
        l = h[1].value;
      k > l && (k = [l, (l = k)][0]), (k = f(k).monthHead()), (l = f(
        l
      ).monthEnd()), i > k && (k = i), l > j && (l = j), (g = [
        (h[0].value = k.format()),
        (h[1].value = l.format())
      ].join("|")), b && b(g);
    }),
    o = (j.hideRange = function() {
      i &&
        !h &&
        (T("#" + e).hide(), (i = 0), f && f(g), (f = 0), (g = "")), (h = 0);
    }),
    p = (j.getPanel = function() {
      if (e) return T("#" + e)[0];
      e = a.gsid(b);
      var b = document.createElement("div");
      (b.id = e), (b.className = "rangePanel");
      var c =
          '<span class="ymDateA" limitB="" limitE="" onclick="BID.ymDateA()">    <input class="ymValue" value="" />    <span class="selectA yearA">        <input class="sltVal" value="" onchange="BID.ymDateA.change()" />        <span class="sltTxt"></span>        <div class="sltOpt"></div>    </span>    <span class="selectA monthA">        <input class="sltVal" value="" onchange="BID.ymDateA.change()" />        <span class="sltTxt"></span>        <ul class="sltOpt"></ul>    </span></span>        ',
        d =
          '<div class="ptb05"><span>起始：</span>' +
          c +
          '</div><div class="ptb05"><span>结束：</span>' +
          c +
          '</div><div class="ptb05 pl20">    <input type="button" class="button ml20" value="确定" />    <input type="button" class="button ml20" value="取消" /></div>        ';
      return T(document.body).click(o), T(b)
        .click(m)
        .html(d)
        .appendTo(document.body), b;
    });
  return (a[b] = j);
})(BID), (function(a) {
  a = a || window;
  var b = "regionA",
    c = function() {
      var b = a.getEvt(),
        c = b.target,
        f = T(a.getPnode(c, ".selectA"));
      if (f.length) {
        if (!f.hasClass("slided")) {
          var g = f.find(".sltOpt");
          if (f.hasClass("provA")) g.find("a").length || g.html(d());
          else {
            var h = T(a.getPnode(f[0], ".regionA"))
                .find(".selectA.provA .sltVal")
                .val(),
              i = f.find(".sltTxt");
            i.html(i.text().slice(0, 5)), g.html(e(h));
          }
          var j = a.getPnode(f[0], ".comBorderL");
          j &&
            (T(j).offset().top >
            T(document).scrollTop() + T(window).height() / 2
              ? g.css({ "margin-top": -g.height() - 53 })
              : g.css({ "margin-top": "" }));
        }
        a.selectA();
      }
    },
    d = (
      (c.change = function() {
        var b = a.getEvt(),
          c = b.target,
          d = T(a.getPnode(c, ".selectA")),
          e = T(a.getPnode(d[0], ".regionA")),
          f = e.find(".regionValue"),
          g = e.find(".selectA.provA .sltVal"),
          h = e.find(".selectA.cityA .sltVal");
        d.hasClass("provA") &&
          (e.find(".selectA.cityA .sltTxt").html("所有城市"), h.val("0")), "" !=
          h.val() && "0" != h.val()
          ? f.val(h.val())
          : f.val(g.val()), f.change();
      }),
      (c.buildProv = function() {
        var b = '<dl><dt>&nbsp;</dt><dd><a href="#0">所有省份</a></dd></dl>',
          c = a.cityIDname();
        for (var d in f)
          (b += "<dl><dt>" + d + "：</dt><dd>"), T.array(f[d]).each(function(
            a,
            d
          ) {
            b += '<a href="#' + d + '">' + c.citys(d) + "</a> ";
          }), (b += "</dd></dl><dl></dl>");
        return b;
      })
    ),
    e = (c.buildCity = function(b) {
      var c = a.cityIDname(),
        d = '<dl><dt><a href="#0">所有城市</a></dt><dd>';
      return c.citys(b, function(a, b) {
        d += '<a href="#' + a + '">' + b + "</a> ";
      }), d + "</dd></dl><dl></dl>";
    }),
    f = (c.datStor = {
      "A-G": [928, 934, 911, 904, 909, 913, 925, 912, 902],
      "H-J": [920, 921, 927, 908, 906, 930, 922, 916, 903],
      "L-S": [907, 905, 919, 918, 910, 914, 901, 929, 924],
      "T-Z": [923, 931, 932, 933, 926, 915, 917]
    });
  c.setVal = function(b, c) {
    (c = c || b.value), (b.value = c = c || "0");
    var d = T(a.getPnode(b, ".regionA")),
      e = d.find(".regionValue"),
      f = d.find(".selectA.provA .sltVal"),
      g = d.find(".selectA.provA .sltTxt"),
      h = d.find(".selectA.cityA .sltVal"),
      i = d.find(".selectA.cityA .sltTxt"),
      j = a.cityIDname(),
      k = (cID = c),
      l = j.citys(k),
      m = j.city(cID).name;
    l || m
      ? m ? ((k = j.city(cID).pid), (l = j.citys(k))) : (cID = "0")
      : ((k = cID = "0"), (l = "所有省份")), f.val(k), g.html(l), "0" !== cID
      ? (e.val(cID), h.val(cID), i.html(m))
      : (e.val(k), f.change());
  };
  return (a[b] = c);
})(BID), (BID.crAdvPannel = function() {
  T("#adv_pannel .comCtl").each(function() {
    var a = T(this).parent().attr("ctlName");
    if ((T(this).html(T("#advTpls_" + a).html()), 6 == T.browser.ie)) {
      var b = this;
      setTimeout(function() {
        T(b)
          .find(".rangeDate")
          .css({
            position: "relative"
          }), T(b).find("i.delComp").css({ position: "relative" });
      }, 5);
    }
  });
}), (BID.add_del_comp = function() {
  var a = BID.getEvt(),
    b = a.target,
    c = b.className,
    d = BID.getPnode(b, ".tabCont"),
    e = T(d).find(".compUl"),
    f = e.find(".compLi");
  if (c.indexOf("delComp") >= 0)
    T(d).find(".addComp").removeClass("dsn"), T(b)
      .closest(".compLi")
      .addClass("dsn")
      .appendTo(e)
      .find(".comWord")
      .val("");
  else {
    if (((b = BID.getPnode(b, ".addComp")), !b)) return;
    f.each(function(a) {
      return a >= f.length - 1 &&
        T(b).addClass(
          "dsn"
        ), T(this).hasClass("dsn") ? (T(this).removeClass("dsn"), BID.advPannelFilled && T(this).find(".comWord").mousedown().focus(), "break") : void 0;
    });
  }
  f.filter(".dsn").length >= 4
    ? e.addClass("hideDel")
    : e.removeClass("hideDel"), e.find(".compLi").each(function(a) {
    T(this).find(".comBorderR").css({ "border-color": BID.getColor(a) });
  });
}), (BID.createSug = function() {
  var a = BID.getEvt().target;
  (a.onmousedown = null), T(a)
    .focus(function() {
      T(this)
        .css({ "background-color": "#fff" })
        .closest(".comCtl")
        .addClass("curr");
    })
    .blur(function() {
      T(this)
        .css({ "background-color": "" })
        .closest(".comCtl")
        .removeClass("curr");
    })
    .change(function() {
      T("#addFavBtn").hide().parent().find(".compVsplit").show();
    })
    .keydown(function(a) {
      13 == a.keyCode && BID.advSearch();
    })
    .closest(".comCtl")
    .addClass("curr"), BID.newSuggestion(a, {
    offset: { width: 199, offsetX: -3, offsetY: 0 }
  });
}), (BID.scroll_resize = function() {
  function a() {
    var a = T(document).scrollLeft(),
      b = T(document).scrollTop();
    (d.dirTop = b - (d.top || 0)), (d.left = a), (d.top = b), BID.evts(
      "window_scroll",
      window,
      a,
      b
    );
  }
  if (!BID.w_size) {
    var b,
      c,
      d = (BID.w_size = {});
    (d.width = T(window).width()), (d.height = T(window).height()), a(), T(
      window
    )
      .scroll(a)
      .resize(function() {
        var a = T(window).width(),
          e = T(window).height(),
          f = 0,
          g = 0;
        if (((d.width = a), (d.height = e), a != b)) {
          if (
            (
              (f = 1),
              BID.evts("width_resize_all", window, a),
              (1e3 > a && 1e3 > b) || (a > 1300 && b > 1300)
            )
          )
            return (b = a);
          (b = a), BID.evts("width_resize", window, a);
        }
        e != c &&
          (
            (g = 1),
            (c = e),
            BID.evts("height_resize", window, e)
          ), (f || g) && BID.evts("window_resize", window, a, e);
      });
  }
}), (BID.addFavWords = function() {
  var a = BID.getEvt(),
    b = T(BID.getPnode(a.target, "a")),
    c = "Attention/";
  if (b.hasClass("rTahref")) {
    if (
      (
        b.hasClass("setFaved") &&
          (
            b.removeClass("setFaved").addClass("setFaving"),
            BID.dataInterface(
              c + "del/",
              "",
              function(a) {
                0 == a.status
                  ? b
                      .removeClass("setFaving")
                      .addClass("setFav")
                      .attr({ title: "点击加入收藏" })
                  : b.removeClass("setFaving").addClass("setFaved");
              },
              { noCache: 1 }
            )
          ),
        !b.hasClass("setFav")
      )
    )
      return;
    return b
      .removeClass("setFav")
      .addClass("setFaving"), void BID.dataInterface(
      c + "add/",
      "",
      function(a) {
        0 == a.status
          ? b
              .removeClass("setFaving")
              .addClass("setFaved")
              .attr({ title: "点击取消收藏" })
          : (
              b.removeClass("setFaving").addClass("setFav"),
              new magic.Dialog({
                draggable: !0,
                titleText: "温馨提示：",
                content: a.sErr,
                contentType: "html",
                width: 280,
                height: 165,
                mask: { enable: !0 }
              }).render()
            );
      },
      { noCache: 1 }
    );
  }
}), (BID.holdReg = function() {
  var a,
    b,
    c,
    d = BID.getEvt(),
    e = BID.getPnode(d.target, ".holdBox"),
    f = BID.getPnode(d.target, ".comBorderL");
  if (!T(f.parentNode).hasClass("dsab"))
    if (e)
      T(e)
        .addClass("slided")
        .closest(".comCtl")
        .find(".comBorderR .delComp")
        .addClass("dsn"), (a = T(e).siblings(".regionA")), (b = a.find(
        ".provA"
      )), (d.target = d.srcElement = b[0]), setTimeout(function() {
        b.eq(0).click();
      }, 2);
    else if (
      (a = BID.getPnode(d.target, ".regionA")) &&
      ((a = T(a)), "A" === d.target.tagName)
    ) {
      var g = BID.getAh(d.target),
        h = BID.getPnode(d.target, ".selectA");
      "0" != g &&
        T(h).hasClass("provA") &&
        (
          (c = a.find(".cityA")),
          (d.target = d.srcElement = c[0]),
          setTimeout(function() {
            c.eq(0).click();
          }, 2)
        );
    }
}), (BID.holdRegChg = function() {
  var a = BID.getEvt().target;
  T(a)
    .closest(".comBorderL")
    .find(".holdBox")
    .find(".holdText")
    .html(BID.cityIDname().get_name(a.value, "", 12));
}), BID.evts.care("selectA_slideUp", function(a) {
  (a = T(
    a
  )), (a.hasClass("provA") || a.hasClass("cityA")) && (a.closest(".regionA").find(".slided").length || a.closest(".comBorderL").find(".holdBox").removeClass("slided").closest(".comCtl").find(".comBorderR .delComp").removeClass("dsn"));
}), (BID.showHelpTip = function(a) {
  var b,
    c = BID.getEvt("i"),
    d = c.target;
  if (d) {
    if (((d = T(d)), d.hasClass("help"))) {
      var e = d.closest(".titlBar");
      if (((b = e.siblings(".tipinfo")), !b.length)) {
        var f = BID.sTips[a] || a;
        (b = T('<div class="tipinfo"></div>').insertAfter(e).hide()), b.html(
          '<div class="tiparro"><i class="icons tipAup"></i><i class="icons close"></i></div><div class="tipcont">' +
            f +
            "</div></div>"
        );
      }
      T(document).off("click", BID.hideHelpTip).on("click", BID.hideHelpTip);
    }
    if (b.hasClass("showing")) b.removeClass("showing").stop().slideUp();
    else {
      var g = d.position();
      b
        .addClass("showing")
        .stop()
        .slideDown()
        .find(".tipAup")
        .css("left", g.left);
    }
  }
}), (BID.hideHelpTip = function() {
  var a = 1,
    b = 1,
    c = BID.getEvt(),
    d = T(c.target),
    e = d.closest(".tipinfo");
  e.length
    ? d.hasClass("close") ? (b = 0) : (a = 0)
    : ((e = T("div.tipinfo")), d.hasClass("help") && (a = 0)), a &&
    (
      e.removeClass("showing").stop().slideUp(),
      b && T(document).off("click", BID.hideHelpTip)
    );
}), (function(a) {
  a = a || window;
  var b = "sentimBlock",
    c = function(a) {
      return this instanceof c
        ? ((this.elids = { box: a }), void (this.oBox = T("#" + a)))
        : new c(a);
    },
    d = (c.eHTML = function(a) {
      var b = [];
      return T.array(a).each(function(a, c) {
        b.push(T.string(c).encodeHTML());
      }), b;
    }),
    e = (c.sTPL = function(a, b) {
      for (var c = Array(b || 5), d = c.length; d--; )
        c[d] = a.replace("{index}", d);
      return c.join("");
    }),
    f = c.prototype;
  return (f.getEl = function(b) {
    b = b || "box";
    var c = this.elids,
      d = T("#" + c[b]);
    if (!d.length) {
      switch (b) {
        case "titlBar":
        case "tabUnit":
          d = this.getEl().children("." + b);
          break;
        case "tabTitle":
        case "tabConts":
        case "baiduTpl":
          d = this.getEl("tabUnit").children("." + b);
          break;
        case "tabUl":
          d = this.getEl("tabTitle").children("." + b);
      }
      c[b] = a.gsid(d[0]);
    }
    return d;
  }), (f.title = function(b, f) {
    var g = this.getEl("titlBar"),
      h = g.find(".compInfo"),
      i = a.getParams(),
      j = a.getParams.C32(),
      k = [],
      l = j.c_32;
    return (c.revert || (f && f.revert)) &&
      (
        (l = j.c32.slice()),
        0 == i.type
          ? l[0] && l[0].indexOf("年") > 0 && (l[0] = j.c_32[0])
          : l[1] && l[1].indexOf("年") > 0 && (l[1] = j.c_32[1])
      ), 0 == i.type
      ? ((k = [j.tags[0], l[0], l[1]]), 1 != j.tags.length && (k[0] = ""))
      : ((k = [l[0], l[1], j.tags[0]]), (k[2] = "")), T(
      "#industryName"
    ).html() && (k[0] = T("#industryName").html()), h.length ||
      (h = g
        .append(e('<span class="compInfo"></span>', 3))
        .find(".compInfo")), (b = d(b)), h.eq(0).html(b[0] || k[0]), h
      .eq(1)
      .html(b[1] || k[1]), h.eq(2).html(b[2] || k[2]), h.each(function() {
      var a = this.innerHTML;
      a && " " != a ? T(this).show() : T(this).hide();
    }), this;
  }), (f.tabTils = function(b, c) {
    c = c || 0;
    var f = this.getEl("tabTitle"),
      g = this.getEl("tabUl"),
      h = g.find(".tabLi"),
      i = a.getParams.C32();
    h.length ||
      (h = g
        .append(
          e(
            '<a class="tabLi gColor{index}" href="javascript:;"><div class="nmTab"></div><div class="hvTab"></div></a>'
          )
        )
        .find(".tabLi")), (b = b.length ? d(b) : i.tags), b.length > 1
      ? f.show()
      : f.hide(), h
      .hide()
      .removeClass("curr")
      .each(function(a) {
        return a >= b.length
          ? "break"
          : (
              T(this).show().find(".nmTab, .hvTab").html(b[a]),
              void (this.title = b[a])
            );
      })
      .eq(c)
      .addClass("curr");
    var j = this.getEl("tabConts"),
      k = j.children(".tabCont");
    return k.length ||
      (k = j
        .append(
          e('<div class="tabCont gColor{index} dsn" style="zoom:1;"></div>')
        )
        .children(".tabCont")), k.eq(c).removeClass("dsn"), this;
  }), (a[b] = c);
})(BID), (function(a) {
  a = a || window;
  var b,
    c = 0,
    d = (a.vVerify = function() {
      b || (b = h()), b.isShowing() ||
        (
          g(),
          T(b.getElement("content"))
            .find(".mainCont")
            .show()
            .siblings(".checking")
            .hide(),
          b.show(),
          b.center()
        );
    }),
    e = (
      (d.hide = function() {
        b.hide();
      }),
      (d.checkVerify = function() {
        if (!c) {
          var a = T(b.getElement("content")).find(".verifyInput").val();
          if (!a) return void alert(BID.sTips.lVerify);
          T(b.getElement("content"))
            .find(".mainCont")
            .hide()
            .siblings(".checking")
            .show(), (PPval.status = -301), (c = 1), BID.dataInterface(
            "Verify/Check/",
            "code=" + a,
            function(a) {
              if (((c = 0), 0 == a.status)) return void location.reload();
              g(), T(b.getElement("content"))
                .find(".mainCont")
                .show()
                .siblings(".checking")
                .hide();
              var d = BID.sTips.xVerify;
              2 == a.status && (d = BID.sTips.xVerify5), setTimeout(function() {
                alert(d);
              }, 100);
            },
            { noCache: !0 }
          );
        }
      })
    ),
    f = (d.getCntHtml = function() {
      var a = ['<div class="mainCont">'];
      return a.push('<p class="tiptext">' + BID.sTips.tVerify + "</p>"), a.push(
        '<div class="itemtext">验证码：</div>'
      ), a.push(
        '<input class="verifyInput" maxlength="4" onkeydown="BID.vVerify.keyDown()" />'
      ), a.push(
        '<img class="verifyImg" src="javascript:;" title="点击刷新验证码" onclick="BID.vVerify.refreshImg()" />'
      ), a.push('</div><div class="checking"></div>'), a.join("");
    }),
    g = (d.refreshImg = function() {
      T(b.getElement("content"))
        .find(".verifyImg")
        .attr(
          "src",
          PPval.dataface + "Verify/Get/?res=" + PPval.ppt + "&" + +new Date()
        );
    }),
    h = (
      (d.keyDown = function() {
        var b = a.getEvt();
        13 == b.keyCode && e();
      }),
      (d.getDialog = function() {
        return (b = new magic.Dialog({
          draggable: !0,
          content: f(),
          contentType: "html",
          width: 280,
          height: 165,
          mask: { enable: !0 },
          buttons: {
            enable: !0,
            align: "right",
            items: [{ text: "确定", click: e }]
          }
        })), b.render(), b.hide(), T(b.getElement("")).addClass(
          "verifyDialog"
        ), T(b.getElement("body")).height(120), T(
          b.getElement("footer")
        ).height(43), b;
      })
    );
})(BID), $(function() {
  var a = function(a) {
      a.addClass("hover");
    },
    b = function(a) {
      a.removeClass("hover");
    };
  $("#subNav td").hover(
    function() {
      a($(this).children("a"));
    },
    function() {
      b($(this).children("a"));
    }
  ), $("#subNav a").hover(
    function() {
      a($(this));
    },
    function() {
      b($(this));
    }
  ), $("#subNav span").hover(
    function() {
      a($(this).parent());
    },
    function() {
      b($(this).parent());
    }
  );
}), $(function() {
  var a = $("#schfm");
  $("#schword")
    .focus(function() {
      a.addClass("schfm-focus");
    })
    .blur(function() {
      a.removeClass("schfm-focus");
    }), setTimeout(function() {
    $(document).on("click", "li.compLi i.addComp", function() {
      var a = $(this),
        b = a.parents("li.compLi"),
        c = a.siblings("div.comBorderL").length + 1;
      if (3 >= c) {
        if (2 === c) {
          var d = a.parent().find("div.comBorderL div.inner").eq(0),
            e = d.find("input").val(),
            f = "" === e ? 80 : BID.getWidth(e, "16") + 24;
          d.width(f);
        }
        b.append(
          '<div class="comBorderL"><span class="addicon">+</span><div class="inner" style="width:80px;"><input name="word" value="" class="comWord" maxlength="50" onmousedown="BID.createSug()" autocomplete="off"></div></div>'
        ), b.removeClass("compLi2").addClass("compLi" + c);
      }
    });
  }, 300);
}), (function(a) {
  a = a || window;
  var b,
    c,
    d = "getParams",
    e = {
      0: 0,
      1: 89,
      2: 179,
      3: 359,
      4: 719,
      10: 719,
      11: 0,
      12: 6,
      13: 29,
      14: 0
    },
    f = {
      0: "当月",
      1: "最近3个月",
      2: "最近6个月",
      3: "最近12个月",
      4: "全部时间",
      10: "全部时间",
      11: "昨天",
      12: "最近7天",
      13: "最近30天",
      14: "当月"
    },
    g = function(a) {
      if (b && !a) return b;
      switch ((
        (b = {}),
        T("#adv_schfm input").each(function() {
          var a = this.name,
            c = this.value,
            d = c.split(/[,，]+/);
          "type" === a && (d = c), (b[a] = d);
        }),
        b.type
      )) {
        case "1":
          (b.word.length = b.time.length = 1), b.time[0] || (b.time[0] = "0");
          break;
        case "2":
          (b.word.length = b.area.length = 1), b.area[0] || (b.area[0] = "0");
          break;
        default:
          (b.type = "0"), (b.area.length = b.time.length = 1), b.area[0] ||
            (b.area[0] = "0"), b.time[0] || (b.time[0] = "0");
      }
      return (g.params = b);
    },
    h = (
      (g.time = function() {
        var b = a.fnsDate,
          c = g().time,
          d = [];
        return a.each(c, function(a, c) {
          if (c.length <= 2) {
            var f = b(PPval.dataStm),
              g = b(+f).date(-e[c]);
            ("0" == c || "14" == c) && g.monthHead(), (c =
              g.format() + "|" + f.format());
          }
          d.push(c);
        }), d;
      }),
      (g.timeFormat = function(b) {
        var c = a.fnsDate;
        return (b = b.split("|")), (b[0] = c(b[0]).format(
          "yyyy年mm月"
        )), (b[1] = c(b[1]).format("yyyy年mm月")), b.join("-");
      })
    ),
    i = (g.time_format = function(b) {
      var c = a.fnsDate;
      return (b = b.split("|")), (b[0] = c(b[0]).format(
        "yyyy-mm-dd"
      )), (b[1] = c(b[1]).format("yyyy-mm-dd")), b.join(" 至 ");
    });
  g.C32 = function(b) {
    if (c && !b) return c;
    c = {};
    var d = a.fnsDate,
      j = g(),
      k = a.cityIDname();
    switch (j.type) {
      case "0":
        if (
          (
            (c.tags = j.word.slice()),
            (c.c32 = [f[j.time[0]] || h(j.time[0]), k.get_name(j.area[0])]),
            (c.c_32 = [j.time[0], c.c32[1]]),
            j.time[0] in e
          )
        ) {
          var l = d(PPval.dataStm),
            m = d(PPval.dataStm).date(-e[j.time[0]]);
          ("0" == j.time[0] || "14" == j.time[0]) &&
            (m = m.monthHead()), (c.c_32[0] = m.format() + "|" + l.format());
        }
        c.c_32[0] = i(c.c_32[0]);
        for (var n = c.tags.length; n--; )
          c.tags[n] = T.string(c.tags[n]).encodeHTML();
        break;
      case "1":
        if (
          (
            (c.c32 = [j.word[0], f[j.time[0]] || h(j.time[0])]),
            (c.c_32 = [j.word[0], j.time[0]]),
            j.time[0] in e
          )
        ) {
          var l = d(PPval.dataStm),
            m = d(PPval.dataStm).date(-e[j.time[0]]);
          ("0" == j.time[0] || "14" == j.time[0]) &&
            (m = m.monthHead()), (c.c_32[1] = m.format() + "|" + l.format());
        }
        (c.c_32[1] = i(c.c_32[1])), (c.tags = []);
        for (var n = j.area.length; n--; ) c.tags[n] = k.get_name(j.area[n]);
    }
    return c;
  };
  return (g.timeStr = f), (g.timeDay = e), (a[d] = g);
})(BID), (BID.fillAdvPannel = function() {
  var a = BID.getParams(),
    b = T("#adv_pannel .tabUnit"),
    c = b.find("ul.tabUl").eq(0).find(".tabLi"),
    d = b.find(".tabConts").eq(0);
  d.find(".tabCont").each(function(b) {
    var c = T(this).find("input"),
      d = T(this).find(".addComp");
    T.array(["word", "area", "time"]).each(function(b, e) {
      var f = -1;
      c.each(function() {
        if (this.name == e) {
          if (((f += 1), f >= a[e].length)) return "break";
          (this.value = a[e][f]), T(BID.getPnode(this, "li.comCtl"))
            .find(".comBorderR")
            .css({ "border-color": BID.getColor(f) }), "word" === e ||
            ("area" === e
              ? (BID.regionA.setVal(this), T(this).change())
              : "time" === e && BID.selectA.setVal(this)), f > 0 && d.click();
        }
      });
    });
  }), c.eq(+a.type).click(), (BID.advPannelFilled = 1);
}), (BID.getNewParams = function() {
  var a,
    b = {},
    c = [];
  return T("#adv_pannel .tabCont").each(function() {
    T(this).hasClass("dsn") || (a = T(this));
  }), T.array(["type", "time", "area", "word"]).each(function(d, e) {
    var f = [];
    a.find("input").each(function() {
      if (this.name == e) {
        var a = this.value.replace(/^\s+|\s+$/g, "");
        !BID.getPnode(this, ".dsn") && a && f.push(a);
      }
    }), "type" === e && (f = f[0]), "word" === e &&
      0 === $("#compTab li.curr").index() &&
      (
        (f = []),
        $("#adv_pannel div.tabContWord li.compLi:not(.dsn)").each(function() {
          (c = []), $(this).find("input.comWord").each(function() {
            var a = $.trim($(this).val());
            a && "" !== a && c.push(a);
          }), c.length > 0 && f.push(c.join("+"));
        })
      ), (b[e] = f);
  }), b;
}), (BID.advSearch = function(a) {
  a = a || BID.getNewParams();
  var b = T("#adv_schfm"),
    c = b.find("input");
  if (
    (
      "" === a.word.join(",") &&
        ((a.word = BID.getParams().word), "0" != a.type && (a.word.length = 1)),
      T.object.each(a, function(a, b) {
        "string" != typeof a && (a = a.join(",")), c.each(function() {
          this.name == b && (this.value = a);
        });
      }),
      6 == T.browser.ie
    )
  ) {
    var d = BID.getEvt();
    T(d.target).closest("a").length &&
      (d.stopPropagation(), d.preventDefault());
  }
  b.submit();
}), (BID.searchNew = function(a) {
  "string" == typeof a && (a = [a]);
  var b = BID.getParams();
  (b.word = a), BID.advSearch(b);
}), (BID.getWidth = function(a, b) {
  var c = document.getElementById("__getwidth");
  return null == c &&
    (
      (c = document.createElement("span")),
      (c.id = "__getwidth"),
      document.body.appendChild(c),
      (c.style.visibility = "hidden"),
      (c.style.whiteSpace = "nowrap")
    ), (c.innerText = a), (c.style.fontSize = b + "px"), c.offsetWidth;
}), (BID.splitWord = function() {
  $("#adv_pannel div.inner input.comWord").each(function() {
    var a = $(this),
      b = a.val();
    if (b && b.indexOf("+") > -1) {
      var c = b.split("+"),
        d = a.parents("li.compLi");
      d.addClass("compLi" + c.length), _.each(c, function(b, c) {
        var e = BID.getWidth(b, "16") + 24;
        0 === c
          ? a.val(b).parent().width(e)
          : d.append(
              '<div class="comBorderL"><span class="addicon">+</span><div class="inner" style="width:' +
                e +
                'px;"><input name="word" value="' +
                b +
                '" class="comWord" maxlength="50" onmousedown="BID.createSug()" autocomplete="off"></div></div>'
            );
      });
    }
  });
}), (BID.hotWordsClick = function() {
  var a = BID.getEvt(),
    b = T(a.target);
  b.hasClass("hotWord") &&
    (BID.searchNew(T.string(b.text()).trim()), a.preventDefault());
}), (function(a) {
  function b(a, b, d) {
    var e = c(b || "tyufCBJKQas", d || h || g);
    a = a.split("");
    for (var f = a.length; f--; ) a[f] = e[a[f]];
    return a.join("");
  }
  function c(a, b) {
    (a = a || "k"), (b = ((b || "") + a).split(""));
    for (var c = a.length, d = 0, e = {}, f = 0; f < b.length; f++)
      if (!(b[f] in e) && ((e[b[f]] = d), ++d >= c)) {
        e[b[f]] = ",";
        break;
      }
    return e;
  }
  a = a || window;
  var d = [],
    e = 0,
    f = "",
    g = "",
    h = "";
  (a.res2 = function(a) {
    f ? (g ? (h = a) : ((g = a), (PPval.res2 = g))) : (f = a);
  }), (a.dataInterface = function(b, c, e, g) {
    g = g || {};
    var h = "get",
      k = { status: -1, message: "data Error", data: null, sErr: "data Err" };
    if (301 == PPval.status) return void a.vVerify();
    c && "string" != typeof c
      ? (h = "post")
      : (
          (c = c || ""),
          "&" == c.charAt(0) && (c = c.slice(1)),
          g.noCache && (c += "&" + +new Date())
        ), g.loading && a.toLoading(g.loading);
    var l = { name: b, type: h, data: c, funCbk: e, deta: k, opts: g };
    f ? (d.push(l), i()) : j(l);
  });
  var i = function() {
      clearTimeout(e), d.length && ((e = setTimeout(i, 20)), g && j(d.shift()));
    },
    j = function(c) {
      var d =
          PPval.dataface +
          c.name +
          "?res=" +
          PPval.ppt +
          (g ? "&res2=" + g : ""),
        e = function(b, d) {
          c.opts.loading && a.toLoading(c.opts.loading, 1), c.funCbk &&
            c.funCbk(a.sCopy({ rawData: d }, c.deta));
        },
        f = function(d) {
          try {
            d = T.json.parse(d);
          } catch (e) {
            d = a.sCopy({ rawData: d }, c.deta);
          }
          if (
            (
              d.status && "0" != d.status
                ? (
                    (d.status = +d.status),
                    isNaN(d.status) && (d.status = -1),
                    (d.sErr = d.message || "data Error")
                  )
                : (d.status = 0),
              c.opts.loading && a.toLoading(c.opts.loading, 1),
              c.name in
                { "Search/getAllIndex/": 1, "Search/getSubIndex/": 1 } && g
            )
          ) {
            try {
              for (var f = "userIndexes_", h = d.data.all.length; h--; )
                for (var i in { all: 1, pc: 1, wise: 1 }) {
                  var j = d.data[i][h],
                    k = j[f + "100"];
                  k && (j[f + "100"] = b(k)), (k = j[f + "30"]), k &&
                    (j[f + "30"] = b(k));
                }
            } catch (e) {}
            try {
              var l = d.data.forecast;
              if (l)
                for (var m in l) {
                  var n = l[m];
                  if (n)
                    for (var i in { all: 1, pc: 1, wise: 1 }) {
                      var j = n[i];
                      if (j) {
                        var k = j.str_day_100;
                        k && (j.str_day_100 = b(k)), (k = j.str_week_100), k &&
                          (j.str_week_100 = b(k));
                      }
                    }
                }
            } catch (e) {}
          }
          c.funCbk && c.funCbk(d);
        };
      return c.opts.noCache || "post" == c.type
        ? void T.ajax(d, {
            async: c.opts.async === !1 ? !1 : !0,
            type: c.type,
            data: c.data,
            timeout: 2e5,
            error: e,
            success: f
          })
        : (
            c.data && (d += "&" + c.data),
            a.cjax(d, f, { error: e, async: c.opts.async })
          );
    };
})(BID), (BID.dataBanner = function(a, b, c) {
  (a = "loc=" + a), b && "&" != b.charAt(0) && (b = "&" + b), (a +=
    b || ""), BID.dataInterface("Banner/getBannerPic/", a, function(a) {
    var b = a.data || [],
      d = "",
      e = [];
    b.sort(function(a, b) {
      return a.order - b.order;
    }), BID.each(b, function(a, b) {
      (d =
        '<img class="carousel_item_img" src="' +
        b.image_url +
        '" />'), b.image_href && "#" != b.image_href ? e.push({ content: '<a target="_blank" class="carousel_item_href" href="' + b.image_href + '">' + d + "</a>" }) : e.push({ content: d });
    }), c && c(b, e);
  });
}), (BID.crCarousel = function(a, b, c) {
  var d = BID.gsid(a);
  (c = BID.sCopy(c || {}, {
    isLoop: !0,
    viewSize: 1,
    focusRange: { min: 0, max: 1 },
    button: { enable: !0 },
    autoScroll: { interval: 9e3 },
    fx: { duration: 1e3 }
  })), (c.button.enable = b.length > 1 ? !0 : !1), (c.items = b);
  var e = new magic.Carousel(c);
  e.render(d), e.on("onmouseenter", function() {
    this.stop();
  }), e.on("onmouseleave", function() {
    this.start();
  }), (BID.crCarousel.inis[d] = e), T(a)
    .mouseenter(function() {
      var a = BID.crCarousel.inis[this.id];
      T(a.getElement("next")).show(), T(a.getElement("prev")).show();
    })
    .mouseleave(function() {
      var a = BID.crCarousel.inis[this.id];
      T(a.getElement("next")).hide(), T(a.getElement("prev")).hide();
    })
    .mouseleave();
}), (BID.crCarousel.inis = {}), (BID.toLoading = (function(a) {
  var b = {},
    c = 350;
  return function(d, e) {
    if (("string" == typeof d && (d = T("#" + d)[0]), d)) {
      var f = a.gsid(d),
        g = T(d),
        h = "",
        i = 0,
        j = g.children(".toLoading");
      (d = g[0]), clearTimeout(b[f]), e > 0
        ? (j.hide(), (d.style.height = h))
        : (
            (h = d.style.height),
            (i = g.height()),
            (b[f] = setTimeout(function() {
              var a = g.children(".toLoading");
              !h &&
                90 > i &&
                (d.style.height =
                  "90px"), a.length || ((a = T('<div class="toLoading"><div class="loadingImg"></div></div>')), g.prepend(a)), a.show();
            }, 0 > e ? 1 : c))
          );
    }
  };
})(BID)), (BID.toStamp = function(a, b, c, d) {
  (b = b || "50%"), (c = c || "50%");
  var e = (BID.gsid(a), T(a)),
    f = e.children(".toStamp");
  return d
    ? void f.hide()
    : (
        f.length || ((f = T('<div class="toStamp"></div>')), e.prepend(f)),
        void f.css({ left: b, top: c }).show()
      );
}), (function(a) {
  a = a || window;
  var b,
    c,
    d = 231,
    e = 300,
    f = {
      trendKey: "搜索##{words}#的热点趋势 ——分享自@百度指数。",
      cMap: "搜索##{words}#的地域分布 ——分享自@百度指数。"
    },
    g = (
      (a.shareBlockImg = function(k, l) {
        (l = l || {}), (l.tpl = l.tpl || k.tpl);
        var m = (a.getEvt("i") || {}).target;
        if (m) {
          if (
            (
              (m = T(m)),
              b ||
                (
                  (b = a
                    .getDialog("shareDialog", { width: e, height: d })
                    ._setContent("bdsBlockImg")),
                  b.on("hide", h),
                  (window.iiDialog = b)
                ),
              c
            )
          )
            return void alert("截图处理中，请勿频繁操作");
          c = { params: k, opts: l };
          var n = g(!0);
          m.hasClass("down")
            ? ((c.type = "down"), b.setTitleText("下载"), n.bds.hide())
            : (
                (c.type = "share"),
                b.setTitleText("分享"),
                (c.bdsText = T.string(f[l.tpl]).format({
                  words: a.getParams().word.join(",")
                })),
                n.bbx.attr("data", bdShare._getStrData({ text: c.bdsText }))
              ), b.show(), b.center(), (c.taskID = a.shareDown(k, {
            onLoad: j,
            onErr: i,
            url: l.url || "UserShare/getUserShare/"
          }));
        }
      }),
      function(a) {
        var b = T("#bdsBlockImg"),
          c = { rot: b };
        return (c.bds = b.find(".bdshareBds").show()), (c.bbx = b.find(
          ".bdshareBox"
        )), (c.pvu = b.find(".bdsPreview").addClass("loading_bg2").show()), a &&
          (
            c.bbx.attr("data", ""),
            c.pvu.html('<p class="infLabel">截图处理中</p>')
          ), c;
      }
    ),
    h = function() {
      a.shareDown.abort(c.taskID), (c = 0);
    },
    i = function(a) {
      if (c) {
        var e = g();
        if ("share" === c.type) {
          var f = e.pvu
            .removeClass("loading_bg2")
            .html('<p class="infLabel">' + a + "</p>")
            .height();
          b.setSize({ height: Math.max(d, f + 85) }), b.center();
        } else e.bds.hide(), alert("下载失败"), b.hide(), (c = 0);
      }
    },
    j = function(a) {
      if (c) {
        var d = 160,
          e = g();
        if ((e.pvu.removeClass("loading_bg2"), "share" === c.type))
          (d = e.pvu
            .html('<img class="prvImg" src="' + a + '" />')
            .height()), (d += 85), e.bbx.attr(
            "data",
            bdShare._getStrData({ pic: a, text: c.bdsText })
          );
        else {
          var f = c.params;
          f.download = !0;
          var h =
            PPval.dataface +
            "UserShare/getUserShare/?res=" +
            PPval.ppt +
            "&" +
            T.url.jsonToQuery(f);
          T("#bdsDownLoad")
            .attr("action", h)
            .submit(), e.bds.hide(), (d = e.pvu
            .html(
              '<img class="prvImg" src="' +
                a +
                '" /><br />如果您的浏览器没有自动开始下载<br />请在上图点击<span style="color:#e00;">右键</span>，选择<span style="font-weight:bold;">图片另存为</span>'
            )
            .height()), (d += 115);
        }
        b.center();
      }
    };
})(BID), (function(a) {
  a = a || window;
  var b,
    c,
    d,
    e = "shareDown",
    f = { busy: "截图处理中", xsrc: "截图生成失败", xpic: "截图打开失败" },
    g = 0,
    h = function() {},
    i = (a[e] = function(a, d) {
      return b
        ? void (d.onErr && d.onErr(f.busy))
        : (
            (b = a || {}),
            (c = d || {}),
            c.pic
              ? void j(c.pic)
              : ((g += 1), n(c.url, T.url.jsonToQuery(b)), g)
          );
    }),
    j = function(a, b) {
      l(a, "onLoad")(m(b));
    },
    k = function(a, b) {
      l(a, "onErr")(f.xsrc);
    },
    l = (i.abort = function(e, f) {
      return e != g
        ? h
        : (
            d && (a.tryaImg.abort(d), (d = 0)),
            b ? (f && (f = c[f] || h), (b = c = d = 0), f) : h
          );
    }),
    m = (i.dealURI = function(a) {
      if (a.indexOf("://") > 0) return a;
      var b = a.slice(0, 2),
        c = location.href.split("/").slice(0, -1).join("/") + "/";
      switch (b) {
        case "//":
          return a;
        case "..":
          return c + a;
        case "./":
          return c + a.slice(2);
      }
      var d = location.href.split("://");
      return "/" == a.charAt(0) ? d[0] + "://" + d[1].split("/")[0] + a : c + a;
    }),
    n = function(b, c) {
      var e = g;
      (b += b.indexOf("?") < 0 ? "?" : "&"), o(
        b + c,
        function(b) {
          b.src
            ? j(e, b.src)
            : b.img
              ? (
                  d && a.tryaImg.abort(d),
                  (d = a.tryaImg(
                    m(b.img),
                    function(a) {
                      j(e, a);
                    },
                    function() {
                      k(e, f.xpic);
                    }
                  ))
                )
              : k(e, f.xsrc);
        },
        function(a) {
          k(e, f.xsrc);
        }
      );
    },
    o = function(b, c, d) {
      var e = b.split("?");
      a.dataInterface(
        e[0],
        e.slice(1).join("?"),
        function(a) {
          !a.status && a.data ? c(a.data) : d(a.sErr);
        },
        { noCache: !0 }
      );
    };
})(BID), (function(a) {
  a = a || window;
  var b = "tryaImg",
    c = "加载图片失败",
    d = 6,
    e = 2e3,
    f = 5e3,
    g = 0,
    h = 0,
    i = 0,
    j = "",
    k = {},
    l = 0,
    m = 0,
    n = 0,
    o = (a[b] = function(a, b, c) {
      var d = ++l;
      return (k["i" + d] = {
        taskID: d,
        src: a,
        onLoad: b,
        onErr: c
      }), (j = r()), p(), d;
    }),
    p = (
      (o.abort = function(a) {
        return a != m
          ? void delete k["i" + a]
          : ((n = i = 0), void clearTimeout(g));
      }),
      function() {
        n
          ? setTimeout(p, e)
          : (n = q()) ? s() : (document.getElementById(j).src = "about:blank");
      }
    ),
    q = function() {
      for (var a; !a && l > m; ) (m += 1), (a = k["i" + m]);
      return a;
    },
    r = function() {
      if (j) return j;
      j = b + "_theTRYimg";
      var a = new Image();
      return (a.id = j), (a.onabort = t), (a.onerror = t), (a.onload = u), (a.style.cssText =
        "position:absolute;left:-32767px;top:0;"), document.body.appendChild(
        a
      ), j;
    },
    s = function() {
      if (n) {
        var a = n.src,
          b = (a.indexOf("?") < 0 ? "?" : "&") + +new Date();
        (document.getElementById(j).src = a + b), clearTimeout(
          h
        ), (h = setTimeout(t, f));
      }
    },
    t = function() {
      if ((clearTimeout(g), ++i < d && n)) g = setTimeout(s, e);
      else {
        try {
          n.onErr(c);
        } catch (a) {}
        n = i = 0;
      }
    },
    u = function() {
      try {
        n.onLoad(n.src);
      } catch (a) {}
      n = i = 0;
    };
})(BID), (function(a) {
  a = a || window;
  var b = {},
    c = (
      (a.getDialog = function(a, d) {
        (a = a || "dialog_comm"), (d = d || {});
        var e = b[a];
        if (e) {
          if (e.contentEID) {
            var f = e.contentPID ? T("#" + e.contentPID) : T(document.body);
            f.append(T("#" + e.contentEID));
          }
        } else
          (e = b[a] = new magic.Dialog({
            draggable: !0,
            content: "",
            contentType: "html",
            mask: { enable: !0 },
            buttons: { enable: !1 }
          })), e.render();
        return e.setTitleText(d.title || ""), e.setContent(
          d.content || "",
          "html"
        ), e.show(), (d.width || d.height) &&
          e.setSize(d), e.center(), (e._setContent = c), e;
      }),
      function(b, c) {
        if (this.contentEID) {
          var d = this.contentPID ? T("#" + this.contentPID) : T(document.body);
          d.append(T("#" + this.contentEID));
        }
        if ("html" == c)
          return (this.contentEID = ""), (this.contentPID =
            ""), this.setContent(b, c), this;
        var e = T("#" + b)[0];
        return (this.contentEID = b), (this.contentPID = a.gsid(
          e.parentNode
        )), this.setContent(e, "element"), this;
      }
    );
})(BID), (function(a) {
  var b =
    "undefined" == typeof module ? (a.baidu = a.baidu || {}) : module.exports;
  b.template = function(b, d) {
    var e = (function() {
        if (!a.document) return c._compile(b);
        var d = document.getElementById(b);
        if (d) {
          if (c.cache[b]) return c.cache[b];
          var e = /^(textarea|input)$/i.test(d.nodeName)
            ? d.value
            : d.innerHTML;
          return c._compile(e);
        }
        return c._compile(b);
      })(),
      f = c._isObject(d) ? e(d) : e;
    return (e = null), f;
  };
  var c = b.template;
  (c.versions = c.versions || []), c.versions.push(
    "1.0.6"
  ), (c.cache = {}), (c.LEFT_DELIMITER =
    c.LEFT_DELIMITER || "<%"), (c.RIGHT_DELIMITER =
    c.RIGHT_DELIMITER || "%>"), (c.ESCAPE = !0), (c._encodeHTML = function(a) {
    return String(a)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\\/g, "&#92;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }), (c._encodeReg = function(a) {
    return String(a).replace(/([.*+?^=!:${}()|[\]/\\])/g, "\\$1");
  }), (c._encodeEventHTML = function(a) {
    return String(a)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;")
      .replace(/\\\\/g, "\\")
      .replace(/\\\//g, "/")
      .replace(/\\n/g, "\n")
      .replace(/\\r/g, "\r");
  }), (c._compile = function(a) {
    var b =
      "var _template_fun_array=[];\nvar fn=(function(__data__){\nvar _template_varName='';\nfor(name in __data__){\n_template_varName+=('var '+name+'=__data__[\"'+name+'\"];');\n};\neval(_template_varName);\n_template_fun_array.push('" +
      c._analysisStr(a) +
      "');\n_template_varName=null;\n})(_template_object);\nfn = null;\nreturn _template_fun_array.join('');\n";
    return new Function("_template_object", b);
  }), (c._isObject = function(a) {
    return "function" == typeof a || !(!a || "object" != typeof a);
  }), (c._analysisStr = function(a) {
    var b = c.LEFT_DELIMITER,
      d = c.RIGHT_DELIMITER,
      e = c._encodeReg(b),
      f = c._encodeReg(d);
    return (a = String(a)
      .replace(new RegExp("(" + e + "[^" + f + "]*)//.*\n", "g"), "$1")
      .replace(new RegExp("<!--.*?-->", "g"), "")
      .replace(new RegExp(e + "\\*.*?\\*" + f, "g"), "")
      .replace(new RegExp("[\\r\\t\\n]", "g"), "")
      .replace(
        new RegExp(
          e +
            "(?:(?!" +
            f +
            ")[\\s\\S])*" +
            f +
            "|((?:(?!" +
            e +
            ")[\\s\\S])+)",
          "g"
        ),
        function(a, b) {
          var c = "";
          if (b)
            for (
              c = b.replace(/\\/g, "&#92;").replace(/'/g, "&#39;");
              /<[^<]*?&#39;[^<]*?>/g.test(c);

            )
              c = c.replace(/(<[^<]*?)&#39;([^<]*?>)/g, "$1\r$2");
          else c = a;
          return c;
        }
      )), (a = a
      .replace(
        new RegExp(
          "(" + e + "[\\s]*?var[\\s]*?.*?[\\s]*?[^;])[\\s]*?" + f,
          "g"
        ),
        "$1;" + d
      )
      .replace(
        new RegExp(
          "(" + e + ":?[hvu]?[\\s]*?=[\\s]*?[^;|" + f + "]*?);[\\s]*?" + f,
          "g"
        ),
        "$1" + d
      )
      .split(b)
      .join("	")), (a = c.ESCAPE
      ? a.replace(
          new RegExp("\\t=(.*?)" + f, "g"),
          "',typeof($1) === 'undefined'?'':baidu.template._encodeHTML($1),'"
        )
      : a.replace(
          new RegExp("\\t=(.*?)" + f, "g"),
          "',typeof($1) === 'undefined'?'':$1,'"
        )), (a = a
      .replace(
        new RegExp("\\t:h=(.*?)" + f, "g"),
        "',typeof($1) === 'undefined'?'':baidu.template._encodeHTML($1),'"
      )
      .replace(
        new RegExp("\\t(?::=|-)(.*?)" + f, "g"),
        "',typeof($1)==='undefined'?'':$1,'"
      )
      .replace(
        new RegExp("\\t:u=(.*?)" + f, "g"),
        "',typeof($1)==='undefined'?'':encodeURIComponent($1),'"
      )
      .replace(
        new RegExp("\\t:v=(.*?)" + f, "g"),
        "',typeof($1)==='undefined'?'':baidu.template._encodeEventHTML($1),'"
      )
      .split("	")
      .join("');")
      .split(d)
      .join("_template_fun_array.push('")
      .split("\r")
      .join("\\'"));
  });
})(window);
