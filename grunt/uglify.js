module.exports = {
    dev: {
    	options: {
            enclose: true
    	},
        files: {
            '<%= paths.dist %>/weeGallery.js': [    
                '<%= paths.src %>/utils.js',
                '<%= paths.src %>/view.js',
                '<%= paths.src %>/slider.js',
                '<%= paths.src %>/modal.js',
                '<%= paths.src %>/flickrRepository.js',
                '<%= paths.src %>/main.js'

            ]
        }
    }
};