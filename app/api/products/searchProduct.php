<?php 
session_start();
include '../credentials.php';
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$conn = new mysqli($servername, $username, $password, $dbname);
mysqli_set_charset($conn,"utf8");

if (isset($request->title)) {
    $title = $request->title;
} else {
    $title = NULL;
}


$sql = getSqlQuery($request->limit, $request->offset, $title);
function getSqlQuery($limit=NULL, $offset=NULL, $title) {
    $sql = "SELECT * FROM Products WHERE title LIKE '%$title%' ORDER BY ID DESC";

    if ($limit) {
        $sql .= " LIMIT $limit";
    }
     if ($offset) {
        $sql .= " OFFSET $offset";
    }
    
    return $sql;
 }

$result = $conn->query($sql);

if ($result->num_rows > 0) {
		$rows = array();
		while($r = mysqli_fetch_assoc($result)) {
		    $rows[] = $r;
		}
		print json_encode($rows);   
    
} else {
    echo json_encode(array());
}

$conn->close();
?>