package com.teleDirect;


/**
 * This is the enum for mapping the person objects on the javascript side to constants
 * @author AG041955
 *
 */
public enum PersonFieldsJs {
	ID 				("id"),
	TITLE 			("title"),
	FIRST_NAME 		("firstName"),
	MIDDLE_NAME 	("middleName"),
	LAST_NAME	 	("lastName"),
	EMAIL 			("email"),
	COMPANY 		("company"),
	WORK_CONTACT 	("workContact"),
	HOME_CONTACT 	("homeContact"),
	DOB 			("dob"),
	WORK_ADDRESS 	("workAddress"),
	HOME_ADDRESS 	("homeAddress"),
	NOTES 			("notes"),
	AVATAR 			("avatar"),
	AVATAR_FILENAME ("avatarFilename");
	
	private String fieldName;
	
	PersonFieldsJs(String fieldName){
		this.fieldName = fieldName;
	}
	
	public String getFieldName(){
		return fieldName;
	}
}
