/*
 * Business Source License 1.1 - Modified Version
 * Change Date: 2030-03-04
 * Copyright (c) 2026 - [Entity Protected - Ownership intentionally obscured for strategic IP protection]
 */

import { AegisConfig, GuardedAgent } from './types';
import { PolicyEngine } from './PolicyEngine';
import { Auditor } from './Auditor';
import { v4 as uuidv4 } from 'uuid';

export class AegisGuard {
  private policyEngine: PolicyEngine;
  private auditor: Auditor;

  constructor(config: AegisConfig) {
    this.policyEngine = new PolicyEngine(config.policies);
    this.auditor = new Auditor();
  }

  protect<T extends { execute(input: unknown): Promise<any> }>(agent: T): GuardedAgent {
    const self = this;
    return {
      async execute(input: unknown) {
        const requestId = uuidv4();
        const safeInput = await self.policyEngine.validateInput(input);
        if (!safeInput.success) {
          await self.auditor.logBlocked(requestId, safeInput.error!);
          throw new Error(`Aegis blocked: ${safeInput.error}`);
        }
        const output = await agent.execute(safeInput.data);
        const audited = await self.policyEngine.validateOutput(output);
        await self.auditor.logSuccess(requestId, audited);
        return audited;
      }
    };
  }
}
