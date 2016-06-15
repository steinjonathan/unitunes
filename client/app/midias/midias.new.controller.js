'use strict';

angular.module('unitunesApp')
  .controller('MidiaNewCtrl', function($scope, $state,
    $stateParams, $http, Midia, User, Upload, $timeout) {
  $scope.midia = new Midia();
  $scope.arquivo = {};

  $scope.setFile = function(file) {
    $scope.file = file[0];
    console.log($scope.file);

    var formData = new FormData();

    var blobImage = fileService.base64ToBlob($scope.file, 'image/png');
    formData.append('upl', blobImage, 'imagem' + (i + 1) + '.png');

    $.ajax({
      url: 'http://localhost:3030',
      data: formData,
      cache: false,
      contentType: false,
      processData: false,
      type: 'POST',
      success: function(response) {
        deferred.resolve(response);
        $rootScope.requestInProgress = false;
      },
      error: function(error) {
        deferred.reject(error);
        $rootScope.requestInProgress = false;
      }
    });
    // $http({
    //   method: 'POST',
    //   url: 'http://localhost:3030',
    //   headers: {
    //       'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryN2be02OBFRzGvMZs'
    //   },
    //   data: {
    //       upl: $scope.file
    //   },
    //   transformRequest: function (data, headersGetter) {
    //       var formData = new FormData();
    //       angular.forEach(data, function (value, key) {
    //           formData.append(key, value);
    //       });
    //
    //       // formData.append('upl', $scope.file);
    //
    //       var headers = headersGetter();
    //       delete headers['Content-Type'];
    //
    //       return formData;
    //   }
    // }).then(function() {
    //   console.log('ok');
    // }).catch(function() {
    //   console.log('fail');
    // })
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

  $scope.addMidia = function() {
    //TODO: Fazer funcionar o upload de arquivos
    console.log($scope);
    console.log('Arquivo', $scope.arquivo);
    $scope.midia.$save(function() {
      console.log('midia', $scope.midia);
      $state.go('midias');
    });
  };
})
