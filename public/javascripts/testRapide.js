/**

	Fichier : testRapide.js
	Description : fichier de fonctions lié au tests rapides

**/


// variable qui donne ma question
var questionActuelle;
// le tableau des question importé sur la page
var monTableauQuestions;

$( document ).ready(function() {
	
	// initialisation à faire dans chaque fichier pour vérifier si les varibles en locales sont initialisée
	if(!isInitialise()){
		initialiaseVariables();
	}
	$("#CourantTestRapide").text(getCourantTestRapide());
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

	// je récupère toutes les questions en local
	monTableauQuestions = getAllQuestions();

	// Choix d'une question aléatoire
	questionActuelle=Math.floor(Math.random() * ((monTableauQuestions.length-1) + 1) + 0);

	var nomDomaine = getNameDomaineFromID(monTableauQuestions[questionActuelle].domaine);
	$("#numQuestion").text("Question " + nomDomaine);

	// affichage de la question
	$("#question").text(monTableauQuestions[questionActuelle].question);

	// parcours de toutes les réponses + affichage des réponses possibles
	for(var j=0;j<monTableauQuestions[questionActuelle].reponses.length;j++){
		$("#rep"+(j+1)).text('');
		$("#rep"+(j+1)).text(monTableauQuestions[questionActuelle].reponses[j]);
	}
	// ici je uncheck tous les boutons radio
	$("input:radio").attr("checked", false);
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

			addQuestionTest(true);
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

			addQuestionTest(false);
		}
		
		// mise à jour des statisitques
		$("#CumulTestRapide").text(getPourcentageTestRapide() + "%");
		
		
		// mise à jour des statisitques
		$("#CourantTestRapide").text(getCourantTestRapide());
		
		

		// je cache le bouton de correction et j'affiche la question suivante
		$("#correction").hide();
		$("#questionSuivante").show();
	}
	else{
		alert("it's not checked");
	}
});


// on click on Question Suivante
$("#questionSuivante").click( function(){
	// récuperation d'un numéro aléatoire pour la question
	questionActuelle=Math.floor(Math.random() * ((monTableauQuestions.length-1) + 1) + 0);
	if(questionActuelle<monTableauQuestions.length){
		var nomDomaine = getNameDomaineFromID(monTableauQuestions[questionActuelle].domaine);
		$("#numQuestion").text("Question " + nomDomaine);
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





		
		

		