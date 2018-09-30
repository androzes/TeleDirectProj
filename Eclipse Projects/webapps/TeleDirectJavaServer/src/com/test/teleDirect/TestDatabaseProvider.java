package com.test.teleDirect;

import static org.junit.Assert.*;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.junit.Before;
import org.junit.Test;

import com.teleDirect.PersonCollection;
import com.teleDirect.database.DatabaseProvider;
import com.teleDirect.server.Response;

public class TestDatabaseProvider {

	private DatabaseProvider db;
	
	@Before
    public void setUp() {
        db = new DatabaseProvider();
	}
	
	@Test
	public void shouldBeAbleToGetDatabaseConnection(){
		Connection conn = db.getDatabaseConnection();
		assertTrue(conn instanceof Connection);
		Connection conn2 = db.getDatabaseConnection();
		assertSame(conn, conn2);
		
		db.closeDatabaseConnection();
	}
	
	@Test
	public void shouldBeAbleToCloseDatabaseConnection(){
		Connection conn = db.getDatabaseConnection();
		assertTrue(conn instanceof Connection);
		db.closeDatabaseConnection();
		try{
			assertTrue(conn.isClosed());
		}catch(SQLException e){
			e.printStackTrace();
		}
		
	}
	
	@Test
	public void shouldBeAbleToExecuteQuery(){
		String sql = "SELECT name FROM users WHERE username=\"akash\"";
		ResultSet rs = db.executeQuery(sql);
		assertTrue(rs instanceof ResultSet);
		
		String name = "";
		
		try{
			while(rs.next()){
				name = rs.getString("name");
			}
		}catch(SQLException e){
			e.printStackTrace();
		}
		
		assertEquals("Akash", name);
		db.closeDatabaseConnection();
	}
	
	@Test
	public void shouldBeAbleToExecuteUpdate(){
		String sql = "UPDATE users SET name=\"Sagar\" WHERE username=\"sagar\"";
		Boolean success = db.executeUpdate(sql);
		assertTrue(success);
		
		sql = "UPDATE users SET name=\"Sagar\" WHERE username=\"sagar";
		success = db.executeUpdate(sql);
		assertFalse(success);
	}
	
	@Test
	public void shouldBeAbleToGenerateFetchQuery(){
		String q = db.generateFetchQuery();
		System.out.println(q);
		assertTrue( q instanceof String);
	}
	
	@Test
	public void shouldBeAbleToFetchList(){
		Response response = db.fetchPersonList();
		assertTrue( response.getData() instanceof PersonCollection);
		assertEquals( "success", response.getStatus());
		assertNotNull(response.getData());
		
	}
	
	@Test
	public void shouldBeAbleToSaveToDatabase(){
		PersonCollection persons = new PersonCollection();
		
		Response response = db.saveToDatabase(persons);
		assertEquals( "error", response.getStatus());
		assertNull(response.getData());
		
		response = db.fetchPersonList();
		persons = (PersonCollection) response.getData();
		response = db.saveToDatabase(persons);
		
		assertEquals( "success", response.getStatus());
		assertNull(response.getData());
		
	}

}
