// Mini base de données qui contient l'ensemble des questions 
var db = require('../lib/db');

module.exports = {
  addAllQuestions: function(){
    db.questions.insert(
        { id: 1,
          domain: "HTML", 
          question: "Quel est le doctype d'un document HTML5 ?", 
          correctAnswer: 2, 
          answers: ["<!DOCTYPE html5>","<!DOCTYPE html>","<!DOCTYPE html PUBLIC \"-//W3C//DTD HTML5.0 Strict//EN\">"]
        }
    );
    db.questions.insert(
        { id: 2,
          domain: "HTML", 
          question: "Quelle est la syntaxe pour déclarer l'encodage des caractères du document en UTF-8 ?", 
          correctAnswer: 3, 
          answers: ["<meta encoding=\"text/html; charset=utf-8\">","<meta charset=\"text/html; UTF-8\">","<meta charset=\"utf-8\">"]
        },
    );
    db.questions.insert(
        { id: 3,
          domain: "HTML", 
          question: "Quelle nouvelle balise de section permet de regrouper un contenu tangentiel au contenu principal du document ?", 
          correctAnswer: 3, 
          answers: ["<section id=\"sidebar\">","<sidebar>","<aside>","<details>"]
        }
    );
    db.questions.insert(
        { id: 4,
          domain: "HTML", 
          question: "La nouvelle balise <time> permet de baliser une date structurée. Quelle serait sa syntaxe pour le 1er avril 2012 à 13h37 ?", 
          correctAnswer: 1, 
          answers: ["<time datetime=\"2012-04-01T13:37:00Z\"></time>","<time value=\"2012-04-01 13:37\"></time>","<time datetime=\"01/04/2012 13H37M00S\"></time>"]
        }
    );
    db.questions.insert(
        { id: 5,
          domain: "HTML", 
          question: "À partir de quelle version d'Internet Explorer peut-on utiliser nativement les éléments de section HTML5 (sans hack ou script complémentaire) ?", 
          correctAnswer: 2, 
          answers: ["Internet Explorer 8", "Internet Explorer 9", "Internet Explorer 10"]
        }
    );
    db.questions.insert(
        { id: 6,
          domain: "HTML",
          question: "Quelle est la méthode pour associer une légende complète à une illustration ?",
          correctAnswer: 1,
          answers: ["<figure><img src=\"image.jpg\"><figcaption>La légende...</figcaption></figure>", "<figure src=\"image.jpg\" legend=\"#cap1\"></figure><figcaption id=\"cap1\">La légende...</figcaption>", "<figure><legend>La légende...</legend><img src=\"image.jpg\"></figure>"]
        }
    );
    db.questions.insert(
        { id: 7,
          domain: "HTML",
          question: "Comment représenter une barre de progression à 50% d'avancement ?",
          correctAnswer: 1,
          answers: ["<progress value=\"50\" max=\"100\">50%</progress>", "<input type=\"progress\" value=\"0.5\">50%</progress>", "<input type=\"progress\" value=\"50\" max=\"100\" title=\"50%\" />"]
        }
    );
    db.questions.insert(
        { id: 8,
          domain: "HTML",
          question: "Comment associer une liste de choix/suggestions à un champ d'entrée texte ?",
          correctAnswer: 2,
          answers: ["<input datalist=\"fruits\"><list id=\"fruits\"><option value=\"Kiwi\"><option value=\"Orange\"><option value=\"Mangue\"></list>", "<input list=\"fruits\"><datalist id=\"fruits\"><option>Kiwi</option><option>Orange</option><option>Mangue</option></datalist>", "<input list=\"fruits\"><select><datalist id=\"fruits\" values=\"Kiwi,Orange,Mangue\" /></select>"]
        }
    );
    db.questions.insert(
        { id: 9,
          domain: "HTML",
          question: "Quel attribut permet d'afficher une image par défaut pour l'élément <video> ?",
          correctAnswer: 3,
          answers: ["<video preview=\"apercu.jpg\">", "<video><param name=\"thumbnail\" value=\"apercu.jpg\" /></video>", "<video poster=\"apercu.jpg\">"]
        }
    );
    db.questions.insert(
        { id: 10,
          domain: "HTML",
          question: "Quelle balise doit permettre l'inclusion de sous-titres textes dans les vidéos lues avec <video> ?",
          correctAnswer: 1,
          answers: ["<track src=\"soustitres.vtt\">", "<subtitle source=\"soustitres.srt\">", "<captions source=\"soustitres.srt\">"]
        }
    );
    db.questions.insert(
        { id: 11,
          domain: "CSS",
          question: "Que signifie CSS ?",
          correctAnswer: 1,
          answers: ["Cascading Style Sheets", "Create Simple Samples", "Creating System Style"]
        }
    );
    db.questions.insert(
        { id: 12,
          domain: "CSS",
          question: "À quoi sert le langage CSS ?",
          correctAnswer: 2,
          answers: ["À réaliser des pages dynamiques", "À ajouter du style aux documents web", "À insérer du contenu dans une page internet"]
        }
    );
    db.questions.insert(
        { id: 13,
          domain: "",
          question: "",
          correctAnswer: 0,
          answers: []
        }
    );
  }
}