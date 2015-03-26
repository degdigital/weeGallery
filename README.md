# WeeGallery

WeeGallery is a small image gallery Javascript plugin with Flickr API integration. It includes an image previewer, a thumbnail slider and a modal window for viewing high-res versions of the images.

## Usage

### HTML
Add the attributes `data-album-id`, `data-api-key` and `data-user-id` to an empty container element to specify the Flickr API key, the Flickr User ID and the Flickr photoset ID, respectively.
``` html
<div data-api-key="123abc" data-user-id="987654321" data-album-id="123456789" class="gallery"></div>
```

### Javascript
Initialize the weeGallery plugin by passing the container element to the weeGallery factory method.
``` javascript
var galleryEl = document.querySelector('.gallery');

var weeGalleryInstance = weeGallery(galleryEl, {});
```

## Requirements & Browser Support
WeeGallery has no framework or library requirements. It is supported on all modern browsers and IE 9 and above. IE 8 support requires polyfills for the following ES5 features: [https://developer.mozilla.org/en-US/docs/Web/API/Element/classList](classList), [https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener](addEventListener), [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach](forEach), and [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map](map) 