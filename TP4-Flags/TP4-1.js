document.addEventListener('DOMContentLoaded', function (event) {
	// Attente que le DOM soit chargé avant d'utiliser Javascript
	// Ecrire votre code ici

    const leBoutonFr = document.getElementById("leBoutonFr");
    const leBoutonEn = document.getElementById("leBoutonEn");
    const leBoutonEs = document.getElementById("leBoutonEs");

    leBoutonFr.addEventListener("click", function(){
        console.log(list_Fr);
    });

    leBoutonEn.addEventListener("click", function(){
        console.log(list_En);
    });

    leBoutonEs.addEventListener("click", function(){
        console.log(list_Es);
    });


	

});
