<?php 

include '../credentials.php';

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
mysqli_set_charset($conn,"utf8");


$request->title = addslashes($request->title);
$request->text = addslashes($request->text);
$request->spec = addslashes($request->spec);
$request->price = addslashes($request->price);

if ($request->ss_id) {
$sql = "UPDATE Products SET title='$request->title', spec='$request->spec', text='$request->text', image='$request->image', price='$request->price', c_id='$request->c_id', s_id='$request->s_id', ss_id='$request->ss_id', maker='$request->maker' WHERE id='$request->id'";
} else {
$sql = "UPDATE Products SET title='$request->title', spec='$request->spec', text='$request->text', image='$request->image', price='$request->price', c_id='$request->c_id', s_id='$request->s_id', maker='$request->maker' WHERE id='$request->id'";
}

if ($conn->query($sql) === TRUE) {
    echo "successfully updated";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();

// $request->title = "lolo";
// echo(json_encode($request));

?>