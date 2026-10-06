// Le cerveau de Cap Web : des règles simples, sans aucun accès à la page.

// Limite du cahier personnel : une seule constante, utilisée partout dans ce fichier.
const LIMITE = 330;

const REPONSES = {
  salut: 'Bonjour ! Je suis Cap Web, l’assistant de la médiathèque municipale. Tapez « aide » pour voir ce que je sais faire.',
  aide: 'Je reconnais ces mots : salut, bonjour, aide, test, prairie et voisin. Vous pouvez aussi cliquer sur une des questions proposées.',
  test: 'Test reçu : Cap Web fonctionne.',
  prairie: 'La Prairie, c’est l’espace de lecture en plein air de la médiathèque : on y lit au calme dès les beaux jours.',
  voisin: 'Avec le service Voisin Relais, vous pouvez emprunter des livres pour un voisin qui ne peut pas se déplacer.'
};
REPONSES.bonjour = REPONSES.salut;

const REPLI = 'Je ne connais pas encore la réponse. Tapez « aide » pour voir les mots que je comprends.';

export function validateMessage(raw) {
  if (typeof raw !== 'string') {
    return { ok: false, error: 'Le message doit être du texte.' };
  }
  const value = raw.trim();
  if (value === '') {
    return { ok: false, error: 'Écrivez un message avant d’envoyer.' };
  }
  if (value.length > LIMITE) {
    return { ok: false, error: `Votre message dépasse la limite de ${LIMITE} caractères.` };
  }
  return { ok: true, value };
}

export function replyTo(message) {
  const mot = String(message ?? '').trim().toLowerCase();
  return Object.hasOwn(REPONSES, mot) ? REPONSES[mot] : REPLI;
}
