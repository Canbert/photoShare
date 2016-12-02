angular.module('adminController', [])

    // inject the  Admin service factory into our controller
    .controller('adminCtrl', ['$scope','$http','Users', function($scope, $http, Users) {

        $scope.users;

        $scope.options = [
                {id: 0, name: 'Shopper'},
                {id: 1, name: 'Photographer'},
                {id: 2, name: 'Admin'}
        ];

        // GET =====================================================================
        // when landing on the page, get all users and show them
        // use the service to get all the users
        Users.get()
            .success(function(data) {
                $scope.users = data;
            });
        
        $scope.updatePrivilege = function (id, privilege) {
            // console.log(id + " " + JSON.stringify(privilege));
            Users.put(id, {privilege: privilege});
        }

    }]);