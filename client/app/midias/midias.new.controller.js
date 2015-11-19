'use strict';

angular.module('unitunesApp')
  .controller('MidiaNewCtrl', function($scope, $state,
    $stateParams, Midia, User, Upload, $timeout) {
  $scope.midia = new Midia();

  User.get(function(me) {
    $scope.midia.autores = [me._id];
  });

  // TODO: Nao repetir isso
  $scope.categorias = ['Música', 'Vídeo', 'Livro', 'Podcast'];

  User.query(function(users) {
    $scope.users = users.filter(function(u) {
      return u.role === 'autor';
    });
  });

  $scope.addMidia = function() {
    //TODO: Fazer funcionar o upload de arquivos
    $scope.midia.$save(function() {
      $state.go('midias');
    });
  };
})
