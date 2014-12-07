
var app = angular.module("monApp",[]);

app.controller("tdb",function($scope,$http,tdbS){
    // Page Courante
    $("a#tableauBord").addClass("current");
    // permet d'activer le bouton pour l'examen
    tdbS.countDomainQuestions($("input[name='domain']:checked"),$http, function(nbQuestions){
        if(nbQuestions>0){
            $scope.disabled = false;
            $("input[type='number']").attr("min", 1);
            $("input[type='number']").attr("max", nbQuestions);
        }
        else
            $scope.disabled = true;
    });
    /*
        Fonction de mise à jour des checkbox
     */
    $scope.disable=function(){
        tdbS.countDomainQuestions($("input[name='domain']:checked"),$http, function(nbQuestions){
            if(nbQuestions>0){
                $scope.disabled = false;
                $("input[type='number']").attr("min", 1);
                $("input[type='number']").attr("max", nbQuestions);
            }
            else
                $scope.disabled = true;
        });
    };

    /*
        Fonction qui récupere le status des tests rapides
    */
    $scope.getStatusTest=function(){
        tdbS.getStatus($http,function(data){
            $scope.goodAnswers=data.goodAnswers;
            $scope.totalAnswers=data.totalAnswers;
        });
    };

    /*
        Fonction qui récupère la moyenne des examens
     */
    $scope.getAverageExam=function(){
        tdbS.getAverage($http,function(data){
            $scope.examAverage=data;
        });
    };

    $scope.listeExams=function(){
        tdbS.getAllQuestions($http,function(liste){
            for (i = 0; i < liste.length; i++) {
                     // Modifier la liste d'examen effectuée
                var exam = liste[i];
                var domains = "";
                jQuery.each(exam.domains, function(index, value) {
                    domains = domains + " " + value;
                });

                var examStr = "Examen " + (i + 1) + " (" + domains + " ) : " + exam.goodAnswers + " / " 
                    + exam.totalAnswers;
                $("section#lightbox ul li:last-child").after("<li>" + examStr + "</li>");

                examAverage += exam.goodAnswers / exam.totalAnswers;
            }
        });
    };

});

/*
    Requetes HTTP vers le serveur
 */
app.service("tdbS",function(){
    this.getStatus=function($http,callback){
        $http.get("/getStatusAnswersTest").success(function(data){
            callback(data);
        }).error(function(){
            alert("Erreur : endExam")
        });     
    };

    this.getAverage=function($http,callback){
        $http.get("/getAverageExams").success(function(data){
            callback(data.moyenne);
        }).error(function(){
            alert("Erreur : getAverage")
        });   
    };

    this.countDomainQuestions=function(checkedDomains,$http,callback) {
        $http.get("/getNumberOfQuestionsDomaine").success(function(data){
            var domains = jQuery.map(checkedDomains, function(checkbox, i) {
                return $(checkbox).val();
            });
            var count=0;
            if (domains.inArray("HTML")) {
                count+=data.domaines[0];
            }
            if (domains.inArray("CSS")) {
                count+=data.domaines[1];
            }
            if (domains.inArray("JS")) {
                count+=data.domaines[2];
            }
            callback(count);
        }).error(function(){
          callback(0);
        });
    };

    this.getAllQuestions=function($http,callback){
        $http.get("/getAllQuestions").success(function(data){
            callback(data.listeQuestions);
        }).error(function(){
            alert("Erreur : getAllQuestions")
        });  
    };
});



Array.prototype.inArray = function(value) {
    // Returns true if the passed value is found in the
    // array. Returns false if it is not.
    var i;
    for (i = 0; i < this.length; i++) {
        if (this[i] == value) {
            return true;
        }
    }
    return false;
};