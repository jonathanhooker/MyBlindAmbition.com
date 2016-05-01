'use strict';

module.exports = function(grunt) {

    var pngquant = require('imagemin-pngquant'),
        jpegRecompress = require('imagemin-jpeg-recompress');

    var appConfig = {
        app: 'app',
        dist: 'dist'
    };

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            dist: {
                files: [
                    {expand: true, cwd: appConfig.app + '/', src: ['./.htaccess', '../*.md', './*.php', '!./index.php','./*.html', './*.png', './*.ico'], dest: appConfig.dist + '/', filter: 'isFile'},
                    {expand: true, cwd: appConfig.app, src: ['css/**', 'assets/shaders/**', 'images/**'], dest: appConfig.dist + '/'}, // includes files in path and its subdirs
               ]
            }
        },
        processhtml: {
            options: {
                // Task-specific options go here.
            },
            dist: {
                files: {
                    'dist/index.php': ['app/index.php']
                }
            }
        },
        'string-replace': {
            dist: {
                files: {
                    'dist/': ['dist/README.md']
                },
                options: {
                  replacements: [
                    {
                        pattern: /app\/json\/en\.json/ig,
                        replacement: 'json/en.json'
                    }
                  ]
                }
              }
        },
        requirejs: {
            dist: {
                options: {
                    baseUrl: appConfig.app + '/js',
                    mainConfigFile: appConfig.app + '/js/main.js',
                    name: '../bower_components/almond/almond',
                    include: ['main'],
                    insertRequire: ['main'],
                    out: appConfig.dist + '/js/main.js'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-audiosprite');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-string-replace');

    grunt.registerTask('build', ['requirejs:dist', 'copy:dist', 'processhtml:dist', 'string-replace:dist']);
    grunt.registerTask('strreplace', ['copy:dist', 'string-replace:dist']);
    grunt.registerTask('compileaudiosprite', ['audiosprite:all']);

};