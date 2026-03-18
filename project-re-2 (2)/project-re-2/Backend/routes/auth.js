const express = require('express');
const router = express.Router();
const authService = require('../services/authService');
const userService = require('../services/userService');
const { validateUserMiddleware } = require('../middleware/validators');


router.post('/login', async (req, res, next) => {
  try {
    const { user, password } = req.body;
    const result = await authService.login(user, password);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.post('/register', validateUserMiddleware, async (req, res, next) => {
  try {
    const result = await userService.createUser(req.body);
    res.json({ message: 'บันทึกข้อมูลสำเร็จ', data: result });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
