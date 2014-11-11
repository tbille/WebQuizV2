/**

	Fichier : testRapide.js
	Description : fichier de fonctions lié au tests rapides

**/


// variable qui donne ma question
var questionActuelle;
// le tableau des question importé sur la page
var monTableauQuestions;


$(document).ready(function () {
	
	// initialisation à faire dans chaque fichier pour vérifier si les varibles en locales sont initialisée
	if (!isInitialise()) {
		initialiaseVariables();
	}
	$("#CumulTestRapide").text(getPourcentageTestRapide() + "%");
	$("#CumulExamen").text(calculPourcentageExamen() + "%");

}); 



//test

// on click on correction
$("#correction").click( function(){
	if($("input:radio[name='optionsRadios']").is(":checked")){ 
     	// Controle si la réponse est bonne ( comparaison avec le text de la répons coché )
		if ((parseInt($("div.reponse").text())-1) === (parseInt($('input[name=optionsRadios]:checked').val()))){
			// ici je met le texte en vert si la réponse est bonne
			$("input:radio[name='optionsRadios']:checked").parent().css({
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
			  $("input:radio[name='optionsRadios']").each(function(){
			  	if ((parseInt($("div.reponse").text())-1) == parseInt($(this).val())) {
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
			 $('input[name=optionsRadios]:checked').parent().css({
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

/*

/* 
/* on click on Question Suivante 
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

*/

// Si c'est la bonne réponse
/*
$(question.bonneReponse)

div(class="reponse" hidden) ${ question.bonneReponse }  */


		
		

		