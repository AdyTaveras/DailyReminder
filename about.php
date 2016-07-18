<html>
  <head>
    <meta charset="utf-8">
    <script src= "jQuery/jquery-1.12.0.js"></script>
    <link rel="stylesheet" href="bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
    <link rel="stylesheet" href="bootstrap-theme.min.css" integrity="sha384-fLW2N01lMqjakBkx3l/M9EahuwpSfeNvV63J5ezn3uZzapT0u7EYsXMjQV+0En5r" crossorigin="anonymous">
    <link rel="stylesheet" href="bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
    <link rel="stylesheet" href="estilos.css">
    <title>Daily Reminder</title>
  </head>
  <body>
    <div class="container text-center bg-primary ">
        <h1 class=>About Daily Reminder<h1>
    </div>
    <ul class= "container list-unstyled list-inline text-center">
        <li><a href ="index.php">Main</a></li>
        <li><a href ="contact.php">Contact us</a></li>
        <li><a href ="register.php">Register</a></li>
        <li><a href ="login.php">Log In</a></li>
    </ul>
    <p id="texto" class="container">
        We are privileged to be involved as members and leaders for a variety of community, professional and business organizations that support our mission and industry. We welcome the challenge of helping to define our communities and the services they provide to citizens.
    </p>
    <img src="propic.jpg" id = "imagen">
    <script>
      $(document).on('ready',function(){
        $('#texto').hide();
        $('#texto').fadeIn();
        $('#imagen').hide();
        $('#imagen').fadeIn();
      });
    </script>
 </body>
</html>
