<?php
session_start();
include '../credentials.php';
include '../checkauth.php';

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);



$conn = new mysqli($servername, $username, $password, $dbname);
mysqli_set_charset($conn,"utf8");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$request->title = addslashes($request->title);
$request->cof = addslashes($request->cof);


$sql = "INSERT INTO Currency (title, cof) VALUES ('$request->title', '$request->cof')";

if ($conn->query($sql) === TRUE) {

 	echo "Напрям '" . $request->title . "' створено успішно.";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();







?> 