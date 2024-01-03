# Backend-NodeJS-ExpressJs

## Available commands

### Development

* `npm start:dev`: Starts the development server with hot reloading.
* `npm test:products`: Runs tests for the products service.

### Production

* `npm start`: Starts the production server.
* `npm test`: Runs all tests.
* `npm server`: Starts the server without hot reloading (alternative to `npm start`).

## Dependencies

The project uses the following dependencies:

### Production dependencies

* @faker-js/faker: For generating fake data
* bcrypt: For password hashing
* connect-mongo: For connecting to a MongoDB database to store sessions
* cookie-parser: For parsing cookies
* dotenv: For loading environment variables
* express: For creating the web server
* express-handlebars: For using Handlebars templates
* express-session: For managing user sessions
* jsonwebtoken: For creating and verifying JSON Web Tokens
* mongoose: For interacting with MongoDB
* mongoose-paginate-v2: For paginating MongoDB results
* mongoose-populate: For populating Mongoose documents
* multer: For handling file uploads
* nodemailer: For sending emails
* nodemon: For live-reloading the server during development
* passport: For authentication strategies
* passport-github: For GitHub authentication
* passport-github2: For GitHub authentication (alternative)
* passport-jwt: For JWT authentication
* passport-local: For local authentication
* session-file-store: For storing sessions in files
* socket.io: For real-time communication
* swagger-jsdoc: For generating Swagger documentation
* swagger-ui-express: For serving the Swagger UI
* winston: For logging

### Development dependencies

* mocha: For running tests
* supertest: For testing HTTP requests

