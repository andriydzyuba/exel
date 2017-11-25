<?php
session_start();

include '../credentials.php';

$conn = new mysqli($servername, $username, $password, $dbname);
mysqli_set_charset($conn,"utf8");

$sql = "SELECT * FROM Categories";


$result = $conn->query($sql);
/*
if ($result->num_rows > 0) {
		$rows = array();
		while($r = mysqli_fetch_assoc($result)) {
			$sql = "SELECT * FROM Subcats WHERE c_id=$r[c_id]";
			$result2 = $conn->query($sql);
			$r['subcats'] = array();
			while($r2 = mysqli_fetch_assoc($result2)) {
				array_push($r['subcats'], $r2);
				
			}
		    $rows[] = $r;
		}
		print json_encode($rows);   
    
} else {
    echo "0 results";
}

*/

if ($result->num_rows > 0) {
		$rows = array();

		while($r = mysqli_fetch_assoc($result)) {
			$sql = "SELECT * FROM Subcats WHERE c_id=$r[c_id]";
			$result2 = $conn->query($sql);

			$r['subcats'] = array();

			while($r2 = mysqli_fetch_assoc($result2)) {
				
			
				$sql = "SELECT * FROM Ssubcats WHERE s_id=$r2[s_id]";
				$result3 = $conn->query($sql);
				$r2['subcats'] = array();

				while($r3 = mysqli_fetch_assoc($result3)) {
				array_push($r2['subcats'], $r3);
				}
				array_push($r['subcats'], $r2);
			}

		    $rows[] = $r;
		}
		print json_encode($rows);   
    
} else {
    echo "0 results";
}

$conn->close();
?>