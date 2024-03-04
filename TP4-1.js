document.addEventListener('DOMContentLoaded', function (event) {
	// Attente que le DOM soit chargé avant d'utiliser Javascript
	// Ecrire votre code ici
    let liste_Fr= [];
    let liste_En= [];
    let liste_Es= [];

    let urlRecherche="https://flagcdn.com";  // Url de l'API
    // Remplissage tableau des pays en français
    httpRequest(urlRecherche+"/fr/codes.json",liste_Fr);
    // Remplissage tableau des pays en anglais
    httpRequest(urlRecherche+"/en/codes.json",liste_En);
    // Remplissage tableau des pays en Espagnol
    httpRequest(urlRecherche+"/es/codes.json",liste_Es);

    const leBoutonFr = document.getElementById("leBoutonFr");
    const leBoutonEn = document.getElementById("leBoutonEn");
    const leBoutonEs = document.getElementById("leBoutonEs");

    leBoutonFr.addEventListener("click", function(){
        console.log(liste_Fr);
    });

    leBoutonEn.addEventListener("click", function(){
        console.log(liste_En);
    });

    leBoutonEs.addEventListener("click", function(){
        console.log(liste_Es);
    });


	

});
