import { createServerCall } from '../../create-server-call';
import { serverCalls } from '../resources/fake-server-call-store';

describe('ServerCall', () => {
  const mockConsole = { log: () => {} };
  const mockConsoleLog = jest.spyOn(mockConsole, 'log');
  const serverCall = createServerCall({
    baseUrl: 'http://localhost:9000',
    logger: mockConsole,
    handleServerError: () => {},
    defaultAuthSource: () => 'fake-auth',
    defaultResponseDataDept: (response: any) => response?.['data']?.['data']?.['data'],
    successFieldDept: (response: any) => response?.['data']?.['data']?.['success'],
  });

  it('passes serverCall as a function', () => {
    expect(typeof serverCall).toBe('function');
  });

  it('does not run', async () => {
    const response = await serverCall({
      serverCallProps: { call: serverCalls['get:usersIdId'] },
      pathArgs: { id: '620aec25eaf54c618c8f26f2' },
      authorized: true,
      run: false,
    });
    expect(response).toBe(undefined);
    expect(mockConsoleLog).toHaveBeenCalledTimes(0);
  });

  it('uses console without error', async () => {
    await serverCall({
      serverCallProps: { call: serverCalls['get:users'] },
      pathArgs: { id: '620aec25eaf54c618c8f26f2' },
      authorized: true,
      debug: true,
    });
    // expect(mockConsoleLog).toHaveBeenCalledTimes(1);
  });

  it('returns correct response', async () => {
    const response = await serverCall({
      serverCallProps: { call: serverCalls['get:usersIdId'] },
      pathArgs: { id: '620aec25eaf54c618c8f26f2' },
      authorized: true,
    });
    expect(response.success).toEqual(true);
    expect(response.dataReturned).toBeDefined();
  });

  it('returns onSuccessResponse', async () => {
    const response = await serverCall({
      serverCallProps: { call: serverCalls['get:usersIdId'] },
      pathArgs: { id: '620aec25eaf54c618c8f26f2' },
      authorized: true,
      onSuccess: (dataReturned: any) => {
        return 'done';
      },
    });
    expect(response.onSuccessResponse).toBe('done');
  });
});
