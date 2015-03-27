module.exports = function(grunt) {

    var paths = {
        src:  'src',        
        dist: 'dist'       
    };

    require('load-grunt-config')(grunt, {
        config: {
            paths: paths
        }
    });   
};