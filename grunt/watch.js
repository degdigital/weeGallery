module.exports = {
  css: {
    files: ["<%= paths.examples.src.css %>/**/*.css"],
    tasks: ["sass_globbing", "postcss"],
    options: {
      "spawn": true
    }
  },
  js: {
  	files: ["<%= paths.examples.src.js %>/**/*.js", "<%= paths.src %>/**/*.js"],
    tasks: ["uglify"],
    options: {
      "spawn": true
    }
  }  
};