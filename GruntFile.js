'use strict';

/**
 * grunt build          - clean and deploy development build to public/
 * grunt build-watch    - watch files for changes and rebuild
 * grunt test-unit      - run karma unit tests and generate coverage report
 * grunt test-watch     - run karma unit tests in watch mode
 * grunt test-e2e       - run protractor end to end integration tests
 * grunt clean          - clean all generated files
 * grunt clean:build    - clean build modules only
 * grunt clean:node     - clean npm modules only (remember to run 'npm install' again)
 *
 */
module.exports = function (grunt) {

    function envConfig() {
        var env = grunt.option('env') || 'dev';
        return grunt.file.readJSON('config-' + env + '.json');
    }

    grunt.registerTask('default', ['build']);
    grunt.registerTask('build', ['env:config', 'clean:build', 'preprocess', 'copy:html', 'bower:install', 'less', 'concat', 'uglify']);
    grunt.registerTask('build-watch', ['build', 'watch']);
    grunt.registerTask('test-unit', ['env:config', 'clean:test', 'preprocess', 'bower:install', 'karma:unit', 'copy:coverageReport']);
    grunt.registerTask('test-e2e', ['build', 'protractor:test']);
    grunt.registerTask('test-watch', ['clean:test', 'karma:watch']);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        env: {
          config: envConfig()
        },

        bower: {
            install: {
                options: {
                    targetDir: 'public/vendor',
                    bowerOptions: {
                        production: false
                    }
                }
            }
        },

        less: {
            client: {
                options: {
                    paths: [ 'src/**/*.less', 'bower_components/bootstrap/less/**/*' ],
                    concat: true,
                    cleancss: true
                },
                files: {
                    'public/css/styles.css': 'src/styles.less'
                }
            }
        },

        concat: {
            client: {
                options: {
                    separator: '\n',
                    banner: "/*! <%= pkg.name %>-<%= pkg.version %> */\n'use strict';\n"                    
                },
                src: [ 'processed/app.js', 'src/**/!(app).js'],
                dest: 'public/js/app.js'
            }
        },

        uglify: {
            client: {
                options: {
                    banner: '/*! <%= pkg.name %>-<%= pkg.version %> */\n',
                    mangle: false
                },
                files: {
                    'public/js/app.min.js': [ '<%= concat.client.dest %>' ]
                }
            }
        },

        copy: {
            html: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/',
                        src: ['**/*.html'],
                        dest: 'public/',
                        filter: 'isFile'
                    }

                ]
            },
            coverageReport: {
                src: 'test/coverage/**/lcov.info',
                dest: 'test/reports/lcov.info'
            }
        },

        clean: {
            build: {
                src: [
                    'processed',
                    'public'
                ]
            },
            test: {
                src: [
                    'test/reports',
                    'test/coverage'
                ]
            },
            node: {
                src: [
                    'node_modules',
                    'bower_components'
                ]
            }
        },

        preprocess: {
            client: {
                src: 'src/app.js',
                dest: 'processed/app.js'
            }
        },

        watch: {
            options: {
                livereload: true
            },
            app: {
                files: ['src/app.js'],
                tasks: ['env:config', 'preprocess']
            },
            js: {
                files: ['src/**/!(app).js'],
                tasks: ['env:config', 'concat', 'uglify']
            },
            css: {
                files: ['src/**/*.less'],
                tasks: ['less:client']
            },
            html: {
                files: ['src/**/*.html'],
                tasks: ['copy:html']
            }
        },

        karma: {
            unit: {
                configFile: 'test/karma.conf.js',
                singleRun: true
            },
            watch: {
                configFile: 'test/karma.conf.js',
                singleRun: false
            }
        },

        protractor: {
            options: {
                configFile: 'node_modules/protractor/referenceConf.js',
                keepAlive: false,
                noColor: false
            },
            test: {
                configFile: 'test/e2e.conf.js',
                options: {
                    args: {
                        'baseUrl': 'http://localhost:63342/library-ui/public/'
                    }
                }
            }
        }

    });

    // Load NPM tasks
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-preprocess');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-protractor-runner');


};
