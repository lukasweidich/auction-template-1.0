<?php
$name = $_POST['name'];
$email = $_POST['email'];
$msg = $_POST['message'];

$message = 'Name: '.$name.'<br/>'.'E-Mail: '.$email.'<br/>'.'Nachricht: '.$msg;
$message = wordwrap($msg,70);

mail("admin@dem-it.de","Kontaktformular auction-template.com", $message);

?>
