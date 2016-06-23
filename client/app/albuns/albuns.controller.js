'use strict';

angular.module('unitunesApp')
  .controller('AlbunsCtrl', function($scope, $window, Album) {
    Album.query(function(albuns) {
      $scope.albuns = albuns.map(function(album) {
        console.log(album.midias.length);
        return {
          _id: album._id,
          nome: album.nome,
          quantidade: album.midias.length
        };
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
