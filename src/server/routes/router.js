const Router = require('express');
const router = new Router();
const controller = require('../controllers/mailsController');

router.get('/mails/', controller.getMails);

module.exports = router;