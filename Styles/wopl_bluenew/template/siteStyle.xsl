<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet xmlns:xsl= "http://www.w3.org/1999/XSL/Transform"
                 xmlns:msxsl="urn:schemas-microsoft-com:xslt"
                 xmlns:nof="http://netobjects.com/nof"
                 version="1.0">

<xsl:import href="decoratorStyle.xsl"/>

<xsl:output method="html"/>
<xsl:output cdata-section-elements="SCRIPT"/>
<xsl:strip-space elements="*"/>

<xsl:template match="SiteStyle">
<html>
<head>
<meta http-equiv="Pragma" content="no-cache"/>
<meta http-equiv="Cache-Control" content="no-cache"/>
 <script language="JavaScript">      
    document.write( 
    "&lt;script language='javascript' src='js/FlashCtrl.js'&gt;&lt;\/script&gt;" + 
    " &lt;script language='javascript' src='js/scripts.js'&gt;&lt;\/script&gt;" + 
    " &lt;link rel='stylesheet' type='text/css' href='css/general_en.css' /&gt;" );    
 </script>
<script language='javascript'>
<![CDATA[
function NOF_OnLoadPage() {
	runOnLoad();
	if (typeof navbarColl == "object") {
		navbarColl.startAll();
	}
}
]]>
</script>
<link rel="stylesheet" href="display.css" type="text/css" name="displaycss" id="displaycss"/>

</head>

<body onclick="NOF_StyleView_CallInspector(null)" id="author" onLoad="NOF_OnLoadPage()" onresize="navbarColl.resizeAll();">
<TABLE width="100%" border="0" cellpadding="0" cellspacing="0">
  <TR>
    <TD>
       <table border="0" cellspacing="0" cellpadding="3" width="100%">
         <tr>
          <td width="100" valign="middle"><span class="title" id="styleView.label.author">Gestaltet von:</span></td>
          <td valign="middle">            
              <div id="{//Author/@id}" onclick="NOF_StyleView_CallInspector(this, 'graphic')" ondblclick="NOF_StyleView_DblClick(this, 'graphic')" class="objNormal">         		
                   <xsl:apply-templates select="Author"/>                    
              </div>
              <script>               
              	function runOnLoad() {              	                      	       
              		handleAuthor(<xsl:value-of select="//Author/@id"/>);
              	}
              	</script>
          </td>    
          </tr>
       </table>    
    </TD>
  </TR>
  <TR>
    <TD background="labels/sv_title_div.gif"><span class="title" id="styleView.label.banner">Banner</span></TD>
  </TR>
  <TR>
    <TD><xsl:apply-templates select="Banners" /></TD>
  </TR>
  <TR>
    <TD><IMG src="labels/spacer.gif" width="50" height="10"/></TD>
  </TR>
</TABLE>

<TABLE width="100%" border="0" cellpadding="0" cellspacing="0">
  <TR>
    <TD background="labels/sv_title_div.gif"><span class="title"  id="styleView.label.navigation">Navigation</span></TD>
  </TR>
  <TR>
    <TD><TABLE border="0" cellpadding="0" cellspacing="0" bordercolor="#FFFFFF">
        <TR>
          <TD><img src="labels/spacer.gif" width="1" height="1" border="0"/></TD>
          <TD><IMG src="labels/spacer.gif" width="10" height="20"/></TD>
          <TD><span class="label" id="styleView.label.regular">Standard</span></TD>
          <TD><IMG src="labels/spacer.gif" width="10" height="20"/></TD>
          <TD><span class="label" id="styleView.label.regularRollover">Standard-Rollover</span></TD>
          <TD><IMG src="labels/spacer.gif" width="10" height="20"/></TD>
          <TD><span class="label" id="styleView.label.highlighted">Hervorgehoben</span></TD>
          <TD><IMG src="labels/spacer.gif" width="10" height="20"/></TD>
          <TD><span class="label" id="styleView.label.higlightedRollover">Hervorgehobenes Rollover</span></TD>
          <TD width="100%"></TD>
        </TR>
  
        <xsl:apply-templates select="//Navbar/NavbarState" mode="buttonSet" />	        
      
        <TR>
          <TD colspan="10"><IMG src="labels/spacer.gif" width="20" height="10"/></TD>
        </TR>
        <TR>
          <TD valign="top"><span class="label" id="styleView.label.preview">Vorschau</span></TD>
          <TD><img src="labels/spacer.gif" width="1" height="1" border="0"/></TD>
          <TD colspan="7" class="label" width="*">
              <xsl:for-each select="//Navbar/NavbarState">
                <xsl:value-of select="@name"/>
                <xsl:apply-templates select="." mode="preview"/>
              </xsl:for-each>
           </TD>
        </TR>
      </TABLE></TD>
  </TR>
  <TR>
    <TD><IMG src="labels/spacer.gif" width="50" height="10"/></TD>
  </TR>
</TABLE>
<TABLE width="100%" border="0" cellpadding="0" cellspacing="0">
  <TR>
    <TD background="labels/sv_title_div.gif"><span class="title" id="styleView.label.tableStyles">Tabellen-Styles</span></TD>
  </TR>
  <TR>
    <TD>   
      <xsl:apply-templates select="TableStyles"/>      
    </TD>
  </TR>
  <TR>
    <TD><IMG src="labels/spacer.gif" width="50" height="10"/></TD>
  </TR>
</TABLE>

<!--text part-->
<TABLE width="100%" border="0" cellpadding="0" cellspacing="0">
  <TR>
    <TD background="labels/sv_title_div.gif"><span class="title" id="styleView.label.textStyles">Text Styles</span></TD>
  </TR>
  <TR>
    <TD><IMG src="labels/spacer.gif" width="50" height="10"/></TD>
  </TR>
</TABLE>

<TABLE WIDTH="100%" >
<TR >
<TD VALIGN="TOP" ALIGN="LEFT" WIDTH="50%"  >
<TABLE >
	<TR>
	<TD  style="background-image: url(labels/sv_title_div.gif); background-repeat: repeat-x; height: 31px; width: 300px;">
	<FONT class="title" STYLE="font-family:Verdana,Tahoma,Arial,Helvetica,sans-serif; font-size:7.5pt;" >Haupttext</FONT>
	</TD>
	</TR>
</TABLE>
</TD>
</TR>
</TABLE>
<xsl:apply-templates select="BODY" />

<TABLE WIDTH="100%"  >
<TR >
<TD VALIGN="TOP" ALIGN="LEFT" WIDTH="50%"   >

<br >
<TABLE  >
    <TR >
    <TD   style="background-image: url(labels/sv_title_div.gif); background-repeat: repeat-x; height: 31px; width: 300px;">
    <FONT    class="title" STYLE="font-family:Verdana,Tahoma,Arial,Helvetica,sans-serif; font-size:7.5pt">Standard</FONT>
    </TD>
    </TR>
</TABLE>
<xsl:apply-templates select="P" />
</br>
<BR>
<TABLE >
    <TR>
    <TD   style="background-image: url(labels/sv_title_div.gif); background-repeat: repeat-x; height: 31px; width: 300px;">
    <FONT   class="title" STYLE="font-family:Verdana,Tahoma,Arial,Helvetica,sans-serif; font-size:7.5pt">Textobjekt</FONT>
    </TD>
    </TR>
</TABLE>
<xsl:apply-templates select="TextObject" />
</BR>
<BR>
<TABLE >
    <TR>
    <TD   style="background-image: url(labels/sv_title_div.gif); background-repeat: repeat-x; height: 31px; width: 300px;">
    <FONT class="title" STYLE="font-family:Verdana,Tahoma,Arial,Helvetica,sans-serif; font-size:7.5pt">Text-Navigationsleisten</FONT>
    </TD>
    </TR>
</TABLE>
<xsl:apply-templates select="TextNavbar" />
</BR>
<BR>
<TABLE>
    <TR>
    <TD  style="background-image: url(labels/sv_title_div.gif); background-repeat: repeat-x; height: 31px; width: 300px;">
    <FONT class="title" STYLE="font-family:Verdana,Tahoma,Arial,Helvetica,sans-serif; font-size:7.5pt">Verknüpfung</FONT>
    </TD>
    </TR>
</TABLE>
<xsl:apply-templates select="Link" />
</BR>
</TD>
<TD VALIGN="TOP" ALIGN="LEFT" WIDTH="50%" >
<br>
<TABLE >
    <TR>
    <TD  style="background-image: url(labels/sv_title_div.gif); background-repeat: repeat-x; height: 31px; width: 300px;">
    <FONT  class="title" STYLE="font-family:Verdana,Tahoma,Arial,Helvetica,sans-serif; font-size:7.5pt">Liste mit Aufzählungszeichen</FONT>
    </TD>
    </TR>
</TABLE>
<xsl:apply-templates select="UnorderedList" />

<TABLE >
    <TR>
    <TD   style="background-image: url(labels/sv_title_div.gif); background-repeat: repeat-x; height: 31px; width: 300px;">
    <FONT  class="title" STYLE="font-family:Verdana,Tahoma,Arial,Helvetica,sans-serif; font-size:7.5pt">Liste mit Nummerierung</FONT>
    </TD>
    </TR>
</TABLE>
<xsl:apply-templates select="OrderedList" />
</br>
<TABLE >
    <TR>
    <TD style="background-image: url(labels/sv_title_div.gif); background-repeat: repeat-x; height: 31px; width: 300px;">
      <FONT  class="title" STYLE="font-family:Verdana,Tahoma,Arial,Helvetica,sans-serif; font-size:7.5pt">Überschriften</FONT>
    </TD>
    </TR>
</TABLE>
<xsl:apply-templates select="Headings" />

</TD>
</TR>
</TABLE>
<!--end text part-->

<TABLE width="100%" border="0" cellpadding="0" cellspacing="0">
  <TR>
    <TD width="300" background="labels/sv_title_div.gif"><span class="title" id="styleView.label.pageBackground">Seiten-Hintergrund</span></TD>
    <TD><IMG src="labels/spacer.gif" width="20" height="20"/></TD>
    <TD background="labels/sv_title_div.gif"><span class="title" id="styleView.label.addPageElements">Zusätzliche Seiten-Elemente</span></TD>
  </TR>
  <TR>
    <TD  valign="top"><!-- Page background -->
      <div id="background" onclick="NOF_StyleView_CallInspector(this, 'graphic')" ondblclick="NOF_StyleView_DblClick(this, 'graphic')" class="objNormal">
        <table id="background" width="100%" height="100%"  border="0" cellpadding="0" cellspacing="0" class="background">
            <tr>
              <td  id="background" valign="top"><IMG src="labels/spacer.gif" alt="" name="styleThumb" width="250" height="150" id="background"/></td>
            </tr>
        </table>
      </div>	
    </TD>
    <TD><img src="labels/spacer.gif" width="1" height="1" border="0"/></TD>
    <!-- Additional Page Elements -->
    <TD valign="top"><xsl:apply-templates select="header" mode="graphicView"/></TD>
  </TR>
  <TR>
    <TD colspan="3"><IMG src="labels/spacer.gif" width="50" height="10"/></TD>
  </TR>
</TABLE>
<TABLE width="100%" border="0" cellpadding="0" cellspacing="0">
  <TR>
    <TD width="300" background="labels/sv_title_div.gif"><span class="title" id="styleView.label.dataList">Datenlisten-Icons</span></TD>
    <TD><IMG src="labels/spacer.gif" width="30" height="20"/></TD>
    <TD background="labels/sv_title_div.gif"><span class="title" id="styleView.label.styledLine">Style-Linie</span></TD>
  </TR>
  <TR>
    <TD valign="top" width="300">
      <TABLE border="0" cellpadding="5" cellspacing="0" class="objSelected" width="300">
        <TR>
          <TD width="300">            
            <xsl:apply-templates select="Bullet"/>
          </TD>
        </TR>
      </TABLE></TD>
    <TD><img src="labels/spacer.gif" width="5" height="1" border="0"/></TD>
    <TD valign="top"><xsl:apply-templates select="Line"/></TD>
  </TR>
</TABLE>

    </body>
  </html>  
</xsl:template>

<xsl:template match="ButtonState" mode="textPreview">
  <xsl:param name="rollCss">0</xsl:param>
  <xsl:param name="rollId"></xsl:param>
  <xsl:param name="rollAlign"></xsl:param>
  <xsl:variable name="hAlign"><xsl:value-of select="./@hAlign"/></xsl:variable>
  <xsl:variable name="voffset"><xsl:value-of select="./@vAlign"/></xsl:variable>
  <xsl:variable name="hoffset"><xsl:value-of select="./@hoffset"/></xsl:variable>

  <xsl:variable name="cssClass">
  <xsl:value-of select='./Font/@css'/>
  <xsl:choose>
    <xsl:when test="$hAlign = 'left'">spanLeft</xsl:when>
    <xsl:when test="$hAlign = 'right'">spanRight</xsl:when>
    <xsl:otherwise>spanCenter</xsl:otherwise>
  </xsl:choose><xsl:value-of select="self::node()/@id"/>
  </xsl:variable>

  <xsl:variable name="rollCssClass">
  <xsl:value-of select="$rollCss"/>
  <xsl:choose>
    <xsl:when test="$rollAlign = 'left'"> spanLeft</xsl:when>
    <xsl:when test="$rollAlign = 'right'"> spanRight</xsl:when>
    <xsl:otherwise>spanCenter</xsl:otherwise>
  </xsl:choose><xsl:value-of select="$rollId"/>
  </xsl:variable>
    <span onmouseover="rollImage(this);"
    onmouseout="rollImage(this, true);"
    roll="{$rollCssClass}"
    rollout="{$cssClass}"
    class="{$cssClass}">Schltf.-Text</span>
</xsl:template>

<xsl:template match="//Navbar/NavbarState[@type='Flash']" mode="preview">
	<TABLE width="10" border="0" cellpadding="0" cellspacing="0">
	  <TR>
	    <TD>
		<div id="P_{@id}" style="float:left;height:30" onclick="NOF_StyleView_CallFlashInspector(document.getElementById('{@id}'), document.getElementById('{./Button/ButtonState/@parent}'), 'graphic')" class="objNormal">
		   <xsl:call-template name="FlashNav">
			<xsl:with-param name="idPrefix">P</xsl:with-param>
			<xsl:with-param name="source"><xsl:value-of select="./Button/ButtonState/Flash/@path"/></xsl:with-param>
			<xsl:with-param name="parent"><xsl:value-of select="./Button/ButtonState/@parent"/></xsl:with-param>
			<xsl:with-param name="flashId">Button_Flash_P_<xsl:value-of select="./Button/ButtonState/@id"/></xsl:with-param>
			<xsl:with-param name="connectorUrl"><xsl:value-of select="./Button/ButtonState/Flash/@connectorUrl"/></xsl:with-param>
		   </xsl:call-template>
	   	</div>
	  	</TD>
	 </TR>
	</TABLE>
</xsl:template>

<xsl:template match="//Navbar/NavbarState/Button" mode="preview">		
<TABLE width="10" border="0" cellpadding="0" cellspacing="0">
  <TR>
    <TD>
  <div name="modePreview">
  <xsl:choose> <!-- Button set type Text-->
      <xsl:when test="./ButtonState[@type = 'Text']">
			       <table onclick="NOF_StyleView_CallInspector(document.getElementById('{../@id}'), 'graphic')" id="NavbarState.{../@id}" name="modePreview" border="{../Border/@size}" cellpadding="{../Space/@size}" cellspacing="{../Space/@size}" height="20">
			        <tr><td align="center"><div class="{./ButtonState[@name = 'Regular' or @name = 'SecondaryRegular']/Font/@css}" 
        onmouseover="rollImage(this);"
        onmouseout="rollImage(this, true);"
			        roll="{./ButtonState[@name = 'Rollover' or @name = 'SecondaryRollover']/Font/@css}" 
			        rollout="{./ButtonState[@name = 'Regular' or @name = 'SecondaryRegular']/Font/@css}">
        <xsl:apply-templates select="./ButtonState[@name = 'Regular' or @name = 'SecondaryRegular']" mode="textPreview">
            <xsl:with-param name="rollCss">
			              <xsl:value-of select="./ButtonState[@name = 'Rollover' or @name = 'SecondaryRollover']/Font/@css"/>
            </xsl:with-param>
			            <xsl:with-param name="rollId">
							<xsl:value-of select="./ButtonState[@name = 'Rollover' or @name = 'SecondaryRollover']/@id"/>
			            </xsl:with-param>
			            <xsl:with-param name="rollAlign">
							<xsl:value-of select="./ButtonState[@name = 'Rollover' or @name = 'SecondaryRollover']/@hAlign"/>
			            </xsl:with-param>
        </xsl:apply-templates></div>        
         </td><td align="center">  
			         <div class="{./ButtonState[@name = 'Highlighted' or @name = 'SecondaryHighlighted']/Font/@css}" 
        onMouseOver="rollImage(this);" 
        onMouseOut="rollImage(this, true);"
			        roll="{./ButtonState[@name = 'HighlightedRollover' or @name = 'SecondaryHighlightedRollover']/Font/@css}" 
			        rollout="{./ButtonState[@name = 'Highlighted' or @name = 'SecondaryHighlighted']/Font/@css}">        
          <xsl:apply-templates select="./ButtonState[@name = 'Highlighted' or @name = 'SecondaryHighlighted']" mode="textPreview">
            <xsl:with-param name="rollCss">
			              <xsl:value-of select="./ButtonState[@name = 'HighlightedRollover' or @name = 'SecondaryHighlightedRollover']/Font/@css"/>
            </xsl:with-param>
			            <xsl:with-param name="rollId">
							<xsl:value-of select="./ButtonState[@name = 'HighlightedRollover' or @name = 'SecondaryHighlightedRollover']/@id"/>
			            </xsl:with-param>
			            <xsl:with-param name="rollAlign">
							<xsl:value-of select="./ButtonState[@name = 'HighlightedRollover' or @name = 'SecondaryHighlightedRollover']/@hAlign"/>
			            </xsl:with-param>
        </xsl:apply-templates></div>
			    </td><td align="center"><div class="{./ButtonState[@name = 'Regular' or @name = 'SecondaryRegular']/Font/@css}" 
        onmouseover="rollImage(this);"
        onmouseout="rollImage(this, true);"
			        roll="{./ButtonState[@name = 'Rollover' or @name = 'SecondaryRollover']/Font/@css}" 
			        rollout="{./ButtonState[@name = 'Regular' or @name = 'SecondaryRegular']/Font/@css}">
        <xsl:apply-templates select="./ButtonState[@name = 'Regular' or @name = 'SecondaryRegular']" mode="textPreview">
              <xsl:with-param name="rollCss">
			        <xsl:value-of select="./ButtonState[@name = 'Rollover' or @name = 'SecondaryRollover']/Font/@css"/>
        </xsl:with-param>
			            <xsl:with-param name="rollId">
							<xsl:value-of select="./ButtonState[@name = 'Rollover' or @name = 'SecondaryRollover']/@id"/>
			            </xsl:with-param>
			            <xsl:with-param name="rollAlign">
							<xsl:value-of select="./ButtonState[@name = 'Rollover' or @name = 'SecondaryRollover']/@hAlign"/>
			            </xsl:with-param>
        </xsl:apply-templates></div>
			    </td><td align="center"><div class="{./ButtonState[@name = 'Regular' or @name = 'SecondaryRegular']/Font/@css}"  
        onmouseover="rollImage(this);"
        onmouseout="rollImage(this, true);"
			        roll="{./ButtonState[@name = 'Rollover' or @name = 'SecondaryRollover']/Font/@css}" 
			        rollout="{./ButtonState[@name = 'Regular' or @name = 'SecondaryRegular']/Font/@css}">
        <xsl:apply-templates select="./ButtonState[@name = 'Regular' or @name = 'SecondaryRegular']" mode="textPreview">
              <xsl:with-param name="rollCss">
			        <xsl:value-of select="./ButtonState[@name = 'Rollover' or @name = 'SecondaryRollover']/Font/@css"/>
						</xsl:with-param>
			            <xsl:with-param name="rollId">
							<xsl:value-of select="./ButtonState[@name = 'Rollover' or @name = 'SecondaryRollover']/@id"/>
			            </xsl:with-param>
			            <xsl:with-param name="rollAlign">
							<xsl:value-of select="./ButtonState[@name = 'Rollover' or @name = 'SecondaryRollover']/@hAlign"/>
			            </xsl:with-param>
					</xsl:apply-templates></div>
     </td>	  
        </tr>				              
      </table>
        </xsl:when>
   <xsl:otherwise><!-- Button set type Image-->        
    <table onclick="NOF_StyleView_CallInspector(document.getElementById('{../@id}'), 'graphic')" id="NavbarState.{../@id}" name="modePreview" border="{../Border/@size}" cellpadding="{../Space/@size}" cellspacing="{../Space/@size}" height="20">
      <tr><td>
        <img name="modePreview" src="{./ButtonState[@name = 'Regular' or @name = 'SecondaryRegular']/Image/@path}" 
            onmouseover="rollImage(this);"
            onmouseout="rollImage(this, true);"
            roll="{./ButtonState[@name = 'Rollover' or @name = 'SecondaryRollover']/Image/@path}" 
            rollout="{./ButtonState[@name = 'Regular' or @name = 'SecondaryRegular']/Image/@path}" />
              
        <img name="modePreview" src="{./ButtonState[@name = 'Highlighted' or @name = 'SecondaryHighlighted']/Image/@path}" 
            onMouseOver="rollImage(this);" 
            onMouseOut="rollImage(this, true);"
            roll="{./ButtonState[@name = 'HighlightedRollover' or @name = 'SecondaryHighlightedRollover']/Image/@path}" 
            rollout="{./ButtonState[@name = 'Highlighted' or @name = 'SecondaryHighlighted']/Image/@path}"/>
        
        <img name="modePreview" src="{./ButtonState[@name = 'Regular' or @name = 'SecondaryRegular']/Image/@path}" 
            onmouseover="rollImage(this);"
            onmouseout="rollImage(this, true);"
            roll="{./ButtonState[@name = 'Rollover' or @name = 'SecondaryRollover']/Image/@path}" 
            rollout="{./ButtonState[@name = 'Regular' or @name = 'SecondaryRegular']/Image/@path}" />
        
        <img name="modePreview" src="{./ButtonState[@name = 'Regular' or @name = 'SecondaryRegular']/Image/@path}" 
            onmouseover="rollImage(this);"
            onmouseout="rollImage(this, true);"
            roll="{./ButtonState[@name = 'Rollover' or @name = 'SecondaryRollover']/Image/@path}" 
            rollout="{./ButtonState[@name = 'Regular' or @name = 'SecondaryRegular']/Image/@path}" />
      </td></tr>				
              
    </table>    
    </xsl:otherwise>
  </xsl:choose>       
  </div>	
</TD></TR></TABLE>  
</xsl:template>	


<!-- Template :: FlashNav   --> 
<xsl:template name="FlashNav">
	<xsl:param name="idPrefix">0</xsl:param>
	<xsl:param name="source"><xsl:value-of select="./Flash/@path"/></xsl:param>
	<xsl:param name="parent"><xsl:value-of select="@parent"/></xsl:param>
	<xsl:param name="flashId">Button_Flash_<xsl:value-of select="$idPrefix"/>_<xsl:value-of select="@id"/></xsl:param>
	<xsl:param name="connectorUrl"><xsl:value-of select="./Flash/@connectorUrl"/></xsl:param>
	
	<div id="{$flashId}_footprint" style="float:left;"></div>
	<div id="{$flashId}_container" style="visibility: visible; position:absolute;top: 0px; left: 0px;">
	<script>
		if (typeof navbarColl == "object") {		
			var nof_<xsl:value-of select="$flashId"/> = navbarColl.createMovie("<xsl:value-of select="$flashId"/>", "<xsl:value-of select="$source"/>", 1, 1);
			nof_<xsl:value-of select="$flashId"/>.setVariable("nof_xmlConnectorURL", "<xsl:value-of select="$connectorUrl"/>");
			nof_<xsl:value-of select="$flashId"/>.setParam("play", "false");
			nof_<xsl:value-of select="$flashId"/>.setVariable("nof_previewMode", "true");
			nof_<xsl:value-of select="$flashId"/>.setVariable("nof_currentPage", "mi_0001");
	
			nof_<xsl:value-of select="$flashId"/>.captureEvents(NOF.Event.MOUSEDOWN_EVENT);
			nof_<xsl:value-of select="$flashId"/>.addMouseListener(new NOF_Flash_Listener("<xsl:value-of select="$flashId"/>", <xsl:value-of select="@id"/>, <xsl:value-of select="$parent"/>));
			nof_<xsl:value-of select="$flashId"/>.write();
		}
	</script></div>
</xsl:template>

<!-- Template :: Button Set   -->
<xsl:template match="//Navbar/NavbarState" mode="buttonSet">   
	<xsl:choose>        
    	<xsl:when test="@type = 'Flash'">
		   <tr>        
		      <td align="right"><span class="labelLink"><div id="{@id}" style="height:30" onclick="NOF_StyleView_CallFlashInspector(this, document.getElementById('{@id}'), 'graphic')" class="objNormal"><xsl:value-of select="@name"/></div></span></td>
		      <td><img src="labels/spacer.gif" width="10" height="1" border="0"/></td>
		      <td align="left" valign="middle" colspan="8" id="Button.{./Button/ButtonState/@id}">
			      <xsl:apply-templates select="./Button/ButtonState"/>
			  </td>
		   </tr>
		   <tr><td colspan="10"><image src="labels/spacer.gif" height="5" width="5" border="0"/></td></tr>
    	</xsl:when>
		<xsl:otherwise>    	
		   <tr>        
		      <td align="right"><span class="labelLink"><div id="{@id}" style="height:30" onclick="NOF_StyleView_CallInspector(this, 'graphic')" ondblclick="NOF_StyleView_DblClick(this, 'graphic')" class="objNormal"><xsl:value-of select="@name"/></div></span></td>
		      <td><img src="labels/spacer.gif" width="10" height="1" border="0"/></td>     
		      <xsl:apply-templates select="Button" mode="generate"/>  
		   </tr>
		   <xsl:if test="count(EndCap1)>0"><tr>
		      <td align="right"><span class="label">Nav.-Enden 1:</span></td>
		      <td></td>
		      <xsl:apply-templates select="EndCap1" mode="generate"/>  
		   </tr></xsl:if>
		   <xsl:if test="count(EndCap2)>0"><tr>
		      <td align="right"><span class="label">Nav.-Enden 2:</span></td>
		      <td></td>
		      <xsl:apply-templates select="EndCap2" mode="generate"/>  
		   </tr></xsl:if>
		   <xsl:if test="count(Title)>0"><tr>
		      <td align="right"><span class="label">Abschnittstitel:</span></td>
		      <td></td>
		      <xsl:apply-templates select="Title" mode="generate"/>  
		   </tr></xsl:if>
		   <tr><td colspan="10"><image src="labels/spacer.gif" height="5" width="5" border="0"/></td></tr>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>

<!-- Template :: Button State   -->
<xsl:template match="ButtonState" mode="generate">	
    <td align="left" valign="middle" width="150" id="Button.{@id}">      
        <xsl:apply-templates select="."/>       
    </td><td width="10"><img src="labels/spacer.gif" width="10" height="1" border="0"/></td>
</xsl:template>	

<!-- Template :: Button State   -->
<xsl:template match="ButtonState">	    
    <xsl:choose>        
      <xsl:when test="@type = 'Text'">
        <xsl:variable name="hAlign"><xsl:value-of select="@hAlign"/></xsl:variable>
        <xsl:variable name="spanAlign">
          <xsl:choose>
            <xsl:when test="$hAlign = 'left'">spanLeft<xsl:value-of select="@id"/></xsl:when>
            <xsl:when test="$hAlign = 'right'">spanRight<xsl:value-of select="@id"/></xsl:when>
            <xsl:otherwise>spanCenter<xsl:value-of select="@id"/></xsl:otherwise>
          </xsl:choose>
        </xsl:variable>                    
        <div id="{@id}" onclick="NOF_StyleView_CallInspector(this, 'graphic')" ondblclick="NOF_StyleView_DblClick(this, 'graphic')" class="objNormal">
           <span  id="{@id}" class="{$spanAlign}">Schltf.-Text</span></div>

           <script>
			var id = <xsl:value-of select="@id"/>;
			var selector = "." + '<xsl:value-of select="./Font/@css"/>'
			document.getElementById(id).children(0).style.cssText = getCssContent(selector);
           </script>

           <style>
             .<xsl:value-of select="@id"/>{<xsl:value-of select="./Font/@css"/>}
          
              .spanLeft<xsl:value-of select="@id"/>{
              padding: <xsl:value-of select="@vAlign"/>px 0px 0px <xsl:value-of select="@hoffset"/>px}
          
              .spanRight<xsl:value-of select="@id"/>{
              padding: <xsl:value-of select="@vAlign"/>px <xsl:value-of select="@hoffset"/>px 0px 0px}
          
              .spanCenter<xsl:value-of select="@id"/>{
              padding: <xsl:value-of select="@vAlign"/>px 0px 0px 0px}  
          </style>        
      </xsl:when>           
      <xsl:when test="@type = 'Flash'">
      	<div id="{@id}" style="float:left; height:30" onclick="NOF_StyleView_CallFlashInspector(this, document.getElementById('{@parent}'), 'graphic')" class="objNormal">
	    	<xsl:call-template name="FlashNav">
	     		<xsl:with-param name="idPrefix">F</xsl:with-param>
	     	</xsl:call-template>
	     </div>
	  </xsl:when>
      <xsl:otherwise>
        <xsl:choose>
          <xsl:when test="string-length(./Image/@path)!=0">
            <div id="{@id}" onclick="NOF_StyleView_CallInspector(this, 'graphic')" ondblclick="NOF_StyleView_DblClick(this, 'graphic')" class="objNormal"><img id="{@id}"  src="{./Image/@path}" border="0"/></div>     
          </xsl:when>
          <xsl:otherwise>
            <div id="{@id}" onclick="NOF_StyleView_CallInspector(this, 'graphic')" ondblclick="NOF_StyleView_DblClick(this, 'graphic')" class="objNormal">
              <span id="{@id}" class="invalidImage">Nicht angegeben</span>
            </div>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:otherwise>        
    </xsl:choose>            
</xsl:template>	
    
<!-- Template :: Banner   -->  
<xsl:template match="Banners">
    <xsl:for-each select="*">
     <table><tr><td>
      <div id="Banner.{./@id}">
        <xsl:apply-templates select="."/>
      </div>
      </td></tr></table>
    </xsl:for-each>
</xsl:template>

<xsl:template match="Banner">
   <SPAN class="label" id="BannerLabel.{./@id}"><xsl:value-of select="@name"/></SPAN>
    <xsl:choose>  
      <xsl:when test="@type = 'Image'">
        <div id="{@id}" onclick="NOF_StyleView_CallInspector(this, 'graphic')" ondblclick="NOF_StyleView_DblClick(this, 'graphic')" class="objNormal">
            <img id="{@id}" src="{./Image/@path}" />
        </div>
      </xsl:when>        
      <xsl:when test="@type = 'Text'">    
        <div id="{@id}" onclick="NOF_StyleView_CallInspector(this, 'graphic')" ondblclick="NOF_StyleView_DblClick(this, 'graphic')" class="objNormal">
          <img src="labels/spacer.gif" width="1" height="1"/><xsl:apply-templates select="." mode="bannerText"/>
		</div>
      </xsl:when>  
      <xsl:when test="@type = 'Flash'">
      	<xsl:variable name="source"><xsl:value-of select="./Flash/@path"/></xsl:variable>
		<xsl:variable name="flashId">Banner_Flash_<xsl:value-of select="@id"/></xsl:variable>
		<xsl:variable name="connectorUrl"><xsl:value-of select="./Flash/@connectorUrl"/></xsl:variable>
		<xsl:variable name="labelText"><xsl:value-of select="./@caption"/></xsl:variable>
		
		<div id="{@id}" onclick="NOF_StyleView_CallInspector(this, 'graphic')" ondblclick="NOF_StyleView_DblClick(this, 'graphic')" class="objNormal">
			<script>
				if (typeof bannerColl == "object") {				
					nof_<xsl:value-of select="$flashId"/> = bannerColl.createMovie("<xsl:value-of select="$flashId"/>", "<xsl:value-of select="$source"/>", <xsl:value-of select="./Flash/@width"/>, <xsl:value-of select="./Flash/@height"/>);
					nof_<xsl:value-of select="$flashId"/>.setVariable("nof_xmlConnectorURL", "<xsl:value-of select="$connectorUrl"/>");
					nof_<xsl:value-of select="$flashId"/>.setVariable("nof_labelText", "<xsl:value-of select="$labelText"/>");

					nof_<xsl:value-of select="$flashId"/>.captureEvents(NOF.Event.MOUSEDOWN_EVENT);
					nof_<xsl:value-of select="$flashId"/>.addMouseListener(new NOF_Flash_Listener("<xsl:value-of select="$flashId"/>", <xsl:value-of select="@id"/>, -1));
					nof_<xsl:value-of select="$flashId"/>.write();
				}
			</script>
		</div>
      </xsl:when>      
      <xsl:otherwise>
        <div id="{@id}" onclick="NOF_StyleView_CallInspector(this, 'graphic')" ondblclick="NOF_StyleView_DblClick(this, 'graphic')" class="objNormal">
         <img id="{@id}" src="{./Image/@path}" />
        </div>	
      </xsl:otherwise>
    </xsl:choose>
</xsl:template>

<xsl:template match="Banner" mode="bannerText">  
  <xsl:variable name="hAlign"><xsl:value-of select="./@hAlign"/></xsl:variable>
  <xsl:variable name="voffset"><xsl:value-of select="./@vAlign"/></xsl:variable>
  <xsl:variable name="hoffset"><xsl:value-of select="./@hoffset"/></xsl:variable>

  <xsl:variable name="cssClass">
  <xsl:choose>
    <xsl:when test="$hAlign = 'left'">text-align: left; padding: <xsl:value-of select="$voffset"/>px 0px 0px <xsl:value-of select="$hoffset"/>px</xsl:when>
    <xsl:when test="$hAlign = 'right'">text-align: right; padding: <xsl:value-of select="$voffset"/>px <xsl:value-of select="$hoffset"/>px 0px 0px</xsl:when>
    <xsl:otherwise>text-align: center; padding: <xsl:value-of select="$voffset"/>px 0px 0px 0px</xsl:otherwise>
  </xsl:choose>
  </xsl:variable>
    <span id="{@id}" style="{$cssClass}" class="{./Font/@css}" >Text-Banner</span>
</xsl:template>

<!-- Template :: Bullet  -->
<xsl:template match="Bullet">
 <table border="0" cellspacing="0">
   <tr><td>
        <div id="{@id}" onclick="NOF_StyleView_CallInspector(this, 'graphic')" ondblclick="NOF_StyleView_DblClick(this, 'graphic')" class="objNormal">
           <table  border="0" cellspacing="1" cellpadding="1" id="{@id}">
             <tr>
                <td width="10" align="left" scope="col" id="{@id}"><img  id="{@id}" src="{@path}"/></td>
                <td width="100" align="left" scope="col" id="{@id}" class="dataList">Datenlisten-Icon</td>
             </tr>	
             <tr>
                <td width="10" align="left" scope="col" id="{@id}"><img  id="{@id}" src="{@path}"/></td>
                <td width="100" align="left" scope="col" id="{@id}" class="dataList">Datenlisten-Icon</td>             
             </tr>
             <tr>
                <td width="10" align="left" scope="col" id="{@id}"><img  id="{@id}" src="{@path}"/></td>
                <td width="100" align="left" scope="col" id="{@id}" class="dataList">Datenlisten-Icon</td>             
             </tr>			
           </table>
        </div>	
    </td>
    <td width="*"></td>
    </tr>
  </table>
</xsl:template>

<!-- Template :: Bullet  mode=preview-->
<xsl:template match="Bullet" mode="preview">
 <table border="0" cellspacing="0">
   <tr><td>        
           <table  border="0" cellspacing="1" cellpadding="1" id="{@id}">
             <tr>
                <td width="10" align="left" scope="col" id="{@id}"><img  id="{@id}" src="{@path}"/></td>
                <td width="100" align="left" scope="col" id="{@id}" class="dataList">Datenlisten-Icon</td>
             </tr>	
             <tr>
                <td width="10" align="left" scope="col" id="{@id}"><img  id="{@id}" src="{@path}"/></td>
                <td width="100" align="left" scope="col" id="{@id}" class="dataList">Datenlisten-Icon</td>             
             </tr>
             <tr>
                <td width="10" align="left" scope="col" id="{@id}"><img  id="{@id}" src="{@path}"/></td>
                <td width="100" align="left" scope="col" id="{@id}" class="dataList">Datenlisten-Icon</td>             
             </tr>			
           </table>        
    </td>
    <td width="*"></td>
    </tr>
  </table>
</xsl:template>
  
<xsl:template match="Line">
 <table border="0" cellspacing="0">
   <tr><td>
       <div id="{@id}" onclick="NOF_StyleView_CallInspector(this, 'graphic')" ondblclick="NOF_StyleView_DblClick(this, 'graphic')" class="objNormal"><img id="{@id}" src="{@path}"/></div>	
    </td>
    <td width="*"></td>
    </tr>
  </table>	
</xsl:template>	

<!-- Template :: TextStyle-->
<xsl:template match="BODY">
       <div id="{@id}" onclick="NOF_StyleView_CallInspector(this, 'graphic')" class="objNormal" >
       Stilbeispiel für Haupttext. Lorem ip sum,Dolor sit amet, consectetuer adipiscing elit, sed diam nonum.
       </div>		
</xsl:template>

<xsl:template match="P">
    <div id="{@id}" onclick="NOF_StyleView_CallInspector(this, 'graphic')" class="objNormal" ><P>
    Stilbeispiel für Absatztext. Lorem ip sum, Dolor sit <BR>amet, consectetuer adipiscing elit, sed diam nonum.</BR></P>
    </div>
</xsl:template>

<xsl:template match="TextObject">
    <DIV id="{@id}" class="objNormal" onclick="NOF_StyleView_CallInspector(this, 'graphic')" >
    <DIV class="textObject" >Stilbeispiel für Textobjekt. Lorem ip sum, Dolor sit <BR>amet, consectetuer
    adipiscing elit, sed diam nonum.</BR></DIV></DIV>
</xsl:template>

<xsl:template match="TextNavbar">
      <DIV id="{@id}"  class="objNormal" onclick="NOF_StyleView_CallInspector(this, 'graphic')" >
      <DIV class="TextNavbar">[<A HREF="javascript:void(0)">Site 1</A>] [<A HREF="javascript:void(0)">Site 2</A>] [<A HREF="javascript:void(0)">Site 3</A>]</DIV></DIV>
</xsl:template>

<xsl:template match="Link">
    <DIV id="{@id}" class="objNormal" onclick="NOF_StyleView_CallInspector(this, 'graphic')" ><SPAN class="{@css}" >
	<xsl:choose>
		<xsl:when test="@id = 'Linked'">Verknüpft</xsl:when>
		<xsl:when test="@id = 'Visited'">Besuchter Link</xsl:when>
		<xsl:when test="@id = 'Active'">Aktiver Link</xsl:when>
		<xsl:when test="@id = 'Hover'">Hover-Link</xsl:when>
	</xsl:choose>	
    </SPAN></DIV>
</xsl:template>

<xsl:template match="UnorderedList">
    <DIV id="{@id}" class="objNormal" >
      <UL TYPE="DISC" id="{@id}">
        <LI ><DIV id='LI1' class="objNormal" onclick="NOF_StyleView_CallInspector(document.getElementById('{@id}'), 'graphic')" >Listenelement 1</DIV></LI>
        <LI ><DIV id='LI2' class="objNormal" onclick="NOF_StyleView_CallInspector(this, 'graphic')" >Listenelement 2</DIV></LI>
      </UL>
    </DIV>
</xsl:template>

<xsl:template match="OrderedList">
    <DIV id="{@id}" class="objNormal" >
      <OL TYPE="1" >
          <LI ><DIV id='LI3' class="objNormal" onclick="NOF_StyleView_CallInspector(document.getElementById('{@id}'), 'graphic')" >Nummeriertes Element 1</DIV></LI>
          <LI ><DIV id='LI4' class="objNormal" onclick="NOF_StyleView_CallInspector(this, 'graphic')">Nummeriertes Element 2</DIV></LI>
      </OL>
    </DIV>
</xsl:template>

<xsl:template match="Headings">
    <DIV id='{@id}' class="objNormal" onclick="NOF_StyleView_CallInspector(this, 'graphic')" >
    <xsl:element name="{@id}">
    <xsl:choose>
		<xsl:when test="@id = 'H1'">Überschrift 1</xsl:when>
		<xsl:when test="@id = 'H2'">Überschrift 2</xsl:when>
		<xsl:when test="@id = 'H3'">Überschrift 3</xsl:when>
		<xsl:when test="@id = 'H4'">Überschrift 4</xsl:when>
		<xsl:when test="@id = 'H5'">Überschrift 5</xsl:when>
		<xsl:when test="@id = 'H6'">Überschrift 6</xsl:when>
	</xsl:choose>
    </xsl:element>
    </DIV>
</xsl:template>


<!-- Template :: Author-->
<xsl:template match="Author">                 		
       <span id="{@id}"><font class="label"><xsl:value-of select="@name"/></font></span>		             
</xsl:template>

<xsl:template match="TableStyles">
    <table class="objNormal">
      <tr> 
        <xsl:for-each select="TableStyle"> 
          <xsl:if test="position() mod 4 = 0">
            <xsl:text disable-output-escaping="yes">&lt;/td&gt;</xsl:text>
            <xsl:text disable-output-escaping="yes">&lt;tr&gt;</xsl:text>
          </xsl:if>          
          <td>                
            <div id="{./@id}" onclick="NOF_StyleView_CallInspector(this, 'graphic')" ondblclick="NOF_StyleView_DblClick(this, 'graphic')" onmousedown="NOF_StyleView_TsRightClick({./@id})" class="objNormal" bgcolor="#FFFFFF">
              <table border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <xsl:apply-templates select="."/>                  
                </tr>
              </table>
            </div>  
          </td>
        </xsl:for-each>
    </tr>
  </table>        
</xsl:template>


<xsl:template match="TableStyle[position() != 1 and position() mod 3 = 1]">
  <xsl:text disable-output-escaping="yes">&lt;/tr&gt;</xsl:text>
  <xsl:text disable-output-escaping="yes">&lt;tr&gt;</xsl:text>
  <xsl:call-template name="TableDescription"/>
</xsl:template>
<xsl:template match="TableStyle[position() = 1 or position() mod 3 != 1]">
  <xsl:call-template name="TableDescription"/>
</xsl:template>

<xsl:template name="TableDescription">	
  <td align="left">          
      <B>
        <img src="labels/spacer.gif" width="5" height="1"/>
        <font class="label"><xsl:value-of select="./@name" /></font>
      </B> 
      <table cellpadding="2" cellspacing="2" border="1" bordercolor="#FFFFFF">					
        <xsl:for-each select="TableLayout">			
          <xsl:apply-templates select="."/>					
        </xsl:for-each>				
      </table>          
  </td>
</xsl:template>

<xsl:variable name="ROWS">5</xsl:variable>
<xsl:variable name="COLUMNS">5</xsl:variable>

<xsl:template match="TableLayout">		
  <xsl:variable name="pTop"><xsl:value-of select="parent::TableStyle/RepeatRegion/top"/></xsl:variable>
  <xsl:variable name="pBottom"><xsl:value-of select="parent::TableStyle/RepeatRegion/bottom"/></xsl:variable>
  <xsl:variable name="pLeft"><xsl:value-of select="parent::TableStyle/RepeatRegion/left"/></xsl:variable>
  <xsl:variable name="pRight"><xsl:value-of select="parent::TableStyle/RepeatRegion/right"/></xsl:variable>

  <xsl:variable name="h"><xsl:value-of select="count(parent::TableStyle/TableLayout/row)"/></xsl:variable>
  <xsl:variable name="w"><xsl:value-of select="count(parent::TableStyle/TableLayout/row/cell) div $h"/></xsl:variable>
  <xsl:variable name="rrW"><xsl:value-of select="$pRight - $pLeft + 1"/></xsl:variable>
  <xsl:variable name="rrH"><xsl:value-of select="$pBottom - $pTop + 1"/></xsl:variable>

  <link rel="stylesheet" href="display.css" type="text/css" />  
  
  <!-- display row before counting	-->	
  <xsl:for-each select="row[position() &lt; $pTop]">	 
    <xsl:apply-templates select=".">
      <xsl:with-param name="pRepeatRegion">0</xsl:with-param>
      <xsl:with-param name="pLeft"><xsl:value-of select="$pLeft"/></xsl:with-param>
      <xsl:with-param name="pRight"><xsl:value-of select="$pRight"/></xsl:with-param>			
      <xsl:with-param name="pRRWidth"><xsl:value-of select="$rrW"/></xsl:with-param>
      <xsl:with-param name="pWidth"><xsl:value-of select="$w"/></xsl:with-param>
    </xsl:apply-templates>
  </xsl:for-each>	
    
  
  <xsl:call-template name="repeatRows">
    <xsl:with-param name="pTop"><xsl:value-of select="$pTop"/></xsl:with-param>
    <xsl:with-param name="pBottom"><xsl:value-of select="$pBottom"/></xsl:with-param>
    <xsl:with-param name="pLeft"><xsl:value-of select="$pLeft"/></xsl:with-param>
    <xsl:with-param name="pRight"><xsl:value-of select="$pRight"/></xsl:with-param>
    <xsl:with-param name="pRRWidth"><xsl:value-of select="$rrW"/></xsl:with-param>
    <xsl:with-param name="pRRHeight"><xsl:value-of select="$rrH"/></xsl:with-param>
    <xsl:with-param name="pWidth"><xsl:value-of select="$w"/></xsl:with-param>
    <xsl:with-param name="pHeight"><xsl:value-of select="$h - $rrH"/></xsl:with-param>
  </xsl:call-template>
  

  <!-- display row after counting	-->	
  <xsl:for-each select="row[position() &gt; $pBottom]">
    <xsl:apply-templates select=".">
      <xsl:with-param name="pRepeatRegion">0</xsl:with-param>
      <xsl:with-param name="pLeft"><xsl:value-of select="$pLeft"/></xsl:with-param>
      <xsl:with-param name="pRight"><xsl:value-of select="$pRight"/></xsl:with-param>
      <xsl:with-param name="pRRWidth"><xsl:value-of select="$rrW"/></xsl:with-param>
      <xsl:with-param name="pWidth"><xsl:value-of select="$w"/></xsl:with-param>
    </xsl:apply-templates>
  </xsl:for-each>	
  
</xsl:template>

<xsl:template name="repeatRows">
  <xsl:param name="pTop">1</xsl:param>
  <xsl:param name="pBottom">1</xsl:param>
  <xsl:param name="pLeft">1</xsl:param>
  <xsl:param name="pRight">1</xsl:param>
  <xsl:param name="pRRWidth">0</xsl:param>
  <xsl:param name="pRRHeight">0</xsl:param>			
  <xsl:param name="pWidth">0</xsl:param>
  <xsl:param name="pHeight">0</xsl:param>			
  
  <xsl:for-each select="row[(position() &gt;= $pTop) and (position() &lt;= $pBottom)]">
    <xsl:if test="(position() &lt;= $pRRHeight) and ((position() + $pHeight) &lt;= $ROWS)">
      <xsl:apply-templates select=".">
        <xsl:with-param name="pRepeatRegion">1</xsl:with-param>
        <xsl:with-param name="pLeft"><xsl:value-of select="$pLeft"/></xsl:with-param>
        <xsl:with-param name="pRight"><xsl:value-of select="$pRight"/></xsl:with-param>			
        <xsl:with-param name="pRRWidth"><xsl:value-of select="$pRRWidth"/></xsl:with-param>
        <xsl:with-param name="pWidth"><xsl:value-of select="$pWidth"/></xsl:with-param>
      </xsl:apply-templates>
    </xsl:if>
  </xsl:for-each>	
  <xsl:if test="($pHeight + $pRRHeight) &lt; $ROWS">
    <xsl:call-template name="repeatRows">
      <xsl:with-param name="pTop"><xsl:value-of select="$pTop"/></xsl:with-param>
      <xsl:with-param name="pBottom"><xsl:value-of select="$pBottom"/></xsl:with-param>
      <xsl:with-param name="pLeft"><xsl:value-of select="$pLeft"/></xsl:with-param>
      <xsl:with-param name="pRight"><xsl:value-of select="$pRight"/></xsl:with-param>			
      <xsl:with-param name="pRRWidth"><xsl:value-of select="$pRRWidth"/></xsl:with-param>
      <xsl:with-param name="pRRHeight"><xsl:value-of select="$pRRHeight"/></xsl:with-param>
      <xsl:with-param name="pWidth"><xsl:value-of select="$pWidth"/></xsl:with-param>
      <xsl:with-param name="pHeight"><xsl:value-of select="$pRRHeight + $pHeight"/></xsl:with-param>			
    </xsl:call-template>
  </xsl:if>
</xsl:template>


<xsl:template match="row">
  <xsl:param name="pRepeatRegion">0</xsl:param>
  <xsl:param name="pLeft">1</xsl:param>
  <xsl:param name="pRight">1</xsl:param>
  <xsl:param name="pRRWidth">1</xsl:param>
  <xsl:param name="pWidth">1</xsl:param>
  
  <xsl:text disable-output-escaping="yes">&lt;tr&gt;</xsl:text>
  
  <xsl:for-each select="cell[position() &lt; $pLeft]">			
    <xsl:apply-templates select=".">
      <xsl:with-param name="borderColor">#000000</xsl:with-param>
    </xsl:apply-templates>		
    </xsl:for-each>

  
  <xsl:call-template name="repeatCols">
    <xsl:with-param name="pRepeatRegion"><xsl:value-of select="$pRepeatRegion"/></xsl:with-param>
    <xsl:with-param name="pLeft"><xsl:value-of select="$pLeft"/></xsl:with-param>
    <xsl:with-param name="pRight"><xsl:value-of select="$pRight"/></xsl:with-param>
    <xsl:with-param name="pRRWidth"><xsl:value-of select="$pRRWidth"/></xsl:with-param>
    <xsl:with-param name="pWidth"><xsl:value-of select="$pWidth - $pRRWidth"/></xsl:with-param>
  </xsl:call-template>


  <xsl:for-each select="cell[position() &gt; $pRight]">		
    <xsl:apply-templates select=".">
      <xsl:with-param name="borderColor">#000000</xsl:with-param>
    </xsl:apply-templates>		
    </xsl:for-each>
    
  <xsl:text disable-output-escaping="yes">&lt;/tr&gt;</xsl:text>
    
</xsl:template>


<xsl:template name="repeatCols">
  <xsl:param name="pRepeatRegion">0</xsl:param>
  <xsl:param name="pLeft">1</xsl:param>
  <xsl:param name="pRight">1</xsl:param>
  <xsl:param name="pRRWidth">0</xsl:param>
  <xsl:param name="pWidth">0</xsl:param>
    
  <xsl:for-each select="cell[(position() &gt;= $pLeft) and (position() &lt;= $pRight)]">
    <xsl:if test="(position() &lt;= $pRRWidth) and ((position() + $pWidth) &lt;= $COLUMNS)">
      <xsl:choose>
        <xsl:when test="$pRepeatRegion = 1">
          <xsl:apply-templates select=".">
            <xsl:with-param name="borderColor">#FF0000</xsl:with-param>
          </xsl:apply-templates>
        </xsl:when>
        <xsl:otherwise>
          <xsl:apply-templates select=".">
            <xsl:with-param name="borderColor">#000000</xsl:with-param>
          </xsl:apply-templates>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:if>
  </xsl:for-each>	
  <xsl:if test="($pWidth + $pRRWidth) &lt; $COLUMNS">
    <xsl:call-template name="repeatCols">
      <xsl:with-param name="pRepeatRegion"><xsl:value-of select="$pRepeatRegion"/></xsl:with-param>		
      <xsl:with-param name="pLeft"><xsl:value-of select="$pLeft"/></xsl:with-param>
      <xsl:with-param name="pRight"><xsl:value-of select="$pRight"/></xsl:with-param>
      <xsl:with-param name="pRRWidth"><xsl:value-of select="$pRRWidth"/></xsl:with-param>
      <xsl:with-param name="pWidth"><xsl:value-of select="$pWidth + $pRRWidth"/></xsl:with-param>			
    </xsl:call-template>
  </xsl:if>
</xsl:template>


<xsl:template match="cell">
  <xsl:param name="borderColor">
    #FFFFFF
  </xsl:param>
  <td bgcolor="{@bgcolor}" class="{CssAttributes/@css}" background="{@background}" width="40" height="30" bordercolor="{$borderColor}" align="center" valign="center">		
    <xsl:if test="Font/@italic = 1">
      <xsl:text disable-output-escaping="yes">&lt;I&gt;</xsl:text>
    </xsl:if>
    <xsl:if test="Font/@underline = 1">
      <xsl:text disable-output-escaping="yes">&lt;U&gt;</xsl:text>
    </xsl:if>
      
    <Font face="{Font/@face}" color="{Font/@color}">
      Text
    </Font>
        
    <xsl:if test="Font/@italic = 1">
      <xsl:text disable-output-escaping="yes">&lt;/I&gt;</xsl:text>
    </xsl:if>
    <xsl:if test="Font/@underline = 1">
      <xsl:text disable-output-escaping="yes">&lt;/U&gt;</xsl:text>
    </xsl:if>      	
  </td>
</xsl:template>

</xsl:stylesheet>
