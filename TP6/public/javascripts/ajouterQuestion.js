$(document).ready(function() {

    addQuestionClickEvent();

    function addQuestionClickEvent() {
        $("a#ajouter").click(function() {
            $(this).after("<input type=\"text\" name=\"answer\" required/><a id=\"ajouter\" class=\"button\">Ajouter</a>");
            $(this).remove();
            $("input[type='number']").attr("max", $("p input[name=\"answer\"]").length);
            addQuestionClickEvent();
        });
    }

    $("a#supprimer").click(function() {
        var numAnswers = $("p input[name=\"answer\"]").length;
        if (numAnswers > 1) {
            var answerInput = $("p input[name=\"answer\"]:last");
            answerInput.remove();
            numAnswers = numAnswers - 1;
        }
        $("input[type='number']").attr("max", numAnswers);
    });
});
