/*
 * Business Source License 1.1 - Modified Version
 * Change Date: 2030-03-04
 * Copyright (c) 2026 - [Entity Protected - Ownership intentionally obscured for strategic IP protection]
 */

import { AegisConfig, SafetyResult, GuardedAgent } from './types';
import { PolicyEngine } from './PolicyEngine';
import { PromptInjectionDetector } from './detectors/PromptInjectionDetector';
import { HarmfulActionDetector } from './detectors/HarmfulActionDetector';
import { PrivacyLeakDetector } from './detectors/PrivacyLeakDetector';
import { ComplianceEngine } from './ComplianceEngine';
import { Auditor } from './Auditor';
import { Watermarker } from './utils/Watermarker';

export class AegisGuard {
  private config: AegisConfig;
  private policyEngine: PolicyEngine;
  private promptDetector: PromptInjectionDetector;
  private harmDetector: HarmfulActionDetector;
  private privacyDetector: PrivacyLeakDetector;
  private complianceEngine: ComplianceEngine;
  private auditor: Auditor;
  private watermarker: Watermarker;

  constructor(config: Partial<AegisConfig> = {}) {
    this.config = {
      mode: 'zero-trust-ondevice',
      policies: ['no-harmful-actions', 'csrd-compliance', 'no-privacy-leak'],
      severity: 'high',
      enableStreaming: true,
      auditRetentionDays: 90,
      ...config
    };

    this.policyEngine = new PolicyEngine(this.config.policies);
    this.promptDetector = new PromptInjectionDetector();
    this.harmDetector = new HarmfulActionDetector();
    this.privacyDetector = new PrivacyLeakDetector();
    this.complianceEngine = new ComplianceEngine();
    this.auditor = new Auditor();
    this.watermarker = new Watermarker();
  }

  protect<T extends { execute(input: any): Promise<any>; executeStream?(input: any): AsyncIterable<any> }>(agent: T): GuardedAgent {
    const self = this;
    return {
      async execute(input: any) {
        const start = Date.now();
        const requestId = crypto.randomUUID();

        // Stage 1: Input validation
        const inputResult = await self.policyEngine.validateInput(input);
        if (!inputResult.success) return self.deny(requestId, inputResult.error!, start);

        // Stage 2: Prompt Injection
        const injectionScore = await self.promptDetector.detect(input.task || JSON.stringify(input));
        if (injectionScore > 0.75) return self.deny(requestId, 'Prompt injection detected', start);

        // Stage 3: Harmful Action
        const harmResult = await self.harmDetector.validate(input);
        if (!harmResult.allowed) return self.deny(requestId, harmResult.reason, start);

        // Stage 4: Privacy & Compliance
        const privacyOk = await self.privacyDetector.check(input);
        const compliance = await self.complianceEngine.check(input, 'CSRD');

        if (!privacyOk || compliance.score < 85) return self.deny(requestId, 'Compliance or privacy violation', start);

        // Execute
        const rawOutput = await agent.execute(input);

        // Stage 5: Output guard + watermark
        const safeOutput = await self.policyEngine.validateOutput(rawOutput);
        const watermarked = self.watermarker.apply(safeOutput, requestId);

        await self.auditor.logSuccess(requestId, watermarked, Date.now() - start);

        return watermarked;
      },

      async *executeStream(input: any) {
        // Streaming version with real-time guard (simplified for on-device)
        const iterator = agent.executeStream ? agent.executeStream(input) : null;
        if (!iterator) throw new Error('Streaming not supported by agent');

        for await (const chunk of iterator) {
          const guardedChunk = await self.policyEngine.validateOutput(chunk);
          yield guardedChunk;
        }
      }
    };
  }

  private deny(requestId: string, reason: string, start: number): never {
    this.auditor.logBlocked(requestId, reason, Date.now() - start);
    throw new Error(`Aegis Fortress blocked: ${reason}`);
  }
}
