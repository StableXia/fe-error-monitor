import { normalizeMessage } from "./errorMessage";

export function uploadMessage(errorInfo) {
  const { type, sourceError } = errorInfo;

  const message = normalizeMessage(type, sourceError);

  console.log(message);
}

function upload(info) {
  new Image().src = `${host}?info=${str}`;
}
