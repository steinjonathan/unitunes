'use strict';

angular.module('unitunesApp')
  .factory('ManterMidia', function Midia($http, Midia, $cookies, $q) {
    /**
     * Return a callback or noop function
     *
     * @param  {Function|*} cb - a 'potential' function
     * @return {Function}
     */
    var safeCb = function(cb) {
      return (angular.isFunction(cb)) ? cb : angular.noop;
    },

    currentMidia = {};

    if ($cookies.get('token')) {
      currentMidia = Midia.get();
    }

    return {

      /**
       * Create a new midia
       *
       * @param  {Object}   midia     - midia info
       * @param  {Function} callback - optional, function(error, midia)
       * @return {Promise}
       */
      createMidia: function(midia, callback) {
        return Midia.save(midia,
          function(data) {
            $cookies.put('token', data.token);
            currentMidia = Midia.get();
            return safeCb(callback)(null, Midia);
          },
          function(err) {
            this.logout();
            return safeCb(callback)(err);
          }.bind(this)).$promise;
      },

      updateMidia: function(midia, callback) {
        return Midia.save(midia,
          function(data) {
            $cookies.put('token', data.token);
            currentMidia = Midia.get();
            return safeCb(callback)(null, Midia);
          },
          function(err) {
            this.logout();
            return safeCb(callback)(err);
          }.bind(this)).$promise;
      }

    };
  });
