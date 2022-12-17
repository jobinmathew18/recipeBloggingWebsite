
const Category = require("../models/Category");
const Recipe = require("../models/Recipe");

/**
 * GET/
 * Homepage
 */
exports.homepage = async(req,res) =>{
    try {
        const limitNumber = 5;
        const categories = await Category.find({}).limit(limitNumber);
        const latest = await Recipe.find({}).sort({_id: -1}).limit(limitNumber);
        const thai = await Recipe.find({category: "Thai"}).limit(limitNumber);
        const american = await Recipe.find({category: "American"}).limit(limitNumber);
        const chinese = await Recipe.find({category: "Chinese"}).limit(limitNumber);
        const mexican = await Recipe.find({category: "Mexican"}).limit(limitNumber);
        const indian = await Recipe.find({category: "Indian"}).limit(limitNumber);

        const food = { latest, thai, american, chinese, mexican, indian};
        const list = ["Thai", "American", "Chinese", "Mexican", "Indian", "Spanish"];
        // console.log(food);
        res.render("index", {title: "Cooking Blog - Homepage", categories, food, list});  
    } catch (error) {
        res.status(500).send(error);
    }   
};




/**
 * GET/explore-latest
 * Explore Latest
 */
exports.exploreLatest = async(req,res)=>{
    try {
        const latest = await Recipe.find({}).sort({_id: -1});
        res.render("explore-latest", {title: "Cooking Blog - Explore Latest", latest});  
    } catch (error) {
        res.status(500).send(error);
    }  
}





/**
 * GET/explore-random
 * Explore Random
 */
 exports.exploreRandom = async(req,res)=>{
    try {
        let count = await Recipe.find().countDocuments();
        let random = Math.floor(Math.random()* count);
        const randomRecipe = await Recipe.findOne({}).skip(random).exec();
        res.render("explore-random", {title: "Cooking Blog - Explore Latest", randomRecipe});  
    } catch (error) {
        res.status(500).send(error);
    }  
}






/**
 * GET/categories
 * categories
 */
 exports.exploreCategories = async(req,res) =>{
    try {
        const limitNumber = 20;
        const categories = await Category.find({}).limit(limitNumber);
        res.render("categories", {title: "Cooking Blog - Categories", categories});  
    } catch (error) {
        res.status(500).send(error);
    }   
};




/**
 * GET/recipe by id
 * recipe
 */
exports.exploreRecipe = async(req,res)=>{
    try {
        let recipeID = req.params.id; 
        const dynamicRecipe = await Recipe.findById(recipeID);
        // console.log(dynamicRecipe);
        res.render("recipe", {title: "Cooking Blog - Recipe", dynamicRecipe});
    } catch (error) {
        res.status(500).send(error);
    }
}





/**
 * GET/categories by name
 * categories
 */
 exports.exploreCategoriesByName = async(req,res)=>{
    try {
        let categoryName = req.params.name; 
        const categoryByName = await Recipe.find({category: categoryName});
        // console.log(categoryName)
        // console.log(categoryByName);
        res.render("categories", {title: "Cooking Blog - Recipe", categoryByName});
    } catch (error) {
        res.status(500).send(error);
    }
}






/**
 * POST/search
 * search
 */
exports.searchRecipe = async(req,res) =>{
    try {
        let searchTerm = req.body.searchTerm;
        // console.log(searchTerm);
        let recipe = await Recipe.find( { $text: { $search: searchTerm, $diacriticSensitive: true}});
        // console.log(recipe)
        res.render("search", {title: "Cooking Blog - Search", recipe});
    } catch (error) {
        res.status(500).send(error);
    }
    
}






/**
 * GET/submit
 * submit
 */
exports.submitRecipe = async(req,res)=>{
    const infoErrorObj = req.flash("infoErrors");
    const infoSubmitObj = req.flash("infoSubmit");
    res.render("submit-recipe", {title: "Cooking Blog - Submit Recipe", infoErrorObj, infoSubmitObj});
}






/**
 * POST/submit-recipe
 * submit recipe
 */
 exports.submitRecipeOnPost = async(req,res)=>{

    //displaying the uploaded image by the user
    try {
        let imgaeUploadFile;
        let uploadPath;
        let newImageName;

        if(!req.files || Object.keys(req.files).length === 0){
            console.log("No files were uploaded.")
        } else{

            imgaeUploadFile = req.files.image;                     //here "image" is the "name" of <input image> in the form.
            newImageName = Date.now() + imgaeUploadFile.name;        

            uploadPath = require("path").resolve("./") + "/public/uploads/" + newImageName;

            imgaeUploadFile.mv(uploadPath, function(err){
                if(err) return res.status(500).send(err);
            })
        }


        const addRecipe = new Recipe({
            name: req.body.name,
            description: req.body.description,
            email: req.body.email,
            ingredients: req.body.ingredients,
            category: req.body.category,
            image: newImageName
        });
        await addRecipe.save();
        req.flash("infoSubmit", "Recipe has been added.");
        res.redirect("/submit-recipe");
    } catch (error) {
        // res.json(error);    
        req.flash("infoErrors",error.name);
        res.redirect("submit-recipe");
    }

}