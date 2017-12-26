<?php
session_start();
include '../credentials.php';

$postdata = file_get_contents("php://input");

$conn = new mysqli($servername, $username, $password, $dbname);
mysqli_set_charset($conn,"utf8");

$sql = "SELECT * FROM Ssubcats WHERE ss_id=$postdata";

$result = $conn->query($sql)->fetch_object();

//if ($result->images) {
//	$result->images = unserialize($result->images);
//}



print json_encode($result);

$conn->close();
?>