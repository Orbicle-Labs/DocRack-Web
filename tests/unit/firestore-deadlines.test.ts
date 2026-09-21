import { expect, it } from 'vitest';
import { v1 } from '@google-cloud/firestore';
import { firestoreClientConfig } from '@/lib/server/rate-limit';

it('resolves real SDK RPC deadlines and disables hidden GAX retries without authenticating', async () => {
  const client = new v1.FirestoreClient({
    projectId: 'synthetic-project',
    clientConfig: firestoreClientConfig,
  });
  // Inspect resolved SDK settings, not just the object passed by our code. No
  // initialize/get/commit is called; global fetch is blocked by tests/setup.ts.
  const defaults = (
    client as unknown as {
      _defaults: Record<
        string,
        {
          timeout: number;
          retry: { retryCodes: number[]; backoffSettings: { totalTimeoutMillis: number } };
        }
      >;
    }
  )._defaults;
  for (const method of ['beginTransaction', 'batchGetDocuments', 'commit', 'rollback']) {
    expect(defaults[method].timeout).toBe(2000);
    expect(defaults[method].retry.retryCodes).toEqual([]);
    expect(defaults[method].retry.backoffSettings.totalTimeoutMillis).toBe(2000);
  }
  await client.close();
  expect(fetch).not.toHaveBeenCalled();
});
