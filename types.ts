export enum ServerCallVerbs {
  Get = 'get',
  Post = 'post',
}

export interface ServerCall {
  path: string | Function,
  verb: ServerCallVerbs,
  responseDataDept?: Function,
}

export interface ServerCallProps {
  data?: any;
  call: ServerCall;
  params?: any;
}

export interface ServerCallArgs {
  serverCallProps: ServerCallProps,
  authorized?: boolean,
  onSuccess?: (data: any) => void,
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
  handleServerError: (args: HandleServerError) => any;
  logger: any;
  baseUrl: string;
  defaultResponseDataDept: (response: any) => any
}


