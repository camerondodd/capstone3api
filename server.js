const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const {CLIENT_ORIGIN,PORT,dbURI} = require('./config');
const apiRoutes = require('./routes/apiRoutes');

//middleware
app.use(morgan('common'));
app.use(
	cors({
		origin:CLIENT_ORIGIN
	})
);
//routes
app.use('/api',apiRoutes);
//database
mongoose.Promise = global.Promise;
mongoose.connect(dbURI, () =>{
	console.log('connected to mongodb');
});
// API page
app.get('/',(req,res)=>{
	res.render('home',{user:req.user});
});
app.use(express.static('public'));
// Functions
function runServer(databaseUrl, port) {
  return new Promise((resolve, reject) => {
    mongoose.createConnection(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
};
function closeServer() {
  return mongoose.disconnect().then(() => {
     return new Promise((resolve, reject) => {
       console.log('Closing server');
       server.close(err => {
           if (err) {
               return reject(err);
           }
           resolve();
       });
     });
  });
};
 app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

 module.exports = {app, runServer, closeServer};