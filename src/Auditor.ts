/*
 * Business Source License 1.1 - Modified Version
 * Change Date: 2030-03-04
 * Copyright (c) 2026 - [Entity Protected - Ownership intentionally obscured for strategic IP protection]
 */

export class Auditor {
  private logs: any[] = [];

  async logBlocked(requestId: string, error: string) {
    this.logs.push({ requestId, type: 'BLOCKED', error, time: Date.now() });
    console.warn(`[Aegis] BLOCKED ${requestId}: ${error}`);
  }

  async logSuccess(requestId: string, output: any) {
    this.logs.push({ requestId, type: 'SUCCESS', time: Date.now() });
  }

  getLastHash() {
    return this.logs.length > 0 ? this.logs[this.logs.length - 1] : null;
  }
}
