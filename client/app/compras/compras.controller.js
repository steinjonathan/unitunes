'use strict';

angular.module('unitunesApp')
  .controller('ComprasCtrl', function($scope, $window, Compra, Album) {

    Album.query(function(albuns) {
      console.log(albuns);
    })
    Compra.query(function(compras) {
      console.log(compras);

      // compras.then(c => {
      //   console.log(c);
      // })
      $scope.compras = compras.map(compra => {
        var date = new Date(compra.criacao);
        var data = (date.getDate()) + '/' + (date.getMonth() + 1) + '/' +  date.getFullYear()
        return {
          comprador: compra.user.name,
          data: data,
          valor: compra.midia.preco,
          midia: compra.midia.nome
        }
      });
    })

    // $scope.deleteMidia = function(midia) {
    //   bootbox.confirm('Confirma exclusão?', (result) => {
    //     if(!result) return false;
    //     midia.$delete(function() {
    //       $scope.midias = $scope.midias.filter(function(el) {
    //         return el._id !== midia._id;
    //       });
    //     });
    //   });
    // };
  });
