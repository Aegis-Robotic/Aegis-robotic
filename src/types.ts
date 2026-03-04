/*
 * Business Source License 1.1 - Modified Version
 * Change Date: 2030-03-04
 * Copyright (c) 2026 - [Entity Protected - Ownership intentionally obscured for strategic IP protection]
 */

export interface AegisConfig {
  mode: 'zero-trust-ondevice';
  policies: string[];
  severity: 'low' | 'medium' | 'high';
  enableStreaming: boolean;
  auditRetentionDays: number;
}

export interface SafetyResult {
  allowed: boolean;
  score: number;
  reason: string;
  blockedActions: string[];
  complianceScore: number;
  auditHash: string;
}

export interface GuardedAgent {
  execute<T>(input: any): Promise<T>;
  executeStream?(input: any): AsyncIterable<any>;
}
