var express = require('express');
var secured = require('../lib/middleware/secured');
var router = express.Router();

/* GET user profile. */
router.get('/user', secured(), function (req, res, next) {
  const { _raw, _json, ...userProfile } = req.user;
  userProfile.email_verified = _json.email_verified;
  res.render('user', {    
    userProfile: JSON.stringify(userProfile, null, 2),
    json: JSON.stringify(_json, null, 2),
    title: 'Profile page'
  });
});

module.exports = router;
