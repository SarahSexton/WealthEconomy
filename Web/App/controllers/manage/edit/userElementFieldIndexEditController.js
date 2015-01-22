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

    var controllerId = 'userElementFieldIndexEditController';
    angular.module('main')
        .controller(controllerId, ['userElementFieldIndexService',
            'elementFieldIndexService',
            'userService',
            'logger',
            '$location',
            '$routeParams',
            userElementFieldIndexEditController]);

    function userElementFieldIndexEditController(userElementFieldIndexService,
		elementFieldIndexService,
		userService,
		logger,
		$location,
		$routeParams) {
        logger = logger.forSource(controllerId);

        var isNew = $location.path() === '/manage/userElementFieldIndex/new';
        var isSaving = false;

        // Controller methods (alphabetically)
        var vm = this;
        vm.elementFieldIndexSet = [];
        vm.userSet = [];
        vm.cancelChanges = cancelChanges;
        vm.isSaveDisabled = isSaveDisabled;
        vm.entityErrors = [];
        vm.userElementFieldIndex = null;
        vm.saveChanges = saveChanges;
        vm.hasChanges = hasChanges;

        initialize();

        /*** Implementations ***/

        function cancelChanges() {

            $location.path('/manage/userElementFieldIndex');

            if (userElementFieldIndexService.hasChanges()) {
                userElementFieldIndexService.rejectChanges();
                logWarning('Discarded pending change(s)', null, true);
            }
        }

        function hasChanges() {
            return userElementFieldIndexService.hasChanges();
        }

        function initialize() {

            elementFieldIndexService.getElementFieldIndexSet(false)
                .then(function (data) {
                    vm.elementFieldIndexSet = data;
                });

            userService.getUserSet(false)
                .then(function (data) {
                    vm.userSet = data;
                });

            if (isNew) {
                // TODO For development enviroment, create test entity?
            }
            else {
                userElementFieldIndexService.getUserElementFieldIndex($routeParams.Id)
                    .then(function (data) {
                        vm.userElementFieldIndex = data;
                    })
                    .catch(function (error) {
                        // TODO User-friendly message?
                    });
            }
        };

        function isSaveDisabled() {
            return isSaving ||
                (!isNew && !userElementFieldIndexService.hasChanges());
        }

        function saveChanges() {

            if (isNew) {
                userElementFieldIndexService.createUserElementFieldIndex(vm.userElementFieldIndex);
            } else {
                // To be able to do concurrency check, RowVersion field needs to be send to server
				// Since breeze only sends the modified fields, a fake modification had to be applied to RowVersion field
                var rowVersion = vm.userElementFieldIndex.RowVersion;
                vm.userElementFieldIndex.RowVersion = '';
                vm.userElementFieldIndex.RowVersion = rowVersion;
            }

            isSaving = true;
            userElementFieldIndexService.saveChanges()
                .then(function (result) {
                    $location.path('/manage/userElementFieldIndex');
                })
                .catch(function (error) {
                    // Conflict (Concurrency exception)
                    if (error.status !== 'undefined' && error.status === '409') {
                        // TODO Try to recover!
                    } else if (error.entityErrors !== 'undefined') {
                        vm.entityErrors = error.entityErrors;
                    }
                })
                .finally(function () {
                    isSaving = false;
                });
        }
    };
})();