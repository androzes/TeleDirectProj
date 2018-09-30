package com.test.teleDirect;

import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;

import com.teleDirect.Person;
import com.teleDirect.PersonCollection;

public class TestPersonCollection {

	private PersonCollection persons;
	private Person p;
	
	@Before
    public void setUp() {
		String values[] = new String[]{"12", "Ms", "Gita", "", "Biswas", "gita@biswas.in", "HUL", "21311313", "32445234", "","","","","",""};
		persons = new PersonCollection();
		
		p = new Person(values);
		persons.add(p);
    }
	
	@Test
	public void shouldBeAbleToAddPerson(){
		assertSame(p, persons.person("12"));
		
	}
	
	@Test
	public void shouldBeAbleToRemovePerson(){
		String values[] = new String[]{"13", "Mr", "Nayak", "", "Hatwal", "gita@biswas.in", "HUL", "21311313", "32445234", "","","","","",""};
		persons.add(new Person(values));
	
		persons.remove("12");
		assertNull(persons.person("12"));
		assertNotNull(persons.person("13"));
		assertEquals("Nayak", persons.person("13").firstName);
	}
	
	
	@Test
	public void shouldBeAbleReturnCollectionSize(){
		String values[] = new String[]{"13", "Mr", "Nayak", "", "Hatwal", "gita@biswas.in", "HUL", "21311313", "32445234", "","","","","",""};
		persons.add(new Person(values));
	
		assertEquals(2, persons.size());
		persons.remove("12");
		assertEquals(1, persons.size());
	}
	
	@Test
	public void shouldBeAbleToReturnIfItContains(){
	
		assertTrue(persons.contains(p));
		assertTrue(persons.contains("12"));
		assertFalse(persons.contains("13"));
	}
	
	@Test
	public void shouldBeAbleToReturnIfEmpty(){
		
		assertFalse(persons.isEmpty());
		persons.remove("12");
		assertTrue(persons.isEmpty());
	}
}
