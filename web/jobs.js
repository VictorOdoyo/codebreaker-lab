let worker,
  pending = null,
  sequence = 0;
function stop(reason) {
  if (worker) {
    worker.terminate();
    worker = null;
  }
  if (pending) {
    clearTimeout(pending.timer);
    pending.reject(new Error(reason));
    pending = null;
  }
}
export function cancel() {
  stop('Search cancelled');
}
export function job(request) {
  if (pending) stop('Superseded by another search');
  if (!worker) {
    worker = new Worker(new URL('./worker.js', import.meta.url), { type: 'module' });
    worker.onmessage = ({ data }) => {
      if (!pending || data.id !== pending.id) return;
      const p = pending;
      pending = null;
      clearTimeout(p.timer);
      if (data.error) p.reject(new Error(data.error));
      else p.resolve(data.result);
    };
    worker.onerror = () => stop('Worker failed; retry the operation');
  }
  const id = ++sequence;
  return new Promise((resolve, reject) => {
    const timer = setTimeout(
      () => stop('Search exceeded 30 seconds; reduce its size and retry'),
      30000,
    );
    pending = { id, resolve, reject, timer };
    worker.postMessage({ id, request });
  });
}
