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

    var serviceId = 'elementItemService';
    angular.module('main')
        .factory(serviceId, ['dataContext', '$rootScope', 'logger', elementItemService]);

    function elementItemService(dataContext, $rootScope, logger) {
        
		// Logger
		logger = logger.forSource(serviceId);

        // To determine whether the data will be fetched from server or local
        var minimumDate = new Date(0);
        var fetchedOn = minimumDate;

        // Service methods (alphabetically)
        var service = {
            createElementItem: createElementItem,
            deleteElementItem: deleteElementItem,
            getChanges: getChanges,
            getChangesCount: getChangesCount,
            getElementItemSet: getElementItemSet,
            getElementItem: getElementItem,
            hasChanges: hasChanges,
            rejectChanges: rejectChanges,
            saveChanges: saveChanges
        };

        // User logged out
        $rootScope.$on('userLoggedOut', function () {
            fetchedOn = minimumDate;
        });

        return service;

        /*** Implementations ***/

        function createElementItem(elementItem) {
            return dataContext.createEntity('ElementItem', elementItem);
        }

        function deleteElementItem(elementItem) {
            elementItem.entityAspect.setDeleted();
        }

        function getChanges() {
            return dataContext.getChanges();
        }

        function getChangesCount() {
            return dataContext.getChangesCount();
        }

        function getElementItemSet(forceRefresh) {
            var count;
            if (forceRefresh) {
                if (dataContext.hasChanges()) {
                    count = dataContext.getChangesCount();
                    dataContext.rejectChanges(); // undo all unsaved changes!
                    logger.logWarning('Discarded ' + count + ' pending change(s)', null);
                }
            }

            var query = breeze.EntityQuery
				.from('ElementItem')
				.expand(['Element'])
            ;

            // Fetch the data from server, in case if it's not fetched earlier or forced
            var fetchFromServer = fetchedOn === minimumDate || forceRefresh;

            // Prepare the query
            if (fetchFromServer) { // From remote
                query = query.using(breeze.FetchStrategy.FromServer);
                fetchedOn = new Date();
            }
            else { // From local
                query = query.using(breeze.FetchStrategy.FromLocalCache);
            }

            return dataContext.executeQuery(query)
                .then(success).catch(failed);

            function success(response) {
                count = response.results.length;
                //logger.logSuccess('Got ' + count + ' elementItem(s)', response);
                return response.results;
            }

            function failed(error) {
                var message = error.message || 'ElementItem query failed';
                logger.logError(message, error, true);
            }
        }

        function getElementItem(elementItemId, forceRefresh) {
            return dataContext.fetchEntityByKey('ElementItem', elementItemId, !forceRefresh)
                .then(success).catch(failed);

            function success(result) {
                return result.entity;
            }

            function failed(error) {
                var message = error.message || 'getElementItem query failed';
                logger.logError(message, error, true);
            }
        }

        function hasChanges() {
            return dataContext.hasChanges();
        }

        function rejectChanges() {
            dataContext.rejectChanges();
        }

        function saveChanges(delay) {
            return dataContext.saveChanges(delay);
        }
    }
})();
