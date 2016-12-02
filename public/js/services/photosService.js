angular.module('photosService', [])

    // super simple service
    // each function returns a promise object
    .factory('Photos', ['$http',function($http) {
        return {
            get : function() {
                return $http.get('/api/photos');
            },
            getOne: function (id) {
                return $http.get('/api/photos/' + id);
            },
            search: function (query) {
                return $http.get('/api/photos?q=' + query);
            },
            put: function (id, photoData) {
                return $http.put('/api/photos/' + id, photoData);
            },
            create : function(photoData) {
                return $http.post('/api/photos', photoData);
            },
            delete : function(id) {
                return $http.delete('/api/photos/' + id);
            }
        }
    }]);