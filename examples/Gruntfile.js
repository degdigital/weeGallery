module.exports = function(grunt) {

    var paths = {
        src: {
            js: 'src/js',
            css: 'src/css'
        },
        dist: {
            js: 'js',
            css: 'css'
        },
        pluginDist: '../dist'
    };

    require('load-grunt-config')(grunt, {
        config: {
            paths: paths
        }
    });   
};