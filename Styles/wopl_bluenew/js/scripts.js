var MODE_DEVELOP = false;
var isObjectSelect = false;
var flashObjectId = "";
var flashObjectIdSelected = -1;
var clickOnObject  = false;

var bannerColl = typeof(NOF) != "undefined" ? NOF.Flash.MovieCollectionMgr.createCollection() : null;
var navbarColl = typeof(NOF) != "undefined" ? NOF.Flash.MovieCollectionMgr.createCollection() : null;

/***
* event listener for flash objects
***/
function NOF_Flash_Listener(fId, oId, pId) {
  var method = NOF_Flash_Listener.prototype;

  this.objectId = oId;
  this.parentId = pId;
  this.flashId = fId;

  method.onRMouseDown = function (event) {
  var elem = document.getElementById(this.objectId);
    if (this.parentId == -1) {
      NOF_StyleView_CallInspector(elem, 'graphic', "", event.state.x, event.state.y);
    }
    else {
      var flashObject = document.getElementById(this.parentId);
      NOF_StyleView_CallFlashInspector(elem, flashObject, 'graphic', "", event.state.x, event.state.y);
    }
  };

  method.onDblClick = function (event) {
  if (this.parentId == -1) {
      var elem = document.getElementById(this.objectId);
      NOF_StyleView_DblClick(elem, "graphic");
    }
    else {
      var flashObject = document.getElementById(this.parentId);
      NOF_StyleView_DblClickEx(flashObject, "graphic", true) ;
    }

  };

  method.onLMouseDown = function (event) {
    var elem = document.getElementById(this.objectId);
    if (this.parentId == -1) {
    NOF_StyleView_CallInspector(elem, 'graphic');
    }
    else {
      var flashObject = document.getElementById(this.parentId);
    NOF_StyleView_CallFlashInspector(elem, flashObject, 'graphic');
    }
  };

  method.onMouseDown = function (event) {
    flashObjectId = this.flashId;
    if (event.state.btn == 2) {
      this.onRMouseDown(event);
    }
    else if (event.state.cnt == 2) {
      this.onDblClick(event);
    }
    else {
      this.onLMouseDown(event);
    }
    clickOnObject = false;
  };
}


/**
*Called from c++ layer on page load. must be removed.
*/
function SelectObject(object, inspectorType){
  NOF_StyleView_CallInspector(document.getElementById(object), inspectorType);
}

function NOF_StyleView_CallFlashInspector(object, flashObject, inspectorType, objectParent, x, y) {
    flashObjectIdSelected = object.id;
    NOF_StyleView_CallInspector(flashObject, inspectorType, objectParent, x, y);
    if (flashObject.id != object.id) {
        object.className = "objSelected";
        flashObject.className = "objNormal";
    }
}

function NOF_StyleView_CallInspector(object, inspectorType, objectParent, x, y) {
  clearBorder();

  // Check if fusion is available
  if (fusion == null || typeof(fusion) == "undefined")
    return;

  isObjectSelect = false;

  if(object) {
    isObjectSelect = true;
    clickOnObject  = true;

    if (object.className == "objNormal")
      object.className = "objSelected";

    var response = null;

    // In case there is right click on body and a different context menu is displayed.
    var id = object.id ? object.id : "context";

    // Inspector call
    response = inspectorType == "text" && inspectorType != null ?
               ( x && y ? fusion.onTextStyleSelected(id  + ":" + x + ":" + y) : fusion.onTextStyleSelected(id)) :
                ( x && y ? fusion.onGraphicStyleSelected(id  + ":" + x + ":" + y) : fusion.onGraphicStyleSelected(id))

  } else {
     if (!clickOnObject && !MODE_DEVELOP) {
       clearBorder();
       inspectorType == "text" ? fusion.onTextStyleSelected("NULL") : fusion.onGraphicStyleSelected("NULL");
     } else
       clickOnObject = false;
  }
}

function NOF_StyleView_DblClick(object, inspectorType) {
  NOF_StyleView_DblClickEx(object, inspectorType, false);
}

function NOF_StyleView_DblClickEx(object, inspectorType, isParentSelected) {
  // Check if fusion is available
  if (fusion == null || typeof(fusion) == "undefined")
    return;
  if (object.id && inspectorType == "graphic") {
    /*
      isParentSelected : true if flash navigation selected
      object.className = "objNormal" : (not selected) happens when
      the click following a flash double click triggers a double click
      event instead of a single click. See CStyleGraphicView::PreTranslateMessage
    */
    if (!isParentSelected && object.className == "objNormal") {
      flashObjectId = "";
      NOF_StyleView_CallInspector(object, inspectorType);
      clickOnObject  = false;
    }
    else
      fusion.onGraphicStyleDblClick(object.id);
  }
}

function NOF_StyleView_ResponseFromInspector(xmlNodeText) {
  var xmlNode = new ActiveXObject("Msxml2.DOMDocument.3.0");
  xmlNode.async = false;
  if (typeof(xmlNodeText) == "string")
    xmlNode.loadXML(xmlNodeText);
  else
    xmlNode = xmlNodeText;

  var xslt = new ActiveXObject("Msxml2.DOMDocument.3.0");
  xslt.async = false;
  xslt.load("template/siteStyle.xsl");

  var root = xmlNode.documentElement;
  var rootName = root.nodeName;

  //debugger;
  
  var refreshString = "";
  if (rootName == "Banner") {
    if (root.getAttribute("type") == "Flash") {
      var flashNode = root.selectSingleNode("Flash");
      onChangeFlashBanner(root.getAttribute("id"), root.getAttribute("name"), flashNode.getAttribute("path"));
    }
    else {
      refreshString = xmlNode.transformNode(xslt);
      onChangeBanner(root.getAttribute("id"), refreshString);
      //document.styleSheets["displaycss"].href="display.css?dummy="+(new Date()).getTime(); //force reload display.css
	  document.getElementById("displaycss").setAttribute("href", "display.css?dummy=" + new Date().getTime());
      var id = root.getAttribute("id");
	  var selector = "." + root.selectSingleNode("Font").getAttribute("css");
	  if (root.getAttribute("type") == "Image") {
		var oldStyle = document.getElementById(id).children(0).style.cssText;
		document.getElementById(id).children(0).style.cssText += getCssContent(selector) + oldStyle;
		oldStyle = document.getElementById(id).children(0).style.cssText;
	  }
	  else {
	  var oldStyle = document.getElementById(id).children(1).style.cssText;
	  document.getElementById(id).children(1).style.cssText += getCssContent(selector) + oldStyle;
	  oldStyle = document.getElementById(id).children(1).style.cssText;
  	}
     }
  }
  else if (rootName == "ButtonState") {
    if (root.getAttribute("type") == "Flash") {
      var flashNode = root.selectSingleNode("Flash");
      onChangeFlashNavBarState(root.getAttribute("id"), root.getAttribute("name"), flashNode.getAttribute("path"));
    }
    else {
      refreshString = xmlNode.transformNode(xslt);
      if (root.getAttribute("type") == "Text") {
          onChangeButtonState(root.getAttribute("id"), refreshString);
          //document.styleSheets["displaycss"].href="display.css?dummy="+(new Date()).getTime(); //force reload display.css
		  document.getElementById("displaycss").setAttribute("href", "display.css?dummy=" + new Date().getTime());
          var id = root.getAttribute("id");
	  var selector = "." + root.selectSingleNode("Font").getAttribute("css");
	  document.getElementById(id).children(0).style.cssText = getCssContent(selector);
          return;
      }
      else if (root.getAttribute("type") == "Image") {
        onChangeButtonState(root.getAttribute("id"), refreshString, root.selectSingleNode("Image").getAttribute("path"));
      }
    }
  }
  else if (rootName == "Line") {
    refreshString = xmlNode.transformNode(xslt);
    onChangeLine(root.getAttribute("id") , refreshString);
  }
  else if (rootName == "Bullet") {
    refreshString = xmlNode.transformNode(xslt);
    onChangeBullet(root.getAttribute("id"), refreshString);
  }
  else if (rootName == "NavbarState") {
    if (root.getAttribute("type") == "Flash") {
      var button = root.selectSingleNode("Button");
      var buttonState = button.selectSingleNode("ButtonState");
      var flashNode = buttonState.selectSingleNode("Flash");
      onChangeFlashNavBarState(root.getAttribute("id"), root.getAttribute("name"), flashNode.getAttribute("path"));
    }
    else {
      var border = root.selectSingleNode("Border").getAttribute("size");
      var space  = root.selectSingleNode("Space").getAttribute("size");
      onChangeNavbarState(root.getAttribute("id"), border, space, root.getAttribute("name"));
    }
  }
  else if (rootName == "Author") {
    refreshString = xmlNode.transformNode(xslt);
    onChangeAuthor(root.getAttribute("id"), refreshString);
  }
  else if (rootName == "TableStyle") {
    refreshString = xmlNode.transformNode(xslt);
    onChangeTableStyle(root.getAttribute("id") , refreshString);
  }
  //Refresh : called when background is change; or text fonts
  else if (rootName == "SiteStyle") {
    onRefreshPage();
  }
  else //text
  {
	//document.styleSheets["displaycss"].href="display.css?dummy="+(new Date()).getTime(); //force reload display.css
	document.getElementById("displaycss").setAttribute("href", "display.css?dummy=" + new Date().getTime());
	refreshString = xmlNode.transformNode(xslt);
	document.getElementById(root.getAttribute("id")).outerHTML = refreshString;	
	document.getElementById(root.getAttribute("id")).className = "objSelected";
  }
  if (typeof(NOF) != "undefined") {
    navbarColl.resizeAll();
  }
}

function refreshImages(imageId) {
    var len = document.all.length;
    for (var i=0;i<len;i++) {
      var pNode = document.all[i];
      var idObj = pNode.attributes.id;
      if (idObj != null) {
        var id = idObj.value;
        if (id != null)
        {
          if (id == imageId) {
            if (pNode.attributes.src != null)
            {
              var src = pNode.src;
              var d = new Date();
              var time = d.getTime();
              pNode.src = src + "?" + time;
            }
          }
        }
      }
    }
}

//Event handlers

function onChangeBanner(bannerId, value){
  document.getElementById("Banner." + bannerId).innerHTML = value
  //document.getElementById(bannerId).innerHTML = value;
  document.getElementById(bannerId).className = "objSelected";
  refreshImages(bannerId);
}

function onChangeFlashBanner(flashId, bannerName, bannerSrc) {
  document.getElementById("BannerLabel." + flashId).innerHTML = bannerName;
  var banner = bannerColl.getMovieById("Banner_Flash_"+flashId);
  if (banner) {
      banner.setMovieSrc(bannerSrc);
      document.getElementById(flashId).innerHTML = banner.toHTML();
    }
    document.getElementById(flashId).className = "objSelected";
}

function onChangeButtonState(buttonStateId, value, buttonSrc) {
  document.getElementById("Button." + buttonStateId).innerHTML = value;
  document.getElementById(buttonStateId).className = "objSelected";
  refreshImages(buttonStateId);
}

function onChangeLine(lineId, value){
  document.getElementById(lineId).className = "objSelected";
  document.getElementById(lineId).innerHTML = value;
}

function onChangeBullet(bulletId, value) {
  document.getElementById(bulletId).className = "objSelected";
  document.getElementById(bulletId).innerHTML = value;
}

function onRefreshPage() {
  document.location.href = "Style.ssx";
}

function onChangeNavbarState(navbarStateId, borderValue, spacingValue, navName){
  document.getElementById(navbarStateId).className = "objSelected";
  document.getElementById(navbarStateId).innerHTML = navName;
  document.getElementById("NavbarState." + navbarStateId).border       = borderValue;
  document.getElementById("NavbarState." + navbarStateId).cellPadding  = spacingValue;
  document.getElementById("NavbarState." + navbarStateId).cellSpacing  = spacingValue;
}

function onChangeFlashNavBarState(flashId, navName, navbarSrc) {
  if (navbarColl.getMovieById("Button_Flash_F_"+flashId)) {
    /*@note: workaround for innerHTML replace below that cause the dynamic dinamic
             dimension setting to have no effect.
    */
    var MAX_WIDTH = 1000;

    var bf = navbarColl.getMovieById("Button_Flash_F_"+flashId);
    bf.setMovieSrc(navbarSrc);
    bf.setParam("play", "true");
    bf.setWidth(MAX_WIDTH);
    document.getElementById("Button_Flash_F_"+flashId+"_container").innerHTML = bf.toHTML();

    var bp = navbarColl.getMovieById("Button_Flash_P_"+flashId);
    bp.setWidth(MAX_WIDTH);
    bp.setMovieSrc(navbarSrc);
    bp.setParam("play", "true");
    document.getElementById("Button_Flash_P_"+flashId+"_container").innerHTML = bp.toHTML();
  }
  else {
    document.getElementById(flashId).innerHTML = navName;
  }
  document.getElementById(flashObjectIdSelected).className = "objSelected";
}

function onChangeAuthor(id, newName) {

  var searchText = '<font class="label">';
  var author = newName.substring(newName.indexOf(searchText) + searchText.length, newName.length);
  author = author.substring(0, author.indexOf('</font>'));

  handleAuthor(id, author);
}

function handleAuthor(id, author) {

  var htmlObj = document.getElementById(id);
  if (author == null) {
   author = htmlObj.innerHTML;
   onChangeAuthor(id, author);
  }


  var authorURL = "";
  var protocol = "";
  var authorName = author;
  var urlCaption = "";

  var indexOfStartURL = author.indexOf("(");
  if (indexOfStartURL >= 0) {
  var indexOfEndURL = author.lastIndexOf(")");
  if (indexOfEndURL > 0 && indexOfEndURL > indexOfStartURL) {
    authorURL = author.substring(indexOfStartURL + 1, indexOfEndURL);
    if (authorURL.indexOf("http://") < 0)
      protocol = "http://"

    urlCaption = author.substring(indexOfStartURL, indexOfEndURL + 1);
  }

  }


  var html = author;
  if (authorURL != "") {
  html =  '<a href="' + protocol + authorURL + '" target="_blank" class="label" style="text-decoration:none">' + urlCaption + '</a>';
  var leftPos = author.indexOf(urlCaption);
  var rightPos = leftPos + urlCaption.length;
  html = author.substring(0, leftPos) + html + author.substring(rightPos, author.length)
  }


  htmlObj.innerHTML = '<font class="label">' +  html + '</font>';
  htmlObj.className = "objSelected";
}

function onChangeTableStyle(tableStyleId, value){
  document.getElementById(tableStyleId).className = "objSelected";
  document.getElementById(tableStyleId).innerHTML = value;
}


/**
* Rollover image from navigation bar previews
*/
function rollImage(object, isOut) {
  if (object.src){ //image buttons
    if (isOut)
      object.src = object.rollout;
    else
      object.src = object.roll;
  } else { //text buttons
  var spanAlign = object.className.indexOf('Left') ? 'spanLeft' : (object.className.indexOf('Right') ? 'spanRight' : 'spanCenter');
    if (isOut) {
      object.className = object.rollout;
    /*if (object.hasChildNodes()) {
      var childs = object.childNodes;
      if (childs) {
        if (childs.item(0) && childs.item(0).className) {
          childs.item(0).className = spanAlign + object.rollout;
        }
      }
    }*/
    } else {
      object.className = object.roll;
    /*if (object.hasChildNodes()) {
      var childs = object.childNodes;
      if (childs) {
        if (childs.item(0) && childs.item(0).className) {
          childs.item(0).className = spanAlign + " " + object.roll;
      }
    }
    }*/
    }
  }
}


/**
*Removes black border arround last selected item
*/
function clearBorder() {
  if (isObjectSelect)
    return;

  //divs
  var divList = document.getElementsByTagName("div");
  for (var i = divList.length - 1; i >= 0; i--)
    if (divList.item(i).className == "objSelected")
      divList.item(i).className = "objNormal";

  //tables
  var tableList = document.getElementsByTagName("table");
  for (var i = tableList.length - 1; i >= 0; i--)
    if (tableList.item(i).className == "objSelected")
      tableList.item(i).className = "";
}

document.onmousedown = callMouseDown;

var isRightClick = false;
var offsetX = 0, offsetY = 0;

function NOF_StyleView_TsRightClick(id) {
  if (event.button == 2 || event.button == 3) {
    isObjectSelect = false;
      offsetX = event.clientX;
      offsetY = event.clientY;
    NOF_StyleView_CallInspector(document.getElementById(id), "graphic", "", offsetX, offsetY)
    event.cancelBubble = true;
    return false;
  }
}

function NOF_CallDoubleClick(x,y) {
    //Flash objects events are handled via NOF_Flash_Listener
    // and only flash objects double click have no event defined
    if (event == null && flashObjectId.length > 0)
    {
      notifyMovieEx(1, 2, x, y, flashObjectId);
      flashObjectId = "";
      return true;
  }
  return false;
}

function callMouseDown() {
  if (event.button != 1) {
    callContextMenu();
  }
  else {
      isObjectSelect = false;
    isRightClick = false;
    if (isFlashObjectClicked()) {
      notifyMovie(1, 1);
    }
    else {
       flashObjectId = "";
    }
  }
}

function callContextMenu(e) {
  isObjectSelect = false;
  if (event.button == 2 || event.button == 3) {
    isRightClick = true;
    offsetX = event.clientX;
    offsetY = event.clientY;

    //if click on navbars preview
    if (event.srcElement.name && event.srcElement.name == "modePreview")
      return;

    if (event.srcElement.className == "title")
      return;

    //Flash objects events are handled via NOF_Flash_Listener
    if (isFlashObjectClicked())
    {
      notifyMovie(2, 1);
      return false;
    }

    flashObjectId = "";

    //Tab type : 'graphic' or 'text'
    var tabType = (event.srcElement.type == "text") ? "text" : "graphic";
    if (event.srcElement.id && tabType != "text") {
      NOF_StyleView_CallInspector(document.getElementById(event.srcElement.id), tabType, "", offsetX, offsetY)
    } else //Call when right-click on body and not on valid style part.
      NOF_StyleView_CallInspector(-1, tabType, "", offsetX, offsetY)

  }
  else
    isRightClick = false;
}

function isFlashObjectClicked() {
    if (event.srcElement.tagName == "OBJECT" ||
      event.srcElement.classid == "CLSID:D27CDB6E-AE6D-11cf-96B8-444553540000" ||
      event.srcElement.classid == "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000")
      return true;
  return false;
}

function disableFlashEventPropagation() {
  if (event != null) {
    event.cancelBubble = true;
  }
  alert("");
}

function notifyMovie(btn, cnt) {
  var x = event.clientX;
  var y = event.clientY;
  var name = event.srcElement.id;
  notifyMovieEx(btn, cnt, x, y, name);
}

function notifyMovieEx(btn, cnt, x, y, name) {
  var movie = null;
  var coll = getMovieCollection(name);
  if ((typeof(NOF) != "undefined") && coll != null) {
    movie = coll.getMovieById(name);
    movie.onMouseDown(x,y,btn,cnt);
  }
  disableFlashEventPropagation();
}

function getMovieCollection(name) {
  var coll = null;
  var bannerName = new String("Banner_Flash");
  var prefix = name.substring(0,bannerName.length);
  if (prefix == bannerName) {
    coll = bannerColl;
  }
  else {
    var previewName = new String("Button_Flash_P_");
    prefix = name.substring(0, previewName.length);
    if ((prefix != previewName) || (event != null && event.button == 1)) {
      coll = navbarColl;
    }
  }
  return coll;
}

function getCssContent(cssClass)
{
	//log(cssClass);
	for (i=0; i<document.styleSheets["displaycss"].rules.length; i++)
	{
		if (document.styleSheets["displaycss"].rules[i].selectorText == cssClass)
			return document.styleSheets["displaycss"].rules[i].style.cssText;
	}
}


/*
function trace(string){
  document.getElementById("debug").value = document.getElementById("debug").value + "\n" + string;
}*/
