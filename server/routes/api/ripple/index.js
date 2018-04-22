const router = require('express').Router();
const controller = require('./ripple.controller');

router.post('/talk', controller.comment);
router.get('/every', controller.every);

module.exports = router;
