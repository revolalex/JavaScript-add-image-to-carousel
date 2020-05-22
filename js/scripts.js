

// Variables globales
let compteur = 0; // Compteur qui permettra de savoir sur quelle slide nous sommes
let timer, elements, slides, slideWidth;

// au chargement de la fenetre
window.onload = () => {
    // On récupère le conteneur principal du diaporama
    const diapo = document.querySelector(".diapo");

    // On récupère le conteneur de tous les éléments
    elements = document.querySelector(".elements");

    // On récupère un tableau contenant la liste des diapos
    slides = Array.from(elements.children);

    // On calcule la largeur visible du diaporama
    /* La méthode Element.getBoundingClientRect() 
    renvoie la taille d'un élément et sa position 
    relative par rapport à la zone d'affichage (viewport).
    En bref on renvoie la taille du rectangle qui contient la diapo */
    slideWidth = diapo.getBoundingClientRect().width;

    // On récupère les deux flèches
    let next = document.querySelector("#nav-droite");
    let prev = document.querySelector("#nav-gauche");

    // On met en place les écouteurs d'évènements sur les flèches
    next.addEventListener("click", slideNext); // click sur la fleche next execute la fonction slideNext
    prev.addEventListener("click", slidePrev); // click sur la fleche prev execute la fonction slidePrev

    // Automatiser le diaporama
    // setInterval déclenche le changement de diapo("slideNext") tous les 4s
    timer = setInterval(slideNext, 4000);

    // pour ne pas avoir de conflit entre le diapo auto et la souris
    // Gérer le survol de la souris
    // quans la souris est sur la diapo on éxécuté stopTimer
    diapo.addEventListener("mouseover", stopTimer);

    // quand la souris sort de la diapo on éxécute startTimer
    diapo.addEventListener("mouseout", startTimer);

    // Mise en oeuvre du "responsive" on écoute si la fenetre est resize
    window.addEventListener("resize", () => {
        slideWidth = diapo.getBoundingClientRect().width; //on recalcul la largeur de notre diapo
        slideNext();
    })

}


// Cette fonction fait défiler le diaporama vers la droite (fleche next)
function slideNext(){
    // On incrémente le compteur
    compteur++;

    // Si on est à la fin du diaporama, 
    if(compteur == slides.length){
        compteur = 0; // on "rembobine" 
    }

    // On calcule la valeur du décalage: largeur de la diapo * compteur (- slideWidth car décalage à gauche donc négatif)
    let decal = -slideWidth * compteur;
    elements.style.transform = `translateX(${decal}px)`; // avec CSS translateX pour décaller l'image 
}


 // Cette fonction fait défiler le diaporama vers la gauche (fleche prev)
function slidePrev(){
    // On décrémente le compteur
    compteur--;

    // Si on dépasse le début du diaporama
    if(compteur < 0){
        compteur = slides.length - 1; // on repart à la fin
    }

    // On calcule la valeur du décalage
    let decal = -slideWidth * compteur;
    elements.style.transform = `translateX(${decal}px)`;
}


// On stoppe le défilement
function stopTimer(){
    clearInterval(timer); // clearInterval stoppe l'action de setInterval
}


 // On redémarre le défilement
function startTimer(){
    timer = setInterval(slideNext, 2000);
}

// Cette fonction permet d'ajouter une image dans le caroussel
function ajouterImage(numero, text){
    // code html de l'image
    const divImage =
    `<div class="element">
    <img src="images/${numero}.jpg" alt="">
        <div class="texte">
            <h2>${text}</h2>
        </div>
    </div>`;

    // ajout du code
    elements = document.querySelector(".elements");
    elements.insertAdjacentHTML("beforeend", divImage);

    // update tableau d'images
    slides = Array.from(elements.children);

    // affiche le nombre d'image dans le carrousel
    nbreImage();

    // image suivante
    slideNext();
 
}

// cette fonction ajoute un h4 affichant le nombre d'images dans le caroussel (slides = collection)
function nbreImage(){
    // on efface le précédent text avec Jquery function
    $('h4').remove(); 
    
    // le code du html du texte
    const divNbreImages =
    `<div id="nbreImg" style="text-align: center;">
        <h4 id="textNbre"> La caroussel contient ${slides.length} images</h4>
    </div>`;

    const diapo = document.querySelector(".diapo");

    // on insere le code du texte à la position beforebegin
    diapo.insertAdjacentHTML("beforebegin", divNbreImages);

}

// essayer de remplacer le remove h4 jquery
/*

function removeElement(elementId) {
    // Removes an element from the document.
    var element = document. getElementById(elementId);
    element. parentNode. removeChild(element);
    }

*/











