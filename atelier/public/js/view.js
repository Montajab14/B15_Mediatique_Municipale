// L'affichage de Cap Web : transforme l'historique en lignes de la liste, sans règle de réponse.

const PREFIXES = {
  user: 'Vous : ',
  assistant: 'Cap Web : '
};

export function renderMessages(messages, container) {
  const lignes = messages.map((message) => {
    const ligne = document.createElement('li');
    ligne.textContent = PREFIXES[message.role] + message.text;
    return ligne;
  });
  container.replaceChildren(...lignes);
}
