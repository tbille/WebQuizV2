

$( document ).ready(function() {

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

/* Clear local Storage lorsque click sur bouton remise à zéro*/


function reset_me(){
 localStorage.clear();
 window.location="tableauDeBord.html";
 
}
