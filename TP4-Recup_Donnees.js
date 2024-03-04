function httpRequest(url,lesPays) {
	//Appel XMLHttpRequest, retourne dans lesPays une liste d'objets pays
	let xhr = new XMLHttpRequest() ; 	// Création de l'objet XMLhttpRequest
	xhr.open('GET', url);     			// Configuration appel 
	xhr.timeout = 10000; 			 	// délai d'attente en ms, 10 secondes
	xhr.send();							// Envoi de la requete
	
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			// requête terminée
			var pays=JSON.parse(xhr.responseText) ;
			let numero=-1;
			for (var key in pays) {
				numero++;
				let lePays={};
				lePays.code=key;
				lePays.nom=pays[key]
				lePays.drapeau="https://flagcdn.com/w640/" + key + ".png";
				lesPays[numero]=lePays;
			}
		}
	};
	
	xhr.onerror = function() {
		console.log("Erreur de requete");
	};	

}
urlRecherche="https://flagcdn.com";  // Url de l'API

// Remplissage tableau des pays en français
apiUrl=urlRecherche+"/fr/codes.json";
let list_Fr=[];
console.log(apiUrl);
httpRequest(apiUrl,list_Fr);			

// Remplissage tableau des pays en anglais
apiUrl=urlRecherche+"/en/codes.json";
let list_En=[];
console.log(apiUrl);
httpRequest(apiUrl,list_En);			

// Remplissage tableau des pays en Espagnol
urlRecherche="https://flagcdn.com";
apiUrl=urlRecherche+"/es/codes.json";
let list_Es=[];
console.log(apiUrl);
httpRequest(apiUrl,list_Es);			
				
				
