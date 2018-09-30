var TestResponses = {
	login: {
		success:{
			status: 200,
			responseText: '{"status":"success","message":"Welcome, Akash"}'
		},
		failure:{
			status: 401,
			responseText: '{"status":"failure","message":"Invalid username/password"}'
		}
	},
	logout: {
		success:{
			status: 200,
			responseText: '{"status":"success","message":"Akash logged out successfully."}'
		},
		failure:{
			status: 200,
			responseText: '{"status":"failure","message":"Akash could not be logged out."}'
		}
	}
};