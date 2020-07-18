const express = require ('express');
const app = express();
const machineAlgo = require('./machineAlgo.js');
const mongoose = require('mongoose');
const MovieSuggestor = require('./models/movie');

//listen for requests
const PORT =process.env.PORT||3000;
//Database connections and run server
const dbURI = 'mongodb+srv://swetanshu:bagira343@moviesuggestor.ovw21.gcp.mongodb.net/movies_data?retryWrites=true&w=majority';   // Connect to mongodb
mongoose.connect(dbURI, { useNewUrlParser: true , useUnifiedTopology: true})
    .then((result)=> {
        app.listen(PORT, function(){
            console.log(`Server running on port ${PORT}...`)});
            console.log("Connected to database");
    })
    .catch((err)=> console.log(err));

// var bodyParser =  require('body-parser');
// var movies = require('./public/movies');
// movies.favorite();
//Register view Engine
// app.set('view engine', 'ejs');

//milldewares and static filters
app.use(express.urlencoded({extended:true}));       // FOR ACCEPTING FORM DATA

app.set('view engine', 'ejs'); //enable view engine
//app.set('views', 'myviews'); in case of a different folder

// app.listen(PORT, function(){
//     console.log(`Server running on port ${PORT}...`);
// });

app.get('/', (req, res) =>{ 
    //res.send('<p>Home page</p>');
    //res.sendfile('./public/index.html',{ root: __dirname});
    res.render('index'); //for ejs 
});

app.get('/about', (req, res) =>{ 
    // res.send('<p>About page</p>');
    //res.sendfile('./public/about.html',{ root: __dirname });
    res.render('about');
});

//fetch all data from database
app.get('/fetchData', (req, res)=> {
    MovieSuggestor.find()
        .then( (result)=> res.send(result))
        .catch( (err)=> console.log(err));
});

//POST req handler
app.post('/submit-movies', (req, res) =>{
    console.log("User Input = ", req.body);
    // var toSend = {
    //     SuggestedMovies: ["harry 1", 'harry 2', 'harry 3'],
    //     Review: "These are the good movies to watch"
    // }
    const sendToDatabase = new MovieSuggestor({
        movie1: req.body.movie1,
        movie2: req.body.movie2,
        movie3: req.body.movie3
    });
    sendToDatabase.save()
        .then((result)=>{
            console.log(result);
            //toSend.db =(result);
        })
        .catch((err)=> console.log(err));

    machineAlgo.function1(req,res);
     var arrayToSend = ['palm','trees','are','good'];
    // toSend.algoOutput1 =  machineAlgo.function1(req,res);
    // toSend.algoOutput2 = machineAlgo.function2(req,res);
    // console.log(res);
    //res.render('suggestions', {arrayToSend});
    //res.send(toSend);
})
//Redirects
app.get('/about-us', (req, res) =>{
    res.redirect('/about');
})
//404 PAge, Always use at the last point, VERY IMPORTANT

app.use((req, res) =>{
    //res.sendfile('./public/404.html', { root: __dirname});
    res.render('404')
});