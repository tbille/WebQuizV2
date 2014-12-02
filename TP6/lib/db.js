var mongoose = require('mongoose');

// Connect to cloud database
var username = "xxx";
var password = "xxx";
var address = "xxx;
connect();

// Connect to mongo
function connect() {
    var url = 'mongodb://' + username + ':' + password + address;
    mongoose.connect(url);
}

function disconnect() {
    mongoose.disconnect();
}

module.exports.mongoose = mongoose;

/*
// Exportations
module.exports = {
    getQuestionById: function(id) {
        return questions[id - 1];
    },
    getRandomQuestion: function() {
        var chosenQuestionNum = generateRandom(0, questions.length);
        return questions[chosenQuestionNum];
    },
    // Cette fonction choisit numQuestions nombre de questions selon la liste d'IDs 
    // de question questionIDs.
    getRandomIDs: function(domains, num) {
        var ids = [];
        while (ids.length < num) {
            var question = questions[generateRandom(0, questions.length)];
            if (domains.inArray(question.domain)) {
                ids.push(question.id);
                ids = unique(ids);
            }
        }
        return ids;
    }
}

// Retourne un chiffre entier aléatoire entre min inclusivement et max exclusivement.
function generateRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// Élimine les doublons d'une liste / tableau.
function unique(list) {
    var result = [];
    for (i = 0; i < list.length; i++) {
        if (!result.inArray(list[i])) {
            result.push(list[i]);
        }
    }
    return result;
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

// Mini base de données qui contient l'ensemble des questions
questions = [
    { id: 1,
      domain: "HTML", 
      question: "Quel est le doctype d'un document HTML5 ?", 
      correctAnswer: 2, 
      answers: ["<!DOCTYPE html5>","<!DOCTYPE html>","<!DOCTYPE html PUBLIC \"-//W3C//DTD HTML5.0 Strict//EN\">"]
    },
    { id: 2,
      domain: "HTML", 
      question: "Quelle est la syntaxe pour déclarer l'encodage des caractères du document en UTF-8 ?", 
      correctAnswer: 3, 
      answers: ["<meta encoding=\"text/html; charset=utf-8\">","<meta charset=\"text/html; UTF-8\">","<meta charset=\"utf-8\">"]
    },
    { id: 3,
      domain: "HTML", 
      question: "Quelle nouvelle balise de section permet de regrouper un contenu tangentiel au contenu principal du document ?", 
      correctAnswer: 3, 
      answers: ["<section id=\"sidebar\">","<sidebar>","<aside>","<details>"]
    },
    { id: 4,
      domain: "HTML", 
      question: "La nouvelle balise <time> permet de baliser une date structurée. Quelle serait sa syntaxe pour le 1er avril 2012 à 13h37 ?", 
      correctAnswer: 1, 
      answers: ["<time datetime=\"2012-04-01T13:37:00Z\"></time>","<time value=\"2012-04-01 13:37\"></time>","<time datetime=\"01/04/2012 13H37M00S\"></time>"]
    },
    { id: 5,
      domain: "HTML", 
      question: "À partir de quelle version d'Internet Explorer peut-on utiliser nativement les éléments de section HTML5 (sans hack ou script complémentaire) ?", 
      correctAnswer: 2, 
      answers: ["Internet Explorer 8", "Internet Explorer 9", "Internet Explorer 10"]
    },
    { id: 6,
      domain: "HTML",
      question: "Quelle est la méthode pour associer une légende complète à une illustration ?",
      correctAnswer: 1,
      answers: ["<figure><img src=\"image.jpg\"><figcaption>La légende...</figcaption></figure>", "<figure src=\"image.jpg\" legend=\"#cap1\"></figure><figcaption id=\"cap1\">La légende...</figcaption>", "<figure><legend>La légende...</legend><img src=\"image.jpg\"></figure>"]
    },
    { id: 7,
      domain: "HTML",
      question: "Comment représenter une barre de progression à 50% d'avancement ?",
      correctAnswer: 1,
      answers: ["<progress value=\"50\" max=\"100\">50%</progress>", "<input type=\"progress\" value=\"0.5\">50%</progress>", "<input type=\"progress\" value=\"50\" max=\"100\" title=\"50%\" />"]
    },
    { id: 8,
      domain: "HTML",
      question: "Comment associer une liste de choix/suggestions à un champ d'entrée texte ?",
      correctAnswer: 2,
      answers: ["<input datalist=\"fruits\"><list id=\"fruits\"><option value=\"Kiwi\"><option value=\"Orange\"><option value=\"Mangue\"></list>", "<input list=\"fruits\"><datalist id=\"fruits\"><option>Kiwi</option><option>Orange</option><option>Mangue</option></datalist>", "<input list=\"fruits\"><select><datalist id=\"fruits\" values=\"Kiwi,Orange,Mangue\" /></select>"]
    },
    { id: 9,
      domain: "HTML",
      question: "Quel attribut permet d'afficher une image par défaut pour l'élément <video> ?",
      correctAnswer: 3,
      answers: ["<video preview=\"apercu.jpg\">", "<video><param name=\"thumbnail\" value=\"apercu.jpg\" /></video>", "<video poster=\"apercu.jpg\">"]
    },
    { id: 10,
      domain: "HTML",
      question: "Quelle balise doit permettre l'inclusion de sous-titres textes dans les vidéos lues avec <video> ?",
      correctAnswer: 1,
      answers: ["<track src=\"soustitres.vtt\">", "<subtitle source=\"soustitres.srt\">", "<captions source=\"soustitres.srt\">"]
    },
    { id: 11,
      domain: "CSS",
      question: "Que signifie CSS ?",
      correctAnswer: 1,
      answers: ["Cascading Style Sheets", "Create Simple Samples", "Creating System Style"]
    },
    { id: 12,
      domain: "CSS",
      question: "À quoi sert le langage CSS ?",
      correctAnswer: 2,
      answers: ["À réaliser des pages dynamiques", "À ajouter du style aux documents web", "À insérer du contenu dans une page internet"]
    },
    { id: 13,
      domain: "",
      question: "",
      correctAnswer: 0,
      answers: []
    }
];*/