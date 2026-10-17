const citations = [
  "Chaque petit pas compte, continue d'avancer.",
  "Tu es plus fort que tu ne le penses.",
  "Aujourd'hui est une nouvelle chance de bien faire.",
  "Ce n'est pas parfait, c'est en progrès, et c'est déjà bien.",
  "Commence là où tu es, avec ce que tu as."
];

let derniere = -1;

function afficher() {
  let i;
  do {
    i = Math.floor(Math.random() * citations.length);
  } while (i === derniere);
  derniere = i;
  document.getElementById("citation").textContent = citations[i];
}

document.getElementById("bouton").addEventListener("click", afficher);
afficher();