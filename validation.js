db.createCollection("users", 
    {validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: ["fullName", "role", "password", "creationDate"],
            properties: {
                fullName: {
                    bsonType: "string",
                    description: "Must be a string and is required"
                },
                email: {
                    bsonType: "string",
                    description: "Must be a string and is required",
                    unique: true
                },
                role: {
                    bsonType: "objectId",
                    description: "Must be an int and is required"
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