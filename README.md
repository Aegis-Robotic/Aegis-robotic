# Aegis Robotic v0.2.0 Fortress

**Enterprise AI Safety Firewall pour agents robotiques et logiciels autonomes**

Pare-feu zéro-trust on-device • Anti-prompt injection • Action validation • Privacy guard • Audit immuable  
Conforme EU AI Act High-Risk & CSRD/ESRS • Intégration native NanashiOS • verdi-ai • AXON-Atomic

[![License BSL](https://img.shields.io/badge/License-BSL_1.1_Modified-blue.svg)](LICENSE-BSL-MODIFIED.md)
[![Version](https://img.shields.io/badge/version-0.2.0--Fortress-green.svg)](https://github.com/Aegis-Robotic/Aegis-robotic/releases)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5+-blue.svg)](https://www.typescriptlang.org)
[![Production Ready](https://img.shields.io/badge/Production_Ready-100%25-green.svg)](https://aegis-robotic.com)
[![npm](https://img.shields.io/badge/npm-ready-orange.svg)](https://www.npmjs.com/package/@aegis-robotic/core)

**Site officiel** → [https://aegis-robotic.com](https://aegis-robotic.com)

---

### 🎯 Pourquoi Aegis Fortress ?
- Protège les agents IA autonomes (robots, drones, logiciels, reporting carbone) en temps réel
- 100 % on-device → zéro fuite de données
- Pipeline 5-stages de sécurité (Input → PromptGuard → Harmful Action → Privacy → Output + Watermark)
- Audit Ledger tamper-proof pour conformité légale
- CLI intégrée, streaming support, hot-reload policies
- Conçu pour s’intégrer parfaitement avec NanashiOS, verdi-ai et AXON-Atomic

### Flywheel du projet### 

Installation (1 ligne)
```bash
npm install @aegis-robotic/core
import { AegisGuard } from '@aegis-robotic/core';

const guard = new AegisGuard({
  policies: ['no-harmful-actions', 'csrd-compliance', 'no-privacy-leak']
});

const safeAgent = guard.protect(myAutonomousAgent);
const result = await safeAgent.execute(task);

npx aegis scan "Génère mon bilan carbone 2025"
# → ✅ SAFE ou ❌ BLOCKED avec raison
