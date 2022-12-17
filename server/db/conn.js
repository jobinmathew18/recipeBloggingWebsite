const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/recipeDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then( ()=>{
    console.log("MongoDB connection successful");
}).catch( (error) =>{
    console.log(error);
});