<?xml version="1.0" encoding="ISO-8859-1"?>


<xsl:stylesheet  xmlns:xsl= "http://www.w3.org/1999/XSL/Transform"
                 xmlns:msxsl="urn:schemas-microsoft-com:xslt"
                 xmlns:nof="http://netobjects.com/nof"
                 version="1.0">
  
<xsl:output method="html"/>
<xsl:output cdata-section-elements="SCRIPT"/>
<xsl:strip-space elements="*"/>  

<msxsl:script implements-prefix="nof">              
<![CDATA[  
function getHexDigit(decimal) {			
   var hexArray = Array("A", "B", "C", "D", "E", "F");
   var hexVal = parseInt(0 + decimal, 10);
  
   if ((hexVal) > 15) {
     return null;
   }
   else {
      hexVal = hexVal < 10 ? hexVal : hexArray[hexVal-10];
   }
   return hexVal;
}

function decToHex(decimal) {
  if (decimal.length == 1)
    return "#000000";
    
   var temp = parseInt(decimal,10);	
   if (isNaN(temp)) { 
     return  "#000000";
   }
  
   var hex = "";
   while (temp > 15) {
      remainder = temp % 16;
      hex = getHexDigit(remainder) + "" + hex
      temp = parseInt(temp / 16);
   }
   if (temp >= 0) {
      hex =  getHexDigit(temp) + "" + hex
   }
   else {    
      return 0;
   }
   
   size  = hex.length;
   zeros = "";
   if ( size != 6 ) 
      for ( j=0; j < 6 - size; j++ ) {
      zeros = zeros + "0";
    }
   
   //zeros + hex is the complement color of the one show by Fusion
   var hexa = zeros + hex;
   return ("#"   + hexa.substring(4, 6	) + hexa.substring(2, 4) + hexa.substring(0, 2));
}  

function parseHeight(value) {
  return value.substring(value.indexOf("-") + 1, value.length);
}

function parseFontStyle(value) {
  var value = "";
  if (arguments[0] != 0) //italic
    value =  "italic";
  
  return value;
}

/*
function parseTextDecoration() {
  var value = "";				
  if (arguments[0] != 0) //strikeout
    value = "line-through";
  if (arguments[1] != 0)
    value += "underline"; //underline		
  
  return value;
}*/
  

function getFontSize(value) {    
  value = value + "";
  
  if (value.length == 0)
    return "";
 
  value = value.substring(value.indexOf("-") + 1, value.length);
    
  return value;  
}

function getHorizAndVert (value) {    
  var hAlign = "left";
  
  if (value == 64)
   hAlign = "center"
  else if (value == 128)
    hAlign = "right";
    
  return hAlign;// + "; vertical-align:" + vAlign + "; white-space:nowrap;"; 
}

]]>
</msxsl:script>

</xsl:stylesheet>