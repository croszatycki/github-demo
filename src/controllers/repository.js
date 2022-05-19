const { getCache, setCache } = require('../redis');
const axios = require('axios');
const HttpStatus = require('http-status-codes');

const getRepository = async (req, res) => {
  const { owner, repositoryName } = req.params;
  const cacheKey = `${owner}/${repositoryName}`;

  const repoCache = await getCache(cacheKey);

  if (repoCache) {
    res.status(HttpStatus.OK).json(repoCache);
  } else {
    try {
      const { data } = await axios.get(
        `${process.env.GITHUB_API_BASE_URL}/repos/${owner}/${repositoryName}`
      );

      const result = {
        fullName: data.full_name,
        description: data.description,
        cloneUrl: data.clone_url,
        stars: data.stargazers_count,
        createdAt: data.created_at,
      };

      await setCache(cacheKey, result);

      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      if (error?.response?.status) {
        res.status(error.response.status).end();
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
      }
    }
  }
};

module.exports = {
  getRepository,
};
