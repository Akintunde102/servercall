/** Server Call Custom logger */

const c = console;

export const logger = {
    sLog: (...args: any[]) => {
        args.forEach((arg) => c.log(JSON.stringify({ [arg]: arg })));
    },
    log: (...args: any[]) => {
        args.forEach((arg) => c.log(arg));

    }
}