package com.test.teleDirect;

import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;

import com.teleDirect.Person;

public class TestPerson {

	private Person person;
	private String[] values;
	
	@Before
    public void setUp() {
		values = new String[]{"12", "Ms", "Gita", "", "Biswas", "gita@biswas.in", "HUL", "21311313", "32445234", "","","","","",""};
		person = new Person(values);
    }
	
	@Test
	public void shouldBeAbleToIntializePerson(){
		assertEquals(values[0], person.id);
		assertEquals(values[1], person.title);
		assertEquals(values[2], person.firstName);
		assertEquals(values[3], person.middleName);
		assertEquals(values[4], person.lastName);
		assertEquals(values[5], person.email);
		assertEquals(values[6], person.company);
		assertEquals(values[7], person.workContact);
		assertEquals(values[8], person.homeContact);
		assertEquals(values[9], person.dob);
		assertEquals(values[10], person.workAddress);
		assertEquals(values[11], person.homeAddress);
		assertEquals(values[12], person.notes);
		assertEquals(values[13], person.avatar);
		assertEquals(values[14], person.avatarFilename);
	}
}
