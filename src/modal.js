var modal = function modal(options) {
	var isInited = false,
		containerEl,
		backdropEl,
		contentEl,
		imageEl,
		prevLinkEl,
		nextLinkEl,
		imagesData = [],
		currentImageIndex = 0, 
		defaults = {
			visibleCssClass: 'is-visible',
			disabledCssClass: 'is-disabled',
			containerCssClass: 'modal',
			backdropCssClass: 'modal-backdrop',
			wrapCssClass: 'modal-wrap',
			innerWrapCssClass: 'modal-inner-wrap',
			contentCssClass: 'modal-content',
			imageCssClass: 'modal-image',
			prevLinkCssClass: 'modal-prevLink',
			nextLinkCssClass: 'modal-nextLink',
			navLinkCssClass: 'modal-navLink',
			closeButtonCssClass: 'modal-closeButton'
		};

	var settings = extendObjects({}, defaults, options);

	function init() {
		isInited = true;

		renderFrame();
		renderContent();

		hookupEventHandlers();
	}

	function renderFrame() {
		containerEl = document.createElement('div');
		containerEl.classList.add(settings.containerCssClass);

		var wrapEl = document.createElement('div');
		wrapEl.classList.add(settings.wrapCssClass);
		containerEl.appendChild(wrapEl);

		var innerWrapEl = document.createElement('div');
		innerWrapEl.classList.add(settings.innerWrapCssClass);
		wrapEl.appendChild(innerWrapEl);

		contentEl = document.createElement('div');
		contentEl.classList.add(settings.contentCssClass);
		innerWrapEl.appendChild(contentEl);

		backdropEl = document.createElement('div');
		backdropEl.classList.add(settings.backdropCssClass);

		containerEl.appendChild(backdropEl);

		document.body.appendChild(containerEl);
	}

	function renderContent() {
		closeButton = document.createElement('button');
		closeButton.innerHTML = "Close";
		closeButton.classList.add(settings.closeButtonCssClass);	
		closeButton.addEventListener('click', onCloseButtonClick);	
		contentEl.appendChild(closeButton);
		


		imageEl = document.createElement('img');
		imageEl.classList.add(settings.imageCssClass);

		contentEl.appendChild(imageEl);

		prevLinkEl = renderNavLink('Previous', settings.prevLinkCssClass, onPrevLinkClick);
		nextLinkEl = renderNavLink('Next', settings.nextLinkCssClass, onNextLinkClick);

	}

	function renderNavLink(text, cssClass, clickHandler) {
		var navLinkEl = document.createElement('a');
		var innerWrapEl = document.createElement('span');
		innerWrapEl.innerHTML = text;	
		navLinkEl.appendChild(innerWrapEl);
		navLinkEl.classList.add(settings.navLinkCssClass);
		navLinkEl.classList.add(cssClass);
		navLinkEl.addEventListener("click", clickHandler);

		contentEl.appendChild(navLinkEl);

		return navLinkEl;
	}

	function hookupEventHandlers() {
		backdropEl.addEventListener('click', onBackdropElClick)
	}

	function onCloseButtonClick(e) {
		e.preventDefault();

		close();
	}

	function onBackdropElClick(e) {
		e.preventDefault();

		close();
	}

	function onPrevLinkClick(e) {
		e.preventDefault();

		setCurrentImageIndex(currentImageIndex - 1);
	}

	function onNextLinkClick(e) {
		e.preventDefault();

		setCurrentImageIndex(currentImageIndex + 1);
	}

	function open() {
		if(!isInited)
			init();

		containerEl.classList.add(settings.visibleCssClass);
		document.querySelector("html").style.overflow = "hidden";
	}

	function close() {
		if(!isInited)
			return;

		containerEl.classList.remove(settings.visibleCssClass);
		document.querySelector("html").style.overflow = "";
	}

	function setImages(images) {
		imagesData = images;
		currentImageIndex = 0;
	}

	function setCurrentImageIndex(index) {
		
		if(index < 0 || index > (imagesData.length - 1))
			return;

		currentImageIndex = index;

		updateImage();
		updateNavLinks();
	}

	function updateImage() {
		if(!isInited)
			init();

		var imageData = imagesData[currentImageIndex];

		imageEl.setAttribute('src', imageData.src);
		imageEl.setAttribute('alt', imageData.altText);
	}

	function updateNavLinks() {
		updateNavLink(prevLinkEl, (currentImageIndex == 0), currentImageIndex - 1);
		updateNavLink(nextLinkEl, (currentImageIndex >= (imagesData.length - 1)), currentImageIndex + 1);
	}

	function updateNavLink(navLinkEl, isDisabled, imageIndex) {
		if(isDisabled){
			navLinkEl.classList.add(settings.disabledCssClass);
			navLinkEl.setAttribute("href", "");
		}
		else {
			navLinkEl.classList.remove(settings.disabledCssClass);
			var imageData = imagesData[imageIndex];
			navLinkEl.setAttribute("href", imageData.src);
		}
	}

	return {
		open: open,
		close: close,
		setImages: setImages,
		setCurrentImageIndex: setCurrentImageIndex
	};
}