(function () {
  挂件模式 = () => {
    if (window == window.parent) {
      return false;
    } else {
      return true;
    }
  };

  //感谢https://github.com/LancelotLewis/local-kitymind
  var oldData;
  var html = "";
  if (挂件模式()) {
    html += `<a href="" id="browser" class="diy broswerlink">浏览器打开</a>`;
  }
  html +=
    '<a href="" id="idinput" class="diy import" data-type="json">导入思源文档id</a>';
  (html += '<input class="diy idinput" id="siyuan"></input>'),
    (html += `<a href="" id="saver" class="diy import" onclick='保存数据'  >保存数据</a>`);

  (html += '<a href="" class="diy export" data-type="json">导出json</a>'),
    (html += '<a href="" class="diy export" data-type="md">导出md</a>'),
    (html += '<a href="" class="diy export" data-type="km">导出km</a>'),
    (html += '<a href="" class="diy export" data-type="svg">导出svg</a>'),
    (html += '<a href="" class="diy export" data-type="txt">导出text</a>'),
    (html += '<a href="" class="diy export" data-type="png">导出png</a>'),
    (html += '<button class="diy input">'),
    (html +=
      '导入<input type="file" id="fileInput" accept=".km,.txt,.md,.json,.ccmind" >'),
    (html += "</button>"),
    $(".editor-title").append(html);

  $(".diy").css({
    // 'height': '30px',
    // 'line-height': '30px',
    "font-size": "12px",
    "margin-top": "0px",
    float: "right",
    "background-color": "transparent",
    "min-width": "30px",
    "text-decoration": "none",
    color: "#999",
    padding: "0 10px",
    border: "none",
    "border-right": "1px solid #ccc",
  });
  $(".input")
    .css({
      overflow: "hidden",
      position: "relative",
    })
    .find("input")
    .css({
      cursor: "pointer",
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      display: "inline-block",
      opacity: 0,
    });

  $(document).on("click", ".export", function (event) {
    event.preventDefault();
    var $this = $(this),
      type = $this.data("type"),
      exportType;
    switch (type) {
      case "km":
        exportType = "json";
        break;
      case "md":
        exportType = "markdown";
        break;
      case "ccmind":
        exportType = "json";
        break;
      case "svg":
        exportType = "svg";
        break;
      case "txt":
        exportType = "text";
        break;
      case "png":
        exportType = "png";
        break;
      default:
        exportType = type;
        break;
    }

    editor.minder.exportData(exportType).then(function (content) {
      switch (exportType) {
        case "json":
          // console.log($.parseJSON(content));
          break;
        default:
          //   console.log(content);
          break;
      }
      var blob = new Blob();
      switch (exportType) {
        case "png":
          blob = dataURLtoBlob(content); //将base64编码转换为blob对象
          break;
        default:
          blob = new Blob([content]);
          break;
      }
      var a = document.createElement("a"); //建立标签，模拟点击下载
      a.download = $("#node_text1").text() + "." + type;
      a.href = URL.createObjectURL(blob);
      a.click();
    });
  });
  //加载数据

  解析url = function (url) {
    url = url || "";
    const queryObj = {};
    const reg = /[?&]([^=&#]+)=([^&#]*)/g;
    const queryArr = url.match(reg) || [];
    // console.log(queryArr)
    for (const i in queryArr) {
      if (Object.hasOwnProperty.call(queryArr, i)) {
        const query = queryArr[i].split("=");
        const key = query[0].substr(1);
        const value = decodeURIComponent(query[1]);
        queryObj[key]
          ? (queryObj[key] = [].concat(queryObj[key], value))
          : (queryObj[key] = value);
      }
    }
    // console.log(queryObj)
    return queryObj;
  };
  html转义 = function (原始字符串) {
    let 临时元素 = document.createElement("div");
    临时元素.innerHTML = 原始字符串;
    let output = 临时元素.innerText || 临时元素.textContent;
    临时元素 = null;
    return output;
  };
  挂件自身元素 = function () {
    try {
      return window.frameElement.parentElement.parentElement;
    } catch (e) {
      return null;
    }
  };
  加载数据 = async function () {
    console.log("加载");
    let url参数 = 解析url(window.location.href);
    /*挂件模式的判定在baselib的commonfunctionforsiyuan里*/
    /*挂件自身元素的获取也在baselib的commonfunctionforsiyuan里*/
    if (!挂件模式()) {
      window.baseid = url参数.baseid || "";
    } else {
      window.baseid = 挂件自身元素().getAttribute("data-node-id");
    }
    if (window.baseid) {
      let link = document.getElementById("browser");
      link
        ? link.addEventListener("click", function () {
            let browserurl = `http://${window.location.host}/widgets/cc-kityminder/?baseid=${window.baseid}`;
            window.open(browserurl, "_blank").location;
          })
        : null;
      let filepath = `assets/data-${window.baseid}.ccmind`;
      let url = window.location.host
        ? `http://${window.location.host}/${filepath}`
        : `localhost:6806/${filepath}`;
      var reader = new FileReader();
      reader.onload = function (e) {
        var content = reader.result;
        editor.minder.importData(fileType, content).then(function (data) {
          console.log(data);
          $(fileInput).val("");
        });
      };
      await axios.get(url).then((res) => {
        //  console.log(res.data)
        editor.minder.importData("json", res.data);
      });
    }
  };
  // 导入
  添加导入 = async function () {
    var fileInput = document.getElementById("fileInput");
    var idInput = document.getElementById("idinput");

    idInput.addEventListener("click", async function (event) {
      event.preventDefault();
      //console.log("测试")
      let idinput = document.getElementById("siyuan");
      console.log(idinput.value);
      res2 = await 以id获取文档块markdown(
        window.location.host,
        "",
        idinput.value
      );
      console.log(res2);
      try {
        let markdown = res2.data.content;
        if (markdown.startsWith("# ")) {
          editor.minder.importData("markdown", markdown);
        } else {
          markdown = `# ${res2.data.hPath.split("/").pop()}\n\n${markdown}`;
          editor.minder.importData("markdown", markdown);
        }
      } catch (e) {
        console.log(e);
      }
    });
    fileInput.addEventListener("change", function (e) {
      var file = fileInput.files[0],
        // textType = /(md|km)/,
        fileType = file.name.substr(file.name.lastIndexOf(".") + 1);
      console.log(file);
      switch (fileType) {
        case "md":
          fileType = "markdown";
          break;
        case "txt":
          fileType = "text";
          break;
        case "km":
        case "json":
          fileType = "json";
          break;
        default:
          console.log("File not supported!");
          alert("只支持.km、.md、、text、.json文件");
          return;
      }
      var reader = new FileReader();
      reader.onload = function (e) {
        var content = reader.result;
        editor.minder.importData(fileType, content).then(function (data) {
          console.log(data);
          $(fileInput).val("");
        });
      };
      reader.readAsText(file);
    });
  };
  (保存数据 = function () {
    console.log("保存");
    let url参数 = 解析url(window.location.href);
    /*挂件模式的判定在baselib的commonfunctionforsiyuan里*/
    /*挂件自身元素的获取也在baselib的commonfunctionforsiyuan里*/
    if (!挂件模式()) {
      window.baseid = url参数.baseid || "";
    } else {
      window.baseid = 挂件自身元素().getAttribute("data-node-id");
    }
    if (!window.baseid) {
      return null;
    }
    editor.minder.exportData("json").then(function (content) {
      // console.log(content)
      let blob = new Blob([JSON.stringify(content)]);
      let baseid = window.baseid;
      let 文件名 = `data-${baseid}.ccmind`;
      let 文件数据 = new File([blob], 文件名, { lastModified: Date.now() });
      let data = new FormData();
      data.append("assetsDirPath", "/assets/");
      data.append("file[]", 文件数据);
      let url = "http://" + window.location.host + "/api/asset/upload";
      let filepath = "";
      fetch(url, {
        body: data,
        method: "POST",
        headers: { Authorization: "Token " + "" },
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (resData) {
          let succMap = resData["data"]["succMap"];
          //  console.log(succMap);
          for (let item in succMap) {
            filepath = filepath + succMap[item];
            设置思源块属性(
              window.location.host,
              "",
              baseid,
              "data-assets",
              filepath
            );
            设置思源块属性(
              window.location.host,
              "",
              baseid,
              "custom-data-assets",
              filepath
            );
            if (挂件自身元素()) {
              挂件自身元素().setAttribute("data-assets", filepath);
              挂件自身元素().setAttribute("custom-data-assets", filepath);
            }
          }
        });
    });
  }),
    window.addEventListener("onload", 添加导入());
  window.addEventListener("click", 保存数据);
  try {
    加载数据();
  } catch (e) {
    console.log(e);
  }
})();

//base64转换为图片blob
function dataURLtoBlob(dataurl) {
  var arr = dataurl.split(",");
  var _arr = arr[1].substring(0, arr[1].length - 2);
  var mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(_arr),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], {
    type: mime,
  });
}
