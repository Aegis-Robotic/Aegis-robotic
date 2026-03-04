/*
 * Business Source License 1.1 - Modified Version
 * Change Date: 2030-03-04
 * Copyright (c) 2026 - [Entity Protected - Ownership intentionally obscured for strategic IP protection]
 */

export class Watermarker {
  apply(output: any, requestId: string) {
    return {
      ...output,
      _aegis: {
        requestId,
        timestamp: Date.now(),
        version: '0.2.0-Fortress',
        hash: this.simpleHash(JSON.stringify(output) + requestId)
      }
    };
  }

  private simpleHash(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0;
    }
    return hash.toString(36);
  }
}
