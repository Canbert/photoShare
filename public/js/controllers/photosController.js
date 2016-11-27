
angular.module('photosController', [])

    // inject the Upload service factory into our controller
    .controller('photoCtrl', ['$scope','$http','$cookies', 'Photos', function($scope, $http, $cookies, Photos) {

        $scope.photo;

        var loc = window.location.pathname;
        var dir = loc.substring(loc.lastIndexOf('/') + 1, loc.length );

        Photos.get(dir)
            .success(function (data) {
               $scope.photo = data;
                // console.log($scope.photo);
            });
        
        $scope.addToCart = function () {
            // just add the photo id
            $cookies.putObject('cart',{'photo': $scope.photo._id});
            console.log("Added: " + $cookies);
        }

    }])

    .controller('cartCtrl', ['$scope','$http','$cookies', 'Photos', function($scope, $http, $cookies, Photos) {


    }]);