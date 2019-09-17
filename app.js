// Incorporate modules
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

// Initiate app
const app = express();

// Use EJS
app.set("view engine", ejs);

// Use body-parser
app.use(bodyParser.urlencoded({extended: true}));

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/articlesDB", {
  // Fix the URL string parser deprecation warning
 useNewUrlParser: true,
 // Fix Server Discovery and Monitoring Engine deprecation warning
 useUnifiedTopology: true
});

// -----------------------------------------------------------------------------

// Create schema
const articlesSchema = mongoose.Schema({
  title: String,
  content: String
});

// Create model
const Article = mongoose.model("Article", articlesSchema);

// ----------------------------------------------------------------------------

// Chainable route handler for "/articles"
app.route("/articles")
  // GET handler
  .get(function(req, res){
    // Find all of the documents in the Article collection
    Article.find(function(err, foundArticles){
      // If there are no erros
      if(!err){
        // Send all of the documents in the collection
        res.send(foundArticles);
      }else{
        // Send the error message
        res.send(err);
      }

    });
  })

  // POST handler for ""/articles"
  .post(function(req, res) {
    // Create a new document
    let newArticle = new Article({
      title: req.body.title,
      content: req.body.content
    });

    // Save the document if there aren't any errors
    newArticle.save(function(err){
      // If there are no errors
      if(!err){
        // Send a success message
        res.send("Successfully added the article")
      }else{
        // Send the error message
        res.send(err);
      }
    });
  })

  // DELETE handler for "/articles"
  .delete(function(req, res){
    // Delete all of the documents in the collection and check for errors
    Article.deleteMany(function(err){
      // If there are no errors
      if(!err){
        // Send a success message
        res.send("Successfully deleted all of the documents");
      }else{
        // Send the error message
        res.send(err);
      }
    });
  });






// Start the server
app.listen(3000, function(){
  console.log("Server is running on port 3000");
});
