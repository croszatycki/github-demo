jest.mock('axios');
jest.mock('redis', () => {
  const client = jest.fn();

  client.on = jest.fn().mockReturnThis();
  client.connect = jest.fn().mockResolvedValue();
  client.get = jest.fn().mockResolvedValue(null);
  client.set = jest.fn().mockResolvedValue(null);

  return {
    createClient: jest.fn().mockReturnValue(client),
  };
});

const server = require('./app.js');
const supertest = require('supertest');
const requestWithSupertest = supertest(server);
const axios = require('axios');

describe('Any endpoint', () => {
  it('GET /dummy should send an error', async () => {
    const res = await requestWithSupertest.get('/dummy');
    expect(res.status).toEqual(404);
  });
});

describe('Github repository', () => {
  it('GET /repositories/dummy/project should show some dummy repo status', async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        // only mandatory fields from github API response
        full_name: 'NAME',
        description: 'DESC',
        clone_url: 'URL',
        stargazers_count: 777,
        created_at: 'DATE',
      },
    });

    const res = await requestWithSupertest.get('/repositories/dummy/project');

    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(res.body).toHaveProperty('cloneUrl');
    expect(res.body).toHaveProperty('createdAt');
    expect(res.body).toHaveProperty('description');
    expect(res.body).toHaveProperty('fullName');
    expect(res.body).toHaveProperty('stars');

    expect(res.body).toMatchObject({
      cloneUrl: 'URL',
      createdAt: 'DATE',
      description: 'DESC',
      fullName: 'NAME',
      stars: 777,
    });
  });

  it('GET /repositories/dummy/not-existing-project should give an error for a repo which is not exist', async () => {
    axios.get.mockRejectedValueOnce({ response: { status: 404 } });

    const res = await requestWithSupertest.get(
      '/repositories/dummy/not-existing-project'
    );

    expect(res.status).toEqual(404);
  });
});
