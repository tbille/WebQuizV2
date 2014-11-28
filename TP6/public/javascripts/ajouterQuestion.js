//Ajouter un input field lorsqu'on clique sur Ajouter une reponse
$(document).ready(function() {
        var scntDiv = $('.allReponses');   
        var n = 3;
 
         $('.ajouterReponse').click(function() {
        $(scntDiv).append("<div><input type=text size=63 name=answers placeholder='Réponse no. "+ ++n +" '/></div>"); 
        $('#chooseAnswer').attr('max', n);
        });
  
        /* Retiré input avec bouton radio
        $('.ajouterReponse').click(function() {
        $(scntDiv).append("<div><input type=text placeholder='Réponse "+ ++n +" '/><input type=radio name=answer/></div>");      
        });
        */
});



              

         
   