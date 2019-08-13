# WETA api demo

Here's the work up to 2.1 outlined in the brief sent through by Sheryn. It should give an idea of how I structure and comment code. My Rails is rusty enough that it was going to be reasonably onerous to complete the non-standard tasks outlined in the brief. I can talk (hopefully intelligently) about why this is so if required (along the lines of Rails is a giant ORM for your preferred db so using it without one doesn't make much sense).

## Project setup

1. Use the `projects.postman_collection.json` file to import to postman for all working requests
2. Install node, npm and optionally docker
3. Once node is installed do an `npm i` and then `npm start` will start the app
4. Docker is a more predictable env and `npm run docker:run` will execute docker and do the whole thing for you if preferred

All endpoints are available at localhost:3000 and {{url}} should be set in postman vars.
