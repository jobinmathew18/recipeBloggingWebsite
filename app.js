const express = require("express");

//it allows us to create different layouts for different scenarios so that we don't hava a duplicated code.
const expressLayouts = require("express-ejs-layouts");

const fileUpload = require("express-fileupload");
const session = require("express-session");
const cookiePareser = require("cookie-parser");
const flash = require("connect-flash");

require("./server/db/conn");


//this is going to be for storing all database details.
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("layout", "./layouts/main");

app.use(cookiePareser("CookingBlogSecure"));
app.use(session({
    secret: "CookingBlogSecretSession",
    saveUninitialized: true,
    resave: true
}));
app.use(flash());
app.use(fileUpload());

const routes = require("./server/routes/recipeRoutes.js");
app.use("/",routes);

app.listen(port, ()=>{
    console.log(`port ${port} running...`);
});
