<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Mise à jour de STACK.md

**Règle obligatoire :** après chaque modification qui change la stack ou l'architecture du projet, mettre à jour `STACK.md` dans le même commit (ou un commit immédiatement suivant). Cela inclut notamment :

- Ajout / suppression / mise à jour d'une dépendance (`package.json`)
- Nouvelle collection Payload CMS ou modification d'une existante
- Nouvelle route API (`src/app/api/...`)
- Nouveau composant admin custom (importMap)
- Nouvelle variable d'environnement
- Changement de script npm (`scripts/`)
- Nouvelle page ou section de routing (`src/app/[locale]/...`)
- Changement de configuration (next.config.ts, tailwind, i18n, payload.config.ts)
- Nouvelle ville / page pilier
- Tout nouveau service externe intégré
