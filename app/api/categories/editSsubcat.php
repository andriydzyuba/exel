<?php
include '../credentials.php';

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
mysqli_set_charset($conn,"utf8");
// Check connection
//if ($request->images) {
//	$request->images = serialize($request->images);
//}

$request->text =  addslashes($request->text);

$sql = "UPDATE Ssubcats SET title='$request->title', eng_title='$request->eng_title', text='$request->text', images='$request->images' WHERE ss_id='$request->ss_id'";

if ($conn->query($sql) === TRUE) {
    echo "success";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?> 