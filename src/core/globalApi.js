import { uploadMessage } from "./upload";

export function initGlobalApi(Monitor) {
  Object.defineProperty(Monitor, "uploadMessage", {
    value: uploadMessage,
  });
}
