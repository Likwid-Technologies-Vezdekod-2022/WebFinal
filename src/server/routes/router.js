const Router = require('express');
const router = new Router();
const controller = require('../controllers/mailsController');
const urlencodedParser = Router.urlencoded({extended: false});

router.get('/mails/', controller.getMails);


router.post('/mails/', urlencodedParser, controller.editMails);

module.exports = router;