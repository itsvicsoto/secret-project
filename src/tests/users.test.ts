import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import request from 'supertest';
import App from '@/app';
import { CreateUserDto, LoginUserDto } from '@dtos/users.dto';
import UsersRoute from '@routes/users.route';
import AuthRoute from '@routes/auth.route';

let session = null;

beforeAll(async () => {
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
  users.findById = jest.fn().mockReturnValue({
    _id: '60706478aad6c9ad19a31c84',
    email: userData.email,
    password: await bcrypt.hash(userData.password, 10),
  });
  const app = new App([authRoute]);
  const response = await request(app.getServer()).post(`${authRoute.path}login`).send(userData);
  session = response.header['set-cookie'];
});

afterAll(async () => {
  mongoose.disconnect();
});

describe('Testing Users', () => {
  describe('[GET] /users', () => {
    it('response findAll Users', async () => {
      const usersRoute = new UsersRoute();
      const users = usersRoute.usersController.userService.users;

      users.find = jest.fn().mockReturnValue([
        {
          _id: 'qpwoeiruty',
          email: 'a@email.com',
          password: await bcrypt.hash('q1w2e3r4!', 10),
        },
        {
          _id: 'alskdjfhg',
          email: 'b@email.com',
          password: await bcrypt.hash('a1s2d3f4!', 10),
        },
        {
          _id: 'zmxncbv',
          email: 'c@email.com',
          password: await bcrypt.hash('z1x2c3v4!', 10),
        },
      ]);

      (mongoose as any).connect = jest.fn();
      const app = new App([usersRoute]);
      return request(app.getServer()).get(`${usersRoute.path}`).set('Cookie', session).expect(200);
    });
  });

  describe('[GET] /users/:id', () => {
    it('response findOne User', async () => {
      const userId = '60706478aad6c9ad19a31c84';

      const usersRoute = new UsersRoute();
      const users = usersRoute.usersController.userService.users;

      users.findOne = jest.fn().mockReturnValue({
        _id: '60706478aad6c9ad19a31c84',
        email: 'a@email.com',
        password: await bcrypt.hash('q1w2e3r4!', 10),
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([usersRoute]);
      return request(app.getServer()).get(`${usersRoute.path}/${userId}`).set('Cookie', session).expect(200);
    });

    it('response findOne User:: Using non-mongodb id', async () => {
      const userId = 'qpwoeiruty';

      const usersRoute = new UsersRoute();
      const users = usersRoute.usersController.userService.users;

      users.findOne = jest.fn().mockReturnValue({
        _id: 'qpwoeiruty',
        email: 'a@email.com',
        password: await bcrypt.hash('q1w2e3r4!', 10),
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([usersRoute]);
      return request(app.getServer()).get(`${usersRoute.path}/${userId}`).set('Cookie', session).expect(400);
    });
  });

  describe('[POST] /users', () => {
    it('response Create User', async () => {
      const userData: CreateUserDto = {
        email: 'testzzzz@email.com',
        password: 'q1w2e3r4',
        first_name: 'firstName',
        last_name: 'lastName',
      };

      const usersRoute = new UsersRoute();
      const users = usersRoute.usersController.userService.users;

      users.findOne = jest.fn().mockReturnValue(null);
      users.create = jest.fn().mockReturnValue({
        _id: '61f7436328e51b80c6f1d85a',
        email: userData.email,
        password: await bcrypt.hash(userData.password, 10),
        first_name: 'firstName',
        last_name: 'lastName',
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([usersRoute]);
      return request(app.getServer()).post(`${usersRoute.path}`).send(userData).set('Cookie', session).expect(201);
    });
  });

  describe('[PUT] /users/:id', () => {
    it('response Update User', async () => {
      const userId = '60706478aad6c9ad19a31c84';
      const userData: CreateUserDto = {
        email: 'test@email.com',
        password: 'q1w2e3r4',
        first_name: 'firstName',
        last_name: 'lastName',
      };

      const usersRoute = new UsersRoute();
      const users = usersRoute.usersController.userService.users;

      if (userData.email) {
        users.findOne = jest.fn().mockReturnValue({
          _id: userId,
          email: userData.email,
          password: await bcrypt.hash(userData.password, 10),
        });
      }

      users.findByIdAndUpdate = jest.fn().mockReturnValue({
        _id: userId,
        email: userData.email,
        password: await bcrypt.hash(userData.password, 10),
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([usersRoute]);
      return request(app.getServer()).put(`${usersRoute.path}/${userId}`).set('Cookie', session).send(userData);
    });
  });

  describe('[DELETE] /users/:id', () => {
    it('response Delete User', async () => {
      const userId = '60706478aad6c9ad19a31c84';

      const usersRoute = new UsersRoute();
      const users = usersRoute.usersController.userService.users;

      users.findByIdAndDelete = jest.fn().mockReturnValue({
        _id: '60706478aad6c9ad19a31c84',
        email: 'test@email.com',
        password: await bcrypt.hash('q1w2e3r4!', 10),
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([usersRoute]);
      return request(app.getServer()).delete(`${usersRoute.path}/${userId}`).set('Cookie', session).expect(200);
    });
  });
});
