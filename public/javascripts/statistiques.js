
/*

var resTestsrapide {
	nombre de question test réussi : 0
	nombre de question test : 0
}

tableau d'examen[

{
	id domaines [ id1 id2 ... ]
	resultat    /20
}
{
	id domaines [ id1 id2 ... ]
	resultat    /20
}
{
	id domaines [ id1 id2 ... ]
	resultat    /20
}
{
	id domaines [ id1 id2 ... ]
	resultat    /20
}
{
	id domaines [ id1 id2 ... ]
	resultat    /20
}

]


*/


/* Initialise les stats au debut de la session*/

var isInitialise = function(){
	if( localStorage.getItem("resTestsRapide")!=null && localStorage.getItem("tabExamen")!=null) {
		return true;
	}
	else{
		return false;
	}
}

var initialiaseVariables = function(){
	var testsRapide = {
		NbQuestionReussies:0,
		NbQuestionsTotal:0
	};
	var examens = new Array();

	setObjectInLS("resTestsRapide",  testsRapide);
	setObjectInLS("tabExamen", examens);
}


/* Nombre de questions reussies, true/false : si reussi +1, sinon 0  */
var addQuestionTest = function(isReussi){
	var mesRes = getObjectInLS("resTestsRapide");
	if (isReussi) { 
		mesRes.NbQuestionReussies ++;
		mesRes.NbQuestionsTotal ++;
	}
	else{
		mesRes.NbQuestionsTotal ++;
	}
	localStorage.removeItem("resTestsRapide");
	setObjectInLS("resTestsRapide", mesRes);
}


/* Calcul du pourcentage de questions reussies sur le nombre de questions total */
var getPourcentageTestRapide = function() {
	var mesRes = getObjectInLS("resTestsRapide");
	if(mesRes.NbQuestionsTotal == 0){
		return 0;
	}
	else{
		return  Math.round(mesRes.NbQuestionReussies / mesRes.NbQuestionsTotal * 100);
	}
}


/*Calcul de la note courante Test rapide */

var getCourantTestRapide = function() {
	var mesRes = getObjectInLS("resTestsRapide");
	if(mesRes.NbQuestionsTotal == 0){
		return 0;
	}
	else{
		return  (mesRes.NbQuestionReussies + '/' + mesRes.NbQuestionsTotal) ;
	}
}


/**

EXAMEN

**/

var ajouteExamen = function(_resultat, _tableauIdDomaine){
	var mesExamens = getObjectInLS("tabExamen");
	var monExam = {
		tabId: _tableauIdDomaine,
		resultatExamen: _resultat
	};

	mesExamens.push(monExam);

	localStorage.removeItem("tabExamen");
	setObjectInLS("tabExamen", mesExamens);
}

var calculPourcentageExamen = function(){
	var mesExamens = getObjectInLS("tabExamen");
	var somme = 0;
	for (var i = 0; i < mesExamens.length; i++) {
		somme += mesExamens[i].resultatExamen;
	};

	if(mesExamens.length == 0 ){
		return 0;
	}
	else{
		return  Math.round(((somme / mesExamens.length)/20) * 100);
	}
}

var getAllExams = function(){
	return getObjectInLS("tabExamen");
}



var setObjectInLS = function(_name, _object){
	localStorage.setItem(_name,  JSON.stringify(_object));
}

var getObjectInLS = function(_nameLS ){
	var myObject = localStorage.getItem(_nameLS);
	return JSON.parse(myObject);
}

/* Clear local Storage lorsque click sur bouton remise à zéro*/


function reset_me(){
 localStorage.clear();
 window.location="tableauDeBord.html";
 
}
