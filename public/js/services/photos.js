angular.module('photoService', [])

    // super simple service
    // each function returns a promise object
    .factory('Photos', ['$http',function($http) {
        return {
            get : function() {
                return $http.get('/api/photos');
            },
            create : function(todoData) {
                return $http.post('/api/photos', todoData);
            },
            delete : function(id) {
                return $http.delete('/api/photos/' + id);
            }
        }
    }]);