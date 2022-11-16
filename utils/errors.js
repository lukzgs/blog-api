const jsonReturn = async (req, res) => {
  const { message, code } = req;
  return res.status(code).json(message);
};

module.exports = {
  jsonReturn,
};
