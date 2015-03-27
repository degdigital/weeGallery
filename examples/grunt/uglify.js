module.exports = {    
    dev: {
        options: {
            enclose: true
        },
        files: {
            '<%= paths.dist.js %>/jsPolyfills.js': [           
                '<%= paths.src.js %>/jsPolyfills.js'
            ],
            '<%= paths.dist.js %>/global.js': [           
                '<%= paths.src.js %>/global.js'
            ]
        }        
    }
};