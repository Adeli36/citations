let citations = [];
let derniere = -1;

function afficher() {
  if (citations.length === 0) return;

  let i;
  do {
    i = Math.floor(Math.random() * citations.length);
  } while (i === derniere && citations.length > 1);

  derniere = i;
  document.getElementById("citation").textContent = citations[i];
}

async function demarrer() {
  try {
    const reponse = await fetch("citations.json");
    citations = await reponse.json();
    afficher();
  } catch (erreur) {
    document.getElementById("citation").textContent =
      "Impossible de charger les citations. Vérifie ta connexion.";
  }
}

document.getElementById("bouton").addEventListener("click", afficher);
demarrer();