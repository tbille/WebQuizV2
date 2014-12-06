// Page added by GT : Pour TESTER l'ajout des résultats d'examen dans la BD
$(document).ready(function() {

    addQuestionClickEvent();

    function addQuestionClickEvent() {
        $("a#ajouter").click(function() {
            $(this).after("<input type=\"text\" name=\"domains\" required/><a id=\"ajouter\" class=\"button\">Ajouter</a>");
            $(this).remove();
           // $("input[type='number']").attr("max", $("p input[name=\"domains\"]").length);
            addQuestionClickEvent();
        });
    }

    $("a#supprimer").click(function() {
        var numAnswers = $("p input[name=\"domains\"]").length;
        if (numAnswers > 1) {
            var answerInput = $("p input[name=\"domains\"]:last");
            answerInput.remove();
            numAnswers = numAnswers - 1;
        }
       // $("input[type='number']").attr("max", numAnswers);
    });
});
