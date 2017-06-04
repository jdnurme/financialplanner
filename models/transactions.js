var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;

var TransactionSchema = mongoose.Schema({
	date: {type: Date, required: true},
	item: {type: String, required: true},
	tag: {type: String},
	cost: {type: Number, required: true}
});

TransactionSchema.statics.getAllTransactions = function(callback){
	this.find({})
		.sort({date: -1})
		.then(function(notdocs) {
			callback(null, notdocs);
		}).catch(function(err){
			callback(err, null);
		});
}

var TransactionModel = mongoose.model("Transaction", TransactionSchema);

module.exports = TransactionModel;