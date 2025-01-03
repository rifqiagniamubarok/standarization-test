import supertest from 'supertest';
import { web } from '../src/application/test-web.js';
import { removeUser } from './test-utils.js';

describe('/auth', () => {
  const name = 'usertesting';
  const email = 'usertesting@yopmail.com';
  const password = 'testingtesting';

  afterAll(async () => {
    await removeUser(email);
  });

  it('should register success if body valid', async () => {
    const result = await supertest(web).post('/api/v1/auth/register').send({
      name,
      email,
      password,
    });

    expect(result.status).toBe(200);
    expect(result.body.data.email).toBe(email);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.password).toBeUndefined();
  });
  it('should not register if body invalid', async () => {
    const result = await supertest(web).post('/api/v1/auth/register').send({
      email: '',
      password: 'tests',
    });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
  it('should login success if body valid', async () => {
    const result = await supertest(web).post('/api/v1/auth/login').send({
      email,
      password,
    });

    expect(result.status).toBe(200);
    expect(result.body.data.email).toBe(email);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.password).toBeUndefined();
    expect(result.body.data.token).toBeDefined();
  });
  it('should not login success if body valid', async () => {
    const result = await supertest(web).post('/api/v1/auth/login').send({
      email,
      password: 'notfound',
    });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});
