/** Get Arguments from Process */
export const getArgs = <T>(process: any): T => {
    const cmdArgs = process.argv;
    const cmdArgsObject  = {} as T | any;
    for (let index = 0; index < cmdArgs.length; index++) {
        const [arg, value] = cmdArgs[index].split('=');
        if (value) {
            cmdArgsObject[arg.replace(/-/g, '')] = value;
        }
    }
    return cmdArgsObject;
}