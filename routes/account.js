const express = require('express');
const AccountController = require('../controllers/AccountController');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');


router.get("/", (req, res) => {
    res.redirect('/account/login');
});

router.get("/register", AccountController.register);
router.post("/register", authMiddleware.isExistingUser, AccountController.register);
router.get("/login", AccountController.login);
router.post("/login", AccountController.login);
router.get("/reset", AccountController.reset);

module.exports = router;


