var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;

var TransactionSchema = mongoose.Schema({
	date: {type: Date, required: true},
	item: {type: String, required: true},
	tag: {type: String},
	cost: {type: Number, required: true}
});
/*
	This method returns all information in the database ordered by date
*/
TransactionSchema.statics.getAllTransactions = function(timeUnit, callback){
	this.find({})
		.sort({date: -1})
		.then(function(info) {
			var offset = new Date();
			var keep = [];
			offset.setDate(offset.getDate() - timeUnit);
			info.forEach(function(element, index, array){
				if (element.date > offset){
					keep.push(element);
				}
			})	
			console.log(keep);
			callback(null, keep);
		}).catch(function(err){
			callback(err, null);
		});
}
TransactionSchema.statics.inputItem = function(cost, tag, item, callback){
	this.create({
		cost:cost,
		tag:tag,
		item:item,
		date: new Date()
	}).then(function(){
		callback()
	}).catch(function(err){
		callback(err)
	});
}



TransactionSchema.statics.getItemByTag = function(tag, callback){
	this.find({tag:tag})
		.sort({date: -1})
		.then(function(info){
			callback(null, info);
		}).catch(function(err){
			callback(err)
		});
}

TransactionSchema.statics.getTop5 = function(timeUnit, callback){
	this.getAllTransactions
}

var TransactionModel = mongoose.model("Transaction", TransactionSchema);

module.exports = TransactionModel;