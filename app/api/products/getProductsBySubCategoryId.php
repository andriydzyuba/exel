<?php
session_start();
include '../credentials.php';
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$conn = new mysqli($servername, $username, $password, $dbname);
mysqli_set_charset($conn,"utf8");

if (isset($request->priceorderby)) {
    $priceorderby = $request->priceorderby;
} else {
    $priceorderby = NULL;
}

if (isset($request->maker)) {
    $maker = $request->maker;
} else {
    $maker = NULL;
}

if (isset($request->display)) {
    $display = $request->display;
} else {
    $display = NULL;
}

 
$sql = getSqlQuery($request->s_id, $request->limit, $request->offset, $maker, $priceorderby, $display);
function getSqlQuery($s_id=NULL, $limit=NULL, $offset=NULL, $maker, $priceorderby, $display) {
    $sql = "SELECT * FROM Products WHERE s_id='$s_id'";

    if ($maker) {
        $sql .= " AND maker='$maker'";
    }
    if ($display) {
        $sql .= " AND display='$display'";
    }
    if (!$priceorderby) {
        $sql .= " ORDER BY ID DESC";
    }
    if ($priceorderby) {
        $sql .= " ORDER BY price $priceorderby";
    }
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