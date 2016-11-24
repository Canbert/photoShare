var app = angular.module('photoUpload', ['ngFileUpload', 'photosService']);

app.controller('uploadCtrl', ['$scope', 'Upload', function ($scope, Upload) {
    // ng-file-upload later on form submit or something similar
    $scope.submit = function() {
        if ($scope.form.file.$valid && $scope.file) {
            $scope.upload($scope.file);
        }
    };

    // ng-file-upload on file select or drop
    $scope.upload = function (file) {
        Upload.upload({
            url: '/api/photos',
            data: {file: file, 'name': $scope.formData.name, 'tags': $scope.formData.tags}
        }).then(function (resp) {
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    };
}]);