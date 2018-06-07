# Reminder

Reminder app help you to keep your major events in on place. It's available online on 
```
https://protected-earth-77709.herokuapp.com/
```
## Getting started

- clone the repository by typing ```git clone https://github.com/jedluk/reminder.git .```
- run ```npm install``` to fetch all packages
- create your own keys_dev.js file (name should be exactly the same) and place it in config folder. File should looks like this 
```sh
module.exports = {
  mongoURI: <your_mongo_db>,
  googleClientID: <your_google_client_id>,
  googleClientSecret: <your_google_client_secret>
}
```
- that's it ! Now you are ready to get a development env running. You can start server by 
```sh
npm start
```
or if you want start in nodemon mode: 
``` sh
npm run demon
```

## Running the tests

Tests are written with usage of Mocha and Chai. To run all test type
```sh
npm test
```