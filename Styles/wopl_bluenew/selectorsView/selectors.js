var fmPreview;
var fmSelectors;
var lstSelectors;
var CSSurl          = '../../preview.css';
var selPreview;
var selPreviewWait  = false;
var previewLoaded   = false;
var curTemplatePath;
var curSelObject;
var templates       = './template/';
var defaultTemplate = 'default.html';
var textTemplate    = 'text.html';
var formTemplate    = 'form.html';
var tsTemplate      = 'tableStyle.html';
var defaultClass    = '.nof_defaultPreview';
var implicitRules   = ['BODY','.nof_tag_body',
                       'A','.nof_text_link',
                       'A:visited','.nof_text_visited',
                       'A:active','.nof_text_active',
                       'A:hover','.nof_text_hover'
                      ];

function init() {
  fmPreview     = document.frames['preview'];
  fmSelectors   = document.frames['selectors'];
}

function initSelectors(doc) {
	var innerInitSelectors = function() {
		fmSelectors.document.onmousedown = callMouseDown;
		lstSelectors = fmSelectors.document.getElementById('selectors');
		
		if (lstSelectors.length != 0) {
			lstSelectors.value = lstSelectors[0].value;
			lstSelectors.focus();

			if (document.createEvent) {
				var event = document.createEvent("HTMLEvents");
				
				event.initEvent("change", true, false);
				lstSelectors.dispatchEvent(event);
			} else {
				lstSelectors.fireEvent("onchange");
			}
    }
    else {
      setPreview('BODY')
    }
  }

  if (fmSelectors) {
    innerInitSelectors();
  }
  else  {
    var intvInnerInitSelectors = window.setInterval(function() {
      if (fmSelectors) {
        innerInitSelectors();
        window.clearInterval(intvInnerInitSelectors);
      }
    }, 50);
  }  
}

function initPreview(doc) {
  var innerInitPreview = function() {
    previewLoaded = true;
    fmPreview.document.onmousedown = callMouseDown;
    fmPreview.document.onmousemove = callMouseMove;
    selPreview = fmPreview.document.getElementById('selection');
  }

  if (fmPreview) {
    innerInitPreview();
  }
  else  {
    var intvInnerInitPreview = window.setInterval(function() {
      if (fmPreview) {
        innerInitPreview();
        window.clearInterval(intvInnerInitPreview);
      }
    }, 50);
  }  
}

function setSelPreviewByValue(val) {
  var obj = getPreviewObj(val);
  if (obj) {
    curSelObject = obj.sourceIndex;
    fmPreview.window.scrollTo(0, getPos(obj).top - fmSelectors.document.body.offsetHeight/2);
  }
  else {
    curSelObject = null;
  }
  setSelPreview(obj);
}

function refreshSelPreview() {
  var innerRefreshSelPreview = function() {
    if (curSelObject) {
      setSelPreview(fmPreview.document.all[curSelObject]);    
    }
    else {
      var val = lstSelectors ? lstSelectors.value : null;
      if (val) {
        setSelPreview(getPreviewObj(val));
      }
    }
  }

  if (previewLoaded) {
    innerRefreshSelPreview();
  }
  else  {
    var intvInnerRefreshSelPreview = window.setInterval(function() {
      if (previewLoaded) {
        innerRefreshSelPreview();
        window.clearInterval(intvInnerRefreshSelPreview);
      }
    }, 50);
  }
}

function setPreview(val) {
  NOF_StyleView_CallInspector(val);
  
  var template = defaultTemplate;

  if (isText(val))      template = textTemplate;
  else if (isForm(val)) template = formTemplate;
  else if (isTS(val))   template = tsTemplate;
  else if (isNOF(val))  template = val.split('_',2)[1]+'.html';

  var path = templates+template;
  if (curTemplatePath != path) {
    previewLoaded = false;
    fmPreview.location.href = curTemplatePath = path;
  }
  
  if (template == defaultTemplate) {
    if (previewLoaded) {
      copyRule(val,defaultClass);
    }
    else  {
      var intvCopyRule = window.setInterval(function() {
        if (previewLoaded) {
          copyRule(val,defaultClass);
          window.clearInterval(intvCopyRule);
        }      
      }, 50);
    }
  }
  
  if (template == textTemplate) {
    if (previewLoaded) {
      copyImplicitRules();
    }
    else  {
      var intvCopyImplicitRules = window.setInterval(function() {
        if (previewLoaded) {
          copyImplicitRules();
          window.clearInterval(intvCopyImplicitRules);
        }
      }, 50);
    }
  }
  
  if (template == tsTemplate && curTemplatePath == path) {
    fmPreview.location.href = path;
  }
  
  if (previewLoaded) {
    setSelPreviewByValue(val);
  }
  else  {
    var intvSetSelPreviewByValue = window.setInterval(function() {
      if (previewLoaded) {
        setSelPreviewByValue(val);
        window.clearInterval(intvSetSelPreviewByValue);
      }
    }, 50);
  }
}

function setSelector(obj) {
  if (!selPreviewWait) {
    selPreviewWait = true;

    if (obj) {
      curSelObject = obj.sourceIndex;
      var val = getFirstTag(obj, 'input').value;

      if (lstSelectors.value != val) {
        NOF_StyleView_CallInspector(val);
        var opt = getFirstOption(lstSelectors, val);
        opt ? opt.selected = true : lstSelectors.value = '';
      }
    }
    else {
      NOF_StyleView_CallInspector(val);
    }
    setSelPreview(obj);
  }
  window.setTimeout("selPreviewWait=false", 500);
}

function copyRule(sSrc,sDest) {
  var cssSheet = fmPreview.document.styleSheets[0];
  var oDest = getRule(sSrc);

  if (oDest && oDest.style.cssText.length != 0) {
    getStyleSheet(CSSurl).addRule(sDest,oDest.style.cssText);
  }
}

function getStyleSheet(val) {
  var cssSheet = fmPreview.document.styleSheets[0];
  var i=0;
  do {
    if (cssSheet.imports[i].href == val) {
      return cssSheet.imports[i];
    }
    i++
  }
  while (i<cssSheet.imports.length && cssSheet.imports[i-1].href != CSSurl);
  return null;
}

function getRule(val) {
  var cssSheet = fmPreview.document.styleSheets[0];
  var i=0;
  do {
    if (cssSheet.imports[i].href == CSSurl) {
      var j=0;
      var cssPreview = cssSheet.imports[i];
      do {
        //if (isEqualCI(cssPreview.rules[j].selectorText, val) && cssPreview.rules[j].style.cssText.indexOf(':') != -1) {
        if (cssPreview.rules[j] && isEqualCI(cssPreview.rules[j].selectorText, val)) {
          return cssPreview.rules[j];
        }
        j++
      }
      while (j<cssPreview.rules.length && isNotEqualCI(cssPreview.rules[j-1].selectorText, val));
    }
    i++
  }
  while (i<cssSheet.imports.length && cssSheet.imports[i-1].href != CSSurl);
  return null;
}

function refreshCSS(sURL) {
  fmPreview.document.documentElement.style.cursor = 'wait';
  var cssSheet = fmPreview.document.styleSheets[0];
  var i=0;
  do {
    if (cssSheet.imports[i].href == sURL) {
      cssSheet.removeImport(i);
      cssSheet.addImport(sURL,i);
      
      if (curTemplatePath == templates+textTemplate) {
        copyImplicitRules();
      }
      else if (curTemplatePath == templates+defaultTemplate) {
        copyRule(lstSelectors.value,defaultClass);
      }
      else if (curTemplatePath == templates+tsTemplate) {
        fmPreview.location.reload(true);
      }
      else {
        //TODO: Should not have to reload, addImport does not seem to find the last rule added!
        var x = fmPreview.document.documentElement.scrollTop;
        var y = fmPreview.document.documentElement.scrollLeft;

        previewLoaded = false;
        fmPreview.location.reload(true);
        
        var innerScroll = function() {
          fmPreview.scrollTo(y, x);
        }

        if (previewLoaded) {
          innerScroll();
        }
        else  {
          var intvInnerScroll = window.setInterval(function() {
            if (previewLoaded) {
              innerScroll();
              window.clearInterval(intvInnerScroll);
            }
          }, 50);
        }
      }
      
      refreshSelPreview();
    }
    i++
  }
  while (i<cssSheet.imports.length && cssSheet.imports[i-1].href != sURL);
  fmPreview.document.documentElement.style.cursor = 'auto';
}

function copyImplicitRules() {
  for (var i=0; i<implicitRules.length; i++) {
    copyRule(implicitRules[i],implicitRules[i+1]);
    i++
  }
}

function setSelPreview(obj) {
  if (obj) {
    var pos = getPos(obj);
    selPreview.style.top     = pos.top + 'px';
    selPreview.style.left    = pos.left + 'px';

    selPreview.style.width   = obj.offsetWidth + 'px';
    selPreview.style.height  = obj.offsetHeight + 'px';

    selPreview.style.display = 'block';
  }
  else {
    if (selPreview) selPreview.style.display = 'none';
    //lstSelectors.value = null;
  }
}

function appendSelector(val) {
  //TODO:  getRule falsely returns null on new items from Forms temaplte
  //if (isNotEqualCI(lstSelectors.value, val) && getRule(val) != null) {
  if (isNotEqualCI(lstSelectors.value, val)) {
    var optn = fmSelectors.document.createElement("OPTION");
    optn.text = val;
    optn.value = val;
    lstSelectors.options.add(optn);
    lstSelectors.value = val;
    refreshSelPreview();
  }  
}

function getPreviewObj(val) {
  var elms = fmPreview.document.all.tags('INPUT');
  if (elms) {
    for (var i=0; i<elms.length; i++) {
      if (isEqualCI(elms[i].value, val)) {
        return elms[i].parentElement;
      }
    }
  }
  return null;
}

function getQueryString(doc) {
  var qs = new Object();
  var query = doc.location.search.substring(1).split('&');
  for (var i in query) {
    var nv = query[i].split('=');
    qs[nv[0]] = nv[1];
  }
  return qs;
}

function getCSSImport(path) {
  var s  = '\n';
      s += '<style type="text/css">\n';
      s += '  @import url("' +path+ '");\n';
      s += '</style>\n';
  return s;
}

function getPos(obj) {
  var curLeft = 0;
  var curTop = 0;
  if (obj.offsetParent) {
    curLeft = obj.offsetLeft;
    curTop = obj.offsetTop;
    while (obj = obj.offsetParent) {
      curLeft += obj.offsetLeft;
      curTop += obj.offsetTop;
    }
  }
  return { left:curLeft, top:curTop };
}

function getFirstOption(list, val) {
  for (var i=0; i<list.length; i++) {
    if (isEqualCI(list.options[i].value, val)) {
      return list.options[i];
    }
  }
  return null;
}

function getFirstTag(container, tag) {
	var elm = container.getElementsByTagName(tag)[0];

	if (elm) {
		return elm;
	}
	
	return null;
}

function callMouseMove() {
  if (fmPreview.event) {
    if (fmPreview.event.clientX < 3) {
      fmPreview.document.documentElement.style.cursor = 'col-resize';
    }
    else {
      fmPreview.document.documentElement.style.cursor = 'auto';
    }
  }
}

function isImplicitRule(val) {
 for (var i=0; i<implicitRules.length; i++) {
  if (implicitRules[i] = val) {
    return i;
  }
  i++; 
 }
 return -1;
}

function isNOF(val) {
  var valid = false;
  if (val.indexOf('.nof_') != -1) {
    var path = '';
    
    if (navigator.userAgent.indexOf("MSIE 6") != -1) {
      var aPathName = unescape(window.location.pathname).split('\\');

      for (var i=0; i<aPathName.length-1; i++)  {
        path += (i != 0) ? aPathName[i] : aPathName[i].substr(1);
        path += '/';
      }
    }
    else {
      var aPathName = unescape(window.location.pathname).split('/');

      for (var i=1; i<aPathName.length-1; i++)  {
        path += aPathName[i];
        path += '/';
      }
    }

    path += templates + val.split('_',2)[1]+'.html';
    valid = app.DoesFileExist(path);
  }  
  
  return valid;
}

function isTS(val) {
  return (val.indexOf('.nof_') != -1 && val.indexOf('TableStyles') != -1);
}

function isForm(val) {
  var elements = [
    'form',
    'input, select, textarea',
    /*
    '.nof_form_input_text',
    '.nof_form_input_password',
    '.nof_form_input_checkbox',
    '.nof_form_input_radio',
    '.nof_form_input_submit',
    '.nof_form_input_image',
    '.nof_form_input_reset',
    '.nof_form_input_button',
    '.nof_form_input_file',
    */
    'select',
    'select optgroup',
    'select option',
    '.nof_form_listBox',
    /*
    '.nof_form_listBox_optgroup',
    '.nof_form_listBox_option',
    */
    'textarea',
    'label',
    'fieldset',
    'legend',
    
    // Hover Pseudo-class
    'input:hover, select:hover, textarea:hover',
    /*
    '.nof_form_input_text:hover',
    '.nof_form_input_password:hover',
    '.nof_form_input_checkbox:hover',
    '.nof_form_input_radio:hover',
    '.nof_form_input_submit:hover',
    '.nof_form_input_image:hover',
    '.nof_form_input_reset:hover',
    '.nof_form_input_button:hover',
    '.nof_form_input_file:hover',
    */
    'select:hover',
    'select optgroup:hover',
    'select option:hover',
    /*
    '.nof_form_listBox:hover',
    '.nof_form_listBox_optgroup:hover',
    '.nof_form_listBox_option:hover',
    */
    'textarea:hover',
    'label:hover'
    ];
  
  for (var i=0; i<elements.length; i++) {
    if (isEqualCI(val, elements[i])) {
      return true;
    }
  }
  return false;
}

function isText(val) {
  var csElements = [
    //'BODY',
    ];
    
  var ciElements = [
    'body',
    '.textobject',
    'p',
    'a',
    'a:link',
    'a:active',
    'a:visited',
    'a:hover',
    '.textnavbar',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'pre',
    'blockquote',
    'address',
    'ol',
    'ol li',
    'ul',
    'ul li',
    'ul li li',
    'ul li li li'
    ];
  
  var boo = false;
  
  for (var i=0; i<csElements.length; i++) {
    if (val == csElements[i]) {
      boo = true;
    }
  }
  for (var i=0; i<ciElements.length; i++) {
    if (isEqualCI(val, ciElements[i])) {
      boo = true;
    }
  }

  return boo;
}

function isEqualCI(arg1, arg2) {               
  var boo = arg1.toLowerCase() == arg2.toLowerCase()
  return boo;
}

function isNotEqualCI(arg1, arg2) {               
  var boo = arg1.toLowerCase() != arg2.toLowerCase()
  return boo;
}