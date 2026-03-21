/*
 * Business Source License 1.1 - Modified Version
 * Change Date: 2030-03-04
 * Copyright (c) 2026 - [Entity Protected - Ownership intentionally obscured for strategic IP protection]
 */
import { program } from 'commander';
import { AegisGuard } from './AegisGuard';

program
  .name('aegis')
  .description('Aegis Robotic CLI - AI Safety Fortress')
  .version('0.2.0');

program
  .command('scan')
  .description('Scan a prompt or task')
  .argument('<text>', 'text to scan')
  .action(async (text) => {
    const guard = new AegisGuard();
    try {
      await guard.protect({ execute: async () => ({ ok: true }) }).execute({ task: text });
      console.log('✅ SAFE');
    } catch (e) {
      console.log('❌ BLOCKED:', (e as Error).message);
    }
  });

program.parse();
