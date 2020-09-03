## Users API using Express over NodeJS

A simple API for managing user information. This is the part of the training organized by Code Rush Nepal

How to use?

1. Clone the repository
2. Install the dependencies
   ```
   $ yarn
   ```
3. Make a copy of the env.example file into .env file
   ```
   $ cp .env.example .env
   ```
4. Add the port and salt as the env variables in the .env file
   ```
   APP_PORT=1234
   PASSWORD_SALT=8
   ```
5. Add the database configurations to the .env file
   ```
   DB_HOST=localhost
   DB_USER=postgres
   DB_PASSWORD=postgres
   DB_NAME=users_db
   DB_PORT=5432
   DB_CLIENT=pg
   ```
6. Run the migration script
   ```
   $ yarn migrate
   ```
7. For inital data, run the seed script
   ```
   $ yarn seed
   ```
7. Start the node server
   ```
   $ yarn start
   ```
