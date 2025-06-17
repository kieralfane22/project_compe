import bcrypt from 'bcryptjs';
import passport from 'passport';
import { User } from '../models/index.js';

export const renderLogin = (req, res) => {
  res.render('login', { message: null });
};

export const loginUser = passport.authenticate('local', {
  successRedirect: '/admin/dashboard',
  failureRedirect: '/',
  failureFlash: false
});

export const logoutUser = (req, res) => {
  req.logout(err => {
    if (err) console.error(err);
    res.redirect('/');
  });
};

// Optional: create an admin user
export const registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  await User.create({ name, email, password: hashed, role: 'admin' });
  res.send('Admin registered');
};
