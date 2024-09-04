/** Get Arguments from Process */
export const getArgs = <T>(process: any): T => {
  const cmdArgs = process.argv;
  const cmdArgsObject = {} as T | any;
  for (const cmdArg of cmdArgs) {
    const [arg, value] = cmdArg.split('=');
    if (value) {
      cmdArgsObject[arg.replace(/-/g, '')] = value;
    }
  }
  return cmdArgsObject;
};
