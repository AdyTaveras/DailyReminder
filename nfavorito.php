 <!DOCTYPE html>
 <html>
   <head>
     <meta charset="utf-8">
     <script src="alertify/lib/alertify.min.js"></script>
     <link rel="stylesheet" href="alertify/themes/alertify.core.css" />
     <link rel="stylesheet" href="alertify/themes/alertify.default.css" />
     <script src= "jQuery/jquery-1.12.0.js"></script>
     <link rel="stylesheet" href="bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
     <link rel="stylesheet" href="bootstrap-theme.min.css" integrity="sha384-fLW2N01lMqjakBkx3l/M9EahuwpSfeNvV63J5ezn3uZzapT0u7EYsXMjQV+0En5r" crossorigin="anonymous">
     <link rel="stylesheet" href="bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
     <link rel="stylesheet" href="css/font-awesome.css">
     <link rel="stylesheet" href="estilos2.css">
     <link rel="stylesheet" href="estilost.css">

     <title>My Favorites</title>
   </head>
   <body>
    <a href= "contenido.php" class= "btn btn-primary alejar2">Home</a>
    <script>
    $(document).on('ready',function(){
      function mostrar(){
      $.get("favlocation.php", function(data){
        $('#tablafav').html(data);
      });
     }
     mostrar();
     });
     </script>
   <div class="container text-center table-responsive">
    <h1> My favorite Notes</h1>
    <table id="tablafav" class = "table"></table>
   </div>
   </body>
 </html>
