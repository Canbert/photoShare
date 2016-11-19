// document.getElementById("imageFile").onchange = function () {
//     var reader = new FileReader();
//
//     reader.onload = function (e) {
//         // get loaded data and render thumbnail.
//         document.getElementById("image").src = e.target.result;
//     };
//
//     // read the image file as a data URL.
//     reader.readAsDataURL(this.files[0]);
// };

angular.module('photoController', [])

    // inject the Upload service factory into our controller
    .controller('mainController', ['$scope','$http','Photos', function($scope, $http, Photos) {
        $scope.formData = {};
        $scope.loading = true;

        // GET =====================================================================
        // when landing on the page, get all todos and show them
        // use the service to get all the todos
        Photos.get()
            .success(function(data) {
                $scope.photos = data;
                $scope.loading = false;
            });

    }]);