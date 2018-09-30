<?php
// set headers for cross domain allowance
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description');

// Only report required errors to the user
error_reporting(E_ERROR | E_WARNING | E_PARSE);

require_once 'ServerCoordinator.php';

$cod = new ServerCoordinator();
$cod->getRequest();
$cod->parseRequest();
$cod->sendResponse();
?>