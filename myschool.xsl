<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output encoding="UTF-8"/>

<xsl:output method="html"/>

<!-- "/" -->
<xsl:template match="/">
   <html>
      <head>
         <title>MySchool</title>
         <link rel="stylesheet" href="../css/myschool.css" />
         <link rel="stylesheet" href="../css/myschool_tree.css" />
      </head>

      <body>
         <div class="menu-container" id="menu" style="overflow:scroll;">
            <ul id="myUL">
               <xsl:apply-templates/>
            </ul>
         </div>
         <xsl:copy-of select="document('./myschool.inc.html')"/>
         <iframe class="main-container" id="main-container" name="main-container">
         </iframe>
         <xsl:copy-of select="document('./myschool.inc.js')" disable-output-escaping="yes"/>
      </body>
   </html>
</xsl:template>

<!-- "document" -->
<xsl:template match="document">
  <xsl:apply-templates select="item"/>  
</xsl:template>

<!-- "item" -->
<xsl:template match="item">
  <li>
    <span class="caret"><xsl:copy-of select="@*" /><xsl:value-of select="text()" /></span>
    <ul class="nested">
      <xsl:apply-templates select="item"/>
      <xsl:apply-templates select="name"/>
    </ul>
  </li>
</xsl:template>

<!-- "name" -->
<xsl:template match="name">
  <li>
      <xsl:attribute name="linkid">
      <xsl:value-of select="@linkid" />
      </xsl:attribute>
      <xsl:attribute name="itemid">
      <xsl:value-of select="@itemid" />
      </xsl:attribute>
    <a>
      <xsl:attribute name="href">
        <xsl:apply-templates select="following-sibling::url[1]"/>
      </xsl:attribute>
      <xsl:attribute name="target">
         <xsl:text>main-container</xsl:text>
      </xsl:attribute>
      <xsl:value-of select="text()" />
    </a>
  </li>
</xsl:template>

<!-- "url" -->
<xsl:template match="url">
    <xsl:value-of select="text()" />
</xsl:template>

</xsl:stylesheet>
