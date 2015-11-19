'use strict';

import User from './user.model';
import Midia from '../midia/midia.model';
import passport from 'passport';
import config from '../../config/environment';
import jwt from 'jsonwebtoken';

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    res.status(statusCode).json(err);
  }
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function respondWith(res, statusCode) {
  statusCode = statusCode || 200;
  return function() {
    res.status(statusCode).end();
  };
}

function mapMedias(user) {
  user.midias = user.midias.map(function(m) {
    return Midia.findById(m, function(midia) {
      return midia;
    });
  });
  return user;
}

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  User.findAsync({}, '-salt -hashedPassword')
    .then(function(users) {
      users = users.map(function(u) {
        return mapMedias(u);
      });
      res.status(200).json(users);
    })
    .catch(handleError(res));
};

/**
 * Creates a new user
 */
exports.create = function(req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.saveAsync()
    .spread(function(user) {
      var token = jwt.sign({ _id: user._id }, config.secrets.session, {
        expiresInMinutes: 60 * 5
      });
      res.json({ token: token });
    })
    .catch(validationError(res));
};

/**
 * Get a single user
 */
exports.show = function(req, res, next) {
  var userId = req.params.id;

  User
    .findByIdAsync(userId, '-salt -hashedPassword')
    .then(function(user) {
      user = mapMedias(user);
      if (!user) {
        return res.status(404).end();
      }
      res.json(user.profile);
    })
    .catch(function(err) {
      return next(err);
    });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  User.findByIdAndRemoveAsync(req.params.id)
    .then(function() {
      res.status(204).end();
    })
    .catch(handleError(res));
};

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findByIdAsync(userId)
    .then(function(user) {
      if (user.authenticate(oldPass)) {
        user.password = newPass;
        return user.saveAsync()
          .then(function() {
            res.status(204).end();
          })
          .catch(validationError(res));
      } else {
        return res.status(403).end();
      }
    });
};

exports.creditMoney = function(req, res, next) {
  var userId = req.user._id;
  var valorACreditar = Number(req.body.valor);

  User.findByIdAsync(userId)
    .then(function(user) {
      user.saldo = valorACreditar + user.saldo;
      return user.saveAsync()
        .then(function() {
          res.status(204).end();
        })
        .catch(validationError(res));
    });
};

exports.addMidia = function(req, res, next) {
  var userId = req.user._id;
  var midia = req.body.midia;

  User.findByIdAsync(userId)
    .then(function(user) {
      if(user.midias.indexOf(midia._id) === -1)
        user.midias.push(midia._id);
      user.saldo = user.saldo - midia.preco;
      return user.saveAsync()
        .then(function() {
          res.status(204).end();
        })
        .catch(validationError(res));
    });
};

exports.favoriteMidia = function(req, res, next) {
  var userId = req.user._id;
  var midia = req.body.midia;

  User.findByIdAsync(userId)
    .then(function(user) {
      var index = user.midiasFavorites.indexOf(midia._id);

      if (index > -1) {
        user.midiasFavorites = user.midiasFavorites.splice(index, 1);
      } else {
        user.midiasFavorites.push(midia._id);
      }
      return user.saveAsync()
        .then(function() {
          res.status(204).end();
        })
        .catch(validationError(res));
    });
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;

  User.findOneAsync({ _id: userId }, '-salt -hashedPassword')
    .then(function(user) {
      user = mapMedias(user);
      if (!user) {
        return res.status(401).end();
      }
      res.json(user);
    })
    .catch(function(err) {
      return next(err);
    });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
