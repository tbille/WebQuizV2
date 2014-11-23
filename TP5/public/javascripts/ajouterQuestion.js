
$(document).ready(function() {
              
  var scntDiv = $('.allReponses');   
  var n = 3;
 
  //Ajouter un input field lorsqu'on clique sur Ajouter une reponse
    $('.ajouterReponse').click(function() {
        $(scntDiv).append("<div><input class=listeReponses type=text size=60 name=answers required placeholder='Réponse no. "+ ++n +" '/><a href=# class=remove_field> X</a></div>"); 
        var nbInputs = $('.listeReponses').length;
        $('#chooseAnswer').attr('max', nbInputs); //modifie le max de l'index bonne reponse en fonction du nombre de input reponses
        $('#chooseAnswer').attr('min', 1); 
    });
  
  //ajouter un lien supprimer un input field
    $(scntDiv).on("click",".remove_field", function(e){ 
        e.preventDefault(); $(this).parent('div').remove(); n--;
        var nbInputs = $('.listeReponses').length;
        $('#chooseAnswer').attr('max', nbInputs); //modifie le max de l'index bonne reponse en fonction du nombre de input reponses
        $('#chooseAnswer').attr('min', 1);
    })

        /* Retiré input avec bouton radio
        $('.ajouterReponse').click(function() {
        $(scntDiv).append("<div><input type=text placeholder='Réponse "+ ++n +" '/><input type=radio name=answer/></div>");      
        });
        */ 

  //Valider si le domaine inscrit est HTML CSS ou JavaScript
    $("input[type='submit']").click(function() {
        var selectedDomain = $('#selectedDomain').val();
        alert(selectedDomain);
      
      /*  if(selectedDomain == "HTML" || selectedDomain == "CSS") {
         
        }*/
       
    });
        
        

});











  




              

         
   