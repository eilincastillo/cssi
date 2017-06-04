(function ()
{
    'use strict';
     
    angular.module('cssi.factories.user').factory('UserFactory', ['$q', '$rootScope', '$resource', 'CSSIAPI', 'RESOURCE', 'AUTH', UserFactory]);

    function UserFactory($q, $rootScope, $resource, CSSIAPI, RESOURCE, AUTH)
    {
        var url = CSSIAPI.URL + RESOURCE.USER + ':userId';
        var auth = AUTH.concat($rootScope.token);
        var request = $resource(url, { userId: '@id' },
            {
                'save': { method: 'POST', headers: { 'Authorization' : auth }},
                'get': { method: 'GET', headers: { 'Authorization' : auth }},
                'query':  {method:'GET', isArray:true, headers: { 'Authorization' : auth }},
                'update': {method: 'PUT', headers: { 'Authorization' : auth }}
            },{
                stripTrailingSlashes: false
            });


        var factory =
            {
                getAll: getAllUsers,
                get: getUser,
                update: updateUser,
                add: addUser
            };

        return factory;

        function getAllUsers()
        {
            var defered = $q.defer();
            var promise = defered.promise;

            request.query(null,
                function success(data)
                {
                    defered.resolve(data);
                },
                function error(e)
                {
                    defered.reject();
                });

            return promise;
        }

        function getUser(userId)
        {

            var defered = $q.defer();
            var promise = defered.promise;

            request.get({userId: userId},
                function success(data)
                {
                    defered.resolve(data);
                },
                function error(err)
                {
                    defered.reject();
                });
            //TODO: tratar datos

            return promise;
        }

        function updateUser(user)
        {
            var defered = $q.defer();
            var promise = defered.promise;

            request.update({userId: user.id }, user,
                function success(data)
                {
                    defered.resolve(data);
                },
                function error(err)
                {
                    defered.reject();
                });

            return promise;
        }

        function addUser(user)
        {
            var defered = $q.defer();
            var promise = defered.promise;

            request.save(user,
                function success(data)
                {
                    defered.resolve(data);
                },
                function error(err)
                {
                    defered.reject();
                });
            //TODO: tratar datos

            return promise;
        }
    }
})();