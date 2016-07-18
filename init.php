<?php

function conectar(){
 try{
  $conexion=new PDO("mysql:dbname=daily;host=127.0.0.1;","root","ady");
  return $conexion;
  }catch (PDOexception $e){
   echo "error". $e->getMessage();
   }
}
function insertar($conexion,$usuario,$clave){
  $consulta="INSERT INTO usuarios(usuario,clave) VALUES(:usuario,:clave)";
  $statement=$conexion->prepare($consulta);
  $statement->execute(array(':usuario'=>$usuario,':clave'=>$clave));
  return $statement;
}

function login($conexion,$usuario,$clave){
  $consulta='SELECT * FROM usuarios
                        WHERE usuario=:usuario AND
                        clave =:clave
                        LIMIT 1';
  $statement=$conexion->prepare($consulta);
  $statement->execute(array(':usuario'=>$usuario, ':clave'=>$clave));
  return $statement;
}
function insertarNota($conexion,$nota,$idusuarios){
  $consulta="INSERT INTO notas(nota,idusuarios) VALUES (:nota,:idusuarios)";
  $statement=$conexion->prepare($consulta);
  $statement->execute(array(':nota'=>$nota,':idusuarios'=>$idusuarios));
  return $statement;
}
function mostrar($conexion,$idusuario){

  $consulta="SELECT * FROM notas WHERE idusuarios = :idusuarios";
  $statement=$conexion->prepare($consulta);
  $statement->execute(array(':idusuarios'=>$idusuario));
  return $statement;
}
function marcarFavorito($conexion,$idnotas,$idusuarios){
  $consulta="INSERT INTO favoritos(idnotas,idusuarios) VALUES(:idnotas,:idusuarios)";
  $statement=$conexion->prepare($consulta);
  $statement->execute(array(':idnotas'=>$idnotas,':idusuarios'=>$idusuarios));
  return $statement;
}
function MostrarFavoritos($conexion){
  $consulta="SELECT * FROM notas
  INNER JOIN favoritos ON
  favoritos.idnotas = notas.idnotas";
  $statement=$conexion->prepare($consulta);
  $statement->execute();
  return $statement;
}

function borrarFavoritos($conexion,$idnotas){
  $consulta="DELETE FROM notas WHERE idnotas = :idnotas";
  $statement=$conexion->prepare($consulta);
  $statement->execute(array(':idnotas'=> $idnotas));
  return $statement;
 }
?>
