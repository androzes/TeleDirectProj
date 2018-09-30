package com.teleDirect;
/**
 * This is the enum used to map the database person fields to constants.
 * @author AG041955
 *
 */
public enum PersonFieldsDb {
	ID 				("person_id"),
	TITLE 			("title"),
	FIRST_NAME 		("first_name"),
	MIDDLE_NAME		("middle_name"),
	LAST_NAME 		("last_name"),
	EMAIL 			("email"),
	COMPANY 		("company"),
	WORK_CONTACT 	("work_contact"),
	HOME_CONTACT 	("home_contact"),
	DOB 			("dob"),
	WORK_ADDRESS 	("work_address"),
	HOME_ADDRESS 	("home_address"),
	NOTES 			("notes"),
	AVATAR 			("avatar"),
	AVATAR_FILENAME	("avatar_filename");
	
	private String fieldName;
	
	PersonFieldsDb(String fieldName){
		this.fieldName = fieldName;
	}
	
	public String getFieldName(){
		return fieldName;
	}
}




