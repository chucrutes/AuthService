db.users.insertOne(
    {
        fullName: 'Thiago Cardoso de Melo Araújo', 
        email: 'tmelo387@gmail.com', 
        institution: 'Unipampa', 
        creationDate: new Date(), 
        password: '03774718105', 
        role: ['Dev', 'PM']
    }
)