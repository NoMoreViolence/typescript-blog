const router = require('express').Router()
const controller = require('./ripple.controller')

// TODO:
router.get('/:category/:title/ripples/:toporchild', controller.showRipples)

// Add the ripple
router.post('/:category/:title/:writer/:toporchild', controller.addRipple)

// Change the ripple
router.patch('/:category/:title/:writer', controller.changeRipple)

// Delete the ripple
// router.delete('/:category/:title/:writer', controller.deleteRipple)

module.exports = router
