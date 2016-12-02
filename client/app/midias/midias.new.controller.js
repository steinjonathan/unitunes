'use strict';

angular.module('unitunesApp')
  .controller('MidiaNewCtrl', function($scope, $state,
    $stateParams, $http, Midia, Arquivo, User, Upload, $timeout) {
  $scope.midia = new Midia();
  $scope.arquivo = {};

  $scope.setFile = function(file) {
    $scope.file = file[0];
  };

  $scope.setFileImage = function(file) {
    $scope.fileImage = file[0];
  };

  console.log('Arquivo', $scope.arquivo);
  console.log(new Midia());

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

  $scope.uploadFile = function(file) {
    return $http({
      method: 'POST',
      url: 'http://localhost:3030',
      headers: {
          'Content-Type': undefined
      },
      data: {
          upl: file
      },
      transformRequest: function (data, headersGetter) {
          var formData = new FormData();
          angular.forEach(data, function (value, key) {
              formData.append(key, value);
          });

          // formData.append('upl', $scope.file);

          var headers = headersGetter();
          delete headers['Content-Type'];

          return formData;
      }
    })
  };

  $scope.addMidia = function() {
    //TODO: Fazer funcionar o upload de arquivos
    console.log($scope);
    console.log('Arquivo', $scope.arquivo);


    $scope.uploadFile($scope.file).then(function(res) {
      console.log('ok');
      $scope.arquivo = new Arquivo({
        nome: res.data.originalName,
        path: res.data.path.split('/')[res.data.path.split('/').length - 1]
      });
      $scope.arquivo.$save(function(a) {
        $scope.midia.arquivo = a;
        $scope.uploadFile($scope.fileImage).then(function(r) {
          $scope.imagem = new Arquivo({
            nome: r.data.originalName,
            path: r.data.path.split('/')[r.data.path.split('/').length - 1]
          });

          $scope.imagem.$save(function(i) {
            $scope.midia.imagem = i;
            $scope.midia.$save(function() {
              console.log('midia', $scope.midia);
              $state.go('midias');
            });
          })

        })
      });
    }).catch(function() {
      console.log('fail');
    });
  };
})
