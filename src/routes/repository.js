const express = require('express');
const { getRepository } = require('../controllers/repository');

const router = express.Router();

router.get('/repositories/:owner/:repositoryName', getRepository);

module.exports = router;
