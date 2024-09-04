import { HandleServerError } from './types';

const logger = console;

export const defaultServerErrorHandler = ({ error, errorTag, defaultError }: HandleServerError) => {
  if (error.response) {
    const { status, statusText, data } = error.response;
    // logger.log({ error: error.response }, errorTag);

    return { success: false, error: { status, statusText, data } };
  }

  return { success: false, error };
};
