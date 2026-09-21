import 'server-only';

export class ServiceFailure extends Error {
  constructor(
    public readonly code: 'configuration' | 'timeout' | 'provider',
    public readonly status?: number
  ) {
    super(code);
  }
}

// A wall-clock bound includes credential acquisition, connection and response reads.
// Abort transport as well as rejecting; late auth completion must check the signal.
export async function deadline<T>(
  ms: number,
  operation: (signal: AbortSignal) => Promise<T>
): Promise<T> {
  const controller = new AbortController();
  let timer: ReturnType<typeof setTimeout>;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => {
      controller.abort();
      reject(new ServiceFailure('timeout'));
    }, ms);
  });
  try {
    return await Promise.race([operation(controller.signal), timeout]);
  } finally {
    clearTimeout(timer!);
  }
}
