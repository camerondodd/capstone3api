const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const analysisSchema = new Schema({
	name:String,
	ass:Array,
	type:String,
	purp:String,
	IV:String,
	DV:String,
	CtP:String,
	OT:String,
	DVL:String,
	IVL:String,
	fact:String,
	hier:String,
	mod:String,
	scale:String,
	EFQ:String,
	theory:String,
	var:String,
	DFA:String
});

const Analysis = mongoose.model('analysis', analysisSchema);
module.exports = Analysis;