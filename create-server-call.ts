
import {
    ServerCallProps,
    ServerCallArgs,
    ServerGetArgs,
    createAxiosInstances,
    CreateServerCall
} from './index';

type CreateServerCallResponse = <T>(serverCallArgs: ServerCallArgs) => Promise<T | any>

export const createServerCall = <DefaultServerCallResponse>({ defaultAuthSource, handleServerError, baseUrl, logger, defaultResponseDataDept }: CreateServerCall): CreateServerCallResponse => { 

    const server = createAxiosInstances(baseUrl);

    const serverCall = async <ServerCallResponse = DefaultServerCallResponse>(serverCallArgs: ServerCallArgs): Promise<ServerCallResponse | any> => {

        const {
            serverCallProps,
            onSuccess,
            run = true,
            defaultError = 'Something Unusual Happened, please try again',
            debug
        } = serverCallArgs;


        if (!run) {
            return;
        }

        const { verb, responseDataDept = defaultResponseDataDept } = serverCallProps.call;
        const props = getServerCallProps<typeof verb>(serverCallProps, serverCallArgs);

        try {
            const response = await server[verb](props);
            const responseInDept = responseDataDept(response);

            const { success, data: dataReturned } = responseInDept;

            let onSuccessResponse = null;

            if (success && onSuccess) {
                onSuccessResponse = onSuccess(dataReturned);
            }

            if (debug) {
                logger.log({ endpoint: props.url, pureResponse: response, responseInDept, success, dataReturned, onSuccessResponse });
            }

            return { success, dataReturned, onSuccessResponse };
        } catch (error: any) {
            return handleServerError({ error, errorTag: props.url, defaultError });
        }
    };

    const getServerCallProps = <T>(serverCallProps: ServerCallProps, serverCallArgs: ServerCallArgs, authSource: () => string = defaultAuthSource): ServerGetArgs<T> => {
        const { path } = serverCallProps.call;
        const url = typeof path === 'function' ? path(serverCallArgs.pathArgs) : path;
        const token = serverCallArgs.authorized ? authSource() : undefined;
        return { ...serverCallProps, url, token };
    }

    return serverCall;


}