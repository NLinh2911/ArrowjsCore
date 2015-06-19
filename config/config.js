'use strict';

/**
 * Module dependencies.
 */
let _ = require('lodash'),
	glob = require('glob');

/**
 * Load app configurations
 */
module.exports = _.extend(
    require('./env/all.js'),
	require('./env/' + process.env.NODE_ENV) || {}
);

/**
 * Get files by glob patterns
 */
module.exports.getGlobbedFiles = function(globPatterns, removeRoot) {
	// For context switching
	let _this = this;

	// URL paths regex
	let urlRegex = new RegExp('^(?:[a-z]+:)?\/\/', 'i');

	// The output array
	let output = [];

	// If glob pattern is array so we use each pattern in a recursive way, otherwise we use glob 
	if (_.isArray(globPatterns)) {
		globPatterns.forEach(function(globPattern) {
			output = _.union(output, _this.getGlobbedFiles(globPattern, removeRoot));
		});
	} else if (_.isString(globPatterns)) {
		if (urlRegex.test(globPatterns)) {
			output.push(globPatterns);
		} else {
			glob(globPatterns, {
				sync: true
			}, function(err, files) {
				if (removeRoot) {
					files = files.map(function(file) {
						return file.replace(removeRoot, '');
					});
				}

				output = _.union(output, files);
			});
		}
	}

	return output;
};

/**
 * Huy viet
 */
module.exports.getOverrideGlobbedFiles = function(modules, routePath, index){
    let p = routePath.split('/');
    let module_name = p[p.length - index];
    let check_obj = {};
    check_obj[module_name] = routePath;
    modules = _.assign(modules, check_obj);
    return modules;
};

/**
 * Get the modules JavaScript files
 */
module.exports.getJavaScriptAssets = function(includeTests) {
	let output = this.getGlobbedFiles(this.assets.lib.js.concat(this.assets.js), 'public/');

	// To include tests
	if (includeTests) {
		output = _.union(output, this.getGlobbedFiles(this.assets.tests));
	}

	return output;
};

/**
 * Get the modules CSS files
 */
module.exports.getCSSAssets = function() {
	let output = this.getGlobbedFiles(this.assets.lib.css.concat(this.assets.css), 'public/');
	return output;
};