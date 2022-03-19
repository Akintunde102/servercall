import { createAxiosInstances } from './server-instances';

type AnyFunction = () => any;

type PathFunction = (args: any) => string;

export enum ServerCallVerbs {
  Get = 'get',
  Post = 'post',
}

export interface ServerCall {
  path: string | PathFunction;
  verb: ServerCallVerbs;
  responseDataDept?: AnyFunction;
  name: string;
}

export interface ServerCallProps {
  data?: any;
  call: ServerCall;
  params?: any;
}

export interface ServerCallArgs {
  serverCallProps: ServerCallProps;
  authorized?: boolean;
  onSuccess?: (data: any) => void;
  run?: boolean;
  defaultError?: string;
  pathArgs?: Record<string, string>;
  debug?: boolean;
}

export interface HandleServerError {
  error: any;
  errorTag: string;
  defaultError: string;
}
export interface CreateServerCall {
  defaultAuthSource: () => string;
  handleServerError?: (args: HandleServerError) => any;
  logger: any;
  baseUrl: string;
  defaultResponseDataDept: (response: any) => any;
  successFieldDept?: (response: any) => any;
}

export interface ServeServerCall extends Omit<CreateServerCall, 'baseUrl'> {
  server: ReturnType<typeof createAxiosInstances>;
  handleServerError: (args: HandleServerError) => any;
}

export type CreateServerCallResponse = <T>(serverCallArgs: ServerCallArgs) => Promise<T | any>;

export type ServerCallsType<T extends string> = Record<T, ServerCall>;
