

$(document).on('ready',function(){
  $('header nav ul li a').css('text-decoration','none');
  $('header nav ul li a').css('color','#fff');
  var cambiando=false;
  $('.redimir,.cupones,.categorias,.activarDesactivar,.distribuidores,.reportes').css('display','none');
  function cargarredimir(){
    if(cambiando){

    }else {
      $('.cupones,.activarDesactivar,.distribuidores,.reportes,.categorias').slideUp('slow');
      cambiando=true;
      setTimeout(function(){
        $('.redimir').slideDown('fast');
        cambiando=false;
        $('#_Redimir').addClass('menuActivo');
        $('#_Cupones,#_Categorias,#_ActivarDesactivarCupones,#_Distribuidores,#_Reportes').removeClass('menuActivo');
      },500);
    }
  }
  cargarredimir();
  $('#lRedimir').on('click',function(){
    cargarredimir();
  });
  $('#lCupones').on('click',function(){
    if(cambiando){

    }else {
      $('#txtFiltroCupones').val('');
      $('#serie_cupones').val('');
      $('#num_cupones').val('');
      $('#fecha_venc_cupones').val('');
      $('.cup_fecha').removeClass("has-error");
      $('.cup_serie').removeClass("has-error");
      $('.cup_total').removeClass("has-error");
      getTotalRegistros("cupones");
      mostrar(1,10);

      $('.redimir,.activarDesactivar,.distribuidores,.reportes,.categorias').slideUp('slow');
      cambiando=true;
      setTimeout(function(){
        $('.cupones').slideDown('fast');
        cambiando=false;
        $('#_Cupones').addClass('menuActivo');
        $('#_Redimir,#_Categorias,#_ActivarDesactivarCupones,#_Distribuidores,#_Reportes').removeClass('menuActivo');
      },500);
    }
  });
  $('#lCategorias').on('click',function(){
    if(cambiando){

    }else {
      $('.redimir,.activarDesactivar,.distribuidores,.reportes,.cupones').slideUp('slow');
      cambiando=true;
      setTimeout(function(){
        $('.categorias').slideDown('fast');
        cambiando=false;
        $('#_Categorias').addClass('menuActivo');
        $('#_Redimir,#_Cupones,#_ActivarDesactivarCupones,#_Distribuidores,#_Reportes').removeClass('menuActivo');
      },500);
    }
  });
  $('#lActivarDesactivarCupones').on('click',function(){
    if(cambiando){

    }else {
      $('#btnActivarFiltrados').hide();
      $('#btnDesactivarFiltrados').hide();
      $('#txtFiltroCupones2').val('');
      getTotalRegistros2("cupones");
      $('.redimir,.categorias,.distribuidores,.reportes,.cupones').slideUp('slow');
      cambiando=true;
      setTimeout(function(){
        $('.activarDesactivar').slideDown('fast');
        cambiando=false;
        $('#_ActivarDesactivarCupones').addClass('menuActivo');
        $('#_Redimir,#_Cupones,#_Categorias,#_Distribuidores,#_Reportes').removeClass('menuActivo');
      },500);
      mostrar2(1,10);
    }
  });

  $('#lDistribuidores').on('click',function(){
    if(cambiando){

    }else {
      $('.redimir,.categorias,.activarDesactivar,.reportes,.cupones').slideUp('slow');
      cambiando=true;
      setTimeout(function(){
        $('.distribuidores').slideDown('fast');
        cambiando=false;
        $('#_Distribuidores').addClass('menuActivo');
        $('#_Redimir,#_Cupones,#_Categorias,#_ActivarDesactivarCupones,#_Reportes').removeClass('menuActivo');
      },500);
    }
  });
  $('#lReportes').on('click',function(){
    if(cambiando){

    }else {
      $('.redimir,.categorias,.activarDesactivar,.distribuidores,.cupones').slideUp('slow');
      cambiando=true;
      setTimeout(function(){
        $('.reportes').slideDown('fast');
        cambiando=false;
        $('#_Reportes').addClass('menuActivo');
        $('#_Distribuidores,#_ActivarDesactivarCupones,#_Categorias,#_Cupones,#_Redimir').removeClass('menuActivo');
      },500);
    }
  });

  //funcion para mostrar los cupones en el menu de CUPONES
  var paginaActual=1;
  var totalRegistros=0;
  var ultimaPag;
  var registrosPorPagina=10;
  function mostrar(paginaActual,registrosPorPagina){
      $('#tablaCupones').html('');
      var data=$('#formCupones__').serializeArray();
      data.push({name:'paginaActual',value:paginaActual});
      data.push({name:'registrosPorPagina',value:registrosPorPagina});
      $.ajax(
        {
          url:'php/mostrarCupones.php',
          type:'post',
          datatype:'json',
          data:data,
          beforeSend:function(){

          }
        }
      )
      .done(function(res){
        $('#tablaCupones').html(res);

        $('#tablaCupones').fadeIn();
        getTotalRegistros("cupones");
        if(totalRegistros%registrosPorPagina==0){
          ultimaPag=totalRegistros/registrosPorPagina;
        }else if (totalRegistros%registrosPorPagina>0) {
          ultimaPag=(parseInt(totalRegistros/registrosPorPagina))+1;
        }
        $('#NumPagCupones').html("Página "+paginaActual+" de "+ultimaPag);
        $('#datosRegistrosCupones').html(" Registros de "+totalRegistros);
        if($('#cupones_comboBox').val()=="TODOS"){
        }else {
          $('#pagina1Cupones,#paginaSiguienteCupones,#paginaAnteriorCupones,#paginaUltimaCupones').prop( "disabled", false );
        }
        if(totalRegistros==0){
          $('#pagina1Cupones,#paginaSiguienteCupones,#paginaAnteriorCupones,#paginaUltimaCupones').prop( "disabled", true );
        }
      })
  }
  function getTotalRegistros(tabla){
    var data={
      bdtabla:tabla
    };
    console.log(data);
    $.ajax(
      {
        url:'php/TotalRegistrosPorTabla.php',
        type:'post',
        datatype:'json',
        data:data,
        beforeSend:function(){

        }
      }
    )
    .done(function(res){
      totalRegistros=res;
    })
  }

  //funcion para mostrar los cupones en el menu de CUPONES act/des
  var paginaActual2=1;
  var registrosPorPagina2=10;
  var totalRegistros2=0;
  var ultimaPag2;
  function mostrar2(paginaActual,registrosPorPagina){
    getTotalRegistros2("cupones");//cambio aqui

      $('#tablaCupones2').html('');
      var data=$('#formCupones2').serializeArray();
      data.push({name:'paginaActual',value:paginaActual});
      data.push({name:'registrosPorPagina',value:registrosPorPagina});
      $.ajax(
        {
          url:'php/mostrarCuponesActDes.php',
          type:'post',
          datatype:'json',
          data:data,
          beforeSend:function(){

          }
        }
      )
      .done(function(res){
        $('#tablaCupones2').html(res);
        $('#tablaCupones2').fadeIn();
        getTotalRegistros2("cupones");
        if(totalRegistros2%registrosPorPagina2==0){
          ultimaPag2=totalRegistros2/registrosPorPagina2;
        }else if (totalRegistros2%registrosPorPagina2>0) {
          ultimaPag2=(parseInt(totalRegistros2/registrosPorPagina2))+1;
        }
        $('#NumPagCupones2').html("Página "+paginaActual2+" de "+ultimaPag2);
        $('#datosRegistrosCupones2').html(" Registros de "+totalRegistros2);
        if($('#cupones_comboBox2').val()=="TODOS"){

        }else {
          $('#pagina1Cupones2,#paginaSiguienteCupones2,#paginaAnteriorCupones2,#paginaUltimaCupones2').prop( "disabled", false );
        }
        if(totalRegistros2==0){
          $('#pagina1Cupones2,#paginaSiguienteCupones2,#paginaAnteriorCupones2,#paginaUltimaCupones2').prop( "disabled", true );
        }


      })

  }
  function getTotalRegistros2(tabla){
    var data={
      bdtabla:tabla
    };
    console.log(data);
    $.ajax(
      {
        url:'php/TotalRegistrosPorTabla.php',
        type:'post',
        datatype:'json',
        data:data,
        beforeSend:function(){

        }
      }
    )
    .done(function(res){
      totalRegistros2=res;
    })
  }
});
