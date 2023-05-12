const express = require('express');
const { generateImage, askquestion } = require('../controllers/openaiControllers');
const router = express.Router();

router.post('/generateimage', generateImage);

router.post('/askquestion', askquestion);

module.exports = router;
