var express = require('express');
var router = express.Router();

var whController = require('./wh.controller');

router.post('/',whController.addWh)
router.get('/',whController.getWh)
router.get('/:userId',whController.getOneWh)


module.exports = router;