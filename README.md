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
4. Add the port to the APP_PORT env variable in the .env file
   ```
   APP_PORT=1234
   ```
5. Add the database configurations to the .env file
   ```
   DB_HOST=localhost
   DB_USER=postgres
   DB_PASSWORD=postgres
   DB_NAME=users_db
   DB_CLIENT=pg
   ```
6. Run the migration script
   ```
   $ yarn migrate
   ```
7. Start the node server
   ```
   $ yarn start
   ```
