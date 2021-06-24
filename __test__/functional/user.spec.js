import request from 'supertest';
import app from '../../server/app';
import baseUrl from '../utils/baseUrl';

describe('CREATE AND SUBSCRIBE', () => {
  it('should successfully create and subscribe a new user with their email address', async () => {
    const res = await request(app)
      .post(`${baseUrl}/users/create`)
      .send({
        email: 'janedoe@mail.com',
      });

    const { status, user } = res.body;

    expect(res.statusCode).toEqual(201);
    expect(status).toBe(true);
    expect(user.email).toEqual('janedoe@mail.com');
    expect(user.isSubscribed).toEqual(true);
  });

  it('should not create and subscribe a user if email is missing', async () => {
    const res = await request(app)
      .post(`${baseUrl}/users/create`)
      .send({});

    const { status, error } = res.body;
    expect(res.statusCode).toEqual(400);
    expect(status).toBe(false);
    expect(error).toEqual('email is required');
  });

  it('should not create and subscribe a user if email already exists', async () => {
    const res = await request(app)
      .post(`${baseUrl}/users/create`)
      .send({
        email: 'janedoe@mail.com',
      });

    const { status, error } = res.body;
    expect(res.statusCode).toEqual(409);
    expect(status).toBe(false);
    expect(error).toEqual('This email already exists');
  });
});

describe('TOGGLE SUBSCRIBE', () => {
  it('should successfully unsubscribe a user with their email address', async () => {
    const res = await request(app)
      .patch(`${baseUrl}/users/toggle-subscription`)
      .send({
        email: 'janedoe@mail.com',
        isSubscribed: false,
      });

    const { status, user } = res.body;

    expect(res.statusCode).toEqual(200);
    expect(status).toBe(true);
    expect(user.email).toEqual('janedoe@mail.com');
    expect(user.isSubscribed).toEqual(false);
  });

  it('should successfully subscribe an existing user with their email address', async () => {
    const res = await request(app)
      .patch(`${baseUrl}/users/toggle-subscription`)
      .send({
        email: 'janedoe@mail.com',
        isSubscribed: true,
      });

    const { status, user } = res.body;

    expect(res.statusCode).toEqual(200);
    expect(status).toBe(true);
    expect(user.email).toEqual('janedoe@mail.com');
    expect(user.isSubscribed).toEqual(true);
  });

  it('should fail if subscribe email does not exist', async () => {
    const res = await request(app)
      .patch(`${baseUrl}/users/toggle-subscription`)
      .send({
        email: '404@mail.com',
        isSubscribed: true,
      });

    const { status, error } = res.body;

    expect(res.statusCode).toEqual(404);
    expect(status).toBe(false);
    expect(error).toEqual("This email doesn't exists");
  });

  it('should fail if email is missing', async () => {
    const res = await request(app)
      .patch(`${baseUrl}/users/toggle-subscription`)
      .send({
        isSubscribed: false,
      });

    const { status, error } = res.body;
    expect(res.statusCode).toEqual(400);
    expect(status).toBe(false);
    expect(error).toEqual('email is required');
  });

  it('should fail if isSubscribed is missing', async () => {
    const res = await request(app)
      .patch(`${baseUrl}/users/toggle-subscription`)
      .send({
        email: 'janedoe@mail.com',
      });

    const { status, error } = res.body;
    expect(res.statusCode).toEqual(400);
    expect(status).toBe(false);
    expect(error).toEqual('isSubscribed is required');
  });
});
