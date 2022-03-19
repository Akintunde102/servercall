import { getServerCallProps } from './get-server-call-props';
import { ServerCallArgs, ServeServerCall } from './types';

export const serveServerCall =
  <DefaultServerCallResponse>({
    defaultResponseDataDept,
    server,
    successFieldDept,
    logger,
    handleServerError,
    defaultAuthSource,
  }: ServeServerCall) =>
  async <ServerCallResponse = DefaultServerCallResponse>(
    serverCallArgs: ServerCallArgs,
  ): Promise<ServerCallResponse | any> => {
    if (serverCallArgs.run === false) {
      return;
    }

    const {
      serverCallProps,
      onSuccess,
      defaultError = 'Something Unusual Happened, please try again',
      debug,
    } = serverCallArgs;

    const { verb, responseDataDept = defaultResponseDataDept } = serverCallProps.call;
    const props = getServerCallProps<typeof verb>(serverCallArgs, defaultAuthSource);

    try {
      const response = await server[verb](props);
      const responseInDept = responseDataDept(response);
      let onSuccessResponse = null;
      const success = successFieldDept === undefined ? true : successFieldDept(response);
      if (success && onSuccess) {
        onSuccessResponse = onSuccess(responseInDept);
      }

      if (debug) {
        logger.log({
          endpoint: props.url,
          pureResponse: response,
          responseInDept,
          success,
          dataReturned: responseInDept,
          onSuccessResponse,
        });
      }

      return { success, dataReturned: responseInDept, onSuccessResponse };
    } catch (error: any) {
      return handleServerError({ error, errorTag: props.url, defaultError });
    }
  };
