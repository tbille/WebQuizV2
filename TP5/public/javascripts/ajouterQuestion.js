//Ajouter un input field lorsqu'on clique sur Ajouter une reponse
$(document).ready(function() {
        var scntDiv = $('.allReponses');   
        var n = 3;
 
        $('.ajouterReponse').click(function() {
        $(scntDiv).append("<div><input type=text placeholder='Réponse "+ ++n +" '/><input type=radio name=answer/></div>");      
        });
        
});



              

         
   