document.addEventListener('DOMContentLoaded', function (event) {
    // Attente que le DOM soit chargé avant d'utiliser Javascript
    // Ecrire votre code ici

    const leBoutonFr = document.getElementById("leBoutonFr");
    const leBoutonEn = document.getElementById("leBoutonEn");
    const leBoutonEs = document.getElementById("leBoutonEs");

    const paragraphe = document.getElementById("myContent");

    /**
     *
     * @param paragraphe
     * @param liste Une lsite à deux niveaux
     */
    function afficherDansParagraphe(paragraphe, liste, boutonClicked) {
        // Affiche le contenu de liste dans le paragraphe
        // Ecrire votre code ici
        let contenu = "";
        for (const pays of liste) {
            contenu += "Numéro = " + pays.code + "Code Pays : " + pays.code + " Nom = " + pays.nom + " Drapeau = " + pays.drapeau + "<br>";
        }
        paragraphe.innerHTML = contenu;

        switch (boutonClicked) {
            case leBoutonFr:
                leBoutonFr.disabled = true;
                leBoutonEn.disabled = false;
                leBoutonEs.disabled = false;
                break;
            case leBoutonEn:
                leBoutonEn.disabled = true;
                leBoutonFr.disabled = false;
                leBoutonEs.disabled = false;
                break;
            case leBoutonEs:
                leBoutonEs.disabled = true;
                leBoutonFr.disabled = false;
                leBoutonEn.disabled = false;
                break;

        }
    }


    leBoutonFr.addEventListener("click", function () {
        afficherDansParagraphe(paragraphe, list_Fr, leBoutonFr)
    });

    leBoutonEn.addEventListener("click", function () {
        afficherDansParagraphe(paragraphe, list_En, leBoutonEn)
    });

    leBoutonEs.addEventListener("click", function () {
        afficherDansParagraphe(paragraphe, list_Es, leBoutonEs)
    });


});
