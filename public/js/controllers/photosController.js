
angular.module('photosController', [])

    // inject the Upload service factory into our controller
    .controller('photoCtrl', ['$scope','$http','$cookies','$window', 'Photos', function($scope, $http, $cookies, $window, Photos) {

        $scope.photo;

        var loc = window.location.pathname;
        var dir = loc.substring(loc.lastIndexOf('/') + 1, loc.length );

        Photos.get(dir)
            .success(function (data) {
               $scope.photo = data;
            });
        
        $scope.addToCart = function () {
            var now = new $window.Date(),
                // this will set the expiration to 1 month
            exp = new $window.Date(now.getFullYear(), now.getMonth()+1, now.getDate());
            // just add the photo id

            var photosIds = [];

            // if there is already a cookie set, set the photoIds to the photo array from the cookie
            if($cookies.get('cart')){
                var cookie = JSON.parse($cookies.get('cart'));
                photosIds = cookie.photos;

                if(!isInArray(photosIds)){
                    photosIds.push($scope.photo._id);
                }
                else{
                    alert("Already added");
                }
            }
            else{
                photosIds.push($scope.photo._id);
            }

            $cookies.putObject('cart',
                {'photos': photosIds },
                {
                    expires: exp,
                    path: '/' // sets the cookie to work on any page not just the one it was created on
                }
            );
        }

        function isInArray(array) {

            // check if already added the photo to the cookie
            for(var i = 0; i < array.length; i++){

                // add the photo id if its not
                if(array[i] == $scope.photo._id){
                    return true;
                }
            }
            return false;
        }

    }])

    .controller('cartCtrl', ['$scope','$http','$cookies','$window', 'Photos', function($scope, $http, $cookies, $window, Photos) {

        $scope.photos = [];

        if($cookies.get('cart')){
            // for some reason a one line declaration doesn't work
            var cookie = $cookies.get('cart');
            var cart = JSON.parse(cookie);

            for(var i = 0; i < cart.photos.length ; i++ ){
                Photos.get(cart.photos[i])
                    .success(function (data) {
                        $scope.photos.push(data);
                    });
            }
        }

        $scope.removeFromCart = function (id) {
            var cookie = $cookies.get('cart');
            var cart = JSON.parse(cookie);
            // console.log(cart);

            for(var i = 0; i < cart.photos.length; i++)
            {
                if(cart.photos[i] == id)
                {
                    cart.photos.splice(i,1);
                    break;
                }
            }

            var now = new $window.Date(),
                // this will set the expiration to 1 month
                exp = new $window.Date(now.getFullYear(), now.getMonth()+1, now.getDate());

            $cookies.putObject('cart',
                {'photos': cart.photos },
                {
                    expires: exp,
                    path: '/' // sets the cookie to work on any page not just the one it was created on
                }
            );

            $window.location.href = '/cart';
        }

        $scope.getTotal = function () {
            var total = 0;

            for(var i = 0; i <$scope.photos.length; i++){
                total += $scope.photos[i].price;
            }

            return (total / 100).toFixed(2);
        }
    }]);