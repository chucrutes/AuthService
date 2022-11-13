db.createCollection("users", 
    {validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: ["fullName", "email", "role", "password", "creationDate"],
            properties: {
                fullName: {
                    bsonType: "string",
                    description: "Must be a string and is required"
                },
                email: {
                    bsonType: "string",
                    description: "Must be a string and is required",
                },
                role: {
                    bsonType: "array",
                    description: "User must have at least one role"
                },
                password: {
                    bsonType: "string",
                    description: "This field is required"
                },
                creationDate: {
                    bsonType: "date",
                    description: "This field is required"
                },
                institution: {
                    bsonType: "string"
                },
                lastPasswordChange: {
                    bsonType: "date"
                },
                passwordChangeCount: {
                    bsonType: "int"
                }
            }
        }
    }
}


)