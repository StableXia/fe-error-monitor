import { ERROR_SOURCE } from "./constants";

function normalizePromiseMessage(sourceError) {}

function normalizeErrorMessage(sourceError) {}

function normalizeOnErrorMessage(sourceError) {}

function normalizeUnknowMessage(sourceError) {
  // lineno,
  // colno,
  // error: {
  //   stack
  // },
  // timeStamp,
  // message,
  // filename
  // const info = {
  //     lineno,
  //     colno,
  //     stack,
  //     timeStamp,
  //     message,
  //     filename
  //   }
}

export function normalizeMessage(type, sourceError) {
  switch (type) {
    case ERROR_SOURCE.PROMISE:
      return normalizePromiseMessage(sourceError);
    case ERROR_SOURCE.ERROR:
      return normalizeErrorMessage(sourceError);
    case ERROR_SOURCE.ON_ERROR:
      return normalizeOnErrorMessage(sourceError);
    default:
      return normalizeUnknowMessage(sourceError);
  }
}
