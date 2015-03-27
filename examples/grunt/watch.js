module.exports = {
  css: {
    files: ["<%= paths.src.css %>/**/*.css"],
    tasks: ["sass_globbing", "postcss"],
    options: {
      "spawn": true
    }
  },
  js: {
  	files: ["<%= paths.src.js %>/**/*.js"],
    tasks: ["uglify"],
    options: {
      "spawn": true
    }
  }  
};