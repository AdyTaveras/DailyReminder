<?php
session_start();
require_once('init.php');
$conexion=conectar();

if (isset($_POST['accion']) && $_POST['accion']!=""){
  if ($_POST['accion']=='guardar'){
    if(isset($_POST['nota']) && $_POST['nota']!=""){
      $nota=$_POST['nota'];
      $id=$_SESSION['id_usuario'];
      $resultado=insertarNota($conexion,$nota,$id);
      $filasAfectadas=$resultado->rowCount();
      if($filasAfectadas){
        echo "guardar-success";
      }else {
        echo "guardar-fail";
      }
    }else {
      echo "Error-0";
    }
  }elseif ($_POST['accion']=="favorito"){
    if(isset($_POST['idnotas']) && $_POST['idnotas']!=""){
      $idnotas=$_POST['idnotas'];
      $idusuario=$_SESSION['id_usuario'];
      $resultado2=marcarFavorito($conexion,$idnotas,$idusuario);
      $filasAfectadas=$resultado2->rowCount();
      if ($filasAfectadas){
        echo "favorito-success";

      }else{
        print_r($filasAfectadas);
      }
    }else {
      echo "hay fallo";
    }
  }elseif($_POST['accion']=='borrar'){
    if (isset($_POST['idnotas']) && $_POST['idnotas']=!""){
      $idnotas=$_POST['idnotas'];
      $resultado3=borrarFavoritos($conexion,$idnotas);
      $filasAfectadas=$resultado3->rowCount();
      if ($filasAfectadas){
       echo "guardar-success";
      }else{
       echo "fail-guardar";
       echo $idnotas;
       print_r($idnotas);
      }
    }else {
      echo "no post";
    }
  }
}else {
  echo "No post";
}
 ?>
