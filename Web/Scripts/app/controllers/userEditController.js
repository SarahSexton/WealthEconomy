//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

(function () {
    'use strict';

    var controllerId = 'userEditController';
    angular.module('main')
        .controller(controllerId, ['userService',
            'logger',
            '$location',
            '$routeParams',
            userEditController]);

    function userEditController(userService,
		logger,
		$location,
		$routeParams) {
        logger = logger.forSource(controllerId);

        var isNew = $location.path() === '/User/new';
        var isSaving = false;

        // Controller methods (alphabetically)
        var vm = this;
        vm.cancelChanges = cancelChanges;
        vm.isSaveDisabled = isSaveDisabled;
        vm.user = null;
        vm.saveChanges = saveChanges;
        vm.hasChanges = hasChanges;

        initialize();

        /*** Implementations ***/

        function cancelChanges() {

            $location.path('/User/');

            if (userService.hasChanges()) {
                userService.rejectChanges();
                logWarning('Discarded pending change(s)', null, true);
            }
        }

        function hasChanges() {
            return userService.hasChanges();
        }

        function initialize() {

            if (isNew) {
                // TODO Only for development, create test entity ?!
            }
            else {
                userService.getUser($routeParams.Id)
                    .then(function (data) {
                        vm.user = data;
                    })
                    .catch(function (error) {
                        logger.logError("Boooo, we failed: " + error.message, null, true);
                        // Todo: more sophisticated recovery. 
                        // Here we just blew it all away and start over
                        // refresh();
                    });
            }
        };

        function isSaveDisabled() {
            return isSaving ||
                (!isNew && !userService.hasChanges());
        }

        function saveChanges() {

            if (isNew) {
                userService.createUser(vm.user);
            }

            isSaving = true;
            return userService.saveChanges()
                .then(function () {
                    logger.logSuccess("Hooray we saved", null, true);
                    $location.path('/User/');
                })
                .catch(function (error) {
                    logger.logError("Boooo, we failed: " + error.message, null, true);
                    // Todo: more sophisticated recovery. 
                    // Here we just blew it all away and start over
                    // refresh();
                })
                .finally(function () {
                    isSaving = false;
                });
        }
    };
})();