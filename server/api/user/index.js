'use strict';

import express from 'express';
import controller from './user.controller';
import auth from '../../auth/auth.service';

var router = express.Router();

router.get('/', controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.put('/:id/credit', auth.isAuthenticated(), controller.creditMoney);
router.put('/:id/addMidia', auth.isAuthenticated(), controller.addMidia);
router.put('/:id/favoriteMidia', auth.isAuthenticated(), controller.favoriteMidia);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);

module.exports = router;
