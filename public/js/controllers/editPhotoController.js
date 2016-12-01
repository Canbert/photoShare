angular.module('editPhotoController', [])
    .controller('editCtrl', ['$scope', '$sce','$window', 'Photos','Tags', function ($scope, $sce, $window, Photos, Tags) {

        $scope.errors = "";
        $scope.photo = $window.photo;
        $scope.name = $scope.photo.name;
        $scope.price = $scope.photo.price;
        $scope.image = $scope.photo.url;
        $scope.tags = [];

        for(var i = 0; i <$scope.photo.tags.length; i++){
            $scope.tags.push($scope.photo.tags[i].name);
        }

        // ng-file-upload later on form submit or something similar
        $scope.submit = function() {
            if($scope.name != null) {
                if ($scope.tags.length > 0) {
                    Photos.put($scope.photo._id,{name: $scope.name, price: $scope.price})
                }
                else {
                    addError("Needs at least one tag.")
                }
            }
            else{
                addError("Needs at name.");
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