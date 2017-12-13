const chai = require('chai');
const chaiHttp = require('chai-http');
const {app,runServer,closeServer} = require('../server');
const mongoose = require('mongoose');
const faker = require('faker');
const should = chai.should();
const router = require('../routes/apiRoutes');
const Analysis = require('../models/analysisModel');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const {dbURI} = require('../config');
app.use(bodyParser.json());
chai.use(chaiHttp);

// EXIST
describe('API', function() {
  it('should 200 on GET requests', function() {
    return chai.request(app)
       .get('/api/')
       .then(function(res) {
        res.should.have.status(200);
        res.should.be.json;
       });
    });
});

// Setup
function tearDownDb() {
	console.warn('Deleting database');
    return mongoose.connection.dropDatabase();
};
function seedAnalyses(){
	console.log('seeding');
	const seedData = [];
	for (let i=1;i<=10;i++){
		seedData.push({
			name:faker.hacker.noun(),
			ass:[],
			type:faker.hacker.noun(),
			purp:faker.hacker.noun(),
			IV:faker.hacker.noun(),
			DV:faker.hacker.noun(),
			CtP:faker.hacker.noun(),
			OT:faker.hacker.noun(),
			DVL:faker.hacker.noun(),
			IVL:faker.hacker.noun(),
			fact:faker.hacker.noun(),
			hier:faker.hacker.noun(),
			mod:faker.hacker.noun(),
			scale:faker.hacker.noun(),
			EFQ:faker.hacker.noun(),
			theory:faker.hacker.noun(),
			var:faker.hacker.noun(),
			DFA:faker.hacker.noun()
		});
	};
	return Analysis.insertMany(seedData);
};

describe('analysis API resource',function(){
	before(function(){
		return runServer(dbURI,3000);
	});
	beforeEach(function(){
		return seedAnalyses();
	});
	afterEach(function(){
		return tearDownDb();
	});
	after(function(){
		return closeServer();
	});	

	// GET/////////////////////
describe('GET endpoint', function() {
    it('should return all existing uanalyses', function(done) {
      let res;
      return chai.request(app)
        .get('/api')
        .then(_res => {
          res = _res;
          console.log(res.body);
          res.should.have.status(200);
          res.body.should.have.length.of.at.least(1);
          return Analysis.count();
        })
        .then(count => {
          res.body.should.have.length.of.at.least(count);
        }).then(done,done);
    });
});
// POST////////////////////
describe('POST endpoint', function() {
    it('should add a new analysis', function(done) {
     	 const newAnalysis = {
        	name:faker.hacker.noun(),
			ass:[],
			type:faker.hacker.noun(),
			purp:faker.hacker.noun(),
			IV:faker.hacker.noun(),
			DV:faker.hacker.noun(),
			CtP:faker.hacker.noun(),
			OT:faker.hacker.noun(),
			DVL:faker.hacker.noun(),
			IVL:faker.hacker.noun(),
			fact:faker.hacker.noun(),
			hier:faker.hacker.noun(),
			mod:faker.hacker.noun(),
			scale:faker.hacker.noun(),
			EFQ:faker.hacker.noun(),
			theory:faker.hacker.noun(),
			var:faker.hacker.noun(),
			DFA:faker.hacker.noun()
      };
      return chai.request(app)
        .post('/api')
        .send(newAnalysis)
        .then(function(res) {
        	console.log('below is res.body');
        	console.log(res.body);
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.include.keys(
            'name', 'mod', 'var');
          res.body.name.should.equal(newAnalysis.name);
          // cause Mongo should have created id on insertion
          res.body._id.should.not.be.null;
          res.body.mod.should.equal(newAnalysis.mod);
          res.body.var.should.equal(newAnalysis.var);
          return Analysis.findById(res.body.id);
        }).then(done,done);
    });
});

// DELETE///////////////
describe('DELETE endpoint', function() {
     it('should delete an analysis by id', function() {
      let analysis;
      return Analysis
        .findOne()
        .then(_analysis => {
          analysis = _analysis;
          return chai.request(app).delete(`/api/${analysis.id}`);
        })
        .then(res => {
          res.should.have.status(204);
          return Analysis.findById(analysis.id);
        })
        .then(_analysis => {
            should.not.exist(_analysis);
        });
    });
  });
});