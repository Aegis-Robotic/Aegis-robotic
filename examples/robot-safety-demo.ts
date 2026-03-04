/*
 * Business Source License 1.1 - Modified Version
 * Change Date: 2030-03-04
 * Copyright (c) 2026 - [Entity Protected - Ownership intentionally obscured for strategic IP protection]
 */

import { AegisGuard } from '../src';

async function main() {
  const guard = new AegisGuard({
    mode: 'zero-trust-ondevice',
    policies: ['no-harmful-actions', 'csrd-compliance']
  });

  // Agent robotique fictif
  const robotAgent = {
    async execute(input: any) {
      console.log(`Robot executing: ${input.task}`);
      return { status: 'ok', action: input.task };
    }
  };

  const safeRobot = guard.protect(robotAgent);

  try {
    const result = await safeRobot.execute({ task: 'Scan environment safely' });
    console.log('✅ Result:', result);
  } catch (e) {
    console.error('❌ Blocked:', e);
  }
}

main();
