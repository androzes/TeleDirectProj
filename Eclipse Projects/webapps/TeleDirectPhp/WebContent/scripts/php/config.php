<?php
$file =  basename(__FILE__ ) .': ';

define('DB_SERVER', 'localhost');
define('DB_USERNAME', 'akash');
define('DB_PASSWORD', 'akash');
define('DB_DATABASE', 'directory');

define('PHP_SCRIPT_PATH', ''); //C:\Users\AG041955\Documents\JavaProjects\.metadata\.plugins\org.eclipse.wst.server.core\tmp0\wtpwebapps\TeleDirectPhp\scripts\php

error_log($file."Config setup done\n", 3, PHP_SCRIPT_PATH."debug.log");
?>