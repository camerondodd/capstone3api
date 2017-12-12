 const chai = require('chai');
 const chaiHttp = require('chai-http');
 const {app} = require('../server');

 const should = chai.should();
 chai.use(chaiHttp);

 describe('API', function() {

   it('should 200 on GET requests', function() {
     return chai.request(app)
       .get('/api/fooooo')
       .then(function(res) {
         res.should.have.status(200);
         res.should.be.json;
       });
   });
 });
//  describe('api', function() {
//   it('exists', function() {
//     chai.request(app)
//       .get('/api/something')
//       .end(function(err, res) {
//         res.should.have.status(200);
//         res.should.be.html;
//     });
//   });
// });