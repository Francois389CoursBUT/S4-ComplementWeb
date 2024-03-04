document.addEventListener('DOMContentLoaded', function (event) {
    // Attente que le DOM soit chargé avant d'utiliser Javascript
    // Ecrire votre code ici


    // On mélange la liste aléatoirement
    let listeMelangee = list_Fr.sort(() => 0.5 - Math.random());

    let paysAleatoire = []

    console.log(listeMelangee);
    for (let i = 0; i < 5; i++) {
        console.log(listeMelangee[i]);
        paysAleatoire.push(listeMelangee[i]);
    }

    console.log(paysAleatoire);

});
