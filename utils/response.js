const response = (res, code = 200, message = 'success', data) => {
  res.send({
    response: message,
    code,
    data,
  });
}

module.exports = response;