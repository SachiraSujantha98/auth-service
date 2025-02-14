const jwt = require('jsonwebtoken');
const auth = require('./auth');

jest.mock('jsonwebtoken');

describe('auth.handler', () => {
  const event = {
    authorizationToken: 'Bearer valid.token',
    methodArn: 'arn:aws:execute-api:region:account-id:api-id/stage/method/resource-path',
  };

  it('should verify the token and return a policy', async () => {
    const claims = { sub: 'user123' };
    jwt.verify.mockReturnValue(claims);

    const result = await auth.handler(event);

    expect(jwt.verify).toHaveBeenCalledWith('valid.token', process.env.AUTH0_PUBLIC_KEY);
    expect(result.principalId).toBe(claims.sub);
    expect(result.policyDocument.Statement[0].Effect).toBe('Allow');
  });

  it('should throw Unauthorized if token is missing', async () => {
    const eventWithoutToken = { ...event, authorizationToken: null };

    await expect(auth.handler(eventWithoutToken)).rejects.toEqual('Unauthorized');
  });

  it('should throw Unauthorized if token is invalid', async () => {
    jwt.verify.mockImplementation(() => { throw new Error('Invalid token'); });

    await expect(auth.handler(event)).rejects.toEqual('Unauthorized');
  });
}); 