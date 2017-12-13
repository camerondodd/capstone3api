const express = require('express');
const router = require('express').Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const Analysis = require('../models/analysisModel');

router.use(bodyParser.json());

//GET all analyses
router.get('/',(req,res)=>{
	Analysis.find()
		.then((analyses)=>{
			res.json(analyses);
		});
});
//GET one analysis
router.get('/:type/:purp/:IV/:CtP/:OT/:DVL/:DV/:IVL/:fact/:hier/:mod/:scale/:EFQ/:theory/:var/:DFA',
	(req,res)=>{
		Analysis.findOne({
 			type:req.params.type,
 			purp:req.params.purp,
 			IV:req.params.IV,
 			CtP:req.params.CtP,
 			OT:req.params.OT,
 			DVL:req.params.DVL,
 			DV:req.params.DV,
 			IVL:req.params.IVL,
 			fact:req.params.fact,
 			hier:req.params.hier,
 			mod:req.params.mod,
 			scale:req.params.scale,
 			EFQ:req.params.EFQ,
 			theory:req.params.theory,
 			var:req.params.var,
 			DFA:req.params.DFA,
 		})
 		.then((analysis)=>{
 			res.json(analysis);
 		});
 	});
// Post analysis
router.post('/',(req,res)=>{
	Analysis.create({
		name:req.body.name,
		ass:req.body.ass,
		type:req.body.type,
		purp:req.body.purp,
		IV:req.body.IV,
		DV:req.body.DV,
		CtP:req.body.CtP,
		OT:req.body.OT,
		DVL:req.body.DVL,
		IVL:req.body.IVL,
		fact:req.body.fact,
		hier:req.body.hier,
		mod:req.body.mod,
		scale:req.body.scale,
		EFQ:req.body.EFQ,
		theory:req.body.theory,
		var:req.body.var,
		DFA:req.body.DFA
	},function(err,analysis){
		console.log(analysis);
		res.json(analysis);
	});
});
// DELETE analysis
router.delete('/:id',(req,res)=>{
	Analysis.remove({
		_id:req.params.id
	})
	.then(()=>{
		res.status(204).end();
	});
	console.log('analysis deleted');
});

module.exports = router;