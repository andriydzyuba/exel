<?php
session_start();

include '../credentials.php';
include '../checkauth.php';

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
mysqli_set_charset($conn,"utf8");
// Check connection
//if ($request->images) {
//	$request->images = serialize($request->images);
//}

$sql = "UPDATE Currency SET id='$request->id', title='$request->title', cof='$request->cof' WHERE id='$request->id'";

if ($conn->query($sql) === TRUE) {
    echo "success";
    echo $_SESSION["password"];
	echo $_SESSION["login"];
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>