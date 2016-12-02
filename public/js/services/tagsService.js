angular.module('tagsService', [])

    // super simple service
    // each function returns a promise object
    .factory('Tags', ['$http',function($http) {
        return {
            get : function() {
                return $http.get('/api/tags');
            },
            getOne : function (id) {
                return $http.get('/api/tags/' + id);
            },
            update: function (id, tagData) {
                return $http.patch('/api/tags' + id, tagData);
            },
            create : function(tagData) {
                return $http.post('/api/tags', tagData);
            },
            delete : function(id) {
                return $http.delete('/api/tags/' + id);
            }
        }
    }]);