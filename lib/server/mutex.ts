/**
 * A simple in-process async mutex that serializes concurrent writes to the
 * runtime state file. This prevents the read-modify-write pattern in
 * store.ts from producing torn state when multiple requests hit simultaneously.
 */

declare global {
   
  var __sx_store_mutex__: Promise<void> | undefined;
}

/**
 * Acquire the store lock, execute `fn`, then release.
 * All callers queue behind the same promise chain.
 */
export async function withStoreLock<T>(fn: () => Promise<T>): Promise<T> {
  // Chain onto whatever is currently pending (or a resolved promise if idle).
  const current = globalThis.__sx_store_mutex__ ?? Promise.resolve();

  let release!: () => void;
  const next = new Promise<void>((resolve) => {
    release = resolve;
  });

  // Whoever holds the lock runs next once the previous operation finishes.
  globalThis.__sx_store_mutex__ = current.then(() => next);

  try {
    await current; // Wait for the previous operation to finish.
    return await fn();
  } finally {
    release(); // Let the next waiter proceed.
  }
}
