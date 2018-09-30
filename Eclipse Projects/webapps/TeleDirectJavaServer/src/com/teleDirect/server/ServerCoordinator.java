package com.teleDirect.server;

import java.lang.reflect.Type;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import com.teleDirect.Operation;
import com.teleDirect.Person;
import com.teleDirect.PersonCollection;
import com.teleDirect.Security;
import com.teleDirect.Session;
import com.teleDirect.database.DatabaseProvider;
import com.google.gson.*;
import com.google.gson.internal.LinkedTreeMap;

public class ServerCoordinator {
	private Request request;
	private Response response;
	private Gson gson;

	public ServerCoordinator() {
		// custom deserializer for operation enums
		JsonDeserializer<Operation> operationDeserializer = new JsonDeserializer<Operation>() {
			@Override
			public Operation deserialize(JsonElement json, Type typeOfT, JsonDeserializationContext context)
					throws JsonParseException {
				String enumStr = json.getAsString();
				Operation[] operations = Operation.values();
				for (Operation operation : operations) {
					if (operation.getOperationString().equals(enumStr))
						return operation;
				}
				return null;
			}
		};
		
		// custom deserializer for PersonCollection
		JsonDeserializer<PersonCollection> personCollectionDeserializer = new JsonDeserializer<PersonCollection>() {
			@Override
			public PersonCollection deserialize(JsonElement json, Type typeOfT, JsonDeserializationContext context)
					throws JsonParseException {
				JsonArray personsJson = (JsonArray) json.getAsJsonObject().get("persons");
				PersonCollection pColl = new PersonCollection();
				
				for(int i=0; i<personsJson.size(); i++){
					JsonObject personJson = (JsonObject)personsJson.get(i);
					
					Set<Entry<String,JsonElement>> entrySet = personJson.entrySet();
					String[] values = new String[entrySet.size()];
					
					int counter=0;
					for(Entry<String, JsonElement> entry: entrySet){
						values[counter++] = entry.getValue().getAsString();
					}
					
					Person person = new Person(values);
					pColl.add(person);
					
				}
				
				return pColl;
			}
		};

		// custom serializer for Session objects
		JsonSerializer<Session> sessionSerializer = new JsonSerializer<Session>() {

			@Override
			public JsonElement serialize(Session session, Type typeOfSrc, JsonSerializationContext context) {
				final JsonObject jsonObject = new JsonObject();
				final JsonObject sessionObj = new JsonObject();
				final JsonElement userObj = context.serialize(session.getUser());
				sessionObj.addProperty("token", session.getToken());
				jsonObject.add("session", sessionObj);
				jsonObject.add("user", userObj);
				return jsonObject;
			}
		};
		// custom serializer for PersonCollection objects
		JsonSerializer<PersonCollection> personCollectionSerializer = new JsonSerializer<PersonCollection>() {

			@Override
			public JsonElement serialize(PersonCollection p, Type typeOfSrc, JsonSerializationContext context) {
				Map<String, Person> pColl = p.getCollection();
				JsonObject jsonObject = new JsonObject();
				JsonArray persons = new JsonArray();

				for (Map.Entry<String, Person> entry : pColl.entrySet()) {
					Person person = entry.getValue();
					persons.add(context.serialize(person));
				}

				jsonObject.add("persons", persons);
				return jsonObject;
			}
		};
		GsonBuilder builder = new GsonBuilder();
		builder.registerTypeAdapter(Operation.class, operationDeserializer);
		builder.registerTypeAdapter(Session.class, sessionSerializer);
		builder.registerTypeAdapter(PersonCollection.class, personCollectionSerializer);
		builder.registerTypeAdapter(PersonCollection.class, personCollectionDeserializer);

		gson = builder.create();
	}

	public void getRequest(String reqString) {
		System.out.println("Request: " + reqString);
		reqString = convertParamsToString(reqString);
		request = gson.fromJson(reqString, Request.class);
	}

	public void parseRequest() {
		String username = request.getUsername();
		Operation operation = request.getOperation();
		String params = request.getParams();
		JsonObject paramObj = null;

		switch (operation) {
		case LOGIN:
			if (params != null)
				paramObj = gson.fromJson(params, JsonObject.class);
			response = new Security().login(GetStrFromJSON(paramObj,"username"), GetStrFromJSON(paramObj,"password"));
			break;
		case LOGOUT:
			if (params != null)
				paramObj = gson.fromJson(params, JsonObject.class);
			response = new Security().logout(GetStrFromJSON(paramObj,"username"));
			break;
		case VALIDATE_SESSION:
			if (params != null)
				paramObj = gson.fromJson(params, JsonObject.class);
			response = new Security().validateSession(GetStrFromJSON(paramObj,"username"),
					GetStrFromJSON(paramObj,"token"));
			break;
		case FETCH_LIST:
			response = new DatabaseProvider().fetchPersonList();
			break;
		case SAVE:
			PersonCollection pColl = null;
			if (params != null){
				pColl = gson.fromJson(params, PersonCollection.class);
				//pColl.sortByName();
			}
			response = new DatabaseProvider().saveToDatabase(pColl);
			break;
		default:
			break;
		}

	}

	public String sendResponse() {
		String responseString = gson.toJson(response);
		System.out.println("Response: " + responseString);
		return responseString;
	}

	public static String linkedTreeMapToJsonString(LinkedTreeMap<Object, Object> m) {
		String str = m.toString();
		return str.replace("{", "{\"").replaceAll(",\\s+", "\", \"").replace("=", "\":\"").replace("}", "\"}");
	}

	public static String convertParamsToString(String json) {
		int posParams = json.indexOf("\"params\":");
		if (posParams != -1) {
			int pos = json.indexOf('{', posParams);
			int posL = json.lastIndexOf('}');
			json = json.substring(0, pos) + "\"" + json.substring(pos, posL).replaceAll("\"", "\\\\\"") + "\""
					+ json.substring(posL);
		}
		return json;
	}
	
	private String GetStrFromJSON(JsonObject obj, String key)
	{
		return obj.get(key).getAsString();
	}
}
