// const keys = require('./keys');
exports.CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 3000;
exports.PORT = process.env.PORT || 8080;
exports.API_KEY = process.env.API_KEY || keys.heroku.api_key;
if (process.env.NODE_ENV==="test"){
  exports.dbURI = process.env.dbURITest ||
                       global.dbURITest||
                       keys.mongodb.dbURITest;
}
else{
    exports.dbURI = process.env.dbURI ||
                       global.dbURI ||
                       keys.mongodb.dbURI;
};