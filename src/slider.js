var slider = function slider(listEl, options) {
	var containerEl, 
		viewportEl, 
		prevButtonEl,
		nextButtonEl,
		slidesWidth, 
		slideWidth, 
		viewportWidth, 
		currentOffset = 0,
		defaults = {
			containerCssClass: 'slider',
			viewportCssClass: 'sliderViewport',
			slidesCssClass: 'sliderSlides',
			slideCssClass: 'sliderSlide',
			navButtonCssClass: 'sliderNavButton',
			prevButtonCssClass: 'sliderPrevButton',
			nextButtonCssClass: 'sliderNextButton',
			navButtonDisabledCssClass: 'is-disabled',
			enableCssAnimation: true
		};

	var settings = extendObjects({}, defaults, options);

	function init() {
		render();
		updateMeaurements();
		updateNavControlStates();
		hookupWindowResizeHandler();
	}

	function render() {
		containerEl = document.createElement('div');
		containerEl.classList.add(settings.containerCssClass);

		viewportEl = document.createElement('div');
		viewportEl.classList.add(settings.viewportCssClass);
		containerEl.appendChild(viewportEl);

		listEl.parentNode.insertBefore(containerEl, listEl);
		viewportEl.appendChild(listEl);

		listEl.classList.add(settings.slidesCssClass);
		var slides = listEl.querySelectorAll('li');
		for(var i = 0; i < slides.length; i++)
			slides[i].classList.add(settings.slideCssClass);

		renderNavControls();
	}

	function renderNavControls() {

		prevButtonEl = renderNavButton('Previous', settings.prevButtonCssClass, onPrevButtonClicked);
		nextButtonEl = renderNavButton('Next', settings.nextButtonCssClass, onNextButtonClicked);
	}

	function renderNavButton(text, cssClass, clickHandler) {
		var buttonEl = document.createElement('button');
		var innerWrapEl = document.createElement('span');
		innerWrapEl.innerHTML = text;	
		buttonEl.appendChild(innerWrapEl);	
		buttonEl.classList.add(settings.navButtonCssClass);
		buttonEl.classList.add(cssClass);
		buttonEl.addEventListener('click', clickHandler);
		containerEl.appendChild(buttonEl);	

		return buttonEl;	
	}

	function hookupWindowResizeHandler() {
		window.addEventListener('resize', debounce(onWindowResize, 100));
	}

	function onWindowResize(e) {
		updateMeaurements();
		updateSlidesOffset(0);
	}

	function onPrevButtonClicked(e) {
		e.preventDefault();

		slideLeft();
	}

	function onNextButtonClicked(e) {
		e.preventDefault();

		slideRight();
	}

	function updateMeaurements() {
		viewportWidth = viewportEl.clientWidth;

		var slides = listEl.querySelectorAll('.' + settings.slideCssClass);

		if(slides.length > 0) {
			slideWidth = slides[0].clientWidth;
			slidesWidth = slideWidth * slides.length;
			listEl.style.width = slidesWidth.toString() + "px";
		}
	}

	function slideLeft() {
		if(canSlideLeft() == false)
			return;

		updateSlidesOffset(1);
	}

	function slideRight() {
		if(canSlideRight() == false)
			return;

		updateSlidesOffset(-1);
	}

	function canSlideLeft() {
		return currentOffset < 0;
	}

	function canSlideRight() {
		return ((slidesWidth + currentOffset) > viewportWidth);
	}

	function updateSlidesOffset(increment) {
		currentOffset = currentOffset + (increment * slideWidth);

		var visibleSlidesWidth = viewportWidth - (slidesWidth + currentOffset);

		if(visibleSlidesWidth >= slideWidth)
			currentOffset += Math.floor(visibleSlidesWidth / slideWidth) * slideWidth;

		if(settings.enableCssAnimation) {            
            setVendorPrefixedStyle(listEl, 'Transition', ".5s");
            setVendorPrefixedStyle(listEl, 'Transform', "translate(" + currentOffset.toString() + "px, 0)");
        } else {
            listEl.style.marginLeft = currentOffset.toString() + "px";
        }

        updateNavControlStates();
	}

	function updateNavControlStates() {
		if(canSlideLeft() == false)
			prevButtonEl.classList.add(settings.navButtonDisabledCssClass);
		else
			prevButtonEl.classList.remove(settings.navButtonDisabledCssClass);

		if(canSlideRight() == false)
			nextButtonEl.classList.add(settings.navButtonDisabledCssClass);
		else
			nextButtonEl.classList.remove(settings.navButtonDisabledCssClass);
	}

	function setVendorPrefixedStyle(element, styleProp, value) {
        element.style["ms" + styleProp] = value;
        element.style["moz" + styleProp] = value;
        element.style["webkit" + styleProp] = value;
        element.style[styleProp.toLowerCase()] = value;
    }

	init();

	return {

	};
};