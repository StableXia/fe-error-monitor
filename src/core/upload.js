import { normalizeMessage } from './errorMessage';

export function uploadMessage(errorInfo) {
  const { type, sourceError } = errorInfo;

  const message = normalizeMessage(type, sourceError);

  upload(message);
}

function upload(info) {
  const host = 'http://localhost:7001/monitor/error';

  new Image().src = `${host}?info=${JSON.stringify(info)}`;
}
