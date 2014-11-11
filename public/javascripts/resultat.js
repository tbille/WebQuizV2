/**

	Fichier : resuultat.js
	Description : fichier de fonctions lié au à la partie resultat

**/



$( document ).ready(function() {
	// initialisation à faire dans chaque fichier pour vérifier si les varibles en locales sont initialisée	
	if(!isInitialise()){
		initialiaseVariables();
	}
	
	$("#CumulTestRapide").text(getPourcentageTestRapide() + "%");
	$("#CumulExamen").text(calculPourcentageExamen() + "%");
	$("#note").text(localStorage.getItem("noteCourante") + $("#note").text());

	localStorage.removeItem("noteCourante");

//Message selon resultat obtenu sur 20
	var data = $("#note").text();
	var arr = data.split('/');
	var notemsg = parseInt(parseInt(arr[0])*(20/parseInt(arr[1])));


	if (0 <= notemsg && notemsg < 5) {
	    $("#messageResultat").text("Vous êtes pourri!" );
	} 

	else if (5 <= notemsg && notemsg < 10) {
	    $("#messageResultat").text("Vous pourriez faire mieux!" );
	} 

	else if (10 <= notemsg && notemsg < 15) {
	    $("#messageResultat").text("Faites un peu plus d'effort!" );
	} 

	else if (15 <= notemsg && notemsg <= 20) {
	    $("#messageResultat").text("C'est très bien!" );
	} 

});
