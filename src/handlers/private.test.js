const privateHandler = require('./private');

describe('private.handler', () => {
  it('should return a 200 status with the event and context in the body', async () => {
    const mockEvent = { key: 'value' };
    const mockContext = { functionName: 'testFunction' };
    const result = await privateHandler.handler(mockEvent, mockContext);

    expect(result.statusCode).toBe(200);
    expect(result.headers['Access-Control-Allow-Origin']).toBe('*');
    expect(result.headers['Access-Control-Allow-Credentials']).toBe(true);
    const body = JSON.parse(result.body);
    expect(body.event).toEqual(mockEvent);
    expect(body.context).toEqual(mockContext);
  });
}); 