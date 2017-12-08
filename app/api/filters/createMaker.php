<?php 
session_start();
include '../credentials.php';
 
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$conn = new mysqli($servername, $username, $password, $dbname);
mysqli_set_charset($conn,"utf8");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
 

if ($request->ss_id) {
	$sql = "INSERT INTO Makers (name, c_id, s_id, ss_id) VALUES ('$request->name', '$request->c_id', '$request->s_id', '$request->ss_id')";
} else {
	$sql = "INSERT INTO Makers (name, c_id, s_id) VALUES ('$request->name', '$request->c_id', '$request->s_id')";
}

if ($conn->query($sql) === TRUE) {
 	echo "Товар додано успішно.";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();

?>
