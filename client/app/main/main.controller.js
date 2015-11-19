'use strict';
(function() {

function MainController($scope, $http, Midia) {
  $scope.filtros = {
    ativo: true
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
}

angular.module('unitunesApp')
  .controller('MainController', MainController);

})();
