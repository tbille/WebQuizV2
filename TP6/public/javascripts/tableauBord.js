
var app = angular.module("monApp",[]);

app.controller("tdb",function($scope,$http,tdbS){
    // Page Courante
    $("a#tableauBord").addClass("current");
    // permet d'activer le bouton pour l'examen
    countDomainQuestions($("input[name='domain']:checked"),$http, function(nbQuestions){
        if(nbQuestions>0){
            $scope.disabled = false;
            $("input[type='number']").attr("min", 1);
            $("input[type='number']").attr("max", nbQuestions);
        }
        else
            $scope.disabled = true;
    });
    $scope.disable=function(){
        countDomainQuestions($("input[name='domain']:checked"),$http, function(nbQuestions){
            if(nbQuestions>0){
                $scope.disabled = false;
                $("input[type='number']").attr("min", 1);
                $("input[type='number']").attr("max", nbQuestions);
            }
            else
                $scope.disabled = true;
        });
    };


    $scope.getStatusTest=function(){
        tdbS.getStatus($http,function(data){
            $scope.goodAnswers=data.goodAnswers;
            $scope.totalAnswers=data.totalAnswers;
        })
    };

});

app.service("tdbS",function(){
    this.getStatus=function($http,callback){
        $http.get("/getStatusAnswersTest").success(function(data){
            callback(data);
        }).error(function(){
            alert("Erreur : endExam")
        });     
    };
});


var countDomainQuestions = function(checkedDomains,$http,callback) {
    $http.get("/getNumberOfQuestionsDomaine").success(function(data){
        var domains = jQuery.map(checkedDomains, function(checkbox, i) {
            return $(checkbox).val();
        });
        count=0;
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
}

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