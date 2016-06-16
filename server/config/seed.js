/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import User from '../api/user/user.model';
import Midia from '../api/midia/midia.model';

let populateMidias = function() {
  User.findOne({role: 'autor'}, function (err, autor) {
    if (err) return handleError(err);
    if (autor) {
      Midia.find({}).removeAsync()
        .then(function() {
          Midia.createAsync({
            nome: 'Big Buck Bunny',
            tipo: 'Vídeo',
            categoria: 'Coelho',
            autores: [autor._id],
            descricao: 'Coelho das drogas, me parece muito feliz.',
            imagem: '/assets/fake_uploads/mov_thumb.jpg',
            // arquivo: '/assets/fake_uploads/mov_bbb.mp4',
            preco: 4.20,
            ativo: true
          },{
            nome: 'Mortal Combat Redublagem da Zoeira',
            tipo: 'Podcast',
            categoria: 'Fatality',
            autores: [autor._id],
            descricao: 'Get over here!!',
            imagem: '/assets/fake_uploads/podcast_thumb.jpg',
            // arquivo: '/assets/fake_uploads/podcast.mp3',
            preco: 10.50,
            ativo: true
          },{
            nome: 'Good-bye, Testicles',
            tipo: 'Livro',
            categoria: 'Hello darkness, my old friend...',
            autores: [autor._id],
            descricao: '...I\'ve come to talk with you again.',
            imagem: '/assets/fake_uploads/book_thumb.jpg',
            // arquivo: '/assets/fake_uploads/book.pdf',
            preco: 3,
            ativo: true
          },{
            nome: 'Friday - Rebecca Black',
            tipo: 'Música',
            categoria: 'ITS FUCKING FRIDAY!',
            autores: [autor._id],
            descricao: "It's Friday, Friday / Gotta get down on Friday / Everybody's lookin' forward to the weekend, weekend / Friday, Friday.",
            imagem: '/assets/fake_uploads/music_thumb.jpg',
            // arquivo: '/assets/fake_uploads/music.mp3',
            preco: 10.50,
            ativo: true
          })
          .then(function() {
            console.log('finished populating midia');
          });
        });
    }
  });
};

User.find({}).removeAsync()
  .then(function() {
    User.createAsync({
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test',
      saldo: 100
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin'
    }, {
      provider: 'local',
      role: 'autor',
      name: 'Autor',
      email: 'autor@example.com',
      password: 'autor'
    })
    .then(function() {
      console.log('finished populating users');
      populateMidias();
    });
  });
