# Aegis Robotic

**Cadre de sécurité de l'IA pour les agents robotiques et logiciels autonomes**

Pare-feu de confiance zéro on-device | Anti-injection | Conforme EU AI Act & CSRD | Intégration NanashiOS & verdi-ai

[![BSL License](https://img.shields.io/badge/License-BSL%201.1%20Modified-blue)](LICENSE-BSL-MODIFIED.md)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue)](https://www.typescriptlang.org)
[![NPM Ready](https://img.shields.io/badge/npm-ready-green)](https://aegis-robotic.com)

Site officiel → [https://aegis-robotic.com](https://aegis-robotic.com)

### Flywheel du projet (copie sur mermaid.live pour voir les couleurs et animations)

```mermaid
flowchart TD
    N[NanashiOS<br/>On-device Privacy OS] --> A[Aegis Guard<br/>Firewall IA Zero-Trust]
    A --> V[verdi-ai / Agents Robotiques<br/>Actions sécurisées]
    V --> I[Améliorations continues<br/>+ données anonymisées]
    I --> N
    classDef base fill:#0A0A0A,stroke:#00D4FF,stroke-width:4px,color:#fff;
    classDef aegis fill:#FF00AA,stroke:#00FF9F,stroke-width:6px,color:#0A0A0A;
    class N,V base
    class A aegis

npm install @aegis-robotic/core
import { AegisGuard } from '@aegis-robotic/core';

const guard = new AegisGuard({
  mode: 'zero-trust-ondevice',
  policies: ['no-harmful-actions', 'csrd-compliance', 'no-prompt-injection']
});

const safeRobot = guard.protect(myAutonomousAgent);
const result = await safeRobot.execute(task);
