var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: ...... blah blah });
// }));
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Form Validation', success: req.session.success, errors: req.session.errors });
  req.session.errors = null;
  // req.session.succss = null;
});

router.post('/submit', function(req, res, next){
  //Ben, here we Check the Validity of the values.
  //These will match the input fields in index.hbs we want to validate.
  //we use the isEmail built in validator.
    req.check('email', 'Invalid email address').isEmail();
  //then we set another requirement for password this time
    req.check('password', 'Password is invalid').isLength({min: 6}).equals(req.body.confirmPassword);

    var errors = req.validationErrors();
    if (errors) {
      req.session.errors = errors;
      req.session.success = false;
    } else {
      req.session.success = true;
    }
    res.redirect('/')
});


module.exports = router;
