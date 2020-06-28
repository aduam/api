const Ticket = require('../../models/Ticket');
const { statusTicket } = require('../../utils/list');

const now = new Date().getTime();

const create = async (body, user) => {
  const { full_name, address, total, change, phone } = body;
  let newTicket = null;
  try {
    if (!full_name || !address || !total || !phone) {
      return { error: 'faltan campos' };
    }
    const obj = {
      full_name,
      address,
      phone,
      total: parseFloat(total),
      change: parseFloat(change),
      status: 'PENDING',
      active: true,
      created_at: now,
      updated_at: now,
      id_person: user.id,
    };
    newTicket = await Ticket.create({ ...obj }, { fields: ['full_name', 'address', 'phone', 'total', 'change', 'status', 'active', 'created_at', 'updated_at', 'id_person'] })
  } catch (error) {
    console.error(error.message);
    return { error: error.message };
  }
  return newTicket
};

const update = async ({ id, status }) => {
  if (!id) return { error: 'No. de boleta no existe' };
  let ticket = null;
  try {
    if (!statusTicket.includes(status)) return { error: 'Status no encontrado' };
    const obj = {
      status,
      active: !!(status !== 'DELIVERED'),
      updated_at: now,
    };
    const searchTicket = await Ticket.findOne({ where: { id }, raw: true, nest: true });
    if (!searchTicket) return { error: 'No. de boleta no existe' };
    if (searchTicket.status === 'CANCELLED') return { error: 'Esta boleta no se puede actualizar ya fue cancelada' };
    await Ticket.update({ ...obj }, { where: { id } });
    ticket = await Ticket.findOne({ where: { id }, raw: true, nest: true });
  } catch (error) {
    console.error(error.message);
    return { error: error.message };
  }
  return ticket;
}

const remove = async (id) => {
  if (!id) return { error: 'Falta el No. boleto' };
  let ticket = null;
  try {
    ticket = await Ticket.findOne({ where: { id }, raw: true, nest: true });
    if (!ticket) return { error: 'No. de boleta no existe!' };
    if (ticket.status === 'CANCELLED') return { error: 'Esta boleata ya fue cancelada!' };
    await Ticket.update({ active: false, status: 'CANCELLED', updated_at: now }, { where: { id } });
  } catch (error) {
    console.error(error.message);
    return { error: 'error en la operación' };
  }
  return ticket;
}

const get = async (id, user, { offset, limit }) => {
  let tickets = [];
  try {
    const { count, rows } = await Ticket.findAndCountAll({ where: { id_person: user.id }, offset: offset || 0, limit: limit || 10, raw: true, nest: true });
    tickets = {
      pages: Math.round(count/limit),
      offset,
      limit,
      rows
    };
  } catch (error) {
    console.error(error.message);
    return { error: error.message }
  }
  return tickets;
};

module.exports = { create, update, remove, get };