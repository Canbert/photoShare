
angular.module('photosController', [])

    // inject the Upload service factory into our controller
    .controller('photoCtrl', ['$scope','$http','Photos', function($scope, $http, Photos) {

        $scope.photo;

        var loc = window.location.pathname;
        var dir = loc.substring(loc.lastIndexOf('/') + 1, loc.length );

        Photos.get(dir)
            .success(function (data) {
               $scope.photo = data;
                // console.log($scope.photo);
            });

    }]);