var DETAIL_IMAGE_SELECTOR = '[data-image-role=\"target\"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role=\"title\"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role=\"trigger\"]';

var HIDDEN_DETAIL_CLASS = 'hidden-detail';

var ESC_KEY = 27;
var TILDE_KEY = 192;

function setDetails(imageURL, titleText) {
    'use strict';
    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    detailImage.setAttribute('src', imageURL);

    var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-title');  
}

function setDetailsFromThumb(thumbnail) {
    'use strict';
    setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickHandler(thumb) {
    'use strict';
    thumb.addEventListener('click', function(event) {
        event.preventDefault();
        setDetailsFromThumb(thumb);
    });
}

function getThumbnailArray() {
    'use strict';
    var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
    var thumbnailArray = [].slice.call(thumbnails); //converting nodelist to array
    return thumbnailArray;
}

function hideDetails() {
    'use strict';
    document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function showDetails() {
    'use strict';
    document.body.classList.remove(HIDDEN_DETAIL_CLASS);
}

function addKeyPressHandler() {
    'use strict';
    var detailsHidden = false;

    document.body.addEventListener('keyup', function (event) {
        event.preventDefault();
        console.log(event.keyCode);
        if ((event.keyCode == ESC_KEY) && (!detailsHidden)) {
            hideDetails();
            detailsHidden = true;
        }

        if ((event.keyCode == TILDE_KEY) && (detailsHidden)) {
            showDetails();
        }
        
    });
}

function initializeEvents() {
    'use strict';
    var thumbnails = getThumbnailArray();
    thumbnails.forEach(addThumbClickHandler);
    addKeyPressHandler();
}

initializeEvents();