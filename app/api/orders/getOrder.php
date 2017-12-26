<?php
session_start();
include '../credentials.php';
include '../checkauth.php';

$postdata = file_get_contents("php://input");

$conn = new mysqli($servername, $username, $password, $dbname);
mysqli_set_charset($conn,"utf8");
$sql = "SELECT * FROM Orders WHERE id=$postdata";



$result = $conn->query($sql);

$result = $result->fetch_object();

print json_encode($result);

$conn->close();
?>