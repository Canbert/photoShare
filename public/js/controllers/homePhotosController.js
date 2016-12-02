
angular.module('homePhotosController', [])

// inject the Upload service factory into our controller
    .controller('homePhotoCtrl', ['$scope','$http','$window', 'Photos', function($scope, $http, $window, Photos) {

        $scope.photos;

        Photos.get()
            .success(function (data) {
                $scope.photos = data.splice(0,9);
            });

        $scope.$watch('search', function () {
            Photos.search($scope.search)
                .success(function (data) {
                    $scope.photos = data;
                    console.log(data);
                });
        });

    }])