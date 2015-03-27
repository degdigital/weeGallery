function init() {
	var imageGalleryEl = document.querySelector('.imageGallery');

	var weeGalleryInstance = weeGallery(imageGalleryEl, {
		slider: {
			enableCssAnimation: Modernizr.csstransforms
		}
	});
}

function getMeta(metaname) {
    var metas = window.document.getElementsByTagName( "meta" );
    var meta;
    for( var i = 0; i < metas.length; i ++ ){
        if( metas[ i ].name && metas[ i ].name === metaname ){
            meta = metas[ i ];
            break;
        }
    }
    return meta;
}

var jsBase = getMeta('js-base').content;

if(!("classList" in document.createElement("_")) || 
   !Element.prototype.addEventListener ||
   !Array.prototype.forEach ||
   !Array.prototype.map) {
        Modernizr.load({ 
            both: jsBase + '/jsPolyfills.js',
            complete: init
        });
} else {
	init();
}
