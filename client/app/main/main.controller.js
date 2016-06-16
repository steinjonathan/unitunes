'use strict';
(function() {

function MainController($scope, $http, Midia, Auth, Arquivo, User) {
  $scope.filtros = {
    ativo: true
  };

  $scope.getCurrentUser = Auth.getCurrentUser;
  $scope.isRole = Auth.isRole;

  $scope.isPlaying = false;

  $scope.filePath = function(file) {
    return '/assets/images/' + file.path;
  };

  Midia
    .query(function(midias) {
      midias = midias.map(function(m) {
        m.autores = m.autores.map(function(a) {
          return a.name
        }).join(',');
        return m;
      });

      $scope.midiasRawData = midias;
      $scope.midias = midias;
      $scope.filtrarByTipo(false);
    });

  $scope.filtrarByTipo = function(tipo) {
    $scope.midias = $scope.midiasRawData;

    if(tipo === false) {
      delete $scope.filtros.tipo;
      return;
    }

    $scope.midias = $scope.midias
      .filter(function(m) {
        return m.tipo === tipo;
      });
    $scope.filtros.tipo = tipo;
  };

  $scope.favoritarMidia = function(midia) {
    User.favoritarMidia({midia: midia}, function() {
      Auth.updateCurrentUser();
    });
  };

  $scope.playMidia = function(midia) {
    $scope.isPlaying = true;
    $scope.midiaSelected = midia;
  };

  $scope.downloadMidia = function(midia) {
    return document.execCommand('SaveAs',true,midia.arquivo);
  }

  $scope.comprarMidia = function(midia) {
    bootbox.confirm('Deseja realmente comprar esta mídia por R$ '+midia.preco+'?', function(confirmed) {
      if(!confirmed) return;

      var currentUser = Auth.getCurrentUser();
      if(currentUser.saldo > midia.preco || midia.gratuita) {
        User.addMidia({midia: midia}, function() {
          Auth.updateCurrentUser();
          bootbox.alert('Compra realizada com sucesso!');
        });
      } else {
        bootbox.alert('Saldo insuficiente!');
        return false;
      }
    });
  };
}

angular.module('unitunesApp')
  .controller('MainController', MainController);

})();
