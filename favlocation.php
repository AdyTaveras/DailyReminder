<?php
session_start();
require_once('init.php');
$conexion=conectar();
$resultado=MostrarFavoritos($conexion);


foreach ($resultado as $nota){
  ?>
  <tr>
    <td><?php echo $nota['nota']; ?></td>
  </tr>
  <?php
}
?>
