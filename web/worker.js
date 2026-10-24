import { createHandler } from '../src/protocol.js';
const handle = createHandler();
self.onmessage = ({ data }) => {
  try {
    const result = handle(data.request);
    self.postMessage({ id: data.id, result });
  } catch (error) {
    self.postMessage({ id: data.id, error: error.message });
  }
};
