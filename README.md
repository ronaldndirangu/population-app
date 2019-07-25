# Population Managament Application API
Population managment system for managing populations. Users must be authorized to create location populations, list them, update or delete them.

# Frameworks and Tools

- NodeJS
- ExpressJS
- Mongo
- SuperTest(Testing)

## Location:

- name of the location
- female population in the location
- male population in the location

## User:

- name of the user
- email of the user
- password of the user

# How to Get started

- Clone: `git clone https://github.com/ronaldndirangu/population-app.git`
- Change directory: `cd population-app`
- Install dependancies: `yarn`
- Set up `.env` file using the example `.env.example`
- Run server: `yarn run start`
- Run tests: `yarn test`


# Expected Endpoints

|Endpoint                            | Functionality                    |HTTP method 
|------------------------------------|----------------------------------|-------------
|/locations                 |Add a location                       |POST        
|/locations                 |Get all location                     |GET
|/locations/:id             |Get a location                       |GET
|/locations/:id             |Update a location                    |PATCH        
|/locations/:id             |Delete a location                    |DELETE 
|/auth/signup               |Signup a user                        |POST
|/auth/signin               |Signin a user                        |POST


## Contributor
Ronald Ndirangu
