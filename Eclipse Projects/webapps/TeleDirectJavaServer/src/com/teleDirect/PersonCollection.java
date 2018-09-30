package com.teleDirect;

import java.util.Comparator;
import java.util.Map;
import java.util.TreeMap;

/**
 * This class is a collection of Person objects. It implements the behaviour of
 * collection objects like add, remove, get, size, contains, isEmpty and sort.
 * 
 * @author AG041955
 *
 */
public class PersonCollection{
	private TreeMap<String, Person> pColl;
	
	public PersonCollection(){
		pColl = new TreeMap<String, Person>();
	}
	
	public void add(Person p){
		pColl.put(p.id, p);
	}
	
	public void add(Person[] persons){
		for(Person p : persons){
			pColl.put(p.id, p);
		}
	}
	
	public void remove(String id){
		pColl.remove(id);
	}
	
	public void remove(String[] ids){
		for(String id : ids){
			pColl.remove(id);
		}
	}
	
	public Person person(String id){
		return pColl.get(id);
	}
	
	public int size(){
		return pColl.size();
	}
	
	public boolean contains(String id){
		return pColl.containsKey(id);
	}
	
	public boolean contains(Person p){
		return pColl.containsValue(p);
	}
	
	public boolean isEmpty(){
		return pColl.isEmpty();
	}
	
	public Map<String,Person> getCollection(){
		return pColl;
	}
	
	public void sortByName(){
		pColl = sortByValues(pColl);
	}
	
	private TreeMap<String, Person> sortByValues(TreeMap<String, Person> map) {
	    Comparator<String> valueComparator =  new Comparator<String>() {
	        public int compare(String k1, String k2) {
	        	Person a = map.get(k1);
	        	Person b = map.get(k2);
	        	String aName = a.getFullName().toLowerCase();
	        	String bName = b.getFullName().toLowerCase();
	            int compare = aName.compareTo(bName);
	            if (compare == 0) return 1;
	            return compare;
	        }
	    };
	    TreeMap<String, Person> sortedByValues = new TreeMap<String, Person>(valueComparator);
	    sortedByValues.putAll(map);
	    return sortedByValues;
	}
}
