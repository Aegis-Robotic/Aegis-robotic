# # Aegis Robotic v0.2.0 – Fortress

**Enterprise AI Safety Framework**  
Pare-feu zéro-trust on-device pour agents robotiques et systèmes autonomes.

### Fonctionnalités principales
- Protection temps réel contre les prompt injections et actions dangereuses
- Mode 100 % on-device (aucune donnée ne quitte l’appareil)
- Pipeline de sécurité en 5 étapes (Input → PromptGuard → Action Validation → Privacy Guard → Output + Watermark)
- Audit Ledger immuable pour conformité légale
- CLI intégrée, streaming et hot-reload des politiques
- Conforme **EU AI Act (High-Risk)** et **CSRD/ESRS**

### Installation

```bash
npm install @aegis-robotic/core

import { AegisGuard } from '@aegis-robotic/core';

const guard = new AegisGuard({
  policies: ['no-harmful-actions', 'csrd-compliance', 'no-privacy-leak']
});

const safeAgent = guard.protect(myAutonomousAgent);
const result = await safeAgent.execute(task);

npx aegis scan "Génère mon bilan carbone 2025"
# → ✅ SAFE ou ❌ BLOCKED avec explication détaillée
