<?php
session_start();
include '../credentials.php';
include '../checkauth.php';
$postdata = file_get_contents("php://input");

$conn = new mysqli($servername, $username, $password, $dbname);
mysqli_set_charset($conn,"utf8");
$id = $postdata;

$sql = "DELETE FROM Makers WHERE id=$id";

if ($conn->query($sql) === TRUE) {
    echo "Record deleted successfully";
} else {
    echo "Error deleting record: " . $conn->error;
}

$conn->close();

?>