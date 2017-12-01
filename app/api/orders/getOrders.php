<?php
session_start();

include '../credentials.php';

$conn = new mysqli($servername, $username, $password, $dbname);
mysqli_set_charset($conn,"utf8");
$sql = "SELECT * FROM Orders";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
		$rows = array();
		while($r = mysqli_fetch_assoc($result)) {
		    $rows[] = $r;
		}
		print json_encode($rows);   
    
} else {
    echo "0 results";
}


$conn->close();
?>