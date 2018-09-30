package com.teleDirect.database;

import java.lang.reflect.Field;
import java.sql.*;
import java.util.Map;

import com.teleDirect.Person;
import com.teleDirect.PersonCollection;
import com.teleDirect.PersonFieldsDb;
import com.teleDirect.PersonFieldsJs;
import com.teleDirect.server.Response;

/**
 * This class is reponsible for all the database operations
 * @author AG041955
 *
 */
public class DatabaseProvider {

	private static final String JDBC_DRIVER = "com.mysql.jdbc.Driver";
	private static final String PARAMS = "?noAccessToProcedureBodies=true";
	private static final String DB_NAME = "directory";
	private static final String DB_URL = "jdbc:mysql://localhost:3306/"+ DB_NAME + PARAMS;

	private static final String USER = "root";
	private static final String PASS = "hello";

	public Connection conn;
	public Statement stmt;

	/**
	 * contructor
	 */
	public DatabaseProvider() {
		conn = null;
		stmt = null;
	}

	/**
	 * @return Returns an active database Connection 
	 */
	public Connection getDatabaseConnection() {
		try {
			// Register JDBC driver
			Class.forName(JDBC_DRIVER);
			
			// Get connection if null
			if(this.conn == null)
				this.conn = DriverManager.getConnection(DB_URL, USER, PASS);
			
		} catch (SQLException e) {
			// Handle errors for JDBC
			e.printStackTrace();
		}catch (ClassNotFoundException e){
			e.printStackTrace();
		}
		return this.conn;
	}


	/**
	 * closes an active database connection
	 * @return void
	 */
	public void closeDatabaseConnection() {
		try {
			if (this.conn != null)
				this.conn.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * closes an active database connection along with the result set
	 * @return void
	 */
	public void closeDatabaseConnection(ResultSet rs) {
		try {
			if (rs != null)
				rs.close();
			if (this.conn != null)
				this.conn.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * Used to execute a query statement from the database and get the results
	 * 
	 * @param sql The SQL query string
	 * @return A ResulSet object containing the rows fetched from the database
	 */
	public ResultSet executeQuery(String sql){
		ResultSet rSet = null;
		
		try{
			conn = getDatabaseConnection();
			stmt = conn.createStatement();
			rSet = stmt.executeQuery(sql);
		}catch (SQLException e) {
			e.printStackTrace();
		}catch (Exception e){
			e.printStackTrace();
		}
		
		return rSet;	
	}
	
	/**
	 * Used to execute update statements on the database and make 
	 * appropraite modifications in the database.
	 * 
	 * @param sql SQL update string
	 * @return true/false denoting a successful/unsuccessful execution
	 */
	public boolean executeUpdate(String sql){
		try{
			conn = getDatabaseConnection();
			stmt = conn.createStatement();
			stmt.executeUpdate(sql);
			return true;
		}catch (SQLException e) {
			e.printStackTrace();
		}
		
		return false;
	}
	
	/**
	 * Fetches list of persons from the database and forms a collection of persons
	 * The person collection is added to the data in Response along with an appropriate status and message.
	 * 
	 * @return A Response object contaning the status, message and the PersonCollection
	 */
	public Response fetchPersonList(){
		String status = "", message = ""; 
		Object data = null;
		
		PersonCollection persons = new PersonCollection();
		String sql = generateFetchQuery();
		ResultSet rs = executeQuery(sql);
		int numResults = 0;
		
		try{
			while(rs.next()){
				PersonFieldsJs[] JsFields = PersonFieldsJs.values();
				String[] values = new String[JsFields.length];
				for(int i=0; i<JsFields.length; i++){
					String fieldName = JsFields[i].getFieldName();
					values[i] = rs.getString(fieldName);
					if(fieldName.equals(PersonFieldsJs.DOB.getFieldName()) && values[i] == null)
						values[i] ="";
				}
				Person person = new Person(values);
				persons.add(person);
				++numResults;
			}
			
			if(numResults == 0){
				status = "failure";
				message = "No contacts found";
			}else{
				status = "success";
				message = numResults + " contacts found";
				data = persons;
			}
		}catch (SQLException e){
			status = "error";
			message = e.getMessage() + " We are unable to process your request. Please try again later.";
			e.printStackTrace();
		}
		
		return new Response(status, message, data);
	}
	
	/**
	 * Saves the collection of persons to the database and returns a Response containing an appropriate status and message.
	 * @param persons The colletcion of persons to save to the database
	 * @return A Response object contaning the status and message
	 */
	public Response saveToDatabase(PersonCollection persons){
		String status = "", message = ""; 
		Object data = null;
		
		if(!persons.isEmpty()){
			try{
				Connection conn = getDatabaseConnection();
				
				CallableStatement stmt = conn.prepareCall("{CALL INITIATE_ADD()}");
				stmt.executeQuery();
				
				stmt = conn.prepareCall("{CALL ADD_PERSON(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}");
				
				for (Map.Entry<String, Person> entry : persons.getCollection().entrySet()) {
					Person person = entry.getValue();
					
					int index = 0;
					for (Field f : person.getClass().getDeclaredFields()) {
						if(index!=0){
							if(f.getName().equals(PersonFieldsJs.DOB.getFieldName()) && ((String)f.get(person)).equals("")){
								stmt.setString(index, null);
							}else
								stmt.setString(index, (String)f.get(person));
						}
							
						++index;
					}
					
					ResultSet rs = stmt.executeQuery();
					if(rs != null){
						status = "success";
					}else{
						message += "Could not add : " + stmt.getString(1) + " ";
					}
				}
				message += "Saving Completed";
				
			}catch (SQLException e){
				status = "error";
				message = e.getMessage() + " We are unable to process your request. Please try again later.";
				e.printStackTrace();
			}catch (IllegalAccessException e){
				status = "error";
				message = e.getMessage() + " We are unable to process your request. Please try again later.";
				e.printStackTrace();
			}
		}else{
			status = "error";
			message = "Person Collection is empty";
		}
		return new Response(status, message, data);
	}
	
	/**
	 * Generates a fetch SQL query from the list of fields defined in the
	 * PersonFieldsDb and PersonFieldsJs enums.
	 * 
	 * @return the fetch Sql query
	 */
	public String generateFetchQuery(){
		String selectFields = "";
		PersonFieldsDb[] DbFields = PersonFieldsDb.values();
		PersonFieldsJs[] JsFields = PersonFieldsJs.values();
		
		for(int i=0 ; i<DbFields.length; i++ ){
			if(DbFields[i] == PersonFieldsDb.ID)
				selectFields += "persons." + DbFields[i].getFieldName() + " AS " + JsFields[i].getFieldName() + ", ";
			else
				selectFields += DbFields[i].getFieldName() + " AS " + JsFields[i].getFieldName() + ", ";
		}
		
		// remove last two characters
		selectFields = selectFields.substring(0, selectFields.length()-2);
		
		String sql = 	"SELECT " + selectFields + " FROM persons INNER JOIN personadddetails " + 
						"ON persons." + PersonFieldsDb.ID.getFieldName() + " = personadddetails." + PersonFieldsDb.ID.getFieldName() + 
						" ORDER BY " + PersonFieldsJs.FIRST_NAME.getFieldName();
		return sql;
	}
	
}
