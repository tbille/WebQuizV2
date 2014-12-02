$(document).ready(function() {
    $("a#accueil").addClass("current");
});

var app = angular.module("monApp",[]);

app.controller("accueil",function($scope,$http){

  $scope.testFunction = function(){
    $http.get("/getQuestion/1").success(function(data){
      alert(data.msgId);
    }).error(function(){
      alert("erreur !");
    });
  }
});