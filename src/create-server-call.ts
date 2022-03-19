import { defaultServerErrorHandler } from './default-server-error-handler';
import { createAxiosInstances, CreateServerCall, CreateServerCallResponse } from './index';
import { serveServerCall } from './server-call';

 
export const createServerCall = <DefaultServerCallResponse>({
  defaultAuthSource,
  handleServerError: customServerError,
  baseUrl,
  logger,
  defaultResponseDataDept,
  successFieldDept,
}: CreateServerCall): CreateServerCallResponse => {
  const server = createAxiosInstances(baseUrl);
  const handleServerError = customServerError || defaultServerErrorHandler;
  const createdServerCall = serveServerCall<DefaultServerCallResponse>({defaultResponseDataDept,successFieldDept, logger,handleServerError, server, defaultAuthSource})
  return createdServerCall;
};
