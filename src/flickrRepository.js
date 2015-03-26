var flickrRepository = function flickrRepository(apiKey, userId) {
	
	var apiUrl = "https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=[API_KEY]&photoset_id=[PHOTOSET_ID]&user_id=[USER_ID]&media=photos&format=json";
	var photoSrcUrl = "https://farm[FARM_ID].staticflickr.com/[SERVER_ID]/[ID]_[SECRET]_[SIZE].jpg";
	
	function getAlbum(albumId, callback) {

	    window.jsonFlickrApi = function(data) {
	        try {
	        	delete window.jsonFlickrApi;
	        } catch(e) {}

	        document.body.removeChild(script);
	        onAlbumRetrieved(data, callback);
	    };

	    var script = document.createElement('script');
	    script.src = buildApiUrl(albumId);
	    document.body.appendChild(script);
	}

	function buildApiUrl(albumId) {
		return apiUrl.replace("[API_KEY]", apiKey).replace("[USER_ID]", userId).replace("[PHOTOSET_ID]", albumId);
	}

	function onAlbumRetrieved(data, callback) {
		if(data.stat != "ok") {
			onGetAlbumError(callback);
		} else {
			callback(normalizeData(data));
		}
	}

	function onGetAlbumError(callback) {
		callback({
			images: []
		});
	}

	function normalizeData(data) {
		var album = {};

		album.images = data.photoset.photo.map(normalizePhotoData);

		return album;
	}

	function normalizePhotoData(photoData) {


		return {
					smallSrc: generateSrcUrl(photoData, 's'),
					mediumSrc: generateSrcUrl(photoData, 'n'),
					largeSrc: generateSrcUrl(photoData, 'b'),
					altText: photoData.title
				};
	}

	function generateSrcUrl(photoData, size) {
		return photoSrcUrl
				.replace("[FARM_ID]", photoData.farm)
				.replace("[SERVER_ID]", photoData.server)
				.replace("[ID]", photoData.id)
				.replace("[SECRET]", photoData.secret)
				.replace("[SIZE]", size)
	}

	return {
		getAlbum: getAlbum
	};

};