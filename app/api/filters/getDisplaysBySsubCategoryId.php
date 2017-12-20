<?php  
session_start();
include '../credentials.php';
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$conn = new mysqli($servername, $username, $password, $dbname);
mysqli_set_charset($conn,"utf8");


if (isset($request->ss_id)) {
    $ss_id = $request->ss_id;
} else {
    $ss_id = NULL;
}

$sql = getSqlQuery($ss_id, $request->limit, $request->offset);
function getSqlQuery($ss_id, $limit=NULL, $offset=NULL) {
    $sql = "SELECT * FROM Displays WHERE ss_id='$ss_id'";

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
