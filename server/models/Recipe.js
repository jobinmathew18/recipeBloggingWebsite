
const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "This field is required."
    },
    description: {
        type: String,
        required: "This field is required." 
    },
    email: {
        type: String,
        required: "This field is required.",
        unique: true
    },
    ingredients: {
        type: Array,
        required: "This field is required." 
    },
    category:{
        type: String,
        enum: ["Thai", "American", "Chinese", "Mexican", "Indian", "Spanish"],
        required: "This field is required." 
    },
    image: {
        type: String,
        required: "This field is required." 
    }
});

//this code tells that we can search in fields name and description. 
recipeSchema.index({name: "text", description: "text"});

const recipe = mongoose.model("recipe",recipeSchema);
module.exports = recipe;