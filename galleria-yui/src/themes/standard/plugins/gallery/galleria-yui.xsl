<?xml version="1.0"?>
<xsl:stylesheet version="1.0" 
    xmlns:bxf="http://bitflux.org/functions"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xhtml="http://www.w3.org/1999/xhtml"
    xmlns="http://www.w3.org/1999/xhtml"
    xmlns:i18n="http://apache.org/cocoon/i18n/2.1"
    exclude-result-prefixes="bxf xhtml">

    <xsl:import href="../../master.xsl"/>
    <xsl:import href="../../../standard/plugins/gallery.xsl"/>
    
    <xsl:output encoding="utf-8" method="xml"/>
    
    
    <xsl:param name="thumbWidth" select="100"/> 
    <xsl:param name="largeWidth" select="480"/>
    
    
    <xsl:variable name="gallery" select="/bx/plugin[@name = 'gallery']/gallery"/>
    <xsl:variable name="parameters" select="$gallery/parameters"/>
    <xsl:variable name="pager" select="$gallery/pager"/>
    <xsl:variable name="images" select="$gallery/images"/>
    <xsl:variable name="numCols" select="$parameters/parameter[@name='columnsPerPage']/@value"/>
    <xsl:variable name="current">
        <xsl:choose>
            <xsl:when test="$gallery/@numberOfCurrentImage">
                <xsl:value-of select="$gallery/@numberOfCurrentImage"/>
            </xsl:when>
            <xsl:otherwise>1</xsl:otherwise>
        </xsl:choose>
    </xsl:variable>      
    
    <xsl:template name="html_head_custom">
        <link type="text/css" href="{$webrootWebinc}plugins/galleria-yui/css/galleria-yui.css" rel="stylesheet" media="screen" />
        <script type="text/javascript" src="{$webrootWebinc}yui3/build/yui/yui-min.js"/>
        <script type="text/javascript" src="{$webrootWebinc}plugins/galleria-yui/js/galleria-yui.js"/>
    </xsl:template>
    
    <xsl:template name="html_head_scripts">
       
    </xsl:template>
    
    <xsl:template name="leftnavi">
     <xsl:apply-templates select="$navitreePlugin/collection/items/collection[@selected = 'selected']"/>
    </xsl:template>

    <xsl:template name="content">
        <xsl:call-template name="gallery_header">
            <xsl:with-param name="gallery" select="$gallery"/> 
        </xsl:call-template>
        <p>
           
           <xsl:apply-templates select="$pager"/>
           
        </p>
        <br class="antifloat"/>
        <div id="gallery">
            <div class="slides">
                <xsl:apply-templates select="$gallery/images/image" mode="stage"/>
            </div>
            <div class="slide-info">
                <xsl:if test="$gallery/images/image[position() = $current]">
                    <xsl:value-of select="$gallery/images/image[position()=$current]/text()"/>
                </xsl:if>
            </div>
        </div>
        <div class="gallery-thumbnails">
            <xsl:apply-templates select="$gallery/images/image" mode="thumbnail"/>
            <br class="antifloat"/>
        </div>
        
    </xsl:template>
    
    
    <xsl:template match="image" mode="thumbnail">
        <xsl:variable name="href">
            <xsl:choose>
                <xsl:when test="starts-with(@href,'http://')">
                    <xsl:value-of select="@href"/>
                 </xsl:when>
                 <xsl:otherwise>
                    <xsl:value-of select="concat(../../@path, @href)"/>
                 </xsl:otherwise>
            </xsl:choose>
        </xsl:variable>
        <xsl:variable name="src">
            <xsl:value-of select="concat($webroot, 'dynimages/', $thumbWidth, '/', $href)"/>
        </xsl:variable> 
       
        <img title="" alt="" src="{$src}" border="0" class="thumbnail"/>
        <xsl:if test="position() mod $numCols = 0">
            <br class="antileft"/>
        </xsl:if> 
        
    </xsl:template>
    
    <xsl:template match="image" mode="stage">
        <xsl:variable name="href">
            <xsl:choose>
                <xsl:when test="starts-with(@href,'http://')">
                    <xsl:value-of select="@href"/>
                 </xsl:when>
                 <xsl:otherwise>
                    <xsl:value-of select="concat(../../@path, @href)"/>
                 </xsl:otherwise>
            </xsl:choose>
        </xsl:variable>
        
        <xsl:variable name="large">
            <xsl:value-of select="concat($webroot, 'dynimages/', $largeWidth, '/', $href)"/>
        </xsl:variable> 
        <a href="{concat($webroot, $href)}">
        <img title="{@imageTitle}" 
		    alt="{./text()}"
		    src="{$large}"
		    border="0">
		    <xsl:attribute name="class">
		        <xsl:choose>
		            <xsl:when test="position() = $current">slide current</xsl:when>
		            <xsl:otherwise>slide</xsl:otherwise>
		        </xsl:choose>
		    </xsl:attribute>
		</img>
		</a>
        <xsl:text>
        </xsl:text>
            
        
    </xsl:template>

    <xsl:template match="pager">
    
        <span class="pager right">
            <a href="#" class="pager-prev"><i18n:text>previous</i18n:text></a><xsl:text> </xsl:text>
            <span class="pager-content" data-count="{@numberOfEntries}">
                <xsl:value-of select="$current"/><xsl:text> / </xsl:text><xsl:value-of select="@numberOfEntries"/>
            </span>
            <xsl:text> </xsl:text><a href="#" class="pager pager-next"><i18n:text>next</i18n:text></a>
        </span>
    </xsl:template>



</xsl:stylesheet>
