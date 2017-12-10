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



$request->name = addslashes($request->name);
$request->phone = addslashes($request->phone);
$request->comment = addslashes($request->comment);
$request->cart = addslashes($request->cart);
$request->email = addslashes($request->email);
$request->town = addslashes($request->town);
$request->delivery = addslashes($request->delivery);




$sql = "INSERT INTO Orders (product_id, name, phone, comment, email, town, delivery, cart) VALUES ('$request->product_id', '$request->name', '$request->phone', '$request->comment', '$request->email', '$request->town', '$request->delivery', '$request->cart')";

if ($conn->query($sql) === TRUE) {
 	echo "Замовлення додано успішно.";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();

?>
