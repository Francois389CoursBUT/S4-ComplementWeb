$(function () {
    const body = $('body');

    const listeRegions = $('#listeRegions');
    const listeDepartements = $('#listeDepartements');
    const listeCommunes = $('#listeCommunes');

    const zoneRegion = $('#zoneRegions');
    const zoneDepartement = $('#zoneDepartements');
    const zoneCommune = $('#zoneCommunes')
    const zoneResultat = $('#zoneResultat');

    //Zone de résultat
    const libelleNomCommune = $('#libelleNomCommune');

    const libelleRegion = $('#libelleRegion');
    const libelleDepartement = $('#libelleDepartement');
    const libelleCommune = $('#libelleCommune');
    const LibelleSiren = $('#LibelleSiren');

    const codeComCom = $('#codeComCom');
    const NomComCom = $('#NomComCom');
    const nbHComCom = $('#nbHComCom');
    const ListeCommunesComCom = $('#ListeCommunesComCom');

    const nbHabitantsCommune = $('#nbHabitantsCommune');
    const CodesPostaux = $('#CodesPostaux');

    // URL de l'API
    const urlAPI = 'https://geo.api.gouv.fr';
    const urlRegions = urlAPI + '/regions';

    /**
     * URL pour récupérer les départements d'une région
     * @param region {string} Code de la région
     * @returns {string} URL pour récupérer les départements de la région
     */
    function urlDepartements(region) {
        return urlAPI + '/regions/' + region + '/departements';
    }

    /**
     * URL pour récupérer les communes d'un département
     * @param departement {string} Code du département
     * @returns {string} URL pour récupérer les communes du département
     */
    function urlCommunes(departement) {
        return urlAPI + '/departements/' + departement + '/communes';
    }

    /**
     * URL pour récupérer les informations d'une commune
     * @param codeCommune {string} Code de la commune
     * @returns {string} URL pour récupérer les informations de la commune
     */
    function urlDetailCommune(codeCommune) {
        return urlAPI + '/communes/' + codeCommune;
    }

    /**
     * URL pour récupérer les informations d'une communauté de commune
     * @param codeComCom {string} Code de la communauté de commune
     * @returns {string} URL pour récupérer les informations de la communauté de commune
     */
    function urlDetailComCom(codeComCom) {
        return urlAPI + '/epcis/' + codeComCom;
    }

    /**
     * URL pour récupérer les communes d'une communauté de commune
     * @param codeComCom {string} Code de la communauté de commune
     * @returns {string} URL pour récupérer les communes de la communauté de commune
     */
    function urlCommunesComCom(codeComCom) {
        return urlAPI + '/epcis/' + codeComCom + '/communes';
    }

    class Spninner {
        constructor() {
            this.spinner = $('#loaderDiv');
        }

        start() {
            this.spinner.show();
            body.prop('disabled', true);
            body.css('cursor', 'wait');
            body.css('opacity', '0.5');
        }

        stop() {
            this.spinner.hide();
            body.prop('disabled', false);
            body.css('cursor', 'default');
            body.css('opacity', '1');
        }
    }

    let map = undefined;

    /**
     * Affiche une carte centrée sur une cible
     * @param lat {number} Latitude de la cible
     * @param long {number} Longitude de la cible
     * @param afficherMarqueur {boolean} Afficher un marqueur sur la carte si true
     */
    function afficherMap(lat, long, afficherMarqueur = true) {
        if (map === undefined) { //Si la map n'a pas encore été créé
            map = L.map('map').setView([lat, long], 13);

            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);
            
        } else { //Si la map a déjà été créé, on la recentre
            map.setView([lat, long], 13);
        }

        if (afficherMarqueur) {
            var marker = L.marker([lat, long]).addTo(map);
        }
    }

    /**
     * Affiche une carte en fonction d'une ville
     * @param ville {string} Nom de la ville visé
     */
    function afficherMapParVille(ville) {
        $.getJSON('https://nominatim.openstreetmap.org/search?city=' + ville + '&format=json', function (data) {
            afficherMap(data[0].lat, data[0].lon);
        });
    }

    ///////////////////////////////////
    ////Initialisation des éléments////
    ///////////////////////////////////

    // Création d'un objet Spinner (On le récupère depuis le DOM)
    const spinner = new Spninner();

    zoneDepartement.hide();
    zoneCommune.hide();
    zoneResultat.hide();

    // Ajout des écouteurs d'événements
    listeRegions.change(function () {
        zoneDepartement.show();
        zoneCommune.hide();
        zoneResultat.hide();
        remplirDepartement();
    });
    listeDepartements.change(function () {
        zoneCommune.show();
        zoneResultat.hide();
        remplirCommune();
    });
    listeCommunes.change(function () {
        zoneResultat.show();
        afficherResultat();
    });

    // Récupération des régions et remplissage de la liste
    $.getJSON(urlRegions, function (data) {
        const regions = data.sort();

        listeRegions.append($('<option>').val('').text('Choisir une région'));

        for (const region of regions) {
            listeRegions.append($('<option>').val(region.code).text(region.nom));
        }
    })

    ///////////////////////////////////
    ///////////////////////////////////
    ///////////////////////////////////

    /**
     * Remplissage de la liste des départements
     */
    function remplirDepartement() {
        spinner.start();
        listeDepartements.empty();

        $.getJSON(urlDepartements(listeRegions.val()), function (data) {

            const departements = data.sort();

            if (departements.length === 1) {
                zoneCommune.show();
                zoneResultat.hide();
            } else {
                listeDepartements.append($('<option>').val('').text('Choisir un département'));
            }

            for (const departement of departements) {
                listeDepartements.append($('<option>').val(departement.code).text(departement.nom));
            }

            if (data.length === 1) {
                remplirCommune();
            }
            spinner.stop();
        })

    }

    /**
     * Remplissage de la liste des communes
     */
    function remplirCommune() {
        spinner.start();
        listeCommunes.empty();

        $.getJSON(urlCommunes(listeDepartements.val()), function (data) {
            if (data.length === 1) {
                zoneResultat.show();
            } else {
                listeCommunes.append($('<option>').val('').text('Choisir une commune'));
            }

            for (const commune of data) {
                listeCommunes.append($('<option>').val(commune.code).text(commune.nom));
            }

            if (data.length === 1) {
                afficherResultat();
            }

            spinner.stop();
        })
    }

    /**
     * On affiche le resultat de la recherche
     */
    function afficherResultat() {
        spinner.start();
        // On récupère les informations de la commune et on les affiche
        $.getJSON(urlDetailCommune(listeCommunes.val()), function (data) {
            libelleNomCommune.text(data.nom);
            libelleRegion.text(data.codeRegion + ' - ' + listeRegions.find('option:selected').text());
            libelleDepartement.text(data.codeDepartement + ' - ' + listeDepartements.find('option:selected').text());
            libelleCommune.text(data.code + ' - ' + data.nom);
            LibelleSiren.text(data.siren);
            nbHabitantsCommune.text(data.population);

            CodesPostaux.empty();
            for (const codePostal of data.codesPostaux) {
                CodesPostaux.append($('<li>').text(codePostal));
            }

            if (typeof data.codeEpci !== 'undefined') {
                //On récupère les informations de la communauté de commune et on les affiche
                $.getJSON(urlDetailComCom(data.codeEpci), function (data) {
                    codeComCom.text(data.code);
                    NomComCom.text(data.nom);
                    nbHComCom.text(data.population);
                })

                //On récupère les communes de la communauté de commune et on les affiche
                $.getJSON(urlCommunesComCom(data.codeEpci), function (data) {
                    ListeCommunesComCom.empty();
                    for (const commune of data) {
                        ListeCommunesComCom.append($('<li>').text(commune.nom));
                    }
                    spinner.stop();
                })
            } else {
                codeComCom.text("-");
                NomComCom.empty();
                nbHComCom.text("-");
                ListeCommunesComCom.empty();
                spinner.stop();
            }

            afficherMapParVille(data.nom);

        })
    }


});
