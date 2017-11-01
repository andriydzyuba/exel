<?php
if ($_FILES['file']['name']) {
  if (!$_FILES['file']['error']) {
    $name = uniqid('image', true);
    $ext = explode('.', $_FILES['file']['name']);
    $filename = $name . '.' . $ext[1];
    $destination = 'uploads/' . $filename; //change this directory
    $location = $_FILES["file"]["tmp_name"];
    move_uploaded_file($location, $destination);
    echo 'api/uploads/' . $filename;//change this URL
  } else {
    echo  $message = 'Ooops!  Your upload triggered the following error:  ' . $_FILES['file']['error'];
  }
}
?>