document.addEventListener('DOMContentLoaded', function (event) {
    // Attente que le DOM soit chargé avant d'utiliser Javascript
    // Ecrire votre code ici

    // La partie en cours
    let partie;

    const zoneQuestion = document.getElementById("zoneQuestion");
    zoneQuestion.style.display = "none";

    const leBoutonFr = document.getElementById("leBoutonFr");
    const leBoutonEn = document.getElementById("leBoutonEn");
    const leBoutonEs = document.getElementById("leBoutonEs");

    const theFlag = document.getElementById("theFlag");
    const theQuestion = document.getElementById("theQuestion");
    const erreur = document.getElementById("erreur");

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


    class Partie {

        #score;
        #nbQuestions;
        #listeSelectionner;
        #paysChoisi;

        constructor(listePays, langue) {
            this.score = 0;
            this.nbQuestions = 0;
            this.listePays = listePays;
            this.langue = langue;
        }

        /**
         * @param liste La liste de tous les pays
         * @param langue La langue de la liste des pays. Peut-être "fr", "en" ou "es"
         */
        preparerQuestion() {
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

            deselectionnerTousLesRadios();

            //On affiche les 5 pays dans la zone de question
            for (let i = 0; i < this.listeSelectionner.length; i++) {
                tabLabelRadio[i].innerHTML = this.listeSelectionner[i].nom;
            }
            //On met les valeurs des radios
            for (let i = 0; i < this.listeSelectionner.length; i++) {
                tabRadio[i].value = this.listeSelectionner[i].code;
            }

            for (let i = 0; i < tabRadio.length; i++) {
                tabRadio[i].addEventListener("click", () => {
                    this.radioClicked(i);
                });
            }
        }

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

        mauvaiseReponse(index) {
            console.log("Mauvaise réponse");
            tabLabelRadio[index].style.color = "red";
            erreur.innerHTML = "Mauvaise réponse";

        }

        bonneReponse(index) {
            console.log("Bonne réponse");
            this.score++;
            tabLabelRadio[index].style.color = "green";
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
    function deselectionnerTousLesRadios() {
        for (let i = 0; i < tabRadio.length; i++) {
            tabRadio[i].checked = false;
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


});
