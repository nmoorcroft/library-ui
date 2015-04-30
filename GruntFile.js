'use strict';

/**
 * grunt server         - start http server and watch files
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

    grunt.registerTask('default', ['build']);
    grunt.registerTask('server', ['build', 'configureProxies:server', 'connect','watch']);
    grunt.registerTask('build', ['clean:build', 'copy:html', 'bower:install', 'less', 'concat', 'uglify']);
    grunt.registerTask('build-watch', ['build', 'watch']);
    grunt.registerTask('test-unit', ['clean:test', 'bower:install', 'karma:unit', 'copy:coverageReport']);
    grunt.registerTask('test-e2e', ['build', 'protractor:test']);
    grunt.registerTask('test-watch', ['clean:test', 'karma:watch']);

    var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;

    grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),

            connect: {
                'static': {
                    options: {
                        hostname: 'localhost',
                        port: 8001,
                        base: 'public/'
                    }
                },
                server: {
                    options: {
                        hostname: 'localhost',
                        port: 8000,
                        middleware: function () {
                            return [proxySnippet];
                        }
                    },
                    proxies: [{
                        context: '/',
                        host: 'localhost',
                        port: 8001
                    },
                    {
                       context: '/api',
                        host: 'localhost',
                        port: 3000
                    }]
                }
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
                        paths: ['src/**/*.less', 'bower_components/bootstrap/less/**/*'],
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
                        banner: "'use strict';\n\n",
                        process: function(src, filepath) {
                            return '// Source: ' + filepath + '\n' +
                                src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
                        }
                    },
                    src: ['src/**/module.js', 'src/**/!(app|module).js', 'src/app.js'],
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
                        'public/js/app.min.js': ['<%= concat.client.dest %>']
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
                    src: 'coverage/**/lcov.info',
                    dest: 'reports/lcov.info'
                }
            },

            clean: {
                build: {
                    src: [
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

            watch: {
                options: {
                    livereload: true
                },
                js: {
                    files: ['src/**/*.js'],
                    tasks: ['concat', 'uglify']
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

        }
    );

    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-protractor-runner');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-connect-proxy');


};
