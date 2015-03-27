module.exports = {  
  js: {
  	files: ["<%= paths.src %>/**/*.js"],
    tasks: ["uglify"],
    options: {
      "spawn": true
    }
  }  
};