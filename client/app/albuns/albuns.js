'use strict';

angular.module('unitunesApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('albuns', {
        url: '/albuns',
        templateUrl: 'app/albuns/albuns.html',
        controller: 'AlbunsCtrl',
        authenticate: true
      })
      .state('newAlbum', {
        url: '/albuns/new',
        templateUrl: 'app/albuns/albuns.new.html',
        controller: 'AlbumNewCtrl'
      })
      .state('editAlbum', {
        url: '/albuns/:id/edit',
        templateUrl: 'app/albuns/albuns.edit.html',
        controller: 'AlbumEditCtrl'
      })
      .state('buyAlbum', {
        url: '/albuns/:id/buyAlbum',
        templateUrl: 'app/albuns/albuns.buy.html',
        controller: 'AlbumBuyCtrl'
      });
  });
