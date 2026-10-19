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
   mettreAJourEtoile();
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
const pageAccueil = document.getElementById("page-accueil");
const pageFavoris = document.getElementById("page-favoris");
const navAccueil = document.getElementById("nav-accueil");
const navFavoris = document.getElementById("nav-favoris");

function montrerPage(nom) {
  const surAccueil = nom === "accueil";
  pageAccueil.hidden = !surAccueil;
  pageFavoris.hidden = surAccueil;
  navAccueil.classList.toggle("actif", surAccueil);
  navFavoris.classList.toggle("actif", !surAccueil);
}

navAccueil.addEventListener("click", () => montrerPage("accueil"));
navFavoris.addEventListener("click", () => montrerPage("favoris"));
const CLE = "favoris";

function lireFavoris() {
  try {
    return JSON.parse(localStorage.getItem(CLE)) || [];
  } catch (erreur) {
    return [];
  }
}

function enregistrerFavoris(liste) {
  try {
    localStorage.setItem(CLE, JSON.stringify(liste));
  } catch (erreur) {}
}

const boutonFavori = document.getElementById("bouton-favori");
const listeFavoris = document.getElementById("liste-favoris");
const messageVide = document.getElementById("message-vide");

function citationAffichee() {
  return document.getElementById("citation").textContent;
}

function mettreAJourEtoile() {
  const estFavori = lireFavoris().includes(citationAffichee());
  boutonFavori.textContent = estFavori ? "★" : "☆";
  boutonFavori.classList.toggle("favori", estFavori);
  boutonFavori.setAttribute(
    "aria-label",
    estFavori ? "Retirer des favoris" : "Ajouter aux favoris"
  );
}

function afficherFavoris() {
  const favoris = lireFavoris();
  listeFavoris.replaceChildren();
  messageVide.hidden = favoris.length > 0;

  favoris.forEach((texte) => {
    const ligne = document.createElement("li");
    const phrase = document.createElement("span");
    phrase.textContent = texte;

    const retirer = document.createElement("button");
    retirer.className = "retirer";
    retirer.textContent = "✕";
    retirer.setAttribute("aria-label", "Retirer des favoris");
    retirer.addEventListener("click", () => {
      enregistrerFavoris(lireFavoris().filter((c) => c !== texte));
      mettreAJourEtoile();
      afficherFavoris();
    });

    ligne.append(phrase, retirer);
    listeFavoris.appendChild(ligne);
  });
}

function basculerFavori() {
  if (citations.length === 0) return;

  const texte = citationAffichee();
  let favoris = lireFavoris();

  if (favoris.includes(texte)) {
    favoris = favoris.filter((c) => c !== texte);
  } else {
    favoris.push(texte);
  }

  enregistrerFavoris(favoris);
  mettreAJourEtoile();
  afficherFavoris();
}

boutonFavori.addEventListener("click", basculerFavori);
afficherFavoris();
const boutonPartager = document.getElementById("bouton-partager");
const iconePartage = boutonPartager.innerHTML;

async function partager() {
  if (citations.length === 0) return;

  const texte = "« " + citationAffichee() + " »";
  const lien = "https://adeli36.github.io/citations/";

  if (navigator.share) {
    try {
      await navigator.share({
        title: "Ma dose de motivation",
        text: texte,
        url: lien
      });
    } catch (erreur) {
      // La personne a fermé le menu de partage : rien à faire.
    }
  } else if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(texte + "\n" + lien);
      boutonPartager.textContent = "✓";
      setTimeout(() => {
        boutonPartager.innerHTML = iconePartage;
      }, 1500);
    } catch (erreur) {}
  }
}

boutonPartager.addEventListener("click", partager);