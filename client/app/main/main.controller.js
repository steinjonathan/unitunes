'use strict';
(function() {

function MainController($scope, $http, Midia) {
  $scope.filtros = {
    ativo: true
  };

  Midia
    .query(function(midias) {
      $scope.midiasNotFiltered = midias;
      $scope.midias = midias;
    });

  $scope.filtrarByTipo = function(tipo) {
    $scope.midias = $scope.midiasNotFiltered;
    
    if(tipo === false) {
      delete $scope.filtros.tipo;
      return;
    }

    $scope.midias = $scope.midias.filter(function(m) {
      return m.tipo === tipo;
    });
    $scope.filtros.tipo = tipo;
  }
}

angular.module('unitunesApp')
  .controller('MainController', MainController);

})();
