package com.teleDirect;

/**
 * This class is a representation of the entity 'Person'
 * The instance variables store the information of the person in a String format
 * 
 * @author AG041955
 *
 */
public class Person {
	public String id;
	public String title;
	public String firstName;
	public String middleName;
	public String lastName;
	public String email;
	public String company;
	public String workContact;
	public String homeContact;
	public String dob;
	public String workAddress;
	public String homeAddress;
	public String notes;
	public String avatar;
	public String avatarFilename;
	
	public Person(String[] values){
		id = values[0];
		title = values[1];
		firstName = values[2];
		middleName = values[3];
		lastName = values[4];
		email = values[5];
		company = values[6];
		workContact = values[7];
		homeContact = values[8];
		dob = values[9];
		workAddress = values[10];
		homeAddress = values[11];
		notes = values[12];
		avatar = values[13];
		avatarFilename = values[14];
	}
	
	/**
	 * To get the full name of the person
	 * @return fullName of the person
	 */
	public String getFullName(){
		String name = "";
		if (this.firstName != "") 	name += this.firstName + " ";
		if (this.middleName != "") 	name += this.middleName + " ";
		if (this.lastName != "") 	name += this.lastName + " ";
		return name.trim();
	}
}
