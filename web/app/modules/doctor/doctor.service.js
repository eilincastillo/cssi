(function () {

    'use strict';

    angular.module('cssi.services.doctor').service('DoctorService', ['$q', 'DoctorFactory', 'ValidateService', DoctorService]);

    function DoctorService($q, DoctorFactory, ValidateService)
    {
        this.getAll = getAll;
        this.get = get;
        this.add = add;
        this.update = update;
        this.validate = validate;

        
        function getAll()
        {
            var defered = $q.defer();
            var promise = defered.promise;


            DoctorFactory.getAll()
                .then(function (data)
                {
                    defered.resolve(data);
                })
                .catch(function(e)
                {
                    defered.reject(e);
                });

            return promise;
        }

        function get(doctorId)
        {
            var defered = $q.defer();
            var promise = defered.promise;


            DoctorFactory.get(doctorId)
                .then(function (data)
                {
                    defered.resolve(data);
                })
                .catch(function(e)
                {
                    defered.reject(e);
                });

            return promise;
        }

        function validate(doctor)
        {
            var result = false;

            var nameInput = document.getElementById('name');
            var lastnameInput = document.getElementById('lastname');
            var selectInput = document.getElementById('specialtyList');

            if(ValidateService.validateNotEmpty(nameInput)
                && ValidateService.validateNotEmpty(lastnameInput)
                && ValidateService.validateSelection(selectInput)
                && ValidateService.validateText(nameInput)
                && ValidateService.validateText(lastnameInput))
            {
                result = true;
            }    

            return result;
        }


        function add(doctor)
        {
            var defered = $q.defer();
            var promise = defered.promise;

            var addedDoctor =
                {
                    name: doctor.name,
                    lastname: doctor.lastname,
                    idSpecialty: doctor.specialty.id
                };

            DoctorFactory.add(addedDoctor)
                .then(function (data)
                {
                    defered.resolve(data);
                })
                .catch(function(e)
                {
                    defered.reject(e);
                });

            return promise;
        }

        function update(doctor)
        {
            var defered = $q.defer();
            var promise = defered.promise;

            var updatedDoctor =
                {
                    id: doctor.id,
                    name: doctor.name,
                    lastname: doctor.lastname,
                    idSpecialty: doctor.specialty.id,
                    idStatus: doctor.status.id
                };

            DoctorFactory.update(updatedDoctor)
                .then(function (data)
                {
                    defered.resolve(data);
                })
                .catch(function(e)
                {
                    defered.reject(e);
                });

            return promise;
        }
    }

})();