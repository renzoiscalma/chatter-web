```
	possible schema

	User {
		Id: ID!
		Type: Int!
		name: String!	
		password: ?? [serach how to auth]
	}

	Lobby {
		Id: ID!
		password: optional
		users: [string]

	}

	Message {
		From: User
		To: Lobby
		message: string
		sendStatus: string
		
		
	}
```

create schema 
create existing lobby (sample data) (query muna)

implement web sockets

design auth (write on paper)
implement auth 
