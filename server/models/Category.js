
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: "This is required."
    },
    image: {
        type: String,
        required: "This is required." 
    }
});

const category = mongoose.model("category",categorySchema);
module.exports = category;