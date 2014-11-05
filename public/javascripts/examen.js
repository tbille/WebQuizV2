/**

	Fichier : examen.js
	Description : fichier de fonctions lié au examens

**/


// variable qui donne ma question
var questionActuelle;
// le tableau des question importé sur la page
var monTableauQuestions;
// nombre de questions
var nbQuestions ;
// numero question actuelle
var numQuestionActuelle ;
// nombre de questions reussi
var nbQuestionsReussi;
// Questions qui passent
var tableauQuestions;


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

	
	// je récupere les identifiant des domaines, si il n'existe pas alors je viens d'une autre page que le tableau de bord ( donc je redirige )
	var tableauID = localStorage.getItem("tableauID"); 
	// redirection si j'arrive sur la page sans avoir fait l'examen
	if(tableauID == null ){
		window.location.replace("tableauDeBord.html");
	}
	else{
		// je récupère les questions en fnction des domaines choisis
		monTableauQuestions = getQuestionsFromDomaine(tableauID);

		nbQuestions = localStorage.getItem("nombreQuestions");
		nbQuestionsReussi=0;
		numQuestionActuelle = 1;
		tableauQuestions=[];

		// je garde le tableau d'id pour le resultat
		localStorage.removeItem("nombreQuestions");


		// Choix d'une question aléatoire
		questionActuelle=Math.floor(Math.random() * ((monTableauQuestions.length-1) + 1) + 0);
		tableauQuestions.push(i);
		
		var nomDomaine = getNameDomaineFromID(monTableauQuestions[questionActuelle].domaine);
		$("#numQuestion").text("Question " + numQuestionActuelle + " - " + nomDomaine);
		// affichage de la question
		$("#question").text(monTableauQuestions[questionActuelle].question);

		// parcours de toutes les réponses + affichage des réponses possibles
		for(var j=0;j<monTableauQuestions[questionActuelle].reponses.length;j++){
			$("#rep"+(j+1)).text('');
			$("#rep"+(j+1)).text(monTableauQuestions[questionActuelle].reponses[j]);
		}
		// ici je uncheck tous les boutons radio
		$("input:radio").attr("checked", false);
	}
});





// on click on correction
$("#correction").click( function(){
	if($("input:radio[name='r1']").is(":checked")){ 

		// Controle si la réponse est bonne ( comparaison avec le text de la répons coché )
		if ( monTableauQuestions[questionActuelle].reponses[monTableauQuestions[questionActuelle].bonneReponse -1] == $("input:radio[name='r1']:checked").parent().text() ){
			// ici je met le texte en vert si la réponse est bonne
			$("input:radio[name='r1']:checked").parent().css({
				"background-color": '#aedbae',	
				"padding": '3px 10px',
				"border-radius": '25px',
				"margin-top": '1px',
				"margin-bottom": '1px',
			});

			nbQuestionsReussi++;
		}
		else{
			// ici je met le texte en vert pour la bonne réponse
			  $("input:radio[name='r1']").each(function(){
			  	if ( monTableauQuestions[questionActuelle].reponses[monTableauQuestions[questionActuelle].bonneReponse -1] == $(this).parent().text() ){
					// ici je met le texte en vert si la réponse est bonne
					$(this).parent().css({
						"background-color": '#aedbae',
						"padding": '3px 10px',
						"border-radius": '25px',
						"margin-top": '1px',
						"margin-bottom": '1px',
					});
				}
			  });

			// ici je met le texte en rouge si la réponse est mauvaise
			$("input:radio[name='r1']:checked").parent().css({
				"background-color": '#e89f9f',
				"padding": '3px 10px',
				"border-radius": '25px',	
			});
		}
		

		// je cache le bouton de correction et j'affiche la question suivante
		$("#correction").hide();
		if(numQuestionActuelle==nbQuestions){
			// j'enregistre le nombre de questions reussi et faites
			localStorage.setItem("nbQuestionsReussi", nbQuestionsReussi);
			localStorage.setItem("nbQuestions",nbQuestions);
			$("#finQuestionnaire").show();
		}
		else{
			$("#questionSuivante").show();
		}
	}

});


// on click on Question Suivante
$("#questionSuivante").click( function(){
	// on augmente la question actuelle
	numQuestionActuelle++;
	// récuperation d'un numéro aléatoire pour la question
	do{
		questionActuelle=Math.floor(Math.random() * ((monTableauQuestions.length-1) + 1) + 0);
	}while($.inArray(questionActuelle, tableauQuestions)!=-1)
	
	tableauQuestions.push(questionActuelle);
	var nomDomaine = getNameDomaineFromID(monTableauQuestions[questionActuelle].domaine);

	$("#numQuestion").text("Question " + numQuestionActuelle + " - " + nomDomaine.toUpperCase());

	if(questionActuelle<monTableauQuestions.length){
		// affichage de la question
		$("#question").text(monTableauQuestions[questionActuelle].question);

		// parcours de toutes les questions + affichage
		for(var j=0;j<monTableauQuestions[questionActuelle].reponses.length;j++){
			$("#rep"+(j+1)).text('');
			$("#rep"+(j+1)).text(monTableauQuestions[questionActuelle].reponses[j]);
		}
	}

	// ici j'enlève le style si l'utilisateur a corrigé auparavant
	$("input:radio").attr("checked", false);
	$("input:radio[name='r1']").each(function(){
		$(this).parent().removeAttr('style');
  	});

  	$("#correction").show();
	$("#questionSuivante").hide();
});


/* Clear local Storage lorsque click sur bouton remise à zéro*/


function reset_me(){
 localStorage.clear();
 window.location="tableauDeBord.html";
 
}
