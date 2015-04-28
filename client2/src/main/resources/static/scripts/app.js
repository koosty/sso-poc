'use strict';

/* App Module */

var talarionApp = angular.module('talarionApp', []);

talarionApp.config(function() {

});

talarionApp.factory('StringUtils',
		function() {
			return {
				endsWith : function(words, suffix) {

					var slice = words.slice(words.length - suffix.length,
							words.length);

					return slice === suffix;
				},
				contains : function(words, fragment) {

					return words.indexOf(fragment) > -1;

				}
			};
		});
