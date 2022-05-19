const express = require('express');
const repositoryController = require('../controllers/repository');

const router = express.Router();

router.get(
  '/repositories/:owner/:repositoryName',
  repositoryController.getRepository
);

module.exports = router;
