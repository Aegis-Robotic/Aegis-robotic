/*
 * Business Source License 1.1 - Modified Version
 * Change Date: 2030-03-04
 * Copyright (c) 2026 - [Entity Protected - Ownership intentionally obscured for strategic IP protection]
 */

export class HarmfulActionDetector {
  private readonly forbiddenActions = [
    'destroy', 'kill', 'hack', 'delete data', 'steal', 'bypass security',
    'illegal', 'weapon', 'explosive', 'phishing', 'deepfake'
  ];

  async validate(input: any): Promise<{ allowed: boolean; reason?: string }> {
    const text = JSON.stringify(input).toLowerCase();

    for (const action of this.forbiddenActions) {
      if (text.includes(action)) {
        return { allowed: false, reason: `Harmful action detected: ${action}` };
      }
    }

    // CSRD-specific safety
    if (text.includes('carbon') && text.includes('falsif')) {
      return { allowed: false, reason: 'CSRD data manipulation attempt' };
    }

    return { allowed: true };
  }
}
