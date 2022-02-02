import request from 'supertest';
import App from '@/app';
import IndexRoute from '@routes/index.route';
import mongoose from 'mongoose';

afterAll(async () => {
  mongoose.disconnect();
});

describe('Testing Index', () => {
  describe('[GET] /', () => {
    it('response statusCode 200', async () => {
      const indexRoute = new IndexRoute();
      const app = new App([indexRoute]);

      const response = await request(app.getServer()).get(`${indexRoute.path}`);

      expect(response.statusCode).toBe(200);
    });
  });
});
