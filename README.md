# Aegis Robotic

Cadre de sécurité de l'IA pour les agents robotiques et logiciels autonomes.

Pare-feu zéro-trust on-device  
Anti-prompt injection  
Conforme EU AI Act & CSRD  
Intégration NanashiOS & verdi-ai

**Site officiel** : https://aegis-robotic.com

### Installation
```bash
npm install @aegis-robotic/coreimport { AegisGuard } from '@aegis-robotic/core';

const guard = new AegisGuard({ mode: 'zero-trust-ondevice' });
const safeAgent = guard.protect(myAgent);
const result = await safeAgent.execute(task);
