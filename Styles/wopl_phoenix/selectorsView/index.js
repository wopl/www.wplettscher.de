jQuery.ajaxSetup({
	converters: {
		"text local": jQuery.parseXML
	},
	cache: false
});

jQuery.ajaxTransport( "local", function( options /*, originalOptions, jqXHR*/ ) {
	options.url = options.url.replace(/\?.*$/,"");

	return {
		send: function( headers, callback ) {			
			var resp, status, statusText;
			
			resp = top.app2.ReadTextFile(options.url);
			status = (resp.length) ? 200 : 404;
			statusText = ( status === 200 ) ? "success" : "error"
			
			callback( status, statusText, { "text": resp } );
		},
		abort: jQuery.noop
	};
});

jQuery.fn.MyPane = function(options) 
{
    //this.xslt({xmlUrl: 'preview_selectors.xml', xslUrl: 'siteStyleSelectors_list.xsl'});
    this.find('ul > li').each(
        function() {
                    var _a=$(this).children('a');
                    var _div=$(this).children('div').addClass('TogglePanePlainContent').html();
                    _a.replaceWith("<div class='TogglePaneFancyHeader'>" + _a.text() + "</div>");
                    $(this).replaceWith("<div>" + $(this).html() + "</div>");
                });
    this.children('ul').replaceWith($(this).children('ul').html());
    this.initTogglePane(options);
};

function onTransformReady(out) {
    $('#output').html(out);
	parent.initSelectors();
};

jQuery(function() {
	var curFolder = window.location.href.replace(/(file:\/\/\/|preview_selectors.html)/g, "").replace(/%20/g, " ");
	
	$.xslt({
		callback: onTransformReady,
		xmlUrl: curFolder + 'preview_selectors.xml',
		xslUrl: curFolder + 'template/siteStyleSelectors_list.xsl',
		xmlCache: false,
		xslCache: false
	});
});