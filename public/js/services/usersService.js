angular.module('usersService', [])

// super simple service
// each function returns a promise object
    .factory('Users', ['$http',function($http) {
        return {
            get : function() {
                return $http.get('/api/users');
            },
            get : function (id) {
                return $http.get('/api/users/' + id);
            },
            put: function (id, userData) {
                return $http.put('/api/users/' + id, userData);
            },
            create : function(userData) {
                return $http.post('/api/users', userData);
            },
            delete : function(id) {
                return $http.delete('/api/users/' + id);
            }
        }
    }]);