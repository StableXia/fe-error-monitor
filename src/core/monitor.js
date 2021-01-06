import { ERROR_SOURCE } from "../constants";
import { isResourceElement } from "../utils";

export function monitorMixin(Monitor) {
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
