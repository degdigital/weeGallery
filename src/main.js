var weeGallery = function weeGallery(containerEl, options) {

	var defaults = {
			containerCssClass: 'weeGallery',
			thumbnailListCssClass: 'weeGallery-thumbnails',
			thumbnailItemCssClass: 'weeGallery-thumbnailItem',
			thumbnailItemActiveCssClass: 'is-active',
			thumbnailLinkCssClass: 'weeGallery-thumbnailLink',
			thumbnailImageCssClass: 'weeGallery-thumbnailImage',
			previewLinkCssClass: 'weeGallery-previewLink',
			previewImageCssClass: 'weeGallery-previewImage',			
			slider: {},
			modal: {}
		}, 
		repository, 
		viewLayer;

	var settings = extendObjects({}, defaults, options);

	function init() {
		containerEl.classList.add(settings.containerCssClass);

		repository = flickrRepository(getAttributeValue('data-api-key'), getAttributeValue('data-user-id'));
		viewLayer = view(containerEl, settings);		

		var album = repository.getAlbum(getAttributeValue('data-album-id'), onAlbumRetrieved);
	}

	function getAttributeValue(attributeName) {
		return containerEl.getAttribute(attributeName);
	}

	function onAlbumRetrieved(albumData) {
		viewLayer.render(albumData.images);
	}	

	init();

	return {

	};
}

if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( [], weeGallery );
} else if ( typeof exports === 'object' ) {
  // CommonJS
  module.exports = weeGallery;
} else {
  // browser global
  window.weeGallery = weeGallery;
}