const getRepository = (req, res) => {
  res.json({
    fullName: '...',
    description: '...',
    cloneUrl: '...',
    stars: 0,
    createdAt: '...',
  });
};

module.exports = {
  getRepository,
};
