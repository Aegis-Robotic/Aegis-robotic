/*
 * Business Source License 1.1 - Modified Version
 * Change Date: 2030-03-04
 * Copyright (c) 2026 - [Entity Protected - Ownership intentionally obscured for strategic IP protection]
 */

import { AegisGuard } from '../src';

async function test() {
  const guard = new AegisGuard({ mode: 'zero-trust-ondevice', policies: [] });
  const dummy = { async execute() { return { ok: true }; } };
  const safe = guard.protect(dummy);
  const res = await safe.execute({ task: 'test' });
  console.log('Test passed:', res.ok);
}

test();
