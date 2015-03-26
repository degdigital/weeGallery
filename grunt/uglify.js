module.exports = {
    main: {
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
    },
    examples: {
        options: {
            enclose: true
        },
        files: {
            '<%= paths.examples.dist.js %>/jsPolyfills.js': [           
                '<%= paths.examples.src.js %>/jsPolyfills.js'
            ],
            '<%= paths.examples.dist.js %>/global.js': [           
                '<%= paths.examples.src.js %>/global.js'
            ]
        }        
    }
};