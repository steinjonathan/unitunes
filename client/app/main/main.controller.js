/* global bootbox */
'use strict';
(function() {

function MainController($state, $scope, $http, Midia, Auth, Arquivo, Compra, User) {
  $scope.filtros = {
    ativo: true
  };

  $scope.getCurrentUser = Auth.getCurrentUser;
  $scope.isRole = Auth.isRole;

  // if($scope.getCurrentUser().role === 'admin') {
  //   $state.go('compras');
  // }

  var currentRole = $scope.getCurrentUser().role
  $scope.isSuperUser = currentRole === 'admin' || currentRole === 'autor';

  $scope.isPlaying = false;

  $scope.filePath = function(file) {
    return '/assets/images/' + file.path;
  };

  Midia
    .query(function(midias) {
      midias = midias.map(function(m) {
        m.autores = m.autores.map(function(a) {
          return a.name;
        }).join(',');
        return m;
      });

      $scope.midiasRawData = midias;
      $scope.midias = midias;
      $scope.filtrarByTipo(false);
    });

  $scope.filtrarByTipo = function(tipo) {
    var currentUser = Auth.getCurrentUser();
    $scope.midias = $scope.midiasRawData;

    if(tipo === 'Favoritos') {
      $scope.midias = $scope.midias.filter(function(midia) {
        return currentUser.midiasFavorites.indexOf(midia._id) !== -1;
      });
      $scope.filtros.tipo = tipo;
      return;
    }

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
  };

  $scope.comprarMidia = function(midia) {
    if(midia.preco) {
      bootbox.confirm('Deseja realmente comprar esta mídia por R$ '+midia.preco+'?', function(confirmed) {
        if(!confirmed) {
          return;
        }

        var currentUser = Auth.getCurrentUser();
        if(currentUser.saldo >= midia.preco || midia.gratuita) {
          User.addMidia({midia: midia}, function() {
            Auth.updateCurrentUser();

            console.log(midia);
            $scope.compra = new Compra();
            $scope.compra.midia = midia;
            $scope.compra.criacao = new Date();


            User.get({ id: currentUser._id }, function(user) {
              $scope.compra.user = currentUser;
              console.log('asd', $scope.compra.user);
              console.log($scope.compra);
              $scope.compra.$save(function() {
                console.log(`compra should be saved`);
              })
              bootbox.alert('Compra realizada com sucesso!');
            });
          });

        } else {
          bootbox.alert('Saldo insuficiente!');
          return false;
        }
      });
    } else {
      User.addMidia({midia: midia}, function() {
        Auth.updateCurrentUser();
        // bootbox.alert('Midia realizada com sucesso!');
      });
    }
  };
}

angular.module('unitunesApp')
  .controller('MainController', MainController);

})();
