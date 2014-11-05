/**

	Fichier : tdb.js
	Description : fichier de fonctions lié au tableau de bord
**/

$(function(){

	$(document).ready(function($) {
		// initialisation à faire dans chaque fichier pour vérifier si les varibles en locales sont initialisée
		

		if(!isInitialise()){
			initialiaseVariables();
		}
		$("#CumulTestRapide").text(getPourcentageTestRapide() + "%");
		$("#CumulExamen").text(calculPourcentageExamen() + "%");

		// je met tous les examens dans le modal
		var examensFait = getAllExams();
		for (var i = 0; i < examensFait.length; i++) {
			var domaines = "";
			if(examensFait[i].tabId.length>1){
				i=i;
			}
			for (var j = 0; j < examensFait[i].tabId.length; j++) {
				if(!isNaN(examensFait[i].tabId[j])){
					domaines = domaines.concat(getNameDomaineFromID(examensFait[i].tabId[j])+"/");
				}
			};
			domaines = domaines.substring(0, domaines.length - 1);
			$("#examens").append("<li>Examen " + (i+1) +" ("+domaines.toUpperCase()+") :" +  examensFait[i].resultatExamen + "/20 </li>");	
		};
		

	});

	
	$("#monSubmit").click(function() {

		// ma variable qui verifira s'il y a des erreurs
		var erreur = false ;

		// tableau des identifiants selectionnés
		var tableauIDChecked = [];
		// nombre d'itéation des checkbox ( permet de définir l'identifiant du domaine séléctionné )
		var iterations = 1;
		$("input:checkbox").each(function() {
			// si jamais check je récupere l'id du domaine ( en ordre )
			if($(this).is(":checked")){
				tableauIDChecked.push(iterations);
			}
			iterations++;
		});

		if(tableauIDChecked.length == 0){
			erreur = true;
			var msgErreur = "Veuillez sélectionner un domaine !";
		}

		if(!erreur){
			// convertion du nombre de question en int
			var valeur = parseInt($("#nbQuestions").val()) ;

			var nbQuestions = getNumQuestions(tableauIDChecked);

			// controle du nombre de question
			if(  valeur<1 || valeur>nbQuestions ){
				erreur = true;
				var msgErreur = "Veuillez saisir un nombre de questions entre 1 et " + nbQuestions + " !";
			}

		}

		if(erreur){
			$(".error").show();
			$(".msgErreur").text(msgErreur);
		}

		localStorage.setItem("tableauID", tableauIDChecked);
		localStorage.setItem("nombreQuestions", valeur);
		return !erreur;
		
	});

});


/* Clear local Storage lorsque click sur bouton remise à zéro*/


function reset_me(){
 localStorage.clear();
 window.location="tableauDeBord.html";
 
}
