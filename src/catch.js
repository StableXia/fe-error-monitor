import { monitorMixin, initGlobalApi } from "./core";

export function Monitor() {
  if (!(this instanceof Monitor)) {
    throw new Error("Monitor 不能作为函数调用，应该使用 new 关键字");
  }
}

initGlobalApi(Monitor);
monitorMixin(Monitor);
