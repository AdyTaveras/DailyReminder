$(document).on('ready',function(){

  $('.btnArriba').on('click',function(){
    $('html, body').animate({scrollTop: '0px'}, 1000);

  });
  $('#btnCancelarFiltrarCupones').on('click',function(){
    $('#txtFiltroCupones').val('');
    $('#txtf1').val('');
    $('#txtf2').val('');
    mostrar(1,10);
  });
  var paginaActual=1;
  var registrosPorPagina=10;
  var totalRegistros=0;
  var ultimaPag;
  registrosPorPagina=$('#cupones_comboBox').val();
  getTotalRegistros("cupones");//asigna el total de registos a totalRegistros
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
  $('#cupones_comboBox').on('change',function(){       //ocurre cuando cambio el maximo
    paginaActual=1;                                    //de registros por pagina
    registrosPorPagina=$(this).val();
    getTotalRegistros("cupones");//asigna el valor a totalRegistros
    if(registrosPorPagina=="TODOS"){
      $('#pagina1Cupones,#paginaSiguienteCupones,#paginaAnteriorCupones,#paginaUltimaCupones').prop( "disabled", true );

      $('#txtFiltroCupones').val('');
      mostrar(paginaActual,totalRegistros);
    }else {
      $('#pagina1Cupones,#paginaSiguienteCupones,#paginaAnteriorCupones,#paginaUltimaCupones').prop( "disabled", false );

      mostrar(paginaActual,registrosPorPagina);
    }

  });
  $('#pagina1Cupones').on('click',function(){
    paginaActual=1;

    mostrar(paginaActual,registrosPorPagina);
  });

  $('#paginaSiguienteCupones').on('click',function(){
    getTotalRegistros("cupones");
    if(totalRegistros%registrosPorPagina==0){
      ultimaPag=totalRegistros/registrosPorPagina;
    }else if (totalRegistros%registrosPorPagina>0) {
      ultimaPag=(parseInt(totalRegistros/registrosPorPagina))+1;
    }

    if(paginaActual<ultimaPag){
      paginaActual++;

      mostrar(paginaActual,registrosPorPagina);
    }

  });
  $('#paginaAnteriorCupones').on('click',function(){
    if(paginaActual>1){
      paginaActual--;

      mostrar(paginaActual,registrosPorPagina);
    }
  });

  $('#paginaUltimaCupones').on('click',function(){
    getTotalRegistros("cupones");
    if(totalRegistros>0){

    }
    if(totalRegistros%registrosPorPagina==0){
      ultimaPag=totalRegistros/registrosPorPagina;
      paginaActual=ultimaPag;
    }else if (totalRegistros%registrosPorPagina>0) {
      ultimaPag=(parseInt(totalRegistros/registrosPorPagina))+1;
      paginaActual=ultimaPag
    }else if (totalRegistros<registrosPorPagina) {
      paginaActual=1;
      alert("4");
    }

    mostrar(paginaActual,registrosPorPagina);
  });
  $('#actualizar').on('click',function(){
    mostrar(1,10);

  });
  $('#cuponesFormPaginacion').on('submit',function(e){ //evita que cuando le de a los
    e.preventDefault();                                //botones de paginacion se envie
  });                                                  // el formulario.

  mostrar(paginaActual,registrosPorPagina);
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
        $('body').scrollTop($('body').prop('scrollHeight'));
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
  function totalizar(){
    getTotalRegistros("cupones");
    $('#NumPagCupones').html("Página "+paginaActual+" de "+ultimaPag);
    $('#datosRegistrosCupones').html(" Registros de "+totalRegistros);
  }
  $('#FormFiltroCupones').on('submit',function(e){
    e.preventDefault();

  });
  var filtro;
  var orden;
  var texto;
  $('.divFecha1,.divFecha2').hide();
  $('#cupones_comboBoxFiltro').on('change',function(){
    filtro=$(this).val();
    if(filtro=="Fecha" || filtro=="Fecha caducidad"){
      $('.divFecha1').show();
      $('.divFecha2').hide();
      $('#txtFiltroCupones').hide();
      $('.txtFiltroCupones').hide();
    }else if(filtro=="Entre fechas"){
      $('.divFecha1,.divFecha2').show();
      $('#txtFiltroCupones').hide();
      $('.txtFiltroCupones').hide();
    }else {
      $('.divFecha1,.divFecha2').hide();
      $('#txtFiltroCupones').show();
      $('.txtFiltroCupones').show();
    }
  });
  $('#cupones_comboBoxOrdenar').on('change',function(){
    orden=$(this).val();
  });
  $('#btnFiltrarCupones').on('click',function(){
    texto=$('#txtFiltroCupones').val();
    filtro=$('#cupones_comboBoxFiltro').val();
    orden=$('#cupones_comboBoxOrdenar').val();
    fecha1=$('#txtf1').val();
    fecha2=$('#txtf2').val();
    console.log("texto: "+texto);
    console.log("filtro: "+filtro);
    console.log("orden: "+orden);
    console.log("fecha1: "+fecha1);
    console.log("fecha2: "+fecha2);
    var data={
      ORDEN:orden,
      FILTRO:filtro,
      TEXTO:texto,
      FECHA1:fecha1,
      FECHA2:fecha2
    };
    $.ajax(
      {
        url:'php/filtroCupones.php',
        type:'post',
        datatype:'json',
        data:data,
        beforeSend:function(){

        }
      }
    )
    .done(function(res){

      if(res=="No hay registros"){
        $('#tablaCupones').fadeOut();
        $('#tablaCupones').html('');
        $('#vista #cupones_mensaje_nohayRegistros').html(res)
        $('#cupones_mensaje_nohayRegistros').css('color','#e0cd3a')
        $('#cupones_mensaje_nohayRegistros').fadeIn();
        setTimeout(function(){
          $('#cupones_mensaje_nohayRegistros').fadeOut();
          $('#cupones_mensaje_nohayRegistros').html('');
        },1250);
      }else {
        $('#tablaCupones').html(res);
        $('body').scrollTop($('body').prop('scrollHeight'));
        $('#tablaCupones').fadeIn();
      }
    });

  });
  $('.btnGenerarCupon__').on('click',function(){
    var data=$('#formCupones__').serializeArray();
    var dt = new Date();
    var mes=dt.getMonth()+1;
    var dia=dt.getDate();
    var ano=dt.getFullYear();
    var fecha_actual;
    var fecha_cad=$('#fecha_venc_cupones').val();
    if(mes<10 && dia<10){
      fecha_actual=ano+"-0"+mes+"-0"+dia;
    }else if (mes>10 && dia<10) {
      fecha_actual=ano+"-"+mes+"-0"+dia;
    }else if (mes<10 && dia>10) {
      fecha_actual=ano+"-0"+mes+"-"+dia;
    }else if (mes>10 && dia>10) {
      fecha_actual=ano+"-"+mes+"-"+dia;
    }

    if($('#fecha_venc_cupones').val()!="" &&$('#serie_cupones').val()!="" && $('#num_cupones').val()!="" && (fecha_cad>=fecha_actual)){
      $('.cup_fecha').removeClass("has-error");
      $('.cup_serie').removeClass("has-error");
      $('.cup_total').removeClass("has-error");
      $.ajax(
        {
          url:'php/insertarCupones.php',
          type:'post',
          datatype:'json',
          data:data,
          beforeSend:function(){
            $('#cupones_spinner').css('display','none');
            $('#cupones_spinner').html('<i class="spinner fa fa-refresh  fa-spin fa-1x"></i> Cargando');
            $('#cupones_spinner').fadeIn();
          }
        }
      )
      .done(function(res){
        $('#cupones_mensaje').html(res);
        $('#cupones_mensaje').css('color','#bae845')
        $('#cupones_mensaje').fadeIn();
        $('#serie_cupones,#num_cupones').val('');
        //validarPagina();
        setTimeout(function(){
          $('#cupones_mensaje').fadeOut();
          $('#cupones_mensaje').html('');
        },1250);
        if(registrosPorPagina=="TODOS"){
          mostrar(1,10);
          $('#cupones_comboBox').val('10');
          registrosPorPagina=10;
        }else {

          mostrar(1,registrosPorPagina);
        }
        totalizar();
        setTimeout(function(){
          mostrar(1,10);
        },1500);

      })
      .fail(function(){
        console.log("Falso");
      })
      .always(function(){
        console.log("complete");
        setTimeout(function(){
          $('#cupones_spinner').fadeOut();
          $('#cupones_spinner').html('')//Detiene el spinner
        },750);
      });

    }else {
      $('#cupones_mensaje').css('color','#d92b40')
      if($('#fecha_venc_cupones').val()==""){
        $('.cup_fecha').addClass("has-error");
        $('#cupones_mensaje').html("Debe seleccionar la fecha de caducidad!");
        $('#cupones_mensaje').fadeIn();
        setTimeout(function(){
          $('#cupones_mensaje').fadeOut();
          $('#cupones_mensaje').html('');
        },1250);
      }else if(fecha_cad<fecha_actual){
        $('.cup_fecha').addClass("has-error");
        $('#cupones_mensaje').html("La fecha seleccionada es menor que la fecha actual!");
        $('#cupones_mensaje').fadeIn();
        setTimeout(function(){
          $('#cupones_mensaje').fadeOut();
          $('#cupones_mensaje').html('');
        },1250);
      }else {
        $('.cup_fecha').removeClass("has-error");
      }


      if($('#serie_cupones').val()==""){
        $('.cup_serie').addClass("has-error");
        $('#cupones_mensaje').html("Debe introducir el número de serie!");
        $('#cupones_mensaje').fadeIn();
        setTimeout(function(){
          $('#cupones_mensaje').fadeOut();
          $('#cupones_mensaje').html('');
        },1250);
      }else {
        $('.cup_serie').removeClass("has-error");
      }
      if($('#num_cupones').val()==""){
        $('.cup_total').addClass("has-error");
        $('#cupones_mensaje').html("Debe introducir el número de cupones!");
        $('#cupones_mensaje').fadeIn();
        setTimeout(function(){
          $('#cupones_mensaje').fadeOut();
          $('#cupones_mensaje').html('');
        },1250);
      }else {
        $('.cup_total').removeClass("has-error");
      }



    }
  });
  $('#formCupones__').on('submit',function(e){
    e.preventDefault();
  });
});
