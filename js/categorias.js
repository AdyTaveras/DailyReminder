
var modificar=false;
var guardar=false;

var paginaActual=1;
var registrosPorPagina=10;
var ultimaPag;
function traerDatosConCriterios(){
  registrosPorPagina=$('#categoria_comboBox').val();

  var idusuario=$('#idusuario').val();
  var data={
    'idusuario':idusuario
  }
  $.ajax(
    {
      url:'php/validarUltimaPagina.php',
      type:'post',
      datatype:'json',
      data:data,
      beforeSend:function(){

      }

    }
  )
  .done(function(res){
    res=res/registrosPorPagina;
    var n=parseInt(res);
    if((res-n)>0){
      ultimaPag=n+1;
    }else {
      ultimaPag=n;
    }
  });

  mostrar(paginaActual,registrosPorPagina);
}
function validarPagina(){

  $('#txtNumPag').html(paginaActual);
  traerDatosConCriterios();

  if(paginaActual==1 ){//valido que si estoy en la 1, no pueda darle mas
    $('#paginaFirst,#paginaAnterior').prop( "disabled", true );
  }else if (paginaActual==ultimaPag) {  //valido que si estoy en la ultima, no pueda darle mas
    $('#paginaLast,#paginaSiguiente').prop( "disabled", true );
  }

  if(paginaActual>1) {
    $('#paginaFirst,#paginaAnterior').prop( "disabled", false );
  }else if (paginaActual<ultimaPag) {
    $('#paginaLast,#paginaSiguiente').prop( "disabled", false );
  }




}
validarPagina();
function mostrar(paginaActual,registrosPorPagina){
  $('#tabla_categoria').fadeOut();
  setTimeout(function(){
    $('#tabla_categoria').html('');
    //Enviamos el id
    var data=$('#categoriasForm').serializeArray();
    data.push({name:'paginaActual',value:paginaActual});
    data.push({name:'registrosPorPagina',value:registrosPorPagina});
    $.ajax(
      {
        url:'php/mostrarCategoria.php',
        type:'post',
        datatype:'json',
        data:data,
        beforeSend:function()
        {

        }
      }
    )
    .done(function(res){
      $('#tabla_categoria').html(res);
      $('body').scrollTop($('body').prop('scrollHeight'));
      $('#tabla_categoria').fadeIn();
    })
  },100);


}
$('#categoria_comboBox').on('change',function(){
  paginaActual=1;
  validarPagina();
});
var direccion;
$('#categoriasFormOrdenar').on('submit',function(e){
  e.preventDefault();

  if(direccion=="siguiente"){
    if(paginaActual==ultimaPag){
    }else {
      paginaActual++;
    }

  }else if (direccion=="anterior") {
    if (paginaActual>1){
      paginaActual--;
    }
  }else if (direccion=="First") {
    paginaActual=1;
  }else if (direccion=="Last") {
    paginaActual=ultimaPag;
  }
  validarPagina();

})
$('#paginaLast').on('click',function(){
  direccion="Last";
})
$('#paginaFirst').on('click',function(){
  direccion="First";
})
$('#paginaSiguiente').on('click',function(){
  direccion="siguiente";
});
$('#paginaAnterior').on('click',function(){
  direccion="anterior";
});
//Llamamos la funcion mostrar
//mostrar(paginaActual,registrosPorPagina);
function cancelar(){
  guardar=false;
  modificar=false;
  $('#btnGuardar_Categorias').html('Guardar');
  $('#categoria_categoria,#categoria_descripcion,#categoria_idcategoria').val('');
  $('#categoria_mensaje').fadeOut();
  $('#categoria_mensaje').html('');
  $('#categoria_errorImagen').fadeOut();
  $('.categoria_categoria,.categoria_descripcion').removeClass('has-error');
}
$('#btnCancelar_Categorias').on('click',function(){//valido cuando se presiona el botón de guardar.
  cancelar();
});

$('#btnGuardar_Categorias').on('click',function(){//valido cuando se presiona el botón de guardar.
guardar=true;
});
function modificar_categoria(idcategoria,categoria,descripcion){
  $('#btnGuardar_Categorias').html('Guardar modificación');

  $('#categoria_idcategoria').val(idcategoria);
  $('#categoria_categoria').val(categoria);
  $('#categoria_descripcion').val(descripcion);


  //$('#descripcion').val(descripcion);
  guardar=false;
  modificar=true;
}
function eliminar_categoria(idcategoria,idusuario){
  var respuesta=confirm("Está seguro que desea eliminar esta categoría? "+"id: "+idcategoria);
  if(respuesta){

    var datos={
      'idcategoria':idcategoria,
      'idusuario':idusuario
    }
    $.ajax(
      {
        url:'php/eliminarCategoria.php',
        type:'post',
        datatype:'json',
        data:datos,
        beforeSend:function()
        {

        }
      }
    )
    .done(function(res){
      if(res=="Categoría eliminada satisfactoriamente!!"){
        $('#categoria_mensaje').html(res);
        $('#categoria_mensaje').css('color','#bae845')
        $('#categoria_mensaje').fadeIn();
        validarPagina();
        setTimeout(function(){
          guardar=false;
          modificar=false;
          cancelar();
        },1000);
      }else if (res=="Ocurrió un problema") {

      }else if (res=="No existe usuario logeado") {

      }else if (res=="No ha seleccionado una categoría") {

      }

    })
  }else {

  }
}

$('#categoriasForm').on('submit',function(e){//valido cuando el formulario se envia.
  e.preventDefault();
  if(modificar==true){



    var idcategoria=$('#categoria_idcategoria').val();
    var idusuario=$('#idusuario').val();
    var categoria=$('#categoria_categoria').val();
    var descripcion=$('#categoria_descripcion').val();

    var datos={
      'idcategoria':idcategoria,
      'idusuario':idusuario,
      'categoria':categoria,
      'descripcion':descripcion
    }
    $.ajax(
      {
        url:'php/modificarCategoria.php',
        type:'post',
        datatype:'json',
        data:datos,
        beforeSend:function()
        {

        }
      }
    )
    .done(function(res){
      if(res=="Los campos están vacíos"){
        $('#categoria_errorImagen').fadeIn();
        $('.categoria_categoria,.categoria_descripcion').addClass('has-error');
      }else if (res=="Introduzca la categoría") {
        $('#categoria_errorImagen').fadeIn();
        $('.categoria_categoria').addClass('has-error');
        $('.categoria_descripcion').removeClass('has-error');
      }else if (res=="Introduzca la descripción") {
        $('#categoria_errorImagen').fadeIn();
        $('.categoria_categoria').removeClass('has-error');
        $('.categoria_descripcion').addClass('has-error');
      }else if (res=="Ocurrió un problema") {//cuando no se guardo
        $('#categoria_errorImagen').fadeIn();
        $('.categoria_categoria,.categoria_descripcion').addClass('has-error');
      }else if (res=="No existe usuario logeado") {//Cuando no hay id
        $('#categoria_errorImagen').fadeIn();
        $('.categoria_categoria,.categoria_descripcion').addClass('has-error');
      }else if (res=="Categoría actualizada satisfactoriamente!!") { //Guardado correctamente
        $('.categoria_categoria,.categoria_descripcion').removeClass('has-error');
        $('#categoria_errorImagen').fadeOut();
      }
      if(res=="Categoría actualizada satisfactoriamente!!"){
        $('#categoria_mensaje').html(res);
        $('#categoria_mensaje').css('color','#bae845')
        $('#categoria_mensaje').fadeIn();
        $('#categoria_categoria,#categoria_descripcion').val('');
        validarPagina();
        setTimeout(function(){
          $('#categoria_mensaje').fadeOut();
          $('#categoria_mensaje').html('');
        },1250);
      }else {
        $('#categoria_mensaje').css('color','#fa4646')
        $('#categoria_mensaje').fadeIn();
        $('#categoria_mensaje').html(res);
      }
    })
    modificar=false;
  }else if (guardar==true) {
    var data=$(this).serializeArray();
    $.ajax(
      {
        url:'php/insertarCategoria.php',
        type:'post',
        datatype:'json',
        data:data,
        beforeSend:function()
        {
          $('#categoria_spinner').css('display','none');
          $('#categoria_spinner').html('<i class="spinner fa fa-refresh  fa-spin fa-1x"></i>');
          $('#categoria_spinner').fadeIn();
        }
      }
    )
    .done(function(res){
      if(res=="Los campos estan vacíos"){
        $('#categoria_errorImagen').fadeIn();
        $('.categoria_categoria,.categoria_descripcion').addClass('has-error');

      }else if (res=="Introduzca la categoría") {
        $('#categoria_errorImagen').fadeIn();
        $('.categoria_categoria').addClass('has-error');
        $('.categoria_descripcion').removeClass('has-error');
      }else if (res=="Introduzca la descripción") {
        $('#categoria_errorImagen').fadeIn();
        $('.categoria_categoria').removeClass('has-error');
        $('.categoria_descripcion').addClass('has-error');
      }else if (res=="Categoría guardada exitosamente!") { //Guardado correctamente
        $('.categoria_categoria,.categoria_descripcion').removeClass('has-error');
        $('#categoria_errorImagen').fadeOut();
      }else if (res=="Ocurrió un problema") {//cuando no se guardo
        $('#categoria_errorImagen').fadeIn();
        $('.categoria_categoria,.categoria_descripcion').addClass('has-error');
      }else if (res=="No existe usuario logeado") {//Cuando no hay id
        $('#categoria_errorImagen').fadeIn();
        $('.categoria_categoria,.categoria_descripcion').addClass('has-error');
      }
      if(res=="Categoría guardada exitosamente!"){
        $('#categoria_mensaje').html(res);
        $('#categoria_mensaje').css('color','#bae845')
        $('#categoria_mensaje').fadeIn();
        $('#categoria_categoria,#categoria_descripcion').val('');
        validarPagina();
        setTimeout(function(){
          $('#categoria_mensaje').fadeOut();
          $('#categoria_mensaje').html('');
        },1250);
      }else{
        $('#categoria_mensaje').css('color','#fa4646')
        $('#categoria_mensaje').fadeIn();
        $('#categoria_mensaje').html(res);
      }


      console.log(res);
    })
    .fail(function(){//falso
      console.log("FAIL");

    })
    .always(function(){
      console.log("complete");
      setTimeout(function(){
          $('#categoria_spinner').fadeOut();
          $('#categoria_spinner').html('')//Detiene el spinner
      },750);
    });
    guardar=false;
  }

});
