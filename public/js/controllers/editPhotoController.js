angular.module('editPhotoController', [])
    .controller('editCtrl', ['$scope', '$sce','$window', 'Photos','Tags', function ($scope, $sce, $window, Photos, Tags) {

        $scope.errors = "";
        $scope.photo = $window.photo;
        $scope.name = $scope.photo.name;
        $scope.price = $scope.photo.price;
        $scope.image = $scope.photo.url;
        $scope.tags = [];

        for(var i = 0; i <$scope.photo.tags.length; i++){
            addTag($scope.photo.tags[i].name);
        }

        $scope.submit = function() {
            if($scope.name != null) {
                if ($scope.tags.length > 0) {
                    Photos.put($scope.photo._id,{name: $scope.name, price: $scope.price, tags: $scope.tags});
                    addSuccess("Successfully updated");
                }
                else {
                    addError("Needs at least one tag.")
                }
            }
            else{
                addError("Needs at name.");
            }
        };

        $scope.delete = function () {
            Photos.delete($scope.photo._id);
        }

        $scope.addTag = function () {
            addTag($scope.tag);
        };

        $scope.removeTag = function (tag) {
            var element = $scope.tags.indexOf(tag);
            $scope.tags.splice(element,1);
        };

        function addTag(tag) {
            if(!isInTags(tag) && tag.length > 0){
                $scope.tags.push(tag);
            }
        }

        function addSuccess(err){
            $scope.errors  = $sce.trustAsHtml('<div class="success callout" data-closable>'+
                '<h5>Updated</h5>'+
                '<p>' + err + '</p>' +
                '<button class="close-button" aria-label="Dismiss alert" type="button" data-close> ' +
                '<span aria-hidden="true">&times;</span>'+
                '</button>' +
                '</div>');
        }

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