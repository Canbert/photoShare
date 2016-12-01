var app = angular.module('photoUpload', ['photosService']);

app.controller('editCtrl', ['$scope', '$sce','$window', 'Upload', function ($scope, $sce, $window, Upload) {

    $scope.errors = "";
    $scope.dynamic = 0;
    $scope.tags = [];
    $scope.price = 0.00;

    $scope.changeVisible = function () {
        $scope.isntVisible = false;
    }

    // ng-file-upload later on form submit or something similar
    $scope.submit = function() {
        if ($scope.form.file.$valid && $scope.file) {
            if($scope.name != null) {
                if ($scope.tags.length > 0) {
                    $scope.upload($scope.file);
                }
                else {
                    addError("Needs at least one tag.")
                }
            }
            else{
                addError("Needs at name.");
            }
        }
        else{
            addError("Please select a photo.");
        }
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

    function addError(err){
        $scope.errors  = $sce.trustAsHtml('<div class="alert callout" data-closable>'+
            '<h5>Error</h5>'+
            '<p>' + err + '</p>' +
            '<button class="close-button" aria-label="Dismiss alert" type="button" data-close> ' +
            '<span aria-hidden="true">&times;</span>'+
            '</button>' +
            '</div>');
    }

    function isInTags(obj) {
        return ($scope.tags.indexOf(obj) != -1);
    }
}]);

