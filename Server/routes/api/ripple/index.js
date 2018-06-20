const router = require('express').Router()
const controller = require('./ripple.controller')
const authMiddleware = require('./../../../middlewares/auth')

// Bring the ripple
router.get('/:category/:title/:writer', controller.showRipple)

// Add the ripple
router.post('/:category/:title/:writer', controller.addRipple)
// Admin add the ripple
router.use('/:category/:title/:writer/admin', authMiddleware)
router.post('/:category/:title/:writer/admin', controller.addAdminRipple)

// Change the ripple
router.put('/:category/:title/:writer', controller.changeRipple)
// Admin change the ripple
router.use('/:category/:title/:writer/admin', authMiddleware)
router.put('/:category/:title/:writer/admin', controller.changeAdminRipple)

// Delete the ripple
router.delete('/:category/:title/:writer', controller.deleteRipple)
// Admin delete the ripple
router.use('/:category/:title/:writer/admin', authMiddleware)
router.delete('/:category/:title/:writer/admin', controller.deleteAdminRipple)

module.exports = router
