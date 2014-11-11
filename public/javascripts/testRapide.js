/**

	Fichier : testRapide.js
	Description : fichier de fonctions lié au tests rapides

**/

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


		