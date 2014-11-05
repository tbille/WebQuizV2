
/*
  QUESTIONS
*/
// FORMAT QUESTIONS : 
// id, domaine , question, reponse 1 à 4, bonne réponse
var tableauQuestions = [

{
  id:1,
  domaine:1,
  question:'Choisissez le bon tag HTML pour créer une liste non ordonnée',
  reponses:[
    '<li>',
    '<ul>',
    '<ol>',
    '<br>'
  ],
  bonneReponse:2
},
{
  id:2,
  domaine:1,
  question:'Quelle est la version précédant le HTML5',
  reponses:[
    'HTML 4.01',
    'HTML 4.1',
    'HTML 4.9',
    'HTML 4'
  ],
  bonneReponse:1
},
{
  id:3,
  domaine:1,
  question:'Quel est le bon doctype pour HTML5',
  reponses:[
    '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 5.0//EN" "http://www.w3.org/TR/html5/strict.dtd">',
    '<!DOCTYPE HTML5>',
    '<!DOCTYPE html>',
    '<!DOCTYPE PUBLIC html>',
  ],
  bonneReponse:3
},
{
  id:4,
  domaine:1,
  question:'Quel est le bon élément HTML5 pour la lecture des vidéos',
  reponses:[
    '<media>',
    '<video>',
    '<play>',
    '<mediatype>'
  ],
  bonneReponse:2
},
{
  id:5,
  domaine:2,
  question:'Quel est le bon endroit dans un document HTML pour placer la référence à une feuille de style externe?',
  reponses:[
    'À la fin du document',
    'Dans la section <body>',
    'Dans la section <head>',
    'En haut du document'
  ],
  bonneReponse:3
},
{
  id:6,
  domaine:2,
  question:'Lequel parmi les choix correspond à la bonne syntaxe?',
  reponses:[
    'body:color=black;',
    'body {color: black;}',
    '{body:color=black;}',
    '{body;color:black;'
  ],
  bonneReponse:2
},
{
  id:7,
  domaine:2,
  question:'Comment insère-t-on un commentaire dans un fichier CSS?',
  reponses:[
    '/* ceci est un commentaire */',
    '// ceci est un commentaire //',
    '<--! ceci est un commenaire -->',
    '$ ceci est un commentaire $'
  ],
  bonneReponse:1
},
{
  id:8,
  domaine:3,
  question:'Dans quel élément HTML met-on le Javascript?',
  reponses:[
    '<js>',
    '<java>',
    '<javascript>',
    '<script>'
  ],
  bonneReponse:4
},
{
  id:9,
  domaine:3,
  question:'Quelle est la bonne syntaxe pour référer à un script externe nommé "xxx.js"?',
  reponses:[
    '<script src="xxx.js">',
    '<script>xxx.js</script>',
    '<js src="xxx.js">',
    '<javascript:"xxx.js">'
  ],
  bonneReponse:1
},
{
  id:10,
  domaine:3,
  question:'Comment fait-on pour détecter le nom du navigateur du client?',
  reponses:[
    'navigator-name',
    'nav.name',
    'navigator.appName',
    'what.is.the.navigator.name'
  ],
  bonneReponse:3
},
];

/*
  DOMAINES
*/
// FORMAT domaines
// id, nom domaine
var tableauDomaines = [

{
  id:1,
  nom:'HTML5'
},
{
  id:2,
  nom:'CSS'
},
{
  id:3,
  nom:'JAVASCRIPT'
}
];



/*
  Fonction qui retourne tous les domaines
  Entrée : 
  Sortie : domaine de l'identifiant:array objet
*/
exports.getAllDomaines = function(){
  return tableauDomaines;
};


/*
  Fonction qui récupère le domaine à partir de l'identifiant
  Entrée : identifiant:integer
  Sortie : domaine de l'identifiant:objet
*/
exports.getNameDomaineFromID = function (id){
  var i = 0;
  while(tableauDomaines[i].id!=id){
    i++;
  }
  return tableauDomaines[i].nom;
};

/*
  Fonctions qui retourne un tableau de question du domaine de l'identifiant 
  Entrée : identifiant domaine:integer array
  Sortie : tableau de questions:object array (id,domaine,question,reponse[1-4],bonneReponse)
*/
exports.getQuestionsFromDomaine = function (tableauidDomaine){
  var tableauRetour=[];
  for(i=0;i<tableauQuestions.length;i++){
    for(j=0;j<tableauidDomaine.length;j++){
      if(tableauQuestions[i].domaine==tableauidDomaine[j]){
        tableauRetour.push(tableauQuestions[i]);
      }
    }
  }
  return tableauRetour;
};

/*
  Fonction qui retourne toutes les questions du tableau
  Entrée : -
  Sortie : tableau de question:object array(id,domaine,question,reponse[1-4],bonneReponse)
*/
exports.getAllQuestions = function(){
  return tableauQuestions;
};

/*
  Fonction qui retourne toutes les questions du tableau le nombre de question
  Entrée : -
  Sortie : nombre d'éléments du tableau de question:integer
*/
exports.getNumQuestions = function(tableauidDomaine){
  return getQuestionsFromDomaine(tableauidDomaine).length;
};