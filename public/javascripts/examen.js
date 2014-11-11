/**

	Fichier : examen.js
	Description : fichier de fonctions lié au examens

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
	$("#CourantTestRapide").text(getCourantTestRapide());
    $("#CourantExamen").text(getCourantExamen());
	$("#CumulTestRapide").text(getPourcentageTestRapide() + "%");
	$("#CumulExamen").text(calculPourcentageExamen() + "%");

}); 


/*


$(document).ready(function () {

});

*/
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
		}
		else{
			// ici je met le texte en vert pour la bonne réponse
			  $("input:radio[name='optionsRadios']").each(function(){
			  	if ((parseInt($("div.reponse").text())-1) == parseInt($(this).val())){
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
			$("input:radio[name='optionsRadios']:checked").parent().css({
				"background-color": '#e89f9f',
				"padding": '3px 10px',
				"border-radius": '25px',	
			});
		}
		
		// je cache le bouton de correction et j'affiche la question suivante
		$("#correction").hide();
		
		if($("#questionSuivante").length){
			$("#questionSuivante").show();
		}
		else{
			$("#finExam").show();
		}
	}

});