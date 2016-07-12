// Karma configuration
// Generated on Mon Jul 11 2016 22:36:45 GMT+0200 (CEST)

module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-systemjs'
    ],
    frameworks: [
      'systemjs',
      'jasmine'
    ],
    files: ['src/test/unit/*.spec.js'],
    systemjs: {
      configFile: 'src/systemjs.config.js',
      // list of files to serve (will not automatically be loaded)
      serveFiles: [
        'src/**/*',
        'node_modules/**/*'
      ],
      // list of files to insert <script> tag for
      includeFiles: [
        'node_modules/es6-shim/es6-shim.min.js',
        'node_modules/zone.js/dist/zone.js',
        'node_modules/reflect-metadata/Reflect.js',
        'node_modules/systemjs/dist/system.src.js'
      ],
      config: {
        transpiler: null,
        paths: {
          'systemjs': '/node_modules/systemjs/dist/system.js'
        }
      }
    },


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}

