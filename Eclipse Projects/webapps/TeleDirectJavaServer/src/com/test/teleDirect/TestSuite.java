package com.test.teleDirect;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.junit.runners.Suite.SuiteClasses;

@RunWith(Suite.class)
@SuiteClasses({ TestDatabaseProvider.class, TestRequest.class, TestResponse.class, TestSecurity.class,
		TestServerCoordinator.class, TestSession.class, TestUser.class, TestPerson.class, TestPersonCollection.class })
public class TestSuite {

}
