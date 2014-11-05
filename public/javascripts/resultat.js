/**

	Fichier : resuultat.js
	Description : fichier de fonctions lié au à la partie resultat

**/



$( document ).ready(function() {
	// initialisation à faire dans chaque fichier pour vérifier si les varibles en locales sont initialisée
	
	/*
	if(!isInitialise()){
		initialiaseVariables();
	}
	*/
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

	var nbQuestionsReussi = localStorage.getItem("nbQuestionsReussi"); 
	var nbQuestions = localStorage.getItem("nbQuestions"); 

	// redirection si j'arrive sur la page sans avoir fait l'examen
	if(nbQuestions == null ){
		/*window.location.replace("tableauDeBord.html");  J'ai enlevé cette ligne-ci et j'ai ajouté les suivantes pour que l'utilisateur arrive à la page Résultat s'il abandonne point 6 du TP3*/
		$("#messageResultat").text("Ayez un peu plus de persévérence!" );	
		$("#note").text(calculPourcentageExamen() + "%");
	}
	else{

		var tableauID = localStorage.getItem("tableauID");

		var noteSur20 = Math.round((nbQuestionsReussi/nbQuestions) * 20);

		$("#note").text(noteSur20 + "/20" );
		ajouteExamen (noteSur20, tableauID);
		$("#CumulExamen").text(calculPourcentageExamen() + "%");

		localStorage.removeItem("tableauID");
		localStorage.removeItem("nbQuestionsReussi"); 
		localStorage.removeItem("nbQuestions");
	}


//Message selon resultat obtenu sur 20


var notemsg = parseInt(noteSur20);

if (0 <= notemsg && notemsg < 5) {
    $("#messageResultat").text("Vous êtes pourri!" );
} 

else if (5 <= notemsg && notemsg < 10) {
    $("#messageResultat").text("Vous pourriez faire mieux!" );
} 

else if (10 <= notemsg && notemsg < 15) {
    $("#messageResultat").text("Faites un peu plus d'effort!" );
} 

else if (15 <= notemsg && notemsg < 20) {
    $("#messageResultat").text("C'est très bien!" );
} 
});










/* Clear local Storage lorsque click sur bouton remise à zéro*/


function reset_me(){
 localStorage.clear();
 window.location="tableauDeBord.html";
 
}
