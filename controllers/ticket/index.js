const response = require('../../utils/response');
const { create, update, remove, get } = require('./store');

const getTickets = async (req, res) => {
  const { userContent, params: { id }, query } = req;
  const getTicket = await get(id, userContent, query);
  if (!getTicket.error) {
    response(res, 200, 'success', getTicket);
  }
  response(res, 400, 'error', getTicket);
};

const removeTicket = async (req, res) => {
  const { id } = req.params;
  const newTicket = await remove(id);
  if (!newTicket.error) {
    response(res, 200, 'success', newTicket);
  }
  response(res, 400, 'error', newTicket);
};

const putTicket = async (req, res) => {
  const { params } = req;
  const newTicket = await update(params);
  if (!newTicket.error) {
    response(res, 200, 'success', newTicket);
  }
  response(res, 400, 'error', newTicket);
};

const createTicket = async (req, res) => {
  const { userContent, body } = req;
  const newTicket = await create(body, userContent);
  if (!newTicket.error) {
    response(res, 200, 'success', newTicket);
  }
  response(res, 400, 'error', newTicket);
};

module.exports = {
  getTickets,
  putTicket,
  createTicket,
  removeTicket,
};