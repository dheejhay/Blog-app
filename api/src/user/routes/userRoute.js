const router = require('express').Router();
const controller = require('../controllers/userController')
const authenticateToken = require("../../middleware")

router.post('/register', controller.register)
router.post('/signup', controller.register)

router.post('/login', controller.login)
router.post('/logout', controller.logout)
router.get('/refresh', controller.refresh)
router.post('/forgot-password', controller.forgotPassword)

// user viewing and editing profile
router.get('/profile', authenticateToken, controller.profile) 
router.put('/profile', authenticateToken, controller.editProfile)
router.post('/change-password', authenticateToken, controller.changePassword)

// admin viewing and editing user profile
router.get('/', authenticateToken, controller.index)
router.put('/:id', authenticateToken, controller.editProfile)
router.get('/:id', authenticateToken, controller.profile)

module.exports = router;