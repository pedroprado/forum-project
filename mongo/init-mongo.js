
db.createUser(
    {
      user: "admin",
      pwd: "rocha",
      roles: [
        {
          role: "readWrite",
          db: "my-database"
        }
      ]
    }
)