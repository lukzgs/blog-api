const jsonReturn = async (req, res) => {
  const { message, code } = req;
  res.status(code).json(message);
};

module.exports = {
  jsonReturn,
};
