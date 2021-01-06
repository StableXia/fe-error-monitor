import { ERROR_SOURCE } from "../constants";

const DEFAULT_ERROR_MESSAGE = {
  lineno: null,
  colno: null,
  stack: null,
  timeStamp: null,
  message: null,
  filename: null,
  type: null,
};

/**
 * @description Promise 未捕获错误
 * @param {object} sourceError
 */
function normalizePromiseMessage(sourceError) {
  console.log("normalizePromiseMessage", sourceError);
  return {
    ...DEFAULT_ERROR_MESSAGE,
    type: ERROR_SOURCE.PROMISED_ERROR,
    message: sourceError.reason,
    timeStamp: Date.now(),
  };
}

/**
 * @description 普通错误
 * @param {object} sourceError
 */
function normalizeGeneralErrorMessage(sourceError) {
  console.log("normalizeGeneralErrorMessage", sourceError);
  return {
    ...DEFAULT_ERROR_MESSAGE,
    type: ERROR_SOURCE.GENERAL_ERROR,
    timeStamp: Date.now(),
  };
}

/**
 * @description 资源加载错误
 * @param {object} sourceError
 */
function normalizeResourceErrorMessage(sourceError) {
  console.log("normalizeResourceErrorMessage", sourceError);
  return {
    ...DEFAULT_ERROR_MESSAGE,
    type: ERROR_SOURCE.RESOURCE_ERROR,
    timeStamp: Date.now(),
  };
}

/**
 * @description 自定义错误
 * @param {object} sourceError
 */
function normalizeCustomErrorMessage(sourceError) {
  console.log("normalizeCustomErrorMessage", sourceError);
  return {
    ...DEFAULT_ERROR_MESSAGE,
    type: ERROR_SOURCE.CUSTOM_ERROR,
    timeStamp: Date.now(),
  };
}

/**
 * @description 未知错误
 * @param {object} sourceError
 */
function normalizeUnknowMessage(sourceError) {
  console.log("normalizeUnknowMessage", sourceError);
  return {
    ...DEFAULT_ERROR_MESSAGE,
    type: ERROR_SOURCE.UNKNOWN_ERROR,
    timeStamp: Date.now(),
  };
}

export function normalizeMessage(type, sourceError) {
  switch (type) {
    case ERROR_SOURCE.PROMISED_ERROR:
      return normalizePromiseMessage(sourceError);
    case ERROR_SOURCE.GENERAL_ERROR:
      return normalizeGeneralErrorMessage(sourceError);
    case ERROR_SOURCE.RESOURCE_ERROR:
      return normalizeResourceErrorMessage(sourceError);
    case ERROR_SOURCE.RESOURCE_ERROR:
      return normalizeCustomErrorMessage(sourceError);
    default:
      return normalizeUnknowMessage(sourceError);
  }
}

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
