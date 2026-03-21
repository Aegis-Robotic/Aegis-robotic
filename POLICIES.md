Aegis Fortress — Documentation des Politiques de Sécurité
Version 0.2.0
Date : Mars 2026
Conformité : EU AI Act (High-Risk), CSRD/ESRS, ISO 42001
Aegis Fortress applique un pipeline de sécurité en 5 couches pour protéger les agents autonomes (robots, drones, logiciels).
1. Architecture du Pipeline de Sécurité
Chaque requête passe par les 5 étapes suivantes :
1.  Input Validation
2.  PromptGuard (anti-injection)
3.  Action Validation (anti-harmful actions)
4.  Privacy Guard (fuite de données)
5.  Output + Watermark (vérification finale + traçabilité)

2. Politiques de Sécurité Disponibles
no-harmful-actions
•  Objectif : Bloquer toute action physique ou logique dangereuse.
•  Exemples bloqués :
	•  Mouvements brusques du robot
	•  Accès à des zones interdites
	•  Exécution de code arbitraire
•  Niveau : Critique (bloque par défaut)
no-prompt-injection
•  Objectif : Détecter et neutraliser les tentatives d’injection de prompt.
•  Techniques :
	•  Détection de patterns malveillants
	•  Sandboxing des instructions
	•  Validation sémantique
no-privacy-leak
•  Objectif : Empêcher toute fuite de données sensibles (personnelles, géolocalisation, logs internes).
•  Règles :
	•  Masquage automatique des PII
	•  Blocage des requêtes vers des domaines externes non autorisés
	•  Chiffrement local des données en mémoire
csrd-compliance
•  Objectif : Garantir la conformité au reporting carbone et durabilité (CSRD/ESRS).
•  Fonctionnalités :
	•  Calcul automatique des émissions
	•  Journalisation immuable des consommations
	•  Génération de rapports audités
output-watermark
•  Objectif : Marquer toutes les sorties pour traçabilité.
•  Mécanisme : Insertion d’un watermark cryptographique invisible dans les réponses.
audit-immutable
•  Objectif : Enregistrer toutes les actions de façon immuable.
•  Stockage : Ledger local (option : export vers blockchain).

3. Configuration des Politiques
4. import { AegisGuard } from '@aegis-robotic/core';

Configuration des Politiques:
const guard = new AegisGuard({
  policies: [
    'no-harmful-actions',
    'no-prompt-injection',
    'no-privacy-leak',
    'csrd-compliance',
    'output-watermark',
    'audit-immutable'
  ],
  severity: 'strict',           // 'strict' | 'balanced' | 'permissive'
  logLevel: 'full'              // 'full' | 'summary' | 'none'
});


Désactiver une politique spécifique:
const guard = new AegisGuard({
  policies: ['no-harmful-actions', 'no-privacy-leak'],
  disabled: ['csrd-compliance']
});

Commandes CLI:
npx aegis scan "Génère mon bilan carbone 2025"
npx aegis policy list
npx aegis policy enable no-harmful-actions
npx aegis audit export
