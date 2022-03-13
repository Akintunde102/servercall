//server-call-store.ts
import { ServerCallVerbs, ServerCall } from '../../types';

export type ServerCallsType = Record<ServerCallsKeyType, ServerCall>;

export const getDataByGeneralDept = (response: any) => response?.['data']?.['data'];

export const serverCalls: ServerCallsType = {
  userExists: { path: `/users/exists`, verb: ServerCallVerbs.Post, name: 'UserExists' },
  sendShortCode: { path: `/users/send/short-code`, verb: ServerCallVerbs.Post, name: 'SendShortCode' },
  getUser: { path: (args: { id: string }) => `/users/id/${args.id}`, verb: ServerCallVerbs.Get, name: 'GetUser' },
};

export type ServerCallsKeyType = 'userExists' | 'sendShortCode' | 'getUser';
