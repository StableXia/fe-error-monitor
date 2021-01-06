'use strict';

/**
 * @description 错误来源
 */
const ERROR_SOURCE = {
  GENERAL_ERROR: 'error',
  RESOURCE_ERROR: 'onError',
  PROMISED_ERROR: 'promise',
  CUSTOM_ERROR: 'custom',
  UNKNOWN_ERROR: 'unknow',
};

function isResourceElement(target) {
  return (
    target instanceof HTMLScriptElement ||
    target instanceof HTMLLinkElement ||
    target instanceof HTMLImageElement
  );
}

function monitorMixin(Monitor) {
  Monitor.prototype.catchPromiseError = function () {
    window.addEventListener("unhandledrejection", (event) => {
      Monitor.uploadMessage({
        type: ERROR_SOURCE.PROMISED_ERROR,
        sourceError: event,
      });
    });
  };

  Monitor.prototype.catchResourceError = function () {
    window.addEventListener(
      "error",
      (event) => {
        const target = event.target || event.srcElement;

        if (isResourceElement(target)) {
          Monitor.uploadMessage({
            type: ERROR_SOURCE.RESOURCE_ERROR,
            sourceError: event,
          });
        }
      },
      true
    );
  };

  Monitor.prototype.catchGeneralError = function () {
    window.onerror = (message, source, lineno, colno, error) => {
      Monitor.uploadMessage({
        type: ERROR_SOURCE.GENERAL_ERROR,
        sourceError: {
          message,
          source,
          lineno,
          colno,
          error,
        },
      });
    };
  };

  Monitor.prototype.start = function () {
    this.catchPromiseError();
    this.catchResourceError();
    this.catchGeneralError();
  };
}

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

function normalizeMessage(type, sourceError) {
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

function uploadMessage(errorInfo) {
  const { type, sourceError } = errorInfo;

  const message = normalizeMessage(type, sourceError);

  upload(message);
}

function upload(info) {
  const host = 'http://localhost:7001/monitor/error';

  new Image().src = `${host}?info=${JSON.stringify(info)}`;
}

function initGlobalApi(Monitor) {
  Object.defineProperty(Monitor, "uploadMessage", {
    value: uploadMessage,
  });
}

function Monitor() {
  if (!(this instanceof Monitor)) {
    throw new Error('Monitor 不能作为函数调用，应该使用 new 关键字');
  }
}

initGlobalApi(Monitor);
monitorMixin(Monitor);

const monitor = new Monitor();

monitor.start();
