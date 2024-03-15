document.addEventListener('DOMContentLoaded', function (event) {
    // Attente que le DOM soit chargé avant d'utiliser Javascript
    // Ecrire votre code ici

    // La partie en cours
    let partie;

    const zoneQuestion = document.getElementById("zoneQuestion");


    const leBoutonFr = document.getElementById("leBoutonFr");
    const leBoutonEn = document.getElementById("leBoutonEn");
    const leBoutonEs = document.getElementById("leBoutonEs");

    const theFlag = document.getElementById("theFlag");
    const theQuestion = document.getElementById("theQuestion");
    const erreur = document.getElementById("erreur");
    const rejouer = document.getElementById("rejouer");

    const tabLabelRadio = [
        document.getElementById("labelRadio0"),
        document.getElementById("labelRadio1"),
        document.getElementById("labelRadio2"),
        document.getElementById("labelRadio3"),
        document.getElementById("labelRadio4")
    ];

    const tabRadio = [
        document.getElementById("radio0"),
        document.getElementById("radio1"),
        document.getElementById("radio2"),
        document.getElementById("radio3"),
        document.getElementById("radio4")
    ];


    const nbJeux = document.getElementById("Nbjeux");
    const points = document.getElementById("points");
    const nbPointTotal = document.getElementById("pointsPossibles");

    //On cache la zone de question
    zoneQuestion.style.display = "none";

    class Partie {

        #scorePossible;
        #scoreTotal;
        #nbQuestions;
        #listeSelectionner;
        #paysChoisi;

        /**
         * @param listePays La liste de tous les pays
         * @param langue La langue de la liste des pays. Peut-être "fr", "en" ou "es"
         */
        constructor(listePays, langue) {
            this.scorePossible = 0;
            this.scoreTotal = 0;
            this.nbQuestions = 0;
            this.listePays = listePays;
            this.langue = langue;

            //On ajoute un écouteur sur chaque radio
            //pour savoir si l'utilisateur a cliqué sur une radio
            for (let i = 0; i < tabRadio.length; i++) {
                tabRadio[i].addEventListener("click", () => {
                    this.radioClicked(i);
                });
            }
        }

        miseAJourLibelles() {
            console.log("Nb Questions : " + this.nbQuestions);
            console.log("Score Total : " + this.scoreTotal);
            console.log("Score Possible : " + this.scorePossible);
            nbJeux.innerHTML = this.nbQuestions;
            points.innerHTML = this.scoreTotal;
            nbPointTotal.innerHTML = (this.nbQuestions * 5).toString();
        }


        /**
         * Prépare une question
         * Affiche le drapeau du pays choisi alétoirement
         * et les 5 réponses possibles
         */
        preparerQuestion() {

            //On incrémente le nombre de questions
            this.nbQuestions++;

            this.scorePossible = 5;
            this.miseAJourLibelles();

            //On cache le bouton 'rejouer'
            rejouer.style.display = "none";

            //On supprime le message d'erreur
            erreur.innerHTML = "";

            //On récupère 5 pays aléatoires dans la liste
            this.listeSelectionner = get5RandomCountries(this.listePays);
            console.log(this.listeSelectionner)

            //On sélectionne un pays aléatoire parmi les 5 de la liste
            let index = Math.floor(Math.random() * this.listeSelectionner.length);
            this.paysChoisi = this.listeSelectionner[index];

            //On affiche le drapeau du pays choisi
            theFlag.src = this.paysChoisi.drapeau;
            //On affiche la question
            switch (this.langue) {
                case "fr":
                    theQuestion.innerHTML = "De quel pays/état est ce drapeau ?";
                    break;
                case "es":
                    theQuestion.innerHTML = "¿ De qué país/estado es esta bandera ?";
                    break;
                default:
                    theQuestion.innerHTML = "What country/state is this flag from ?";
            }

            // On remet les jeux dans l'état initial
            resetTousLesRadios();

            //On affiche les 5 pays dans la zone de question
            for (let i = 0; i < this.listeSelectionner.length; i++) {
                tabLabelRadio[i].innerHTML = this.listeSelectionner[i].nom;
            }
            //On met les valeurs des radios
            for (let i = 0; i < this.listeSelectionner.length; i++) {
                tabRadio[i].value = this.listeSelectionner[i].code;
            }


        }

        /**
         * Appelée lorsque l'utilisateur clique sur une radio
         * @param index L'index de la radio qui est cliqué
         */
        radioClicked(index) {
            console.log(tabRadio[index]);
            console.log(tabRadio[index].value);
            //On vérifie si la radio cliquée est la bonne réponse
            if (tabRadio[index].value === this.paysChoisi.code) {
                this.bonneReponse(index);
            } else {
                this.mauvaiseReponse(index);
            }
        }

        /**
         * Appelée lorsque la mauvaise réponse est donnée
         * @param index L'index de la radio qui est cliqué
         */
        mauvaiseReponse(index) {
            console.log("Mauvaise réponse");
            tabLabelRadio[index].style.color = "red";
            let paysSaisie = this.listeSelectionner[index];
            switch (this.langue) {
                case "fr":
                    erreur.innerHTML = "Mauvaise réponse, voici le drapeau du pays/état " + paysSaisie.nom + "<br> <img class='flagKO' src='" + paysSaisie.drapeau + "'>";
                    break;
                case "es":
                    erreur.innerHTML = "Respuesta incorrecta, aquí está la bandera del país/estado " + paysSaisie.nom + "<br> <img class='flagKO' src='" + paysSaisie.drapeau + "'>";
                    break;
                default:
                    erreur.innerHTML = "Wrong answer, here is the flag of the country/state " + paysSaisie.nom + "<br> <img class='flagKO' src='" + paysSaisie.drapeau + "'>";
            }

            this.scorePossible--;

        }

        /**
         * Appelée lorsque la bonne réponse est donnée
         * @param index L'index de la radio qui est cliqué
         */
        bonneReponse(index) {
            console.log("Bonne réponse");
            this.scoreTotal += this.scorePossible;
            tabLabelRadio[index].style.color = "green";

            //Désactiver les radios
            for (let i = 0; i < tabRadio.length; i++) {
                tabRadio[i].disabled = true;
            }

            erreur.innerHTML = "<img class='flagOK' src=\"images/OK.jpg\">";
            rejouer.style.display = "block";

            this.miseAJourLibelles();
        }
    }


    /**
     * Récupère 5 élement aléatoirement dans la liste
     * @param liste liste où on veut récupérer 5 éléments
     * @returns {*[]} la liste des 5 éléments pris aléatoirement
     */
    function get5RandomCountries(liste) {
        let liste5 = [];

        for (let i = 0; i < 5; i++) {
            let index = Math.floor(Math.random() * liste.length);
            liste5.push(liste[index]);
        }

        return liste5;
    }

    /**
     * Cette fonction parcourt tous les éléments du tableau 'tabRadio' et décoche les boutons radio.
     * Elle est utilisée pour réinitialiser l'état des boutons radio à chaque nouvelle question.
     */
    function resetTousLesRadios() {
        for (let i = 0; i < tabRadio.length; i++) {
            tabRadio[i].checked = false;
            tabRadio[i].disabled = false;
            tabLabelRadio[i].style.color = "black";
        }
    }


    leBoutonFr.addEventListener("click", function () {
        zoneQuestion.style.display = "block";
        leBoutonFr.disabled = true;
        leBoutonEn.disabled = false;
        leBoutonEs.disabled = false;

        partie = new Partie(list_Fr, "fr");
        partie.preparerQuestion();
    });

    leBoutonEn.addEventListener("click", function () {
        zoneQuestion.style.display = "block";
        leBoutonEn.disabled = true;
        leBoutonFr.disabled = false;
        leBoutonEs.disabled = false;

        partie = new Partie(list_En, "en");
        partie.preparerQuestion();
    });

    leBoutonEs.addEventListener("click", function () {
        zoneQuestion.style.display = "block";
        leBoutonEs.disabled = true;
        leBoutonEn.disabled = false;
        leBoutonFr.disabled = false;

        partie = new Partie(list_Es, "es");
        partie.preparerQuestion();
    });

    rejouer.addEventListener("click", function () {
        partie.preparerQuestion();
    });


});
