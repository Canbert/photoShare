
angular.module('photosController', [])

    // inject the Upload service factory into our controller
    .controller('uploadController', ['$scope','$http','Photos', function($scope, $http, Photos) {
        $scope.formData = {};
        $scope.loading = true;

        // GET =====================================================================
        // when landing on the page, get all photos and show them
        // use the service to get all the photos
        Photos.get()
            .success(function(data) {
                $scope.photos = data;
                $scope.loading = false;
                console.log($scope.photos);
            });

        // CREATE ==================================================================
        // when submitting the add form, send the text to the node API
        $scope.createPhoto = function() {

            // validate the formData to make sure that something is there
            // if form is empty, nothing will happen
            if ($scope.formData.text != undefined) {
                console.log($scope.formData);
                $scope.loading = true;

                // call the create function from our service (returns a promise object)
                Photos.create($scope.formData)

                // if successful creation, call our get function to get all the new photos
                    .success(function(data) {
                        $scope.loading = false;
                        $scope.formData = {}; // clear the form so our user is ready to enter another
                        $scope.photos = data; // assign our new list of photos
                    });
            }
        };

    }]);