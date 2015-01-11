var MODE_DEVELOP = false;

function NOF_StyleView_CallInspector(val, x, y) {
  // Check if fusion is available
  if (fusion == null || typeof(fusion) == "undefined") return;

  if(val) {
    x && y ? fusion.onTextStyleSelected(val  + ":" + x + ":" + y) : fusion.onTextStyleSelected(val);
    //x && y ? fusion.onGraphicStyleSelected(val  + ":" + x + ":" + y) : fusion.onGraphicStyleSelected(val);
  }
  else {
     if (!MODE_DEVELOP) {
       fusion.onTextStyleSelected("NULL");
     }
  }
}

function NOF_SelectorsView_ResponseFromInspector(xmlNodeText) {
  var dom = new ActiveXObject("msxml2.DOMDocument.3.0");
  dom.async = false;
  dom.resolveExternals = false;
  dom.loadXML(xmlNodeText);

  refreshCSS(CSSurl);
  appendSelector(dom.selectSingleNode("//Selector/@id").value);
}

//Event handlers
function callMouseDown() {
  var e;
  var srcDoc;
  
  if (fmPreview.event) {
    e = fmPreview.event;
    srcDoc = 'preview';
  }
  if (fmSelectors.event) {
    e = fmSelectors.event;
    srcDoc = 'selectors';
  }
  if (e.button != 1) {
    callContextMenu(e, srcDoc);
  }
}

function callContextMenu(e,srcDoc) {
  if (e.button == 2 || e.button == 3) {
    var additionalX = (srcDoc == 'preview') ? fmSelectors.document.body.offsetWidth : 0;
    
    var offsetX = e.clientX + additionalX;
    var offsetY = e.clientY;

    NOF_StyleView_CallInspector("context", offsetX, offsetY);
  }
}
