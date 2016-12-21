var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SavedSchema = new Schema({
   headline: { type: String, required: false},
   date: { type: Date, required: false},
   url: { type: String, required: false}
});

var Saved = mongoose.model("Saved", SavedSchema);
module.exports = Saved;