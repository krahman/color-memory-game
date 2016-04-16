(function () {
    'use strict';

    angular.module('services')
        .factory('usersServices', usersServices);

    usersServices.$inject = ['Restangular'];

    function usersServices(Restangular) {
        var service = Restangular.service("users");

        return service;
    }
})();