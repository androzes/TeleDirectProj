USE directory;

DROP PROCEDURE IF EXISTS INITIATE_ADD;

DELIMITER //
CREATE PROCEDURE INITIATE_ADD()
BEGIN	
	SET FOREIGN_KEY_CHECKS = 0; 
	TRUNCATE TABLE personadddetails; 
	TRUNCATE TABLE persons;
	SET FOREIGN_KEY_CHECKS = 1;
	
END //

DELIMITER ;
DROP PROCEDURE IF EXISTS ADD_PERSON;

DELIMITER //
CREATE PROCEDURE ADD_PERSON
     (
     	  IN  title										ENUM('Mr','Ms','Mrs'),
        IN  first_name                    	CHAR(50)					,
		  IN  middle_name                   	CHAR(50)   				, 
        IN  last_name                      	CHAR(50)					, 
        IN  email                    			CHAR(50)    			,
		  IN  company                     		CHAR(50)   				, 
        IN  work_contact                    	CHAR(50)   				, 
        IN  home_contact                    	CHAR(50)   				,
        IN  dob                   				DATE						, 
        IN  work_address                    	TEXT        			,
        IN  home_address                    	TEXT   					,
        IN  notes                     			TEXT   					,
        IN  avatar                     		ENUM('yes','no')   	,
        IN  avatar_filename               	VARCHAR(100)   	
     )
BEGIN 

    INSERT INTO persons
         (
		        persons.title								,
		        persons.first_name         				, 
		        persons.last_name 							, 
		        persons.email            				, 
		        persons.work_contact     				, 
		        persons.company                                    
         )
    VALUES 
         ( 
	           title                    	, 
	           first_name         			, 
		        last_name 						, 
		        email            				, 
		        work_contact     				, 
		        company
         ) ; 
         
	 INSERT INTO personadddetails
         (
		        personadddetails.person_id							,
		        personadddetails.middle_name         			, 
		        personadddetails.dob 									, 
		        personadddetails.work_address            		, 
		        personadddetails.home_address     				, 
		        personadddetails.home_contact            		,
				  personadddetails.notes								,
				  personadddetails.avatar								,
				  personadddetails.avatar_filename           
         )
    VALUES 
         ( 
	           LAST_INSERT_ID()				, 
	           middle_name         			, 
		        dob 								, 
		        work_address            		, 
		        home_address     				, 
		        home_contact						,
		        notes								,
		        avatar								,
		        avatar_filename	
         );    
   	
END //
DELIMITER ;