package com.teleDirect;

import java.sql.ResultSet;
import java.sql.SQLException;

import com.teleDirect.database.DatabaseProvider;
import com.teleDirect.server.Response;

/**
 * This class is responsible for looking after the security of the application.
 * It performs the following functions: login, logout & session validation.
 * @author AG041955
 *
 */
public class Security {

	/**
	 * Validates the login credentials from the database and 
	 * returns whether validation was successful or not.
	 * 
	 * @param username The username in String format
	 * @param password The password in String format
	 * @return A Response object containing whether it was 'success' or 'failure'.
	 * On successful login, the data in Repsonse contains the session details. 
	 */
	public Response login(String username, String password){
		String status = "", message = ""; 
		Object data = null;
		User curUser = null; 
		Session curSession = null;
		
		String sql = "SELECT name, priveleges FROM users WHERE username=\"" + username + "\" AND password=\"" + password + "\"";
		
		try {
			DatabaseProvider db = new DatabaseProvider();
			
			ResultSet result = db.executeQuery(sql);
			
			if (result == null)
			{
				throw new Exception("Sql query failed.");
			}
			
			int rowCount = 0;
			while(result.next()) {   // Move the cursor to the next row
	            String name = result.getString("name");
	            String priveleges = result.getString("priveleges");
	            
	            curUser = new User(username, name, priveleges);
	            ++rowCount;
			}
			
			db.closeDatabaseConnection(result);
			
			if(rowCount == 1){
				status = "success";
				message = "Welcome, " + curUser.getUsername();
				curSession = Session.start(curUser);
				data = (Object) curSession;
			}else if (rowCount == 0){
				status = "failure";
				message = "Wrong username/password";
			}else{
				throw new Exception("More than one username/password pair exist in the database.");
			}
			
		}catch (SQLException e) {
			status = "error";
			message = e.getMessage() + " We are unable to process your request. Please try again later.";
			e.printStackTrace();
		}catch (Exception e) {
			status = "error";
			message = e.getMessage() + " We are unable to process your request. Please try again later.";
			e.printStackTrace();
		}

		return new Response(status, message, data);
	}
	
	/**
	 * Logs out the user with the given username by ending the ongoing session.
	 * 
	 * @param username The username in String format
	 * @return A Response object containing whether it was 'success' or 'failure'.
	 */
	public Response logout(String username){
		String status = "", message = ""; 
		User user = new User(username, "", "");
		
		Session session = new Session("", user);
		boolean success = session.end();
		
		if(success){
			status = "success";
			message = username + " has logged out successfully.";
		}else{
			status = "failure";
			message = username + " could not be logged out.";
		}
		
		return new Response(status, message, null);
	}
	
	/**
	 * Validates the session details from the database and 
	 * returns whether validation was successful or not.
	 * 
	 * @param username The username in String format
	 * @param token The session token in String format
	 * @return A Response object containing whether it was 'success' or 'failure' 
	 * and an appropriate message.
	 */
	public Response validateSession(String username, String token){
		String status = "", message = ""; 
		
		String sql = "SELECT session_token AS token FROM users WHERE username=\"" + username + "\"" ;
		
		try {
			DatabaseProvider db = new DatabaseProvider();
			
			ResultSet rs = db.executeQuery(sql);
			String dbToken = "";
			int rowCount = 0;
			while(rs.next()) {   // Move the cursor to the next row
	            dbToken = rs.getString("token");
	            ++rowCount;
			}
			
			db.closeDatabaseConnection(rs);
			
			if(rowCount == 1){
				if(token.equals(dbToken)){
					status = "success";
					message = "Sesssion is valid.";
				}else{
					status = "failure";
					message = "Session not valid.";
				}
			}else if (rowCount == 0){
				status = "failure";
				message = "Username: \""+ username + "\" not found in database.";
			}else{
				throw new Exception("More than one username exist in the database.");
			}
			
		}catch (SQLException e) {
			status = "error";
			message = e.getMessage() + " We are unable to process your request. Please try again later.";
			e.printStackTrace();
		}catch (Exception e) {
			status = "error";
			message = e.getMessage() + " We are unable to process your request. Please try again later.";
			e.printStackTrace();
		}
		
		return new Response(status, message, null);
	}
}
