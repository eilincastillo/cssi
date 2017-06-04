(function ()
{
    'use strict';

    angular.module('cssi.factories.appointment').factory('AppointmentFactory', ['$q', '$resource', 'CSSIAPI', 'RESOURCE', 'AuthService', AppointmentFactory]);

    function AppointmentFactory($q, $resource, CSSIAPI, RESOURCE, AuthService)
    {
        var url = CSSIAPI.URL + RESOURCE.APPOINTMENT + ':appointmentId';
        var auth = AuthService.getToken();
        var request = $resource(url, { appointmentId: '@id' },
            {
                'get': { method: 'GET',  headers: { 'Authorization' : auth }},
                'save': { method: 'POST', headers: { 'Authorization' : auth }},
                'query':  {method:'GET', isArray:true, headers: { 'Authorization' : auth }},
                'update': {method: 'PUT', headers: { 'Authorization' : auth }}
            },{
                stripTrailingSlashes: false
            });


        var factory =
            {
                getAll: getAllAppointments,
                get: getAppointment,
                add: addAppointment
            };

        return factory;

        function getAllAppointments(patientId)
        {
            var defered = $q.defer();
            var promise = defered.promise;

            var url = CSSIAPI.URL + RESOURCE.PATIENT + ':patientId';
            var requestAll = $resource(url, { patientId: '@id' },
                {
                    'get':  {method:'GET', headers: { 'Authorization' : auth }}
                },{
                    stripTrailingSlashes: false
                });


            requestAll.get({patientId: patientId},
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

        function getAppointment(appointmentId)
        {

            var defered = $q.defer();
            var promise = defered.promise;

            request.get({appointmentId: appointmentId},
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


        function addAppointment(appointment)
        {
            var defered = $q.defer();
            var promise = defered.promise;

            request.save(appointment,
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
    }

})();
