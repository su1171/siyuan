(function (w, und) { Refresh() }(window, undefined));

function Refresh() {
  if (isPhone()){//手机模式执行的
    setTimeout(() => {//延时执行

      newOpenWindow();

    }, 1000)
  } else {//pc模式执行的
    setTimeout(() => {//延时执行
      
      setTimeout(() => ClickMonitor(), 3000);//各种列表转xx
      
      rundynamicUnderline();//为文档标题创建动态下划线
      
      showDocumentCreationDate();//为打开文档标题下面显示文档创建日期

      newOpenWindow();
    
    }, 500);
  }
}




















/**------------------为文档标题创建动态下划线---------------------------开始 */
function rundynamicUnderline() {setInterval(dynamicUnderline, 200);}

function dynamicUnderline() {
  var AllDocumentTitleElement = getAllDocumentTitleElement();
  for (let index = 0; index < AllDocumentTitleElement.length; index++) {
    const element = AllDocumentTitleElement[index];
    var line = createLine(element);
    var txt = getTileTxt(element);
    var maxWidth = element.offsetWidth;
    var Style = getComputedStyle(element, null);
    var font = Style.font;
    var width = getTextWidth(txt, font) + 58;
    if (width < 479) { width = 479; }//动态下划线最小宽度
    if (width > maxWidth) { width = maxWidth; }//不超过一行
    line.style.width = width + "px";
  }
}

function createLine(TitleElement) {
  var item = TitleElement.parentElement.children;
  for (let index = 0; index < item.length; index++) {
    const element = item[index];
    if (element.getAttribute("Line") != null) { return element; }
  }
  var line = insertCreateAfter(TitleElement, "div");
  line.setAttribute("Line", "true");
  line.style.height = "1px";
  line.style.marginTop = "-2px";
  line.style.marginBottom = "7px";
  line.style.backgroundColor = "#D9D9D9";//动态下划线颜色
  return line;
}

function getTileTxt(TitleElement) { return TitleElement.innerText; }
/**------------------为文档标题创建动态下划线---------------------------结束 */














/**------------------为打开文档的标题下显示文档创建日期-----------------开始 */
function showDocumentCreationDate() {setInterval(DocumentCreationDate, 300);}

function DocumentCreationDate() {
  var allDocumentTitleElement = getAllDocumentTitleElement();
  for (let index = 0; index < allDocumentTitleElement.length; index++) {
    const element = allDocumentTitleElement[index];
    var documentCreatTimeElement = creatTimeSpanElement(element.parentElement);
    var spanTxt = documentCreatTimeElement.innerText;
    if (spanTxt == "" || spanTxt == "日期获取中……") {
      var documentCreatTimeTxt = getDocumentTime(element);
      documentCreatTimeElement.innerText = documentCreatTimeTxt;
    }
  }
}

/**获取所有打开文档的标题元素 */
function getAllDocumentTitleElement() {return document.querySelectorAll(".protyle-title__input");}

/**为文档标题元素下创建时间容器元素 */
function creatTimeSpanElement(tilteElement) {
  var item = tilteElement.children;
  for (let index = 0; index < item.length; index++) {
    const element = item[index];
    if (element.getAttribute("documentCreatTimeElement") != null) { return element; }
  }
  var documentCreatTimeElement = addinsertCreateElement(tilteElement, "span");
  documentCreatTimeElement.setAttribute("documentCreatTimeElement", "true");
  documentCreatTimeElement.style.display = "block";
  documentCreatTimeElement.style.marginLeft = "7px";
  documentCreatTimeElement.style.marginBottom = "0px";
  documentCreatTimeElement.style.fontSize = "61%";
  documentCreatTimeElement.style.color = "#767676";
  return documentCreatTimeElement;
}

/**获得这个文档的创建时间 */
function getDocumentTime(tilteElement) {
  var tS = tilteElement.parentElement.previousElementSibling.getAttribute("data-node-id");
  if (tS == null) {return "日期获取中……";}
  var year = tS.substring(0, 4);
  var moon = tS.substring(4, 6);
  var day = tS.substring(6, 8);
  var hour = tS.substring(8, 10);
  var minute = tS.substring(10, 12);
  var second = tS.substring(12, 14);
  return year + "-" + moon + "-" + day + "  " + hour + ":" + minute + ":" + second;
}
/**------------------为打开文档的标题下显示文档创建日期-----------------结束 */












/*********************************************************Dark+新开窗口代码抽取HBuilderX-Light移植魔改便携搬运版*****START*********************************/
//感谢Dark作者，其他主题作者搬运需附加详情原出处来自Dark+。
//鼠标右键+中键打开移动端新窗口，alt+鼠标中键+打来PC端窗口
function newOpenWindow() {

  let _menuParams = [
      {
          label: 'SiYuan',
          submenu: [
              {
                  label: 'About SiYuan',
                  role: 'about',
              },
              { type: 'separator' },
              { role: 'services' },
              { type: 'separator' },
              {
                  label: 'Hide SiYuan',
                  role: 'hide',
              },
              { role: 'hideOthers' },
              { role: 'unhide' },
              { type: 'separator' },
              {
                  label: 'Quit SiYuan',
                  role: 'quit',
              },
          ],
      },
      {
          role: 'editMenu',
          submenu: [
              { role: 'selectAll' },
              { role: 'cut' },
              { role: 'copy' },
              { role: 'paste' },
              { role: 'pasteAndMatchStyle', accelerator: 'CmdOrCtrl+Shift+V' },
              { type: 'separator' },
              { role: 'toggleSpellChecker' },
          ],
      },
      {
          role: 'viewMenu',
          submenu: [
              { role: 'resetZoom' },
              { role: 'zoomIn', accelerator: 'CmdOrCtrl+=' },
              { role: 'zoomOut' },
          ],
      },
      {
          role: 'windowMenu',
          submenu: [
              { role: 'minimize' },
              { role: 'zoom' },
              { role: 'togglefullscreen' },
              { type: 'separator' },
              { role: 'toggledevtools' },
              { type: 'separator' },
              { role: 'front' },
              { type: 'separator' },
              { role: 'reload', accelerator: 'F5' },
              { role: 'forcereload', accelerator: 'CmdOrCtrl+F5' },
              { role: 'close' },
              { type: 'separator' },
              {
                  label: 'Pinned',
                  click: (menuItem, browserWindow, event) => {
                      if (browserWindow) browserWindow.setAlwaysOnTop(!browserWindow.isAlwaysOnTop());
                  },
                  type: 'checkbox',
                  checked: true,
                  accelerator: 'Alt+Shift+P',
              },
          ],
      },
  ];

  let _windowParams = {
      width: 1360, // 窗口宽度
      height: 768, // 窗口宽度
      frame: true, // 是否显示边缘框
      fullscreen: false, // 是否全屏显示
      alwaysOnTop: false, // 是否置顶显示
      autoHideMenuBar: true, // 是否隐藏菜单栏(使用 Alt 显示)
      webPreferences: {
          nodeIntegration: true, // 是否启用 Node.js 内置模块
          nativeWindowOpen: true,
          webSecurity: false, // 是否启用 Web 安全
      }
  }


  let _id = /^\d{14}\-[0-9a-z]{7}$/;
  let _url = /^siyuan:\/\/blocks\/(\d{14}\-[0-9a-z]{7})\/*(?:(?:\?)(\w+=\w+)(?:(?:\&)(\w+=\w+))*)?$/;


  function isObject(obj) {
      return Object.prototype.toString.call(obj) === '[object Object]'
  }
  function isArray(arr) {
      return Array.isArray(arr)
  }
  function merge(target, ...arg) {
      return arg.reduce((acc, cur) => {
          return Object.keys(cur).reduce((subAcc, key) => {
              const srcVal = cur[key]
              if (isObject(srcVal)) {
                  subAcc[key] = merge(subAcc[key] ? subAcc[key] : {}, srcVal)
              } else if (isArray(srcVal)) {
                  // series: []，下层数组直接赋值
                  subAcc[key] = srcVal.map((item, idx) => {
                      if (isObject(item)) {
                          const curAccVal = subAcc[key] ? subAcc[key] : []
                          return merge(curAccVal[idx] ? curAccVal[idx] : {}, item)
                      } else {
                          return item
                      }
                  })
              } else {
                  subAcc[key] = srcVal
              }
              return subAcc
          }, acc)
      }, target)
  }
  /**
   * 获得焦点所在的块 ID, 否则获得焦点所在文档的 ID
   * @return {string} 块 ID 或文档 ID
   * @return {null} 光标不在块内或文档内
   */
  function getFocusedID() {
      return getFocusedBlockID() || getFocusedDocID() || null;
  }
  /**
   * 获得焦点所在块 ID
   * @return {string} 块 ID
   * @return {null} 光标不在块内
   */
  function getFocusedBlockID() {
      let block = getFocusedBlock();
      if (block) {
          return block.dataset.nodeId;
      }
      else return null;
  }
  /**
   * 获得焦点所在的块
   * @return {HTMLElement} 光标所在块
   * @return {null} 光标不在块内
   */
  function getFocusedBlock() {
      let block = window.getSelection()
          && window.getSelection().focusNode
          && window.getSelection().focusNode.parentElement; // 当前光标
      while (block != null && block.dataset.nodeId == null) block = block.parentElement;
      return block;
  }
  /**
   * 获得焦点所在文档的 ID
   * @return {string} 文档 ID
   * @return {null} 没有聚焦的文档
   */
  function getFocusedDocID() {
      let background = getFocusedDocBackground();
      if (background) {
          return background.dataset.nodeId;
      }
      else return null;
  }
  /**
   * 获得焦点所在文档的背景
   * @return {HTMLElement} 焦点所在文档的背景
   * @return {null} 没有聚焦的文档
   */
  function getFocusedDocBackground() {
      return document.querySelector('div.layout__wnd--active div.protyle:not(.fn__none) > div.protyle-content > div.protyle-background')
          || document.querySelector('#editor > div.protyle-content > div.protyle-background')
          || null;
  }
  /**
   * 获得目标的块 ID
   * @params {HTMLElement} target: 目标
   * @return {string} 块 ID
   * @return {null} 没有找到块 ID
   */
  function getTargetBlockID(target) {
      let element = target;
      while (element != null
          && !(element.localName === 'a' && element.href
              || element.dataset.href
              || _id.test(element.dataset.nodeId)
              || _id.test(element.dataset.oid)
              || _id.test(element.dataset.id)
              || _id.test(element.dataset.rootId)
          )) element = element.parentElement;

      if (element != null) {
          if (_id.test(element.dataset.nodeId)) return element.dataset.nodeId;
          if (_id.test(element.dataset.oid)) return element.dataset.oid;
          if (_id.test(element.dataset.id)) return element.dataset.id;
          if (_id.test(element.dataset.oid)) return element.dataset.rootId;
          if (_url.test(element.dataset.href)) return url2id(element.dataset.href);
          if (_url.test(element.href)) return url2id(element.href);
          return element.href || element.dataset.href || null;
      }
      else return null;
  }
  function url2id(url) {
      let results = _url.exec(url);
      if (results && results.length >= 2) {
          return results[1];
      }
      return null;
  }



  /**
   * 切换编辑模式
   * @param {number} mode 0: 只读模式, 1: 编辑模式
   */
  function changeEditMode(mode = 0) { // 切换编辑模式

      let toolbarEdit = document.getElementById('toolbarEdit');
      if (toolbarEdit) {
          let editable = toolbarEdit.firstElementChild.getAttribute('xlink:href') === '#iconPreview';

          let event = new MouseEvent('click');
          switch (mode) {
              case 0:
                  if (editable) toolbarEdit.dispatchEvent(event);
                  else return;
              case 1:
                  if (!editable) toolbarEdit.dispatchEvent(event);
                  else return;
              default:
                  throw new Error(`/script/utils/misc.js changeEditMode(${mode})`);
          }
      }
  }
  /**
   * 跳转到指定块并可选聚焦
   */
  function windowjump(id, callback = null) {
      const editor = document.querySelector('div.protyle-wysiwyg div[data-node-id] div[contenteditable][spellcheck]');
      if (editor) {
          let ref = document.createElement("span");
          ref.setAttribute("data-type", "block-ref");
          ref.setAttribute("data-subtype", "s");
          ref.setAttribute("data-id", id);
          editor.appendChild(ref);
          ref.click();
          ref.remove();

          var reg = new RegExp('<[^>]+>', 'gi');  //过滤所有的html标签，不包括内容
        
          /**更改子窗口标题 */
          setTimeout(()=>{
              var title = document.querySelector("title");
              if (id == null) {
                  title.innerText = "[#] 思源子窗口 [#]";
                  return;
              };
              titleTxt(id);

              AddEvent(document.body, "click", (e) => {
                  var title = document.querySelector("title");
                  var TargetBlockID = getTargetBlockID(e.target);
                  if (TargetBlockID == null) {
                      title.innerText = "[#] 思源子窗口 [#]";
                      return;
                  };
                  titleTxt(TargetBlockID);
              })

              function titleTxt(TargetBlockID){
              
                  以id获取文档聚焦内容(TargetBlockID, (v) => {
                      var htmltxt = v.content;
  
                      var element = document.createElement("div");
                      element.innerHTML=htmltxt;
  
                      htmltxt= diguiTooONE(element,(v)=>{
                          return v.getAttribute("contenteditable")=="true";
                      })
                      
                      var txt = (htmltxt.innerText).replace(reg, '');
                      if (txt == "​"||txt=="") {
                          txt = "[#] 思源子窗口 [#]";
                          根据ID获取人类可读路径(TargetBlockID,(v)=>{
                              title.innerText ="[#] "+v.substring(1, v.length)+" [#]";
                          })
                          return;
                      }
                      if(txt.length>25){
                          title.innerText ="[#] "+txt.substring(0,25)+"...";
                      }else{
                          title.innerText ="[#] "+txt+" [#]";
                      }
                      
                      element.remove();
                     
                  });
              }
          },2000)

          if (typeof callback === 'function') setTimeout(callback, 250);
      }
      else setTimeout(() => windowjump(id, callback), 250);
  }
  /**
   * 跳转到指定块并聚焦
   * 问题: 文档名不改变
   */
  function focalize(id, callback = null) {
      // console.log('focalize:', id);
      const breadcrumbs = document.querySelector('.protyle-breadcrumb>.protyle-breadcrumb__bar');
      if (breadcrumbs) {
          let crumb = document.createElement("span");
          crumb.className = 'protyle-breadcrumb__item';
          crumb.setAttribute("data-node-id", id);
          breadcrumbs.appendChild(crumb);
          crumb.click();
          // crumb.dispatchEvent(CTRL_CLICK_EVENT);
          crumb.remove();
          if (typeof callback === 'function') setTimeout(callback, 250);
      }
      else setTimeout(() => focalize(id, callback), 250);
  }
  async function windowGoto(id, focus = 0, editable = 0) {
      // 是否聚焦
      if (parseInt(focus) === 1 || focus === 'true') focalize(id);
      else {
          windowjump(id);
      }

      // 是否可编辑
      if (parseInt(editable) === 1 || editable === 'true') setTimeout(() => changeEditMode(1), 0);
      else setTimeout(() => changeEditMode(0), 0);
  }
  async function _jump(...args) {
      try {
          await windowGoto(...args);
      } catch (e) {
          if (e.message === args[0]) {
              setTimeout(() => _jump(...args), 250);
          }
          else throw e;
      }
  }
  function windowJumpToID() {
      let url = new URL(window.location.href);
      let id = url.searchParams.get('id');
      let focus = url.searchParams.get('focus');
      let editable = url.searchParams.get('editable');
      if (_id.test(id)) {
          setTimeout(() => _jump(id, focus, editable), 0);
      }
  }
  setTimeout(() => {
      try {
          if (true) {
              setTimeout(windowJumpToID, 0);
          }
      } catch (err) {
          console.error(err);
      }
  }, 0);


  window.theme = {};
  /**
   * 新窗口打开
   * @mode (string): 打开窗口模式('app', 'desktop', 'mobile')
   * @url (string): URL
   * @urlParams (object): URL 参数
   * @windowParams (object): 窗体参数
   * @menuTemplate (object): 窗口菜单栏模板
   * @pathname (string): URL 路径名
   * @hash (string): URL hash
   * @consoleMessageCallback (function): 子窗口控制台输出回调
   * @closeCallback (function): 关闭窗口时的回调函数
   * @windowEventHandlers (array): 一组窗口的事件处理器
   * @contentsEventHandlers (array): 一组内容的事件处理器
   * @return (BrowserWindow): 窗口对象
   */
  window.theme.openNewWindow = function (
      mode = 'mobile',
      url = window.location.href,
      urlParams = {},
      windowParams = {
          width: 720,
          height: 480,
          frame: true, // 是否显示边缘框
          fullscreen: false, // 是否全屏显示
      },
      menuTemplate = null,
      pathname = null,
      hash = null,
      consoleMessageCallback = null,
      closeCallback = null,
      windowEventHandlers = [],
      contentsEventHandlers = [],
  ) {
      try {
          // 优化思源内部 URL
          url = window.theme.urlFormat(url);

          // 设置窗口模式
          if (mode) {
              switch (mode.toLowerCase()) {
                  case 'app':
                      return;
                  case 'desktop':
                  case 'mobile':
                      url.pathname = `/stage/build/${mode.toLowerCase()}/`;
                      break;
                  case 'editor':
                      break;
                  default:
                      break;
              }
          }
          if (pathname) url.pathname = pathname;
          if (hash) url.hash = hash;
          // 设置 URL 参数
          for (const param in urlParams) {
              url.searchParams.set(param, urlParams[param]);
          }
          // 打开新窗口
          try {
              const {
                  BrowserWindow,
                  Menu,
              } = require('@electron/remote');
              // 新建窗口(Electron 环境)
              var newWin = new BrowserWindow(windowParams);
              const menu = Menu.buildFromTemplate(menuTemplate);
              console.log(url.href);

              newWin.setMenu(menu);
              newWin.loadURL(url.href);

              // REF [Event: 'console-message'​](https://www.electronjs.org/docs/latest/api/web-contents#event-console-message)
              newWin.webContents.on("console-message", (event, level, message, line, sourceId) => {
                  if (level === 0) {
                      switch (message) { // 通用的命令
                          case 'WINDOW-SWITCH-PIN': // 切换窗口置顶状态
                              // REF [win.setAlwaysOnTop(flag[, level][, relativeLevel])​](https://www.electronjs.org/zh/docs/latest/api/browser-window#winsetalwaysontopflag-level-relativelevel)
                              newWin.setAlwaysOnTop(!newWin.isAlwaysOnTop());
                              break;
                          default:
                              break;
                      }
                  }
                  consoleMessageCallback && setTimeout(async () => consoleMessageCallback(newWin, event, level, message, line, sourceId));
              });

              if (mode) {
                  switch (mode.toLowerCase()) {
                      case 'editor':
                      case 'desktop':
                          newWin.removeMenu(); // 移除窗口的菜单栏
                          break;
                      case 'app':
                      case 'mobile':
                      default:
                          break;
                  }
              }
              for (const handler of windowEventHandlers) {
                  newWin.on(handler.event, (...args) => handler.callback(newWin, ...args));
              }
              for (const handler of contentsEventHandlers) {
                  newWin.webContents.on(handler.event, (...args) => handler.callback(newWin, ...args));
              }
              newWin.on('closed', () => {
                  closeCallback && setTimeout(async () => closeCallback(newWin), 0);
                  newWin = null;
              })
              return newWin;
          }
          catch (err) {
              console.warn(err);
              // 新建标签页(Web 环境)
              // window.open(url.href, "_blank");
              // REF [Window.open() - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/open)
              // REF [Window open() 方法 | 菜鸟教程](https://www.runoob.com/jsref/met-win-open.html)
              newWin = window.open(
                  url.href,
                  url.href,
                  `
                  popup = true,
                  width = ${windowParams.width},
                  height = ${windowParams.height},
              `,
              );
              return newWin;
          }
      }
      catch (err) {
          console.error(err);
          return null;
      }
  }
  /**
   * URL 格式化
   * @params {string} url: 要格式化的 URL
   * @reutrn {URL}: URL 对象
   */
  window.theme.urlFormat = function (url, ssl = true) {
      switch (true) { // 格式化 URL
          case url.startsWith('assets/'):
          case url.startsWith('widgets/'):
          case url.startsWith('emojies/'):
          case url.startsWith('appearance/'):
          case url.startsWith('export/'):
              return new URL(`${window.location.origin}/${url}`);
          case url.startsWith('//'):
              return new URL(`${ssl ? 'https' : 'http'}:${url}`);
          case url.startsWith('/'):
              return new URL(`${window.location.origin}${url}`);
          case url.startsWith('http://'):
          case url.startsWith('https://'):
              return new URL(url);
          default:
              return new URL(`${ssl ? 'https' : 'http'}://${url}`);
      }
  }
  window.theme.languageMode = (() => window.siyuan.config.lang)();


  function outfocusOpenAPP(id = getFocusedID(), urlParams = {}) {
      if (id) {

          urlParams.id = id;
          urlParams.focus = 0;
          urlParams.editable = 0;

          _windowParams.width = 1360;
          _windowParams.height = 768;

          window.theme.openNewWindow(
              undefined,
              undefined,
              urlParams,
              _windowParams,
              _menuParams,
          );
      }
  }
  function outfocusOpenWinPC(id = getFocusedID(), urlParams = {}) {
      // 打开新窗口
      if (id) {
          urlParams.id = id;
          urlParams.focus = 0;
          urlParams.editable = 0;

          const windowParams = merge({}, _windowParams, { alwaysOnTop: false })// 关闭置顶
          windowParams.width = 1920;
          windowParams.height = 1080;

          window.theme.openNewWindow(
              "desktop",
              undefined,
              urlParams,
              windowParams,
              _menuParams,
          );
      }
  }
  function openbrowser(target) {
      window.theme.openNewWindow(
          'browser',
          target,
          undefined,
          _windowParams,
          _menuParams,
      );
  }
  async function middleClick(element, OpenWinFun) {
      let target = getTargetBlockID(element);
      // 目标非空, 是 ID 或者链接
      if (target == "null") return;//兼容简单备注
      if (target) {
          if (_id.test(target)) {
              await OpenWinFun(target);
          } else {
              // 是链接
              openbrowser(target);
          }
      }
  }


  var flag = false;
  var flag2 = false;
  AddEvent(document.body, "mousedown", (e) => {

      if (!flag && e.button == 2) {
          flag = true; return;
      }
      if (flag && e.button == 1) {
          e.preventDefault()
          flag2 = true;
          middleClick(e.target, outfocusOpenAPP); return;
      }
      if (e.altKey && e.button == 1) {
          e.preventDefault()
          flag2 = true;
          middleClick(e.target, outfocusOpenWinPC); return;
      }
  });
  AddEvent(document.body, "mouseup", (e) => {
      flag = false;
      if (flag2) {
          setTimeout(() => {
              var commonMenu = document.getElementById("commonMenu");
              commonMenu.setAttribute("class", "b3-menu fn__none");
              flag2 = false;
          }, 0)
      }

  })
}
/*********************************************************Dark+新开窗口代码抽取HBuilderX-Light移植魔改便携搬运版*****END*********************************/











/***js form Morgan***/


/****UI****/
function ViewSelect(selectid, selecttype) {
  let button = document.createElement("button")
  button.id = "viewselect"
  button.className = "b3-menu__item"
  button.innerHTML = '<svg class="b3-menu__icon" style="null"><use xlink:href="#iconGlobalGraph"></use></svg><span class="b3-menu__label" style="">视图选择</span><svg class="b3-menu__icon b3-menu__icon--arrow" style="null"><use xlink:href="#iconRight"></use></svg></button>'
  button.appendChild(SubMenu(selectid, selecttype))
  return button
}

function SubMenu(selectid, selecttype, className = 'b3-menu__submenu') {
  let node = document.createElement('div');
  node.className = className;
  if (selecttype == "NodeList") {
    node.appendChild(GraphView(selectid))
    node.appendChild(TableView(selectid))
    node.appendChild(kanbanView(selectid))
    node.appendChild(DefaultView(selectid))
  }
  if (selecttype == "NodeTable") {
    node.appendChild(FixWidth(selectid))
    node.appendChild(AutoWidth(selectid))
    node.appendChild(Removeth(selectid))
    node.appendChild(Defaultth(selectid))
  }
  return node;
}

function GraphView(selectid) {
  let button = document.createElement("button")
  button.className = "b3-menu__item"
  button.setAttribute("data-node-id", selectid)
  button.setAttribute("custom-attr-name", "f")
  button.setAttribute("custom-attr-value", "dt")

  button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconFiles"></use></svg><span class="b3-menu__label">转换为导图</span>`
  button.onclick = ViewMonitor
  return button
}
function TableView(selectid) {
  let button = document.createElement("button")
  button.className = "b3-menu__item"
  button.setAttribute("data-node-id", selectid)
  button.setAttribute("custom-attr-name", "f")
  button.setAttribute("custom-attr-value", "bg")

  button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTable"></use></svg><span class="b3-menu__label">转换为表格</span>`
  button.onclick = ViewMonitor
  return button
}
function kanbanView(selectid) {
  let button = document.createElement("button")
  button.className = "b3-menu__item"
  button.setAttribute("data-node-id", selectid)
  button.setAttribute("custom-attr-name", "f")
  button.setAttribute("custom-attr-value", "kb")

  button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconMenu"></use></svg><span class="b3-menu__label">转换为看板</span>`
  button.onclick = ViewMonitor
  return button
}
function DefaultView(selectid) {
  let button = document.createElement("button")
  button.className = "b3-menu__item"
  button.onclick = ViewMonitor
  button.setAttribute("data-node-id", selectid)
  button.setAttribute("custom-attr-name", "f")
  button.setAttribute("custom-attr-value", '')

  button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconList"></use></svg><span class="b3-menu__label">恢复为列表</span>`
  return button
}
function FixWidth(selectid) {
  let button = document.createElement("button")
  button.className = "b3-menu__item"
  button.onclick = ViewMonitor
  button.setAttribute("data-node-id", selectid)
  button.setAttribute("custom-attr-name", "f")
  button.setAttribute("custom-attr-value", "")

  button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTable"></use></svg><span class="b3-menu__label">页面宽度</span>`
  return button
}
function AutoWidth(selectid) {
  let button = document.createElement("button")
  button.className = "b3-menu__item"
  button.setAttribute("data-node-id", selectid)
  button.setAttribute("custom-attr-name", "f")
  button.setAttribute("custom-attr-value", "auto")
  button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTable"></use></svg><span class="b3-menu__label">自动宽度</span>`
  button.onclick = ViewMonitor
  return button
}
function Removeth(selectid) {
  let button = document.createElement("button")
  button.className = "b3-menu__item"
  button.onclick = ViewMonitor
  button.setAttribute("data-node-id", selectid)
  button.setAttribute("custom-attr-name", "t")
  button.setAttribute("custom-attr-value", "biaotou")

  button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTable"></use></svg><span class="b3-menu__label">取消表头样式</span>`
  return button
}
function Defaultth(selectid) {
  let button = document.createElement("button")
  button.className = "b3-menu__item"
  button.setAttribute("data-node-id", selectid)
  button.setAttribute("custom-attr-name", "t")
  button.setAttribute("custom-attr-value", "")
  button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTable"></use></svg><span class="b3-menu__label">默认表头样式</span>`
  button.onclick = ViewMonitor
  return button
}
function MenuSeparator(className = 'b3-menu__separator') {
  let node = document.createElement('button');
  node.className = className;
  return node;
}


function ClickMonitor() {
  window.addEventListener('mouseup', MenuShow)
}

function MenuShow() {
  setTimeout(() => {
    let selectinfo = getBlockSelected()
    if (selectinfo) {
      let selecttype = selectinfo.type
      let selectid = selectinfo.id
      if (selecttype == "NodeList" || selecttype == "NodeTable") {
        setTimeout(() => InsertMenuItem(selectid, selecttype), 0)
      }
    }
  }, 0);
}


function InsertMenuItem(selectid, selecttype) {
  let commonMenu = document.getElementById("commonMenu")
  let readonly = commonMenu.querySelector(".b3-menu__item--readonly")
  let selectview = commonMenu.querySelector('[id="viewselect"]')
  if (readonly) {
    if (!selectview) {
      commonMenu.insertBefore(ViewSelect(selectid, selecttype), readonly)
      commonMenu.insertBefore(MenuSeparator(), readonly)
    }
  }
}

function ViewMonitor(event) {
  let id = event.currentTarget.getAttribute("data-node-id")
  let attrName = 'custom-' + event.currentTarget.getAttribute("custom-attr-name")
  let attrValue = event.currentTarget.getAttribute("custom-attr-value")
  let blocks = document.querySelectorAll(`.protyle-wysiwyg [data-node-id="${id}"]`)
  if (blocks) {
    blocks.forEach(block => block.setAttribute(attrName, attrValue))
  }
  let attrs = {}
  attrs[attrName] = attrValue
  设置思源块属性(id, attrs)
}

























//++++++++++++++++++++++++++++++++++++++++api区域+++++++++++++++++++++++++++++++++++++++++++++++

/**简单判断目前思源是否是手机模式 */
function isPhone() {return document.getElementById("toolbar") == null;}

/**
 * 获得文本的占用的宽度
 * @param {*} text 字符串文班
 * @param {*} font 文本字体的样式
 * @returns 
 */
function getTextWidth(text, font) {
  var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
  var context = canvas.getContext("2d");
  context.font = font;
  var metrics = context.measureText(text);
  return metrics.width;
}

/**
 * 向指定父级创建追加一个子元素，并可选添加ID,
 * @param {Element} fatherElement 
 * @param {string} addElementTxt 要创建添加的元素标签
 * @param {string} setId 
 * @returns addElementObject
 */
function addinsertCreateElement(fatherElement, addElementTxt, setId = null) {
  var element = document.createElement(addElementTxt);
  if (setId) element.id = setId;
  fatherElement.appendChild(element);
  return element;
}


/**
 * 向指定元素后创建插入一个元素，可选添加ID
 * @param {*} targetElement 目标元素
 * @param {*} addElementTxt 要创建添加的元素标签
 * @param {*} setId 为创建元素设置ID
 */
function insertCreateAfter(targetElement, addElementTxt, setId = null) {
  var element = document.createElement(addElementTxt);
  if (setId) element.id = setId;
  var parent = targetElement.parentNode;//得到父节点
  if (parent.lastChild === targetElement) {
    parent.appendChild(element);
    return element;
  } else {
    parent.insertBefore(element, targetElement.nextSibling);//否则，当前节点的下一个节点之前添加
    return element;
  }
}

/**
 * 为元素注册监听事件
 * @param {Element} element 
 * @param {string} strType 
 * @param {Fun} fun 
 */
 function AddEvent(element, strType, fun) {
  //判断浏览器有没有addEventListener方法
  if (element.addEventListener) {
      element.addEventListener(strType, fun, false);
      //判断浏览器有没 有attachEvent IE8的方法	
  } else if (element.attachEvent) {
      element.attachEvent("on" + strType, fun);
      //如果都没有则使用 元素.事件属性这个基本方法
  } else {
      element["on" + strType] = fun;
  }
}


/**
* 为元素解绑监听事件
* @param {Element}  element ---注册事件元素对象
* @param {String}   strType ---注册事件名(不加on 如"click")
* @param {Function} fun	 ---回调函数
* 
*/
function myRemoveEvent(element, strType, fun) {
  //判断浏览器有没有addEventListener方法
  if (element.addEventListener) {
      // addEventListener方法专用删除方法
      element.removeEventListener(strType, fun, false);
      //判断浏览器有没有attachEvent IE8的方法	
  } else if (element.attachEvent) {
      // attachEvent方法专用删除事件方法
      element.detachEvent("on" + strType, fun);
      //如果都没有则使用 元素.事件属性这个基本方法
  } else {
      //删除事件用null
      element["on" + strType] = null;
  }
}

/**
 * 递归DOM元素查找深度子级的第一个符合条件的元素
 * @param {*} element 要查找DOM元素
 * @param {*} judgeFun 查找函数 : fun(v) return true or false
 * @returns element
 */
 function diguiTooONE(element, judgeFun) {

    if (element == null) return null;
    if (judgeFun == null) return null;

    return digui(element);

    function digui(elem) {
        var child = elem.children;
        if (child.length = 0) return null;

        for (let index = 0; index < child.length; index++) {
            const element2 = child[index];
            if (judgeFun(element2)) {
                return element2;
            } else {
                var item = digui(element2);
                if (item == null) continue;
                return item;
            }
        }
        return null;
    }
}


//+++++++++++++++++++++++++++++++++++++++++++++++思源API
async function 设置思源块属性(内容块id, 属性对象) {
  let url = '/api/attr/setBlockAttrs'
  return 解析响应体(向思源请求数据(url, {
    id: 内容块id,
    attrs: 属性对象,
  }))
}


async function 以id获取文档聚焦内容(id, then, obj = null) {
  await 向思源请求数据('/api/filetree/getDoc', {
      id: id,
      k: "",
      mode: 0,
      size: 36,
  }).then((v) => then(v.data, obj))
}

async function 向思源请求数据(url, data) {
  let resData = null
  await fetch(url, {
    body: JSON.stringify(data),
    method: 'POST',
    headers: {
      Authorization: `Token ''`,
    }
  }).then(function (response) { resData = response.json() })
  return resData
}
async function 解析响应体(response) {
  let r = await response
  return r.code === 0 ? r.data : null
}

/**
 * 获得所选择的块对应的块 ID
 * @returns {string} 块 ID
 * @returns {
 *     id: string, // 块 ID
 *     type: string, // 块类型
 *     subtype: string, // 块子类型(若没有则为 null)
 * }
 * @returns {null} 没有找到块 ID */
function getBlockSelected() {
  let node_list = document.querySelectorAll('.protyle:not(.fn__none)>.protyle-content .protyle-wysiwyg--select');
  if (node_list.length === 1 && node_list[0].dataset.nodeId != null) return {
    id: node_list[0].dataset.nodeId,
    type: node_list[0].dataset.type,
    subtype: node_list[0].dataset.subtype,
  };
  return null;
}
//++++++++++++++++++++++++++++++++++++++++api区域+++++++++++++++++++++++++++++++++++++++++++++++
