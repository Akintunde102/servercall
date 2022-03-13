import { HandleServerError } from "./types";

export const defaultServerErrorHandler = ({
  error,
  errorTag,
  defaultError
}: HandleServerError) => {
  const { status, statusText, data } = error.response;
  console.log({ error: error.response }, errorTag);
  return { success: false, error: { status, statusText, data } };
};