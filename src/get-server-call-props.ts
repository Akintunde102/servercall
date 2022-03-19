import { ServerGetArgs } from "./server-instances";
import { ServerCallArgs, ServerCallProps } from "./types";

export const getServerCallProps = <T>(
    serverCallArgs: ServerCallArgs,
    defaultAuthSource: () => string
): ServerGetArgs<T> => {
    const {
        serverCallProps,
    } = serverCallArgs;
    const { path, name } = serverCallProps.call;

    let url = path as string;

    if (typeof path === 'function') {
        if (!serverCallArgs?.pathArgs) throw new Error(`(${name}) was called  without the compulsory PathArgs`);
        url = path(serverCallArgs?.pathArgs);
    }

    const token = serverCallArgs.authorized ? defaultAuthSource() : undefined;
    return { ...serverCallProps, url, token };
};
