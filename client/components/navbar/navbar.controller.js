'use strict';

angular.module('unitunesApp')
  .controller('NavbarCtrl', function ($scope, Auth) {
    $scope.menu = [];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.isRole = Auth.isRole;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.menu.push({
      'title': 'Home',
      'state': 'main',
      'roles': ['user']
    },{
      'title': 'Mídias',
      'state': 'midias',
      'roles': ['admin', 'autor']
    },{
      'title': 'Adminstração',
      'state': 'admin',
      'roles': ['admin']
    },{
      'title': 'Albuns',
      'state': 'albuns',
      'roles': ['autor']
    },{
      'title': 'Compras',
      'state': 'compras',
      'roles': ['admin']
    });
  });
