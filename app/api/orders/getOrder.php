<?php

include '../credentials.php';

$postdata = file_get_contents("php://input");

$conn = new mysqli($servername, $username, $password, $dbname);
mysqli_set_charset($conn,"utf8");
$sql = "SELECT * FROM Products WHERE id=$postdata";

$result = $conn->query($sql)->fetch_object();
$result->spec = stripslashes($result->spec);
$result->text = stripslashes($result->text);
print json_encode($result);

$conn->close();
?>