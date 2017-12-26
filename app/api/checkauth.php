<?php
$userLogin = "taras_zapotichny";
$userPassword = "3HRy0TL3edxFhvgON7AOGAPBTJjfkyV";

if ($_SESSION["login"] !== $userLogin && $_SESSION["password"] !== $userPassword) {
	die("No auth");
}

?>