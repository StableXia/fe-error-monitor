window.onerror = (message, source, lineno, colno, error) => {
  console.log("onerror:", message, source, lineno, colno, error);
  return true;
};

window.addEventListener(
  "error",
  (event) => {
    console.log(event);

    // 过滤js error
    let target = event.target || event.srcElement;
    let isElementTarget =
      target instanceof HTMLScriptElement ||
      target instanceof HTMLLinkElement ||
      target instanceof HTMLImageElement;
    if (!isElementTarget) {
      return false;
    }

    // 上报资源地址
    let url = target.src || target.href;
    console.log(url);
  },
  true // 利用捕获方式
);

window.addEventListener("unhandledrejection", (e) => {
  console.log("unhandledrejection", e);
  throw e.reason;
});

export function Monitor() {}

Monitor.
