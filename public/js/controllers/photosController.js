
angular.module('photosController', [])

    // inject the Upload service factory into our controller
    .controller('photoCtrl', ['$scope','$http','$cookies','$window', 'Photos', function($scope, $http, $cookies, $window, Photos) {

        $scope.photo;

        var loc = window.location.pathname;
        var dir = loc.substring(loc.lastIndexOf('/') + 1, loc.length );

        Photos.get(dir)
            .success(function (data) {
               $scope.photo = data;
                // console.log($scope.photo);
            });
        
        $scope.addToCart = function () {
            var now = new $window.Date(),
                // this will set the expiration to 1 month
            exp = new $window.Date(now.getFullYear(), now.getMonth()+1, now.getDate());
            // just add the photo id

            var photosIds = [];

            // if there is already a cookie set, set the photoIds to the photo array from the cookie
            if($cookies.get('cart')){
                // console.log("cookie: " + JSON.parse($cookies.get('cart')));
                var cookie = JSON.parse($cookies.get('cart'));
                photosIds = cookie.photos;
                // console.log("Existing array: " + cookie.photos);

                // check if already added the photo to the cookie
                for(var i = 0; i < photosIds.length; i++){

                    // add the photo id if its not
                    if(photosIds[0] != $scope.photo._id){
                        photosIds.push($scope.photo._id);
                    }
                    else
                        alert("already added!");
                }

            }
            else{
                photosIds.push($scope.photo._id);
            }

            // console.log("New Array: " + photosIds);

            $cookies.putObject('cart',
                {'photos': photosIds },
                {
                    expires: exp,
                    path: '/' // sets the cookie to work on any page not just the one it was created on
                }
            );
        }

    }])

    .controller('cartCtrl', ['$scope','$http','$cookies', 'Photos', function($scope, $http, $cookies, Photos) {

        $scope.photos = [];

        var cart = $cookies.get('cart');

        console.log(cart);

        // console.log(photo_id);

        for(var i = 0; i < cart; i++ ){
            Photos.get(cart[i].photo_id)
                .success(function (data) {
                    $scope.photos.push(data);
                });
        }

        console.log($scope.photos);
    }]);