const publicHandler = require('./public');

describe('public.handler', () => {
  it('should return a 200 status with the correct message', async () => {
    const result = await publicHandler.handler();

    expect(result.statusCode).toBe(200);
    expect(result.headers['Access-Control-Allow-Origin']).toBe('*');
    expect(result.headers['Access-Control-Allow-Credentials']).toBe(true);
    expect(JSON.parse(result.body).message).toBe('Hi from Public API');
  });
}); 