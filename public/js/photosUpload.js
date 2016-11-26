var app = angular.module('photoUpload', ['ngFileUpload', 'photosService', 'mm.foundation.progressbar']);

app.controller('uploadCtrl', ['$scope', 'Upload', function ($scope, Upload) {

    $scope.dynamic = 0;
    $scope.tags = [];

    // ng-file-upload later on form submit or something similar
    $scope.submit = function() {
        if ($scope.form.file.$valid && $scope.file) {
            $scope.upload($scope.file);
        }
    };

    // ng-file-upload on file select or drop
    $scope.upload = function (file) {
        // console.log($scope.tags);
        Upload.upload({
            url: '/api/photos',
            data: {file: file, name: $scope.name, tags: $scope.tags, price: $scope.price}
        }).then(function (resp) {
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            $scope.dynamic = progressPercentage;
            //console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    };

    $scope.addTag = function () {
        if(!isInTags($scope.tag)){
            $scope.tags.push($scope.tag.toLowerCase());
        }
    };

    $scope.removeTag = function (tag) {
        var element = $scope.tags.indexOf(tag);
        $scope.tags.splice(element,1);
    };

    function isInTags(obj) {
        return ($scope.tags.indexOf(obj) != -1);
    }
}]);

