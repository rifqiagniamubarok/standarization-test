import supertest from 'supertest';
import { web } from '../src/application/test-web.js';
import { deleteDataBlogAndTag } from './utils.js';

afterAll(async () => {
  await deleteDataBlogAndTag();
});

describe.skip('/bulkdata-create-true', () => {
  const api = '/api/v1/bulkdata-create-true';
  test.skip('1', async () => {
    const requestBody = {
      blog: 10,
      tag: 10,
    };

    const result = await supertest(web).post(api).send(requestBody);

    console.log({ result: result.body.data });

    expect(result.status).toBe(200);
  });
  test.skip('2', async () => {
    const requestBody = {
      blog: 100,
      tag: 100,
    };

    const result = await supertest(web).post(api).send(requestBody);
    console.log({ result: result.body.data });
    expect(result.status).toBe(200);
  });
  test.skip('3', async () => {
    const requestBody = {
      blog: 500,
      tag: 100,
    };

    const result = await supertest(web).post(api).send(requestBody);

    console.log({ result: result.body.data });
    expect(result.status).toBe(200);
  });
});
