<?php 
global $PersonDB, $PersonJS;
$PersonDB = json_decode(json_encode(array(
		'ID' 				=> 'person_id',
		'TITLE' 			=> 'title',
		'FIRST_NAME' 		=> 'first_name',
		'MIDDLE_NAME'		=> 'middle_name',
		'LAST_NAME' 		=> 'last_name',
		'EMAIL' 			=> 'email',
		'COMPANY' 			=> 'company',
		'WORK_CONTACT' 		=> 'work_contact',
		'HOME_CONTACT' 		=> 'home_contact',
		'DOB' 				=> 'dob',
		'WORK_ADDRESS' 		=> 'work_address',
		'HOME_ADDRESS' 		=> 'home_address',
		'NOTES' 			=> 'notes',
		'AVATAR' 			=> 'avatar',
		'AVATAR_FILENAME'	=> 'avatar_filename'
)));

$PersonJS = json_decode(json_encode(array(
		'ID' 				=> 'id',
		'TITLE' 			=> 'title',
		'FIRST_NAME' 		=> 'firstName',
		'MIDDLE_NAME' 		=> 'middleName',
		'LAST_NAME'	 		=> 'lastName',
		'EMAIL' 			=> 'email',
		'COMPANY' 			=> 'company',
		'WORK_CONTACT' 		=> 'workContact',
		'HOME_CONTACT' 		=> 'homeContact',
		'DOB' 				=> 'dob',
		'WORK_ADDRESS' 		=> 'workAddress',
		'HOME_ADDRESS' 		=> 'homeAddress',
		'NOTES' 			=> 'notes',
		'AVATAR' 			=> 'avatar',
		'AVATAR_FILENAME' 	=> 'avatarFilename'
)));
?>