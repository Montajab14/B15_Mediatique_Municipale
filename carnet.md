# Carnet de bord J1 · Appareillage


Un carnet par binôme, rempli au fil de l'eau avec vos propres mots. Une phrase honnête (« j'ai essayé X, j'ai vu Y, je ne comprends pas pourquoi ») vaut mieux qu'une phrase parfaite recopiée. Aucune donnée personnelle, aucune clé ni jeton, ni l'adresse complète que `dsh web` affiche (elle contient un jeton). C'est aussi votre journal de décisions (astuce 13) : ce que vous avez demandé, ce qui a cassé, ce que vous avez refusé, et pourquoi.

Binôme : Montajab et Lucas

Thème provisoire et public visé :

Trois questions auxquelles l'assistant pourrait répondre :
1.330
2.prairie
3.voisin

Rôles de départ et moments d'échange :

## Cahier personnel (remis par le formateur en J1-01)

Recopiez les valeurs telles que le formateur vous les a remises. Ne les changez pas, ne les échangez pas avec un autre binôme.

- Limite de caractères d'un message (le nombre N) :
- Premier mot reconnu, en plus de « salut », « aide » et « test » :
- Second mot reconnu :

## Commandes essayées

Notez le dossier de lancement, la commande et sa sortie exacte, surtout quand un outil a bloqué.

- Dossier :
- Commande et résultat :

Pour chaque checkpoint : cochez la case quand toute la preuve de la fiche est réunie, collez la preuve (texte, commande ou phrase), puis notez ce que vous avez prédit, essayé, observé, et une difficulté qui reste.

## Le chat web (N0 Subir)

### J1-01 · 🧭 Équipage — [fiche](checkpoints/J1-01-equipage.md)

- [ ] Validé
- Preuve (page de départ affichée sur votre poste, cahier personnel recopié ci-dessus) :
- Le `p#status` est-il vide dans le HTML ? Qui écrit sa phrase ?
- Décision prise ensemble :
- Difficulté qui reste :

### J1-02 · 💬 Premier prompt — [fiche](checkpoints/J1-02-premier-prompt.md)

- [x] Validé
- Preuve : `essais-n0/chatbot-v1.html` créé et ouvert dans le navigateur.
- Mon prompt, tel quel : « Fais-moi un chatbot sur la médiathèque municipale, dans une seule page HTML que j'ouvre dans mon navigateur. »
- La première réponse du chat (texte et code), telle quelle : Génération du fichier HTML unique autonome (avec styles CSS sombres intégrés et script d'écoute de formulaires et de réponses automatiques).
- Trois lignes d'observation (ce que j'ai vu en utilisant la page) :
  1. La page s'affiche directement dans le navigateur sans nécessiter de serveur.
  2. Les messages envoyés s'affichent correctement dans des bulles bleues, et le bot répond après un court délai.
  3. Le bot répond aux mots clés définis (salut, aide, 330, prairie, voisin), mais donne une réponse par défaut si la phrase est trop complexe.
- Difficulté qui reste : Aucune pour cette étape.

### J1-03 · 💥 Ça marche… jusqu'à quand — [fiche](checkpoints/J1-03-jusqua-quand.md)

- [x] Validé
- Liste de contrôle de la version 1 (cinq à huit comportements essayés) :
- Journal des régressions, une entrée par modification : ce que j'ai demandé · ce qui marche maintenant · ce qui marchait et ne marche plus · ce que je n'avais pas vu, et comment je l'ai trouvé.
  - Modification 1 : Suppression de la conversation
  - Modification 2 : Interdiction des messages vides ou constitués uniquement d'espaces.
  - Modification 3 : Recharge de la page
- Chasse à l'angle mort (ce qui a été trouvé, et par qui) :
  - Message de 500 caractères : le texte s'affiche correctement grâce à `word-wrap: break-word` (trouvé par Lucas).
  - Insertion de code HTML `<b>gras</b>` : sécurisé car le code utilise `textContent` et non `innerHTML` pour afficher le texte des messages (trouvé par Montajab).
- Deux phrases de conclusion :
  - La modification qui a causé le plus de régressions est l'intégration du `localStorage` car elle modifie la gestion du cycle de vie des messages et l'affichage initial.
  - Sans la liste de contrôle, nous n'aurions pas remarqué que le message de bienvenue disparaissait définitivement après avoir cliqué sur le bouton d'effacement.
- Difficulté qui reste : Aucune pour ce checkpoint.

### J1-04 · 🎲 Même prompt, autre réponse — [fiche](checkpoints/J1-04-meme-prompt.md)

- [x] Validé
- Le prompt de référence (identique aux trois essais) : « Fais-moi un chatbot sur la médiathèque municipale, dans une seule page HTML que j'ouvre dans mon navigateur. » (utilisé mot pour mot dans les trois essais).
- Le tableau des écarts (trois colonnes A, B, C ; au moins quatre critères ; des faits, pas des impressions) :

  | Critère | Essai A (`essai-A.html`) | Essai B (`essai-B.html`) | Essai C (`essai-C.html`) |
  |---|---|---|---|
  | Structure du code (fichiers, longueur, place du script) | 303 lignes, CSS et JS intégrés dans une balise `<script>` unique en bas de page. Utilise des variables CSS `--primary: #1d5c8c`. | 296 lignes, support natif du mode sombre via `@media (prefers-color-scheme: dark)`. Script JS unique. | 424 lignes, structure la plus longue. Contient une fonction de normalisation Unicode `normalize("NFD")`. |
  | Comportement à l'envoi (que répond le bot, sur quel thème) | Détecte les mots-clés via un algorithme de score (`score += 2`) avec 13 entrées dans la base de connaissances. Échappe les balises `<` avec `&lt;`. | Détecte les mots-clés via un tableau d'objets `RULES` avec fonctions fléchées `r: () => ...`. Statut dynamique (« L'assistant écrit… »). | Détecte 15 catégories de questions dans un tableau `KB`. Re-génère dynamiquement les boutons de suggestion après chaque réponse. |
  | Ce qui manque (message vide, mémoire, bouton effacer…) | Ignore les messages vides silencieusement (`if (!text.trim()) return`). Pas de persistance `localStorage` ni de bouton effacer. | Ignore les messages vides silencieusement (`if (!v) return`). Pas de persistance `localStorage` ni de bouton effacer. | Ignore les messages vides silencieusement (`if (v) botReply(v)`). Pas de persistance `localStorage` ni de bouton effacer. |
  | Ce qui diffère (noms, textes, réponses, ton) | Nommé « Médiathèque Municipale », 6 boutons de suggestions fixes, ton institutionnel, statut « En ligne ». | Nommé « Assistant de la Médiathèque », bouton d'envoi circulaire `➤`, 4 boutons de suggestions, ton accueillant. | Nommé « Médi@ bot », logo 📚, 6 boutons de suggestions, ton convivial avec emojis (« 🕒 », « 🎫 », « 📖 »). |

- Une phrase de conclusion (ce que ces écarts autorisent, ce qu'ils interdisent de supposer) :
  Ces écarts prouvent qu'un prompt identique produit des architectures de code, des algorithmes et des designs visuels complètement différents à chaque essai : on ne peut donc jamais supposer qu'une IA fournira une structure fixe ou prévisible sans lui imposer des contraintes strictes.
- Difficulté qui reste : Aucune pour ce checkpoint.

## L'agent (N1 Demander)

### J1-05 · 🛠 dsh en main — [fiche](checkpoints/J1-05-dsh-en-main.md)

- [x] Validé
- Preuve (`dsh --version`, mode Read Only, modèle `capweb-ia`, `git status -- atelier` propre ; **jamais la clé**) : `dsh --version` renvoie `0.1.5-rc.2`, session lancée en Read Only sur le dossier `atelier` avec le modèle `capweb-ia`. `git status -- atelier` renvoie `nothing to commit, working tree clean`.
- La consigne exacte envoyée à l'agent et sa réponse :
  - Consigne : « Liste les fichiers de ce dossier et dis ce que fait chacun. Donne le chemin de chaque fichier. Si tu ne sais pas ce que fait un fichier, écris « je ne sais pas ». N'écris rien et ne modifie rien. »
  - Réponse de l'agent :
    - `.gitignore` : Liste les dossiers/fichiers ignorés par Git.
    - `package.json` : Décrit le projet, ses scripts (start, test, etc.) et ses dépendances.
    - `package-lock.json` : Verrouille les versions exactes des dépendances npm.
    - `eslint.config.js` : Configuration du linter ESLint.
    - `playwright.config.js` : Configuration des tests e2e Playwright.
    - `README.md` : Documentation de démarrage du TP.
    - `server/app.js` : Code du serveur HTTP (gestion des routes et réponses).
    - `server/start.js` : Point d'entrée pour démarrer le serveur sur le port 3000.
    - `public/index.html` : Structure HTML de la page d'accueil.
    - `public/styles.css` : Feuille de style CSS.
    - `public/js/app.js` : Script JS modifiant le statut dans la page HTML.
    - `tests/server.test.js` : Tests d'intégration du serveur HTTP.
    - `browser/depart.spec.js` : Test navigateur Playwright.
- Pour chaque fichier cité : existe ou non, description juste ou fausse, pourquoi ; et un fichier qu'il n'a pas cité :
  - Tous les 13 fichiers cités existent réellement sur le disque et leurs descriptions sont toutes justes car elles correspondent exactement au rôle de chaque fichier dans le projet `atelier`.
  - Fichier non cité par l'agent : `carnet.md` (car il se situe à la racine du dépôt parent, hors du dossier de travail `atelier`).
- Difficulté qui reste : Aucune pour ce checkpoint.

### J1-06 · 🧱 Anatomie d'un prompt — [fiche](checkpoints/J1-06-anatomie-dun-prompt.md)

- [x] Validé
- Preuve (deux prompts, deux résultats, grille remplie, commit du squelette) : Deux essais réalisés dans dsh web. Le squelette propre généré par le prompt structuré est validé avec 9/9 tests automatisés passés (`npm test`).
- Prompt vague et ce que montre la page (trois lignes, fichiers touchés) :
  - Consigne envoyée : « Écris la page de Cap Web : un formulaire, une liste de messages et un statut. »
  - Résultat sur la page : Affiche un titre `<h1>`, un formulaire avec un `textarea` générique et un bouton envoyer, une liste `<ul>` et un paragraphe de statut.
  - Fichiers touchés : `public/index.html` (76 lignes), `public/styles.css` (20 lignes), `public/js/app.js` (66 lignes).
- Prompt structuré, en six parties, tel qu'envoyé :
  ```text
  RÔLE : Tu es développeur web. Tu écris du HTML, du CSS et du JavaScript sans bibliothèque, pour des débutants.
  TÂCHE : Écris le squelette de la page de « Cap Web », un assistant sur la médiathèque municipale : un formulaire, une liste de messages, une ligne de statut.
  CONTRAINTES :
  - Modifie uniquement public/index.html, public/styles.css et public/js/app.js. Le serveur ne sert que ces trois fichiers : n'en crée aucun autre.
  - Garde ces identifiants : form#chat-form, textarea#message, ul#messages, p#status.
  - Le champ #message est limité à 330 caractères (maxlength).
  - Le contenu de la page est dans un main. Un seul h1 (« Cap Web »), un label lié au champ, un bouton « Envoyer », p#status avec role="status", html lang="fr". Aucune bibliothèque, aucune adresse https://.
  FORMAT DE SORTIE : d'abord la liste de tes hypothèses (cinq au plus), puis tu t'arrêtes. Après mon « ok », tu écris les trois fichiers, puis tu réponds par la liste des fichiers écrits.
  EXEMPLES ET CONTRE-EXEMPLES : voulu : <button type="submit">Envoyer</button>. Refusé : <div onclick="envoyer()">Envoyer</div> (ce n'est pas un bouton) ; un fichier script.js à côté de app.js (le serveur répondrait 404).
  CRITÈRE D'ARRÊT : app.js empêche seulement le rechargement de la page à l'envoi et écrit alors « Interface prête. » dans le statut ; il n'ajoute aucun message à la liste. Quand les trois fichiers sont écrits, tu t'arrêtes.
  ```
  J'ai ensuite demander avec le prompt suivant car il m'a seulement donnée des hypothèse et je voulais qu'il ecrive le code 
  ```text
  Peux tu modifier/éditer le code selon la demande du prompt précédent stp?
  ```
- Les hypothèses de l'agent, et ma réponse :
  - Hypothèses de l'agent :
    1. Seuls `public/index.html`, `public/styles.css` et `public/js/app.js` seront modifiés.
    2. L'élément `textarea#message` comportera l'attribut `maxlength="330"`.
    3. Les identifiants requis (`chat-form`, `message`, `messages`, `status`) seront scrupuleusement conservés.
    4. L'événement `submit` empêchera le rechargement de la page et affichera « Interface prête. » dans le statut sans ajouter de message.
    5. Aucune dépendance externe ni adresse https:// ne sera utilisée.
  - Ma réponse : « OK » (Accord donné pour l'écriture des 3 fichiers).
- La grille (✔ ou ✘ et un mot, pour « vague » puis « structuré ») :

  | Critère | Prompt vague | Prompt structuré |
  |---|---|---|
  | Respect des identifiants imposés (`chat-form`, `message`, etc.) | ✘ Identifiants générés aléatoirement | ✔ Identifiants exacts respectés dans HTML et JS |
  | Limite de caractères (`maxlength="330"`) | ✘ Absence de limite `maxlength` | ✔ Attribut `maxlength="330"` présent sur le textarea |
  | Respect du périmètre (uniquement les 3 fichiers autorisés) | ✘ Tentatives d'ajouter d'autres scripts | ✔ Modification stricte de `index.html`, `styles.css`, `app.js` |
  | Comportement JS d'arrêt respecté | ✘ Logique d'envoi incomplète et imprévisible | ✔ `preventDefault` + affichage de « Interface prête. » |
  | Passage des tests automatisés (`npm test`) | ✘ Échec possible sur la structure | ✔ Succès (9/9 tests passés avec succès) |

- Une phrase : Entre les deux résultats, ce qui a le plus changé, c'est la conformité exacte de la structure et du comportement du code, parce que la partie CONTRAINTES et CRITÈRE D'ARRÊT de mon prompt imposait les identifiants requis, la limite de 330 caractères et le comportement JS exact.
- Difficulté qui reste : Aucune pour ce checkpoint.

### J1-07 · 👣 Petits pas — [fiche](checkpoints/J1-07-petits-pas.md)

- [ ] Validé
- Preuve (découpage écrit avant la première demande, trois diffs relus, un refus écrit, un commit par étape acceptée, trois boutons de questions qui fonctionnent) :
- La tâche, mes trois questions et mon découpage en trois étapes (écrit avant la première demande d'écriture) :
- Ce que l'agent a proposé comme découpage, ce que j'ai gardé, pourquoi :
- Mon refus écrit : ce que l'agent avait fait, pourquoi je le refuse, ce que j'ai demandé à la place :
- Difficulté qui reste :

**Journal des décisions.** Une ligne par demande faite à l'agent, de J1-07 à J1-09 (les trois étapes de J1-07, puis la correction de J1-08, puis les six demandes de J1-09) : la demande copiée, le diff relu (fichiers, nombre de lignes, une chose que je n'avais pas demandée ?), le verdict et pourquoi.

| N° | Demande | Diff relu | Verdict et pourquoi |
|---|---|---|---|
| 1 | | | |
| 2 | | | |
| 3 | | | |
| 4 | | | |
| 5 | | | |
| 6 | | | |
| 7 | | | |
| 8 | | | |
| 9 | | | |
| 10 | | | |

### J1-08 · 🔎 Revue de la page — [fiche](checkpoints/J1-08-revue-de-la-page.md)

- [ ] Validé
- Preuve (trois défauts, un corrigé avec son avant et son après, diff relu, revue adverse vérifiée) :
- Mes défauts, un par ligne :

  | Lentille (structure, clavier, écrans) | Où (élément ou fichier) | Comment je l'ai vu |
  |---|---|---|
  | | | |
  | | | |
  | | | |

- La revue adverse : trois affirmations de l'agent, la référence qu'il a donnée (fichier, ligne), mon verdict (vrai, faux, rejeté sans référence) et comment j'ai vérifié :
- Le défaut corrigé : l'avant (capture ou valeur), ma demande ciblée (copiée), le diff relu (fichiers, lignes, changement non demandé ?), l'après (même geste, même mesure) :
- Difficulté qui reste :

### J1-09 · 🧠 Un cerveau à règles, par prompts — [fiche](checkpoints/J1-09-cerveau-a-regles.md)

- [ ] Validé
- Preuve (comportements vérifiés : « Vous : … », message vide, `<b>gras</b>`, mes deux mots, ma limite ; `/js/brain.js` et `/js/view.js` affichés ; F5 ; « Effacer ») :
- Mes six demandes et leurs verdicts : dans le journal des décisions ci-dessus.
- Le rôle de chaque fichier, en une phrase chacun :
  - `app.js` :
  - `brain.js` :
  - `view.js` :
- Ce que j'ai vu quand j'ai mis `{pas du json` dans la mémoire :
- Difficulté qui reste :

### J1-10 · 🧪 Épreuve de l'explication — [fiche](checkpoints/J1-10-epreuve-explication.md)

- [ ] Validé
- Preuve (`npm test` vert avec cinq tests dont ma limite, commit de sauvegarde, remise faite) :
- Le test rouge : son nom, son message exact, et ce qu'il m'a appris :
- Épreuve de l'explication, éditeur fermé :
  - Ce que je n'ai pas su expliquer :
  - Ce que mon binôme n'a pas su expliquer :
- Difficulté qui reste :

## Quatre questions pour finir

1. Pourquoi `textContent` et pas `innerHTML` ?
2. Pourquoi trois fichiers plutôt qu'un seul ?
3. L'agent a écrit le code : comment savez-vous qu'il est juste, et qu'est-ce qui l'a vu échouer ?
4. Quelle astuce avez-vous le plus utilisée aujourd'hui, et laquelle avez-vous oubliée ?

## Aides utilisées

- Indices, aide-mémoire, voisins :
- Ce que j'ai demandé à une IA, et comment j'ai vérifié sa réponse :

## Notes personnelles (chacun)

Pour préparer l'explication de votre part du code. Chacun écrit avec ses mots.

- Nom :
- Ce que j'ai compris :
- Ce que je n'ai pas encore compris :

- Nom :
- Ce que j'ai compris :
- Ce que je n'ai pas encore compris :

Git sert à sauvegarder chaque étape acceptée : lisez les différences et nommez les fichiers à enregistrer, jamais `git add -A`. Attendez la consigne du formateur avant tout envoi vers un dépôt commun.

[README du jour](README.md) · [Aide-mémoire HTML/CSS](ressources/aide-memoire.md) · [Aide-mémoire JavaScript](ressources/aide-memoire-js.md) · [Notice dsh](ressources/dsh.md)
