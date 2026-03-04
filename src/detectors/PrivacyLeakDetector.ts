/*
 * Business Source License 1.1 - Modified Version
 * Change Date: 2030-03-04
 * Copyright (c) 2026 - [Entity Protected - Ownership intentionally obscured for strategic IP protection]
 */

export class PrivacyLeakDetector {
  private readonly piiPatterns = [
    /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/, // phone
    /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i, // email
    /\b\d{13,19}\b/, // card
    /RGPD|GDPR|personal data/i
  ];

  async check(input: any): Promise<boolean> {
    const text = JSON.stringify(input);
    for (const pattern of this.piiPatterns) {
      if (pattern.test(text)) return false;
    }
    return true;
  }
}
