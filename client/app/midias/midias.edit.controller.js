'use strict';

angular.module('unitunesApp')
  .controller('MidiaEditCtrl', function($scope, $state, $stateParams, Midia, User) {
  $scope.midia = Midia.get({ id: $stateParams.id });
  // TODO: Nao repetir isso
  $scope.categorias = ['Música', 'Vídeo', 'Livro', 'Podcast'];

  User.query(function(users) {
    $scope.users = users.filter(function(u) {
      return u.role === 'autor';
    });
  });
  $scope.updateMidia = function() {
    //TODO: Fazer funcionar o upload de arquivos
    $scope.midia.$update(function() {
      $state.go('midias');
    });
  };
})
