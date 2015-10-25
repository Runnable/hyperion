/**
 * @module Gruntfile
 */
'use strict';

var async = require('async');
var find = require('find');
var fs = require('fs');
var path = require('path');

module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify: {
      build: {
        options: {
          browserifyOptions: {
            debug: true,
            paths: ['./client/']
          }
        },
        files: {
          'client/build/js/bundle.js': 'client/main.js'
        }
      }
    },
    jade2js: {
      compile: {
        options: {
          namespace: 'Templates'
        },
        files: {
          './client/build/views/viewBundle.js': [
            './client/templates/**/*.jade'
          ]
        }
      }
    },
    copy: {
      css: {
        expand: true,
        cwd: 'client/assets/css',
        src: '**',
        dest: 'client/build/css',
        flatten: true
      }
    }
  });

  grunt.registerTask('autoBundleDependencies',
                     'generates index.js files that require all other files in the directory',
                     function () {
    var done = this.async();
    var clientPath = path.join(__dirname, 'client');
    async.series([
      bundle('controllers'),
      bundle('services')
    ], function () { done(); });

    function bundle (subDir) {
      return (function (subDir) {
        return function (cb) {
          var workingPath = path.join(clientPath, subDir);
          var indexPath = path.join(workingPath, 'index.js');

          find.file(/\.js$/, workingPath, function (files) {
            var newFileString = files
              .map(function (item) {
                return item.replace(workingPath, '.').replace(/\.js$/, '');
              })
              .reduce(function (previous, current) {
                if (current === './index') { return previous; }
                return previous += 'require(\'' + current + '\');\n';
              }, '');

            fs.exists(indexPath, function (exists) {
              if (exists) {
                // Only write if we need to
                fs.readFile(indexPath, 'UTF-8', function (err, fileString) {
                  if (err) { return cb(err); }
                  if (fileString.trim() === newFileString.trim()) {
                    return cb();
                  }
                  grunt.log.writeln('writing new', subDir, 'index.js');
                  fs.writeFile(indexPath, newFileString, cb);
                });
              } else {
                grunt.log.writeln('writing new', subDir, 'index.js');
                fs.writeFile(indexPath, newFileString, cb);
              }
            });
          });
        };
      })(subDir);
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-jade-plugin');

  grunt.registerTask('default', [
    'copy:css',
    'jade2js',
    'autoBundleDependencies',
    'browserify:build'
  ]);
};
