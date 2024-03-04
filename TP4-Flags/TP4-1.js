document.addEventListener('DOMContentLoaded', function (event) {
    // Attente que le DOM soit chargé avant d'utiliser Javascript
    // Ecrire votre code ici

    const leBoutonFr = document.getElementById("leBoutonFr");
    const leBoutonEn = document.getElementById("leBoutonEn");
    const leBoutonEs = document.getElementById("leBoutonEs");

    const paragraphe = document.getElementById("myContent");

    /**
     *
     * @param paragraphe Le paragraphe dans lequel on veut afficher le contenu de liste
     * @param liste Une lsite à deux niveaux
     * @param boutonClicked Le bouton qui a été cliqué pour pouvoir le désactiver
     */
    function afficherDansParagraphe(paragraphe, liste, boutonClicked) {
        // Affiche le contenu de liste dans le paragraphe
        // Ecrire votre code ici
        let contenu = "<table class='table table-striped table-bordered center'> <tr> <th>#</th> <th>Code</th> <th>Pays</th> <th>Drapeau</th> </tr>";
        let cpt = 0;
        for (const pays of liste) {
            contenu += "<tr>";
            contenu += "<td>" + cpt + "</td>";
            contenu += "<td>" + pays.code + "</td>";
            contenu += "<td>" + pays.nom + "</td>";
            contenu += "<td><img class='hightFlag' src='" + pays.drapeau + "'></td>";
            contenu += "</tr>";

            cpt++;
        }
        contenu += "</table>";
        paragraphe.parentNode.innerHTML = contenu;

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
