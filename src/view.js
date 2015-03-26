var view = function view(containerEl, settings) {
	var previewLinkEl, 
		previewImageEl, 
		thumbnailListEl,
		imageModal,
		currentThumbnailIndex = 0; 

	function render(imagesData) {
		if(imagesData.length == 0)
			return;

		renderPreviewImage(imagesData);
		imageModal = modal(settings.modal);

		if(imagesData.length > 1) {
			renderThumbnails(imagesData);

			slider(thumbnailListEl, settings.slider);

			hookupClickEventHandler();

			imageModal.setImages(imagesData.map(
				function(imageData) {
					return { src: imageData.largeSrc, altText: imageData.altText }
				}
			));
		}
	}

	function renderPreviewImage(imagesData) {
		previewLinkEl = document.createElement('a');
		previewLinkEl.classList.add(settings.previewLinkCssClass);

		previewImageEl = document.createElement("img");
		previewImageEl.classList.add(settings.previewImageCssClass);
		previewLinkEl.appendChild(previewImageEl);

		updatePreviewImage(imagesData[0].mediumSrc, imagesData[0].largeSrc, imagesData[0].altText);

		containerEl.appendChild(previewLinkEl);

	}

	function updatePreviewImage(previewSrc, fullResSrc, altText) {
		previewLinkEl.setAttribute("href", fullResSrc);

		previewImageEl.setAttribute("src", previewSrc);
		previewImageEl.setAttribute("alt", altText);
	}

	function renderThumbnails(imagesData) {
		thumbnailListEl = document.createElement("ul");
		thumbnailListEl.classList.add(settings.thumbnailListCssClass);

		imagesData.forEach(renderThumbnail);

		containerEl.appendChild(thumbnailListEl);

		if(imagesData.length > 0)
			setActiveItem(thumbnailListEl.querySelector("." + settings.thumbnailItemCssClass));
	}

	function renderThumbnail(imageData, index) {
		var itemEl = document.createElement("li");
		itemEl.classList.add(settings.thumbnailItemCssClass);
		itemEl.setAttribute("data-index", index.toString());

		var linkEl = document.createElement("a");
		linkEl.classList.add(settings.thumbnailLinkCssClass);
		linkEl.setAttribute("href", imageData.mediumSrc);
		linkEl.setAttribute("data-large-src", imageData.largeSrc);

		var imageEl = document.createElement("img");
		imageEl.classList.add(settings.thumbnailImageCssClass);
		imageEl.setAttribute("src", imageData.smallSrc);
		imageEl.setAttribute("alt", imageData.altText);

		linkEl.appendChild(imageEl);

		itemEl.appendChild(linkEl);

		thumbnailListEl.appendChild(itemEl);
	}

	function hookupClickEventHandler() {		
		containerEl.addEventListener('click', onClick);
	}

	function onClick(e) {
		var target = e.target;

		while(target != containerEl) { 
		    if (target.classList.contains(settings.thumbnailLinkCssClass)) { 
		       onThumbnailLinkClick(e, target);
		       break;
		    } else if(target.classList.contains(settings.previewLinkCssClass)) {
		    	onPreviewLinkClick(e, target);
		    	break;
		    }

    		target = target.parentNode;
  		}
	}

	function onThumbnailLinkClick(e, target) {
		e.preventDefault();

       	var previewSrc = target.getAttribute("href");
       	var fullResSrc = target.getAttribute("data-large-src");
       	var image = target.querySelector("." + settings.thumbnailImageCssClass);
       	var altText = image.getAttribute("alt");
       	updatePreviewImage(previewSrc, fullResSrc, altText);

       	setActiveItem(target.parentNode);
	}

	function onPreviewLinkClick(e, target) {
		e.preventDefault();

		var src = target.getAttribute("href");
		var image = target.querySelector("." + settings.previewImageCssClass);
		var altText = image.getAttribute("alt");

		imageModal.setCurrentImageIndex(currentThumbnailIndex);
		imageModal.open();
	}

	function setActiveItem(item) {
		clearActiveItem();
		item.classList.add(settings.thumbnailItemActiveCssClass);

		currentThumbnailIndex = parseInt(item.getAttribute("data-index"));
	}

	function clearActiveItem() {
		var activeItem = thumbnailListEl.querySelector('.' + settings.thumbnailItemActiveCssClass);
		if(activeItem)
			activeItem.classList.remove(settings.thumbnailItemActiveCssClass);
	}

	return {
		render: render
	};
};