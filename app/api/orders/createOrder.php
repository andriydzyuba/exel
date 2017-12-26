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




$sql = "INSERT INTO Orders (name, phone, comment, email, town, delivery, cart) VALUES ('$request->name', '$request->phone', '$request->comment', '$request->email', '$request->town', '$request->delivery', '$request->cart')";

if ($conn->query($sql) === TRUE) {
 	echo "Замовлення додано успішно.";

 	// message to admin
	$msg2 = "Отримано нове замовлення=) Від $request->name телефон - $request->phone ";

	// use wordwrap() if lines are longer than 70 characters
	$msg2 = wordwrap($msg2,70);

	// send email
	mail("taras.zapotichny@gmail.com","Нове замовлення на inko | Електроніка та побутова техніка",$msg2);

//////////////////// email to client
 	// the message
	$msg = "Ваше замовлення отримано,\nми Вам зателефонуємо =)";

	// use wordwrap() if lines are longer than 70 characters
	$msg = wordwrap($msg,70);

	// send email
	mail("$request->email","Ваше замовлення на inko | Електроніка та побутова техніка",$msg);

} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();

?>
