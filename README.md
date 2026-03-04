# Aegis Robotic

**Cadre de sécurité de l'IA pour les agents robotiques et logiciels autonomes**

Pare-feu zéro-trust on-device • Anti-prompt injection • Conforme EU AI Act & CSRD • Intégration native NanashiOS & verdi-ai

[![License BSL](https://img.shields.io/badge/License-BSL_1.1_Modified-blue)](LICENSE-BSL-MODIFIED.md)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5+-blue)](https://www.typescriptlang.org)
[![Production Ready](https://img.shields.io/badge/Production_Ready-green)](https://aegis-robotic.com)

**Site officiel** → [https://aegis-robotic.com](https://aegis-robotic.com)

### Installation
```bash
npm install @aegis-robotic/core
import { AegisGuard } from '@aegis-robotic/core';

const guard = new AegisGuard({ mode: 'zero-trust-ondevice' });
const safeAgent = guard.protect(myAutonomousAgent);
const result = await safeAgent.execute(task);
