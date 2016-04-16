(function () {
    'use strict';

    angular.module('contollers')
        .controller('MailerCtrl', MailerCtrl);

    MailerCtrl.$inject = ['$scope', 'mailerService'];

    function MailerCtrl($scope, mailerService) {
        $scope.emailTo = function (email) {
            mailerService.emailTo(email);
        };
    }
})();