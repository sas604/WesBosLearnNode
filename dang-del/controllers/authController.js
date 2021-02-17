const passport = require('passport');

exports.login = passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: 'Failed Login',
  successRedirect: '/',
  successFlash: 'Successfuly loged in',
});

exports.logout = (req, res) => {
  req.logout();
  req.flash('success', 'You are now logged out!👋');
  res.redirect('/');
};

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next(); // carry on! They are logged in
    return;
  }
  req.flash('error', 'You must be logged in to add the store');
  res.redirect('/login');
};
