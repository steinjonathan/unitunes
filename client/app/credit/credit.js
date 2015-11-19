'use strict';

angular.module('unitunesApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('credit', {
        url: '/credit',
        templateUrl: 'app/credit/credit.html',
        controller: 'CreditCtrl'
      });
  })
