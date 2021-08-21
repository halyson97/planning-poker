const express = require('express');
const router = express.Router();

router.get('/validate', function(req, res) {
  res.send({ success: true });
});

module.exports = router;
