const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const users2_schema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	name: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true
	},
	acc_address: {
		type: String,
		required: true
	},
	private_key: {
		type: String,
		required: true
	},
	role: {
		type: String,
		required: true
	}
});

module.exports = users2 = mongoose.model("users2", users2_schema);
