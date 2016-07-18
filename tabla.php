<?php
session_start();
require_once('init.php');
$conexion=conectar();
?>
<thead>
  <tr>
    <th class="text-center bg-primary">Notas</th>
  </tr>
</thead>
<tbody>
  <?php
  $iduser=$_SESSION['id_usuario'];

    $datos=mostrar($conexion,$iduser);
    $filasAfectadas=$datos->rowCount();
    if($filasAfectadas>0){
      foreach ($datos as $dato) {
      $idnotas=$dato['idnotas'];
      $nota=$dato['nota'];
        ?>
          <tr>
            <td><?php echo $dato['nota']; ?></td>
          </tr>
          <td>
            <a class="btn btn-warning"  onclick='favorito("<?php echo $idnotas;?>")'>Add to my favorites</a>
           <a class="btn btn-danger"  onclick='borrar("<?php echo $idnotas;?>")'>Delete note</a>
          </td>
        <?php
      }
    }else {
      ?>
      <tr>
        <td><?php echo "No hay registros"; ?></td>
      </tr>
      <?php
    }

  ?>
</tbody>
