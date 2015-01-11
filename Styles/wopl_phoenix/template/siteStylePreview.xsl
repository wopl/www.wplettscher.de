<?xml version="1.0" encoding="ISO-8859-1"?>

<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:import href="siteStyle.xsl"/>
<xsl:output method="html" />
<xsl:strip-space elements="*" />

<xsl:template match="SiteStyle">
<html>
<head>
<script>
	//Get the absolute path to navabar script
	var fsiApp = new ActiveXObject("FSI.FSIApplication.13000000.1");
	document.write("&lt;script language='javascript' src='" + fsiApp.AppDirectory + "NetObjects System/Resources/js/external/jquery/jquery.js'&gt;&lt;\/script&gt;" );
	document.write("&lt;script language='javascript' src='" + fsiApp.AppDirectory + "NetObjects System/Resources/js/external/jquery/plugins/navbars.js'&gt;&lt;\/script&gt;" );
	document.write("&lt;link rel='stylesheet' type='text\/css' href='" + fsiApp.AppDirectory + "NetObjects System/fusion.css'\/&gt;" );
	fsiApp = null;
</script>
<link rel="stylesheet" href="display.css" type="text/css" />
</head>

<style type="text/css" title="NOF_STYLE_SHEET">
body { margin:0px; width: 960px; }
div#LayoutLYR { float:left; position:absolute; }
div#Banner1LYR { position:absolute; top:0px; left:100px; _width:300px; _height:58px; z-index:1 }
div#NavigationBar1LYR { position:absolute; top:100px; left:100px; _width:404px; _height:36px; z-index:1000 }
div#Text1LYR { position:absolute; top:157px; left:110px; width:740px; height:17px; z-index:3 }
</style>

<xsl:apply-templates select="Navbar" mode="generate"/>

<body bgcolor="" background="">
 <div class="nof-positioning" _id="LayoutLYR">
  <div class="nof-positioning" id="Banner1LYR" _style="margin-left: 100px;">
   <xsl:apply-templates select="Banners/Banner[position() = 1]" />
   <!-- <div title="Welcome" style="width: 300px; height: 58px; background-repeat: no-repeat; background-image: url('./assets/images/autogen/Welcome_NBanner.gif');">
    <p style="visibility: hidden;">Welcome</p> -->
   </div>
  </div>
  <div class="nof-positioning" ID="NavigationBar1LYR" _style="width: 404px; margin-top: 42px; margin-left: 100px; ">
   <ul id="NavigationBar1" style="z-index: 1000; display: none">
    <li id="NavigationButton1"><a href="./index.html" title="Home">Home</a></li>
    <li id="NavigationButton2"><a href="./html/untitled1.html" title="Unbenannt">Unbenannt</a>
     <ul id="NavigationBar1_1">
      <li id="NavigationButton5"><a href="./html/untitled4.html" title="Unbenannt">Unbenannt</a></li>
      <li id="NavigationButton6"><a href="./html/untitled5.html" title="Unbenannt">Unbenannt</a>
       <ul id="NavigationBar1_2">
        <li id="NavigationButton7"><a href="./html/untitled6.html" title="Unbenannt">Unbenannt</a></li>
       </ul>
      </li>
     </ul>
    </li>
    <li id="NavigationButton3"><a href="./html/untitled2.html" title="Unbenannt">Unbenannt</a></li>
    <li id="NavigationButton4"><a href="./html/untitled3.html" title="Unbenannt">Unbenannt</a></li>
   </ul>
  </div>
  <div class="nof-positioning TextObject" id="Text1LYR" _style="width: 740px; margin-top: 21px; margin-left: 110px; ">
   <h1>Überschrift 1</h1>
   <h3>Überschrift 3</h3>
   <p>Lorem ipsum dolor sit amet, consectetur <a href="./index.html">sample link</a> adipiscing elit. Mauris vitae tellus mi. Aenean vulputate porta nulla. Sed eu interdum mauris. Fusce blandit accumsan justo, in lobortis augue semper eu. Praesent arcu urna, cursus vitae volutpat quis, pellentesque ac erat. Vivamus vitae dolor sem. Integer interdum gravida vulputate. Cras auctor condimentum nunc eu placerat. Duis nibh purus, ultrices ac rutrum a, sodales nec enim. In iaculis scelerisque aliquet. Proin adipiscing lorem a arcu sollicitudin ornare. Suspendisse potenti. Quisque ultricies molestie risus, et lacinia nulla consectetur at. Donec viverra volutpat orci sollicitudin aliquet. Nulla sit amet nunc augue. Aliquam felis nisl, faucibus et faucibus sit amet, pretium eu purus. Pellentesque feugiat, elit eu sollicitudin tincidunt, odio nunc euismod urna, a venenatis diam ipsum consectetur nisl. Nam ornare risus ac mauris tincidunt non faucibus eros accumsan. Donec ullamcorper diam ut ipsum euismod dictum.</p>
   <h4>Überschrift 4</h4>
   <p>Donec lorem diam, ultricies at tincidunt nec, <a href="./index.html">sample link</a> semper eget elit. Nulla vulputate risus quis libero elementum et mollis felis feugiat. Nunc placerat elit vitae turpis lacinia sodales. Duis ornare, nisi ut dignissim ornare, nunc augue commodo magna, at vehicula libero nunc at urna. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In eros urna, condimentum pharetra accumsan sed, pretium ac lectus. Fusce lacinia sodales mollis. Fusce adipiscing interdum posuere. In hac habitasse platea dictumst.</p>
   <ul>
    <li>Element Item 1</li>
    <ul>
     <li>Element A</li>
     <li>Element B</li>
    </ul>
    <li>Element 2</li>
    <li>Element 3</li>
   </ul>
   <div class="nof-positioning TextNavBar" style="width: 740px; text-align: center;">[Home] [<a class="nof-navPositioning" href="./html/untitled1.html">Unbenannt</a>] [<a class="nof-navPositioning" href="./html/untitled2.html">Unbenannt</a>] [<a class="nof-navPositioning" href="./html/untitled3.html">Unbenannt</a>]</div>
  </div>
  
 <xsl:apply-templates select="header"/>
</body>
</html>
</xsl:template>


<xsl:template match="Navbar" mode="generate">
<script>
ButtonsImageMapping = [];
$(document).ready(function(){
	var btn1, btn2, img1, img2;
	
	setTimeout(function() {
		img1 = $('&lt;img \/&gt;')
			.attr('src', '<xsl:value-of select="./NavbarState[position() = 1]/Button[position() = 1]/ButtonState[position() = 1]/Image/@path"/>')
			.css({'position': 'absolute', 'z-index': '1000', 'top': '-1000', 'left': '-1000'})
			.load(function() {
				var img = $(this);
				img.removeAttr('width').removeAttr('height');
				btn1 = {'w': img.width(), 'h': img.height()}
			}).appendTo('body');
		
		img2 = $('&lt;img \/&gt;')
			.attr('src', '<xsl:value-of select="./NavbarState[position() = 2]/Button[position() = 1]/ButtonState[position() = 1]/Image/@path"/>')
			.css({'position': 'absolute', 'z-index': '1000', 'top': '-1000', 'left': '-1000'})
			.load(function() {
				var img = $(this);
				img.removeAttr('width').removeAttr('height');
				btn2 = {'w': img.width(), 'h': img.height()}
			}).appendTo('body');	
	}, 100)

	!function createNavigation() {
		if (btn1 == undefined || btn2 == undefined) {
			setTimeout(createNavigation, 100);
		} else {			
			ButtonsImageMapping["NavigationBar1"] = {
				"NavigationButton1" : { image: "<xsl:value-of select="./NavbarState[position() = 1]/Button[position() = 1]/ButtonState[position() = 1]/Image/@path"/>", rollover: "<xsl:value-of select="./NavbarState[position() = 1]/Button[position() = 1]/ButtonState[position() = 2]/Image/@path"/>", w: btn1.w, h: btn1.h },
				"NavigationButton2" : { image: "<xsl:value-of select="./NavbarState[position() = 1]/Button[position() = 1]/ButtonState[position() = 1]/Image/@path"/>", rollover: "<xsl:value-of select="./NavbarState[position() = 1]/Button[position() = 1]/ButtonState[position() = 2]/Image/@path"/>", w: btn1.w, h: btn1.h, opening: "bottom", offsetX: 0, offsetY: btn1.h },
				"NavigationButton5" : { image: "<xsl:value-of select="./NavbarState[position() = 2]/Button[position() = 1]/ButtonState[position() = 1]/Image/@path"/>", rollover: "<xsl:value-of select="./NavbarState[position() = 2]/Button[position() = 1]/ButtonState[position() = 2]/Image/@path"/>", w: btn2.w, h: btn2.h },
				"NavigationButton6" : { image: "<xsl:value-of select="./NavbarState[position() = 2]/Button[position() = 1]/ButtonState[position() = 1]/Image/@path"/>", rollover: "<xsl:value-of select="./NavbarState[position() = 2]/Button[position() = 1]/ButtonState[position() = 2]/Image/@path"/>", w: btn2.w, h: btn2.h },
				"NavigationButton7" : { image: "<xsl:value-of select="./NavbarState[position() = 2]/Button[position() = 1]/ButtonState[position() = 1]/Image/@path"/>", rollover: "<xsl:value-of select="./NavbarState[position() = 2]/Button[position() = 1]/ButtonState[position() = 2]/Image/@path"/>", w: btn2.w, h: btn2.h },
				"NavigationButton3" : { image: "<xsl:value-of select="./NavbarState[position() = 1]/Button[position() = 1]/ButtonState[position() = 1]/Image/@path"/>", rollover: "<xsl:value-of select="./NavbarState[position() = 1]/Button[position() = 1]/ButtonState[position() = 2]/Image/@path"/>", w: btn1.w, h: btn1.h },
				"NavigationButton4" : { image: "<xsl:value-of select="./NavbarState[position() = 1]/Button[position() = 1]/ButtonState[position() = 1]/Image/@path"/>", rollover: "<xsl:value-of select="./NavbarState[position() = 1]/Button[position() = 1]/ButtonState[position() = 2]/Image/@path"/>", w: btn1.w, h: btn1.h }
			};

			$('a').click(function() { return false });
			$.fn.nofNavBarOptions({ navBarId: "NavigationBar1", rollover: true, autoClose: true });
			$("#NavigationBar1").nofNavBar({isMain: true, orientation: "horizontal" });
			$("#NavigationBar1_1").nofNavBar({isMain: false, orientation: "vertical", opening: "right", offsetX: btn2.w, offsetY: 0 });
			$("#NavigationBar1_2").nofNavBar({isMain: false, orientation: "vertical", opening: "right", offsetX: btn2.w, offsetY: 0 });
			$("#NavigationBar1 ul").hide();
			
			$(img1).remove();
			$(img2).remove();
			btn1 = btn2 = img1 = img2 = null
		};
	}();
});
</script>  
</xsl:template>

<xsl:template match="Banner">  
  <xsl:choose>  	
    <xsl:when test="@type = 'Image'">      
        <img src="{./Image/@path}" />
    </xsl:when>
    <xsl:otherwise>   
      <div style="{./Font/@css}"><img src="labels/spacer.gif" width="1" height="1">Text Banner</img></div>
    </xsl:otherwise>
   </xsl:choose> 
</xsl:template>

</xsl:stylesheet>