package com.teleDirect;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.UUID;

import com.teleDirect.database.DatabaseProvider;

/**
 * This class in an entity of the session and contains the session token and the user associated with the session.
 * @author AG041955
 */
public class Session {

	private String token;
	private User user;
	
	public Session(String token, User user) {
		this.token = token;
		this.user = user;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
	/**
	 * Starts a new session with the given user. Generates a token for the session which is saved to the database
	 * @param user
	 * @return A session object with the session details
	 */
	public static Session start(User user){
		String token = Session.generateUniqueToken();
		System.out.println("Generated token: " + token);
		
		DatabaseProvider db = new DatabaseProvider();
		String sql = "UPDATE users SET session_token=\"" + token + "\" WHERE username=\"" + user.getUsername() + "\"";
		if(!db.executeUpdate(sql)) System.out.println("Could not update token in the database.");
		db.closeDatabaseConnection();
		
		return new Session(token, user); 
	}
	
	/**
	 * Ends the current session
	 * @return true or false whether session closing was successful or not	 */
	public boolean end(){
		
		DatabaseProvider db = new DatabaseProvider();
		String sql = "UPDATE users SET session_token=\"\" WHERE username=\"" + user.getUsername() + "\"";
		if(db.executeUpdate(sql)) return true;
		db.closeDatabaseConnection();
		
		return false; 
	}
	
	/**
	 * The following function is used to genarate a unique token.
	 * @return Token as String
	 */
	public static String generateUniqueToken(){
		String provider = UUID.randomUUID().toString();
		MessageDigest md;
		try {
			md = MessageDigest.getInstance("MD5");
			md.update(provider.getBytes());
			byte[] digest = md.digest();
			StringBuffer sb = new StringBuffer();
			for (byte b : digest) {
				sb.append(String.format("%02x", b & 0xff));
			}
			return sb.toString();
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		return null;
	}
}
