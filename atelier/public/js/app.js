import { validateMessage, replyTo } from './brain.js';
import { renderMessages } from './view.js';

const CLE_MEMOIRE = 'capweb.historique';

const form = document.querySelector('#chat-form');
const status = document.querySelector('#status');
const champ = document.querySelector('#message');
const liste = document.querySelector('#messages');
const boutonEffacer = document.querySelector('#effacer');
const suggestions = document.querySelectorAll('#suggestions button');

// Un message valide a exactement la forme { role, text } attendue par view.js.
function estUnMessage(message) {
  return message !== null
    && typeof message === 'object'
    && (message.role === 'user' || message.role === 'assistant')
    && typeof message.text === 'string';
}

// Relit la conversation enregistrée ; une valeur abîmée ne fait pas planter la page.
function chargerHistorique() {
  try {
    const brut = localStorage.getItem(CLE_MEMOIRE);
    if (brut === null) {
      return [];
    }
    const donnees = JSON.parse(brut);
    if (!Array.isArray(donnees) || !donnees.every(estUnMessage)) {
      throw new Error('mémoire invalide');
    }
    return donnees.map(({ role, text }) => ({ role, text }));
  } catch {
    status.textContent = 'La mémoire était illisible : la conversation repart de zéro.';
    return [];
  }
}

function enregistrerHistorique() {
  try {
    localStorage.setItem(CLE_MEMOIRE, JSON.stringify(historique));
  } catch {
    status.textContent = 'La conversation n’a pas pu être enregistrée.';
  }
}

let historique = chargerHistorique();
renderMessages(historique, liste);

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const resultat = validateMessage(champ.value);
  if (!resultat.ok) {
    status.textContent = resultat.error;
    champ.focus();
    return;
  }
  historique.push({ role: 'user', text: resultat.value });
  historique.push({ role: 'assistant', text: replyTo(resultat.value) });
  renderMessages(historique, liste);
  champ.value = '';
  status.textContent = '';
  enregistrerHistorique();
});

boutonEffacer.addEventListener('click', () => {
  if (!confirm('Effacer toute la conversation ?')) {
    return;
  }
  historique = [];
  try {
    localStorage.removeItem(CLE_MEMOIRE);
  } catch {
    // Mémoire indisponible : l'affichage et le tableau sont vidés quand même.
  }
  renderMessages(historique, liste);
  status.textContent = 'Conversation effacée.';
});

suggestions.forEach((bouton) => {
  bouton.addEventListener('click', () => {
    champ.value = bouton.textContent;
    champ.focus();
    status.textContent = 'Question copiée : modifiez-la ou envoyez-la.';
  });
});
