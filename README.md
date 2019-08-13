# W api demo

Here's the work up to 2.1 outlined in the brief sent through. It should give an idea of how I structure and comment code. My Rails is rusty enough that it was going to be reasonably onerous to complete the non-standard tasks outlined in the brief. I can talk (hopefully intelligently) about why this is so if required:

* Rails is setup in an ORM like structure for use with a db
* ActiveModel and ActionController are tightly coupled
* Microservices architecture allows for smaller apps to do specific tasks - in this case node converting data to api presentation

## Project setup

1. Use the `projects.postman_collection.json` file to import to postman for all working requests
2. Install node, npm and optionally docker
3. Once node is installed do an `npm i` and then `npm start` will start the app
4. Docker is a more predictable env and `npm run docker:run` will execute docker and do the whole thing for you if preferred

All endpoints are available at localhost:3000 and {{url}} should be set in postman vars.

## Notes

* I've used lodash as it's 'rails like' functionality delivers opiniontaed methods for filter, map reduce etc.
* Validation is provided by @hapi/joi
* There are no tests, but Jest is my preferred library for JS testing but tests are essential for production code
