<?php
require "../../../conn/conn.php";

$timestamp = time(); // Genera un timestamp único
$target_dir = "../banners/"; // Ajusta el directorio de destino
$target_file = $target_dir . $timestamp . '_' . basename($_FILES["banner"]["name"]);

move_uploaded_file($_FILES["banner"]["tmp_name"], $target_file);

$sql = "INSERT INTO `eventos`(`titulo`, `descripcion`, `banner`, `fechaInicio`, `finalAnticipadas`, `entradasAnticipadas`, `totalEntradas`, `precioAnticipadas`, `precioEntrada`, `precioVip`) VALUES (:titulo, :descripcion, :banner, :fechaInicio, :finalAnticipadas, :entradasAnticipadas, :totalEntradas, :precioAnticipadas, :precioEntrada, :precioVip)";
$res = $conn->prepare($sql);
$res->bindParam(":titulo", $_POST['titulo']);
$res->bindParam(":descripcion", $_POST['descripcion']);
$res->bindParam(":banner", $target_file);
$res->bindParam(":fechaInicio", $_POST['fechaInicio']);
$res->bindParam(":finalAnticipadas", $_POST['finalAnticipadas']);
$res->bindParam(":entradasAnticipadas", $_POST['entradasAnticipadas']);
$res->bindParam(":totalEntradas", $_POST['totalEntradas']);
$res->bindParam(":precioAnticipadas", $_POST['precioAnticipadas']);
$res->bindParam(":precioEntrada", $_POST['precioEntrada']);
$res->bindParam(":precioVip", $_POST['precioVip']);
$res->execute();

echo json_encode($res);
?>
