
$('.btnRedimirCupon').hide();
$('#codigo_cupones').keyup(function(){
  if($(this).val().length<12){
    $('.btnRedimirCupon').hide();
  }
})
$('#codigo_cupones').keypress(function(e){
  if(e.which==13 && $(this).val().length==12){
    redimir();
  }
});
$('.btnRedimirCupon').on('click',function(){
  var data=$('#formRedimirCupones').serializeArray();
  $.ajax(
    {
      url:'php/redimirCupon.php',
      type:'post',
      datatype:'json',
      data:data,
      beforeSend:function(){

      }
    }
  )
  .done(function(res){
    console.log(res);
    if(res=="Cupón redimido con exito!!!"){
      alertify.success(res);
    }else if (res=="Ocurrió un error al redimir este cupón!") {
      alertify.error(res);
    }
    $('.btnRedimirCupon').hide();
    $('#codigo_cupones').val('');
  });
});
function redimir(){
  var data=$('#formRedimirCupones').serializeArray();
  $.ajax(
    {
      url:'php/comprobarCupon.php',
      type:'post',
      datatype:'json',
      data:data,
      beforeSend:function(){

      }
    }
  )
  .done(function(res){
    if(res=="Cupón listo para redimir!"){
      $('.btnRedimirCupon').show();
    }else if (res=="Cupón no activado") {
      $('.btnRedimirCupon').hide();
      alertify.error(res);
    }else if (res=="Cupón ya fue redimido") {
      $('.btnRedimirCupon').hide();
      alertify.log(res);
    }else if (res=="Cupón ya usado") {
      $('.btnRedimirCupon').hide();
      alertify.error(res);
    }else if (res=="Cupón vencido") {
      $('.btnRedimirCupon').hide();
      alertify.error(res);
    }else if (res=="Cupón no valido!") {
      $('.btnRedimirCupon').hide();
      alertify.error(res);
    }
  });
}


$('#formRedimirCupones').on('submit',function(e){
  e.preventDefault();
});
