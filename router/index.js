const express = require('express');
const route = express.Router();
const register = require('../controllers/register');
const login = require('../controllers/login');
const { allPosts, create, like } = require('../controllers/posts');
const { me } = require('../controllers/me')
const auth = require('../auth');

route.post('/api/register', register);
route.post('/api/login', login);
route.get('/api/posts', auth, allPosts);
route.post('/api/posts', auth, create);
route.put('/api/posts/like', auth, like);
route.get('/api/me', auth, me);

module.exports = route;