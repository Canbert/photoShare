angular.module('adminController', [])

    // inject the  Admin service factory into our controller
    .controller('mainController', ['$scope','$http','Users', function($scope, $http, Users) {
        $scope.formData = {};
        $scope.loading = true;

        // GET =====================================================================
        // when landing on the page, get all users and show them
        // use the service to get all the users
        Users.get()
            .success(function(data) {
                $scope.user = data;
            });
    }]);