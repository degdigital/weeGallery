module.exports = function(grunt) {

    var paths = {
        src:  'src',        
        dist: 'dist',
        examples: {
            src: {
                js: 'examples/src/js',
                css: 'examples/src/css'
            },
            dist: {
                js: 'examples/js',
                css: 'examples/css'
            }
        }
    };

    require('load-grunt-config')(grunt, {
        config: {
            paths: paths
        }
    });   
};