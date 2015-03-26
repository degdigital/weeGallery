module.exports = {	
    all: {
	    options: {
	      map: true,
	      processors: [
	      	require('postcss-import')(),	      	
	      	require("postcss-custom-properties")(),
	      	require("postcss-nested")(),
	        require('autoprefixer-core')({browsers: 'last 2 versions'}),
	        require('csswring')
	      ]
	    },
	    files: [
	        {
	            expand: true,
	            cwd: "<%= paths.examples.src.css %>",
	            src: ['*.css'],
	            dest: "<%= paths.examples.dist.css %>",
	            ext: '.css'
	        }
	    ]
  	}
};