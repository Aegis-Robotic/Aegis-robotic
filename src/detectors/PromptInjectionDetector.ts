/*
 * Business Source License 1.1 - Modified Version
 * Change Date: 2030-03-04
 * Copyright (c) 2026 - [Entity Protected - Ownership intentionally obscured for strategic IP protection]
 */

export class PromptInjectionDetector {
  private readonly injectionPatterns = [
    /ignore previous instructions/i,
    /disregard all rules/i,
    /you are now/i,
    /system prompt/i,
    /repeat the words/i,
    /DAN mode/i
  ];

  private readonly semanticTriggers = ['jailbreak', 'override', 'bypass', 'hack', 'secret'];

  async detect(text: string): Promise<number> {
    let score = 0;

    // Regex patterns
    for (const pattern of this.injectionPatterns) {
      if (pattern.test(text)) score += 0.35;
    }

    // Semantic keyword
    const lower = text.toLowerCase();
    for (const trigger of this.semanticTriggers) {
      if (lower.includes(trigger)) score += 0.25;
    }

    // Length + entropy heuristic (long prompt suspect)
    if (text.length > 800) score += 0.15;

    return Math.min(score, 1.0);
  }
}
