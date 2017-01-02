module.exports = function (grunt) {


    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            options: {
                livereload: true
            },
            css: {
                files: ['css/**/*.css', 'dist/css/**/*.css']
            },
            js: {
                files: ['js/**/*.js']
            },
            html: {
                files: ['*.html']
            },
            jpg: {
                files: ['images/**/*.jpg']
            },
            grunt: {
                files: ['Gruntfile.js']
            }
        },
        connect: {
            server: {
                options: {
                    port: 9000,
                    base: '.',
                    hostname: '0.0.0.0',
                    protocol: 'http',
                    livereload: true,
                    open: true
                }
            },
            serve: {
                options: {
                    port: 9001,
                    base: './dist',
                    hostname: '0.0.0.0',
                    protocol: 'http',
                    livereload: true,
                    open: true
                }
            }
        },
        cssmin: {
            generated: {
                files: [{
                    dest: 'dist/css/style.min.css',
                    src: ['.tmp/concat/assets/css/style.min.css']
                }]
            }
        },
        clean: {
            dist: ['dist'],
            tmp: ['.tmp']
        },
        concat: {
            generated: {
                files: [
                    {
                        dest: '.tmp/concat/assets/js/vendor.js',
                        src: ['js/*.js']
                    }, {
                        dest: '.tmp/concat/assets/css/style.min.css',
                        src: ['css/*.css']
                    }
                ]
            }
        },
        concat_css: {
            options: {
                // Task-specific options go here.
            },
            all: {
                src: ["build/css/*.min.css"],
                dest: "release/css/styles.css"
            }
        },
        uglify: {
            generated: {
                files: [
                    {
                        dest: 'dist/assets/js/vender.js',
                        src: ['.tmp/concat/assets/js/vender.js']
                    }
                ]
            }
        },
        usemin: {
            html: 'dist/index.html'
        },
        useminPrepare: {
            html: 'index.html',
            options: {
                dest: 'dist'
            }
        },
        copy: {
            html: {
                src: './index.html', dest: 'dist/index.html'
            },
            // css: {
            //     src: './css/*', dest: 'dist/'
            // },
            img: {
                src: './images/**', dest: 'dist/'
            },
            font: {
                src: './fonts/**', dest: 'dist/'
            }
        }
    });

    grunt.registerTask('serve', "Serve your app", [
        'connect:serve', 'watch']);

    grunt.registerTask('server', ['connect:server', 'watch']);
    grunt.registerTask('build', [
        'clean',
        'copy:html',
        'copy:img',
        'copy:font',
        'useminPrepare',
        'concat:generated',
        'cssmin:generated',
        'uglify:generated',
        'usemin'
    ]);

};