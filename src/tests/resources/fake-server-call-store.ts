import { ServerCallVerbs, ServerCallsType } from '../../types';

export type ServerCallsKeyType = 'userExists' | 'sendShortCode' | 'getUser';

export const serverCalls: ServerCallsType<ServerCallsKeyType> ={
  userExists: { path: `/users/exists`, verb: ServerCallVerbs.Post, name: 'UserExists' },
  sendShortCode: { path: `/users/send/short-code`, verb: ServerCallVerbs.Post, name: 'SendShortCode' },
  getUser: { path: (args: { id: string }) => `/users/id/${args.id}`, verb: ServerCallVerbs.Get, name: 'GetUser' },
};