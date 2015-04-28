'use strict';

/* Controllers */

talarionApp.controller('MainController', function($scope) {

});

talarionApp.controller('MenuController', function($scope, $location,
		StringUtils) {

	$scope.isActive = function(viewLocation) {

		var isEndsWith = StringUtils.endsWith($location.absUrl(), viewLocation)
				|| StringUtils.endsWith($location.absUrl(), viewLocation + '/')
				|| StringUtils.endsWith($location.absUrl(), viewLocation
						+ '/index')
				|| StringUtils.contains($location.absUrl(), viewLocation
						+ '/search');

		return isEndsWith;
	};

});
