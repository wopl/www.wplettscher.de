<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet  xmlns:xsl= "http://www.w3.org/1999/XSL/Transform" version="1.0">

<!-- Global parameters -->
<xsl:param name="navbarOrientation">vertical</xsl:param>

<xsl:template match="header" mode="graphicView">  
  <xsl:apply-templates select="./preview"/>     
</xsl:template>

<xsl:template match="preview">
  <xsl:apply-templates select="thumbnail"/>
</xsl:template>

<xsl:template match="thumbnail">
  <img src="{./image/@path}" border="0"/> 
</xsl:template>


<xsl:template match="rectangle" mode="graphicView"> 
  <div style="top:{@offsetHeight}; left:{@offsetWidth}">
    <table border="0" cellspacing="0" cellpadding="0">
      <xsl:apply-templates select="hbox|vbox" mode="table"/>
    </table>
  </div><br/>
</xsl:template>

<xsl:template match="header">  
  <script>
    var topOffset   = <xsl:value-of select="@topOffset"/>;
    var leftOffset  = <xsl:value-of select="@leftOffset"/>; 
    var isDecorator = true;
  </script>
  <xsl:for-each select="rectangle" >
    <xsl:apply-templates select="."/>
  </xsl:for-each>    
</xsl:template>


<xsl:template match="rectangle">
  <xsl:param name="offHeight">
     <xsl:choose>
       <xsl:when test="@offsetHeight = ''">0</xsl:when>
       <xsl:otherwise><xsl:value-of select="@offsetHeight"/></xsl:otherwise>
     </xsl:choose>
  </xsl:param>

  <xsl:param name="offWidth">
     <xsl:choose>
       <xsl:when test="@offsetWidth = ''">0</xsl:when>
       <xsl:otherwise><xsl:value-of select="@offsetWidth"/></xsl:otherwise>
     </xsl:choose>
  </xsl:param>
  
  <div style="position:absolute; top:{$offHeight}; left:{$offWidth}">
    <table border="0" cellspacing="0" cellpadding="0">
      <xsl:apply-templates select="hbox|vbox" mode="table"/>
    </table>
  </div> 
</xsl:template>

<xsl:template match="vbox" mode="table">  
  <xsl:for-each select="hbox">
    <tr>
     <xsl:apply-templates select="." mode="td"/>
    </tr>
  </xsl:for-each>      
</xsl:template>


<xsl:template match="hbox" mode="table">
  <tr>
    <xsl:for-each select="hbox">      
      <xsl:apply-templates select="." mode="td"/>  
    </xsl:for-each>  
  </tr>    
</xsl:template>


<xsl:template match="hbox" mode="td">
    <xsl:param name="navbarOrientation" select="@navbarOrientation"/>
    <td bgcolor="{@bgcolor}" width="{@width}" height="{@height}" valign="{@valign}"  background="{@background}">
      <xsl:if test="@includeBanner = 'true'">  
        <div id="bannerContainer"></div>
      </xsl:if> 
      <xsl:if test="@includeNavbar = 'true'">  
  
        <div id="navbarContainer" type="{$navbarOrientation}"></div>
      </xsl:if>     
      <xsl:apply-templates select="image|text"/>
    </td>
</xsl:template>

<xsl:template match="image">
  <xsl:choose>
    <xsl:when test="@width != ''">
      <img src="{@path}" width="{@width}" height="{@height}" />
    </xsl:when>
    <xsl:otherwise>
      <img src="{@path}"/>
    </xsl:otherwise>
  </xsl:choose>
  
</xsl:template>

</xsl:stylesheet>