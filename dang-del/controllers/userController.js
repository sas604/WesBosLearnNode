const mongoose = require('mongoose');

exports.loginForm = (req, res) => {
  res.render('login', { title: 'Login' });
};

exports.registerForm = (req, res) => {
  res.render('register', { title: 'Register' });
};

exports.validateRegister = (req, res, next) => {
  req.sanitizeBody('name');
  req.checkBody('name', 'You must supply a name').notEmpty();
  req.checkBody('email', 'That Email is not valid').isEmail();
  req.sanitizeBody('email').normalizeEmail({
    remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false,
  });

  req.checkBody('password', 'Password cannot be Blank').notEmpty();
  req.checkBody('password-confirm', 'Password cannot be Blank').notEmpty();
  req
    .checkBody('password-confirm', 'Passwords do not much')
    .equals(req.body.password);

  const errors = req.validationErrors();
  if (errors) {
    req.flash(
      'error',
      errors.map((err) => err.msg)
    );
    res.render('register', {
      title: 'register',
      body: req.body,
      flashes: req.flash(),
    });
    return;
  }
  next();
};
