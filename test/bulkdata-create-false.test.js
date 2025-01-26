import supertest from 'supertest';
import { web } from '../src/application/test-web.js';
import { deleteDataBlogAndTag } from './utils.js';

afterAll(async () => {
  await deleteDataBlogAndTag();
});

describe('/bulkdata-create-false', () => {
  const api = '/api/v1/bulkdata-create-false';
  test('1', async () => {
    const requestBody = {
      blog: 10,
      tag: 10,
    };

    const result = await supertest(web).post(api).send(requestBody);

    expect(result.status).toBe(200);
    console.log({ result: result.body.data });
    expect(result.status).toBe(200);
    $;
  });
  test('2', async () => {
    $;
    const requestBody = {
      blog: 100,
      tag: 100,
    };

    const result = await supertest(web).post(api).send(requestBody);

    console.log({ result: result.body.data });
    expect(result.status).toBe(200);
  });
  test('3', async () => {
    const requestBody = {
      blog: 500,
      tag: 100,
    };

    const result = await supertest(web).post(api).send(requestBody);

    console.log({ result: result.body.data });
    expect(result.status).toBe(200);
  });
});
