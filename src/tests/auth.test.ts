import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import request from 'supertest';
import App from '@/app';
import { CreateUserDto, LoginUserDto } from '@dtos/users.dto';
import AuthRoute from '@routes/auth.route';
import { User } from '@interfaces/users.interface';

afterAll(async () => {
  mongoose.disconnect();
});

let session = null;

describe('Testing Auth', () => {
  describe('[POST] /signup', () => {
    it('response should have the Create userData', async () => {
      const userData: CreateUserDto = {
        email: 'test@email.com',
        password: 'q1w2e3r4!',
        first_name: 'firstName',
        last_name: 'lastName',
      };

      const authRoute = new AuthRoute();
      const users = authRoute.authController.authService.users;

      users.findOne = jest.fn().mockReturnValue(null);
      users.create = jest.fn().mockReturnValue({
        _id: '60706478aad6c9ad19a31c84',
        email: userData.email,
        password: await bcrypt.hash(userData.password, 10),
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([authRoute]);
      return request(app.getServer()).post(`${authRoute.path}signup`).send(userData);
    });
  });

  describe('[POST] /login', () => {
    it('response should have the Set-Cookie header with the Authorization token', async () => {
      const userData: LoginUserDto = {
        email: 'test@email.com',
        password: 'q1w2e3r4!',
      };

      const authRoute = new AuthRoute();
      const users = authRoute.authController.authService.users;

      users.findOne = jest.fn().mockReturnValue({
        _id: '60706478aad6c9ad19a31c84',
        email: userData.email,
        password: await bcrypt.hash(userData.password, 10),
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([authRoute]);
      const response = await request(app.getServer()).post(`${authRoute.path}login`).send(userData);
      session = response.header['set-cookie'];
      expect(response.header['set-cookie'][0]).toMatch(/^Authorization=.+/);
    });
  });

  describe('[POST] /logout', () => {
    it('logout Set-Cookie Authorization=; Max-age=0', async () => {
      const userData: User = {
        _id: '60706478aad6c9ad19a31c84',
        email: 'test@email.com',
        password: await bcrypt.hash('q1w2e3r4!', 10),
        first_name: 'firstName',
        last_name: 'lastName',
      };

      const authRoute = new AuthRoute();
      const users = authRoute.authController.authService.users;

      users.findOne = jest.fn().mockReturnValue(userData);

      (mongoose as any).connect = jest.fn();
      const app = new App([authRoute]);
      return request(app.getServer())
        .post(`${authRoute.path}logout`)
        .send(userData)
        .set('Cookie', session)
        .expect('Set-Cookie', /^Authorization=\; Max-age=0/);
    });
  });
});
