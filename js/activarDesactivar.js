
  var paginaActual=1;
  var registrosPorPagina=10;
  var totalRegistros=0;
  var ultimaPag;
  $('#btnActivarFiltrados').hide();
  $('#btnDesactivarFiltrados').hide();
  $('#btnCancelarFiltrarCupones2').on('click',function(){
    $('#btnActivarFiltrados').hide();
    $('#btnDesactivarFiltrados').hide();
    $('#txtFiltroCupones2').val('');
    $('#txtf3').val('');
    $('#txtf4').val('');
    mostrar2(1,10);
  });
  registrosPorPagina=$('#cupones_comboBox2').val();
  getTotalRegistros2("cupones");//asigna el total de registos a totalRegistros


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
      totalRegistros=res;
    })
  }
  $('#FormFiltroCupones2').on('submit',function(e){
    e.preventDefault();
  })
  $('#cupones_comboBox2').on('change',function(){       //ocurre cuando cambio el maximo
    paginaActual=1;                                    //de registros por pagina
    registrosPorPagina=$(this).val();
    getTotalRegistros2("cupones");//asigna el valor a totalRegistros
    if(registrosPorPagina=="TODOS"){
      $('#pagina1Cupones2,#paginaSiguienteCupones2,#paginaAnteriorCupones2,#paginaUltimaCupones2').prop( "disabled", true );
      mostrar2(paginaActual,totalRegistros);

      $('#txtFiltroCupones2').val('');
    }else {
      $('#pagina1Cupones2,#paginaSiguienteCupones2,#paginaAnteriorCupones2,#paginaUltimaCupones2').prop( "disabled", false );

      mostrar2(paginaActual,registrosPorPagina);
    }

  });
  $('#pagina1Cupones2').on('click',function(){
    paginaActual=1;
    mostrar2(paginaActual,registrosPorPagina);
  });

  $('#paginaSiguienteCupones2').on('click',function(){
    getTotalRegistros2("cupones");
    if(totalRegistros%registrosPorPagina==0){
      ultimaPag=totalRegistros/registrosPorPagina;
    }else if (totalRegistros%registrosPorPagina>0) {
      ultimaPag=(parseInt(totalRegistros/registrosPorPagina))+1;
    }

    if(paginaActual<ultimaPag){
      paginaActual++;
      mostrar2(paginaActual,registrosPorPagina);
    }

  });
  $('#paginaAnteriorCupones2').on('click',function(){
    if(paginaActual>1){
      paginaActual--;
      mostrar2(paginaActual,registrosPorPagina);
    }
  });
  function desactivar_cupones(idcupones){
    alertify.set({ buttonReverse: true });
    alertify.set({ labels: {
    ok     : "SI",
    cancel : "NO"
    }});
    alertify.confirm("Está seguro que desea desactivar este cupón?", function (e) {
    if (e) {
      var data={
        idcupones:idcupones
      };
      $.ajax(
        {
          url:'php/desactivarCupones.php',
          type:'post',
          datatype:'json',
          data:data,
          beforeSend:function(){

          }
        }
      )
      .done(function(res){
        alertify.success(res);
        mostrar2(paginaActual,registrosPorPagina);

      });
    } else {

    }
    });

  }
  function desactivar_cupones2(idcupones){
    alertify.set({ buttonReverse: true });
    alertify.set({ labels: {
    ok     : "SI",
    cancel : "NO"
    }});
    alertify.confirm("Está seguro que desea desactivar este cupón?", function (e) {

    if (e) {
      var data={
        idcupones:idcupones
      };
      $.ajax(
        {
          url:'php/desactivarCupones.php',
          type:'post',
          datatype:'json',
          data:data,
          beforeSend:function(){

          }
        }
      )
      .done(function(res){
        alertify.success(res);
        FiltrarCupones2();
      });
    } else {

    }
  });

  }
  function activar_cupones(idcupones){
    alertify.set({ buttonReverse: true });
    alertify.set({ labels: {
    ok     : "SI",
    cancel : "NO"
    }});
    alertify.confirm("Está seguro que desea activar este cupón?", function (e) {
    if (e) {
      var data={
        idcupones:idcupones
      };
      $.ajax(
        {
          url:'php/activarCupones.php',
          type:'post',
          datatype:'json',
          data:data,
          beforeSend:function(){

          }
        }
      )
      .done(function(res){
          alertify.success(res);
          mostrar2(paginaActual,registrosPorPagina);

      });
    } else {

    }
    });
  }
  function activar_cupones2(idcupones){
    alertify.set({ buttonReverse: true });
    alertify.set({ labels: {
    ok     : "SI",
    cancel : "NO"
    }});
    alertify.confirm("Está seguro que desea activar este cupón?", function (e) {
    if (e) {
      var data={
        idcupones:idcupones
      };
      $.ajax(
        {
          url:'php/activarCupones.php',
          type:'post',
          datatype:'json',
          data:data,
          beforeSend:function(){

          }
        }
      )
      .done(function(res){
        alertify.success(res);
        FiltrarCupones2();

      });
    } else {

    }
  });

  }
  var filtro;
  var orden;
  var texto;
  $('.divFecha3,.divFecha4').hide();
  $('#cupones_comboBoxFiltro2').on('change',function(){
    filtro=$(this).val();
    if(filtro=="Fecha" || filtro=="Fecha caducidad"){
      $('.divFecha3').show();
      $('.divFecha4').hide();
      $('#txtFiltroCupones2').hide();
      $('.txtFiltroCupones2').hide();
    }else if(filtro=="Entre fechas"){
      $('.divFecha3,.divFecha4').show();
      $('#txtFiltroCupones2').hide();
      $('.txtFiltroCupones2').hide();
    }else {
      $('.divFecha3,.divFecha4').hide();
      $('#txtFiltroCupones2').show();
      $('.txtFiltroCupones2').show();
    }
  });
  $('#cupones_comboBoxOrdenar2').on('change',function(){
    orden=$(this).val();
  });
  function FiltrarCupones2(){
    texto=$('#txtFiltroCupones2').val();
    filtro=$('#cupones_comboBoxFiltro2').val();
    orden=$('#cupones_comboBoxOrdenar2').val();
    fecha1=$('#txtf3').val();
    fecha2=$('#txtf4').val();
    var data={
      ORDEN:orden,
      FILTRO:filtro,
      TEXTO:texto,
      FECHA1:fecha1,
      FECHA2:fecha2
    };
    $.ajax(
      {
        url:'php/filtroCupones2.php',
        type:'post',
        datatype:'json',
        data:data,
        beforeSend:function(){

        }
      }
    )
    .done(function(res){
      if(res=="No hay registros"){
        $('#tablaCupones2').fadeOut();
        $('#tablaCupones2').html('');
        $('#vista2 #cupones_mensaje_nohayRegistros2').html(res)
        $('#cupones_mensaje_nohayRegistros2').css('color','#e0cd3a')
        $('#cupones_mensaje_nohayRegistros2').fadeIn();
        setTimeout(function(){
          $('#cupones_mensaje_nohayRegistros2').fadeOut();
          $('#cupones_mensaje_nohayRegistros2').html('');
        },1250);
      }else {
        $('#tablaCupones2').html(res);
        $('body').scrollTop($('body').prop('scrollHeight'));
        $('#tablaCupones2').fadeIn();
      }
    });
  }
  $('#btnDesactivarFiltrados').on('click',function(){
    DesactivarFiltrados();

    $('#btnActivarFiltrados').hide();
    $(this).hide();
    setTimeout(function(){
      mostrar2(1,10);
    },2500);
  })
  function DesactivarFiltrados(){
    texto=$('#txtFiltroCupones2').val();
    filtro=$('#cupones_comboBoxFiltro2').val();
    orden=$('#cupones_comboBoxOrdenar2').val();
    fecha1=$('#txtf3').val();
    fecha2=$('#txtf4').val();
    var data={
      ORDEN:orden,
      FILTRO:filtro,
      TEXTO:texto,
      FECHA1:fecha1,
      FECHA2:fecha2
    };
    $.ajax(
      {
        url:'php/DesactivarFiltrados.php',
        type:'post',
        datatype:'json',
        data:data,
        beforeSend:function(){

        }
      }
    )
    .done(function(res){
      alertify.success(res);
      setTimeout(function(){
        mostrar2(1,10);
      },2000);
    });
  }
  $('#btnActivarFiltrados').on('click',function(){
    ActivarFiltrados();

    $(this).hide();
    $('#btnDesactivarFiltrados').hide();
    mostrar2(1,10);
  })
  function ActivarFiltrados(){
    texto=$('#txtFiltroCupones2').val();
    filtro=$('#cupones_comboBoxFiltro2').val();
    orden=$('#cupones_comboBoxOrdenar2').val();
    fecha1=$('#txtf3').val();
    fecha2=$('#txtf4').val();
    var data={
      ORDEN:orden,
      FILTRO:filtro,
      TEXTO:texto,
      FECHA1:fecha1,
      FECHA2:fecha2
    };
    $.ajax(
      {
        url:'php/ActivarFiltrados.php',
        type:'post',
        datatype:'json',
        data:data,
        beforeSend:function(){

        }
      }
    )
    .done(function(res){
      alertify.success(res);
    });
  }
  $('#btnFiltrarCupones2').on('click',function(){
    FiltrarCupones2();
    $('#btnActivarFiltrados').show();
    $('#btnDesactivarFiltrados').show();
  });
  $('#paginaUltimaCupones2').on('click',function(){
    getTotalRegistros2("cupones");
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
    mostrar2(paginaActual,registrosPorPagina);
  });
  $('#actualizar2').on('click',function(){
    mostrar2(1,10);

  });
  $('#cuponesFormPaginacion2').on('submit',function(e){ //evita que cuando le de a los
    e.preventDefault();                                //botones de paginacion se envie
  });                                                  // el formulario.
  mostrar2(paginaActual,registrosPorPagina);
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
        $('body').scrollTop($('body').prop('scrollHeight'));
        $('#tablaCupones2').fadeIn();
        getTotalRegistros2("cupones");
        if(totalRegistros%registrosPorPagina==0){
          ultimaPag=totalRegistros/registrosPorPagina;
        }else if (totalRegistros%registrosPorPagina>0) {
          ultimaPag=(parseInt(totalRegistros/registrosPorPagina))+1;
        }
        $('#NumPagCupones2').html("Página "+paginaActual+" de "+ultimaPag);
        $('#datosRegistrosCupones2').html(" Registros de "+totalRegistros);
        if($('#cupones_comboBox2').val()=="TODOS"){

        }else {
          $('#pagina1Cupones2,#paginaSiguienteCupones2,#paginaAnteriorCupones2,#paginaUltimaCupones2').prop( "disabled", false );
        }
        if(totalRegistros==0){
          $('#pagina1Cupones2,#paginaSiguienteCupones2,#paginaAnteriorCupones2,#paginaUltimaCupones2').prop( "disabled", true );
        }


      })

  }
  function totalizar2(){
    getTotalRegistros2("cupones");
    $('#NumPagCupones2').html("Página "+paginaActual+" de "+ultimaPag);
    $('#datosRegistrosCupones2').html(" Registros de "+totalRegistros);
  }
  $('#formCupones2').on('submit',function(e){
    e.preventDefault();
  });
