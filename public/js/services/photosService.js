angular.module('photosService', [])

    // super simple service
    // each function returns a promise object
    .factory('Photos', ['$http',function($http) {
        return {
            get : function() {
                return $http.get('/api/photos');
            },
            get : function (id) {
                return $http.get('/api/photos/' + id);
            },
            create : function(photoData) {
                return $http.post('/api/photos', photoData);
            },
            delete : function(id) {
                return $http.delete('/api/photos/' + id);
            }
        }
    }]);