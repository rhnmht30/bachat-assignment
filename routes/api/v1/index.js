const express = require('express');
const router = express.Router();

const indexController = require('../../../controllers/index_controller');

router.get('/', indexController.test);

router.post('/add_transaction/:email', indexController.add_transaction);

router.post('/add_user/:email', indexController.add_user);

router.get('/user/:email', indexController.user_profile);

router.post('/edit_user_budget/:email', indexController.edit_user_budget);

router.get('/transactions_in_last_month/:email', indexController.transactions_in_last_month);

router.get('/dashboard/:email', indexController.dashboard_data);

module.exports = router;