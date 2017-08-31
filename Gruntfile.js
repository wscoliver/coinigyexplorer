module.exports = function(grunt){
  grunt.initConfig({
    /*
    copy: {
      main: {
	files: [
	  // includes files within path
	  {expand: true, cwd: 'src/components',src: '**', dest: 'dist/components'},
	  {expand: true, src: ['src/store/*'], dest: 'dist/', filter: 'isFile'},
	],
      },
    },
    */
    babel: {
      options: {
        sourceMap: true,
        presets: ['es2015'],
        plugins: [
          "transform-runtime"
        ]
      },
      tests: {
        files: [
          {
            "expand": true,
            "cwd": "src/",
            "src": ["**/*.js"],
            "dest": "dist/",
            "ext": ".js"
          }
        ]
      },
    },
  });
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default',['babel']);
};
