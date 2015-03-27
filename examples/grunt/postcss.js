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
	            cwd: "<%= paths.src.css %>",
	            src: ['*.css'],
	            dest: "<%= paths.dist.css %>",
	            ext: '.css'
	        }
	    ]
  	}
};