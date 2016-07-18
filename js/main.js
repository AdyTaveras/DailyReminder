
$(document).on('ready',function(){

  $('#mainForm_xs').on('submit',function(e){  //Cuando se mande el formulario desde una PC
    e.preventDefault();
    var data=$(this).serializeArray();
    data.push({name:'dispositivo',value:'pc'});
    $.ajax(
      {
        url:'php/validar.php',
        type:'post',
        datatype:'json',
        data:data,
        beforeSend:function()
        {
          $('.spinner').css('display','none');
          $('.spinner').html('<i class="fa fa-refresh  fa-spin fa-3x"></i>');//Inicia el spinner
          $('.spinner').fadeIn();
        }
      }
    )
    .done(function(res){ //true
      if(res=="Los campos estan vacios"){
        $('.errorImagen').fadeIn();
        $('.dcontraseña_xs,.dusuario_xs').addClass('has-error');
      }else if (res=="Login Fallido") {
        $('.errorImagen').fadeIn();
        $('.dcontraseña_xs,.dusuario_xs').addClass('has-error');
      }else if (res=="Introduzca el usuario") {
        $('.errorImagen').fadeIn();
        $('.dusuario_xs').addClass('has-error');
        $('.dcontraseña_xs').removeClass('has-error');
      }else if (res=="Introduzca la contraseña") {
        $('.errorImagen').fadeIn();
        $('.dcontraseña_xs').addClass('has-error');
        $('.dusuario_xs').removeClass('has-error');
      }else if(res!="Login Exitoso" && res!="Introduzca la contraseña" && res!="Introduzca el usuario" && res!="Los campos estan vacios" ){
        $('.errorImagen').fadeOut();
        $('.dcontraseña_xs,.dusuario_xs').removeClass('has-error');
        window.location="principal.php?id="+res;
      }
      $('span').html(res);

    })
    .fail(function(){ //false
      $('span').html("Falso");
    })
    .always(function(){ //Siempre se ejecutara
      console.log("complete");
      setTimeout(function(){
          $('.spinner').fadeOut();
          $('.spinner').html('')//Detiene el spinner
      },1000);

    });
  });


  //CELULARES

  $('#mainFormxs').on('submit',function(e){  //Cuando se mande el formulario desde un MOVIL
    e.preventDefault();
    var data=$(this).serializeArray();
    data.push({name:'dispositivo',value:'movil'})
    $.ajax(
      {

        url:'php/validar.php',
        type:'post',
        datatype:'json',
        data:data,
        beforeSend:function()
        {
          $('.spinner').css('display','none');
          $('.spinner').html('<i class="fa fa-refresh  fa-spin fa-3x"></i>')//Inicia el spinner
          $('.spinner').fadeIn();
        }
      }
    )
    .done(function(res){ //true
      if(res=="Los campos estan vacios"){
        $('.errorImagen').fadeIn();
        $('.dcontraseñaxs,.dusuarioxs').addClass('has-error');
      }else if (res=="Login Fallido") {
        $('.errorImagen').fadeIn();
        $('.dcontraseñaxs,.dusuarioxs').addClass('has-error');
      }else if (res=="Introduzca el usuario") {
        $('.errorImagen').fadeIn();
        $('.dusuarioxs').addClass('has-error');
        $('.dcontraseñaxs').removeClass('has-error');
      }else if (res=="Introduzca la contraseña") {
        $('.errorImagen').fadeIn();
        $('.dcontraseñaxs').addClass('has-error');
        $('.dusuarioxs').removeClass('has-error');
      }else if(res!="Login Exitoso" && res!="Introduzca la contraseña" && res!="Introduzca el usuario" && res!="Los campos estan vacios" ){
        $('.errorImagen').fadeOut();
        $('.dcontraseñaxs,.dusuarioxs').removeClass('has-error');
        window.location="principal.php?id="+res;
      }
      $('span').html(res);
    })
    .fail(function(){ //false
      $('span').html("Falso");
    })
    .always(function(){ //Siempre se ejecutara
      console.log("complete");
      setTimeout(function(){
          $('.spinner').fadeOut();
          $('.spinner').html('')//Detiene el spinner
      },500);

    });
  });
});
