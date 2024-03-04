///////////////////////////////////////////////////////////////////
// AIDES //////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////

// Attente que le DOM soit chargé avant d'utiliser Javascript
// 	document.addEventListener('DOMContentLoaded', function (event) {
//		Mes instruction js
//	}
	
//  Activation / Désactivation d'un élément (cliquable / non cliquable)
// document.getElementById(leBouton).disabled = true;	-> non cliquable
// document.getElementById(leBouton).disabled = false; 	-> cliquable

// Montrer / cacher un élément
// document.getElementById('zoneQuestion').style.display="block";	-> Affiché
// document.getElementById('zoneQuestion').style.display="none";	-> Invisible

// Modification du contenu html d'un élément
//document.getElementById('theQuestion').innerHTML="Contenu<br>';

// Valeur entière alétoire entre min et max
//	let min=0;
//	let max=4 ;
//	valeurAleatoire=Math.floor(Math.random() * (max - min + 1)) + min; 

// Tableaux à plusieurs dimensions
//	let monTableau=[];
//	monTableau[1]=[];
//	montableau[1][1]="Contenu 1" ;
//	montableau[1][2]="Contenu 2" ;

// Suppression d'un item dans un tableau
//  indiceASupprimer=2;
// 	nbItemsASupprimer=1;
// 	tableauTravail.splice([indiceASupprimer],nbItemsASupprimer) ;	

// Modification classes d'un élément
//	document.getElementById('monElement').className="maClasse"; // Remplacement des classes existantes par maClasse

// Modification de l'image d'une balise img
//	document.getElementById('theFlag').src="/images/monImage.jpg";

// Modification de la valeur d'un radio
//	document.getElementById("MonRadio").value="maValeur";

// Check / uncheck radio
//	document.getElementById('radio').checked=true;
//	document.getElementById('radio').checked=false;

// Ajout d'un écouteur d'évenement avec appel une série d'instructions 
//	document.getElementById('monElement1').addEventListener('click', function() {
// 		console.log("L'évenement a été lancé");
// 		console.log("L'évenement a été lancé sur l'élément : " + this.id);
//	});

// Exemple de boucle sur des radios
//		for (i=0; i<=4 ; i++){
//			if (document.getElementById('radio'+i).disabled==false){
//				document.getElementById('labelRadio'+i).className="maClasse";
//			}
//			document.getElementById('radio'+i).disabled=true;
//			// Ajout d'un écouteur 
//			monRadio=document.getElementById('radio'+i);
//			monRadio.addEventListener('click', function() {
//				// Instructions à exécuter lors du clic sur un des radios
//				// console.log(this.id) ; 	// Affichage dans la console de l'id du bouton
//			});		
//		}
		
// Exemple switch
//	switch (laLangueChoisie) {
//		case "Fr" :
//			messageErreur="Mauvaise réponse, voici le drapeau du pays ";
//			break ;
//		case "En" :
//			messageErreur="Wrong answer, here is the flag of the country";
//			break ;
//		case "Es" :
//			messageErreur="Respuesta incorrecta, aquí está la bandera del país ";
//			break ;
//	}


document.addEventListener('DOMContentLoaded', function (event) {
	// Attente que le DOM soit chargé avant d'utiliser Javascript
	// Ecrire votre code ici
	
});
