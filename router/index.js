const express = require('express');
const route = express.Router();
const register = require('../controllers/register');
const login = require('../controllers/login');
const { allPosts, create, like } = require('../controllers/posts');
const {
  getTicketsPending,
  getTicketsInProgress,
  getTicketsDelivered,
  getTicketsLiquidated,
  putTicket,
  createTicket,
  removeTicket,
} = require('../controllers/ticket');
const { me } = require('../controllers/me')
const auth = require('../auth');

route.post('/api/register', register);
route.post('/api/login', login);
route.get('/api/posts', auth, allPosts);
route.post('/api/posts', auth, create);
route.put('/api/posts/like', auth, like);
route.get('/api/me', auth, me);
route.get('/api/ticket/pending', auth, getTicketsPending);
route.get('/api/ticket/in_progress', auth, getTicketsInProgress);
route.get('/api/ticket/delivered', auth, getTicketsDelivered);
route.get('/api/ticket/liquidated', auth, getTicketsLiquidated);
route.put('/api/ticket/:id/:status', auth, putTicket);
route.post('/api/ticket', auth, createTicket);
route.delete('/api/ticket/:id', auth, removeTicket);

module.exports = route;