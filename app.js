var express = require('express');
var path = require('path');

//leaving in the bodyParser in case we ever send up form data and need to get data out of form
var bodyParser = require('body-parser');


var app = express();

// view engine setup
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));

// start by creating data so we don't have to type it in each time
let serverRestaurantArray = [];

// define a constructor to create restaurant objects
let RestaurantObject = function (pTitle, pStyle, pAddress, pPhone, pReview, pURL) {
    this.ID = Math.random().toString(16).slice(5)  // tiny chance could get duplicates!
    this.Title = pTitle;
    this.Style = pStyle;//restaurant styles in option
    this.Address = pAddress;  
    this.Phone = pPhone;
    this.Review = pReview;
    this.URL = pURL;
}

serverRestaurantArray.push(new RestaurantObject("John Howie Steak Restaurant", "American", "11111 NE 8th St Ste 125 Bellevue, WA 98004", "(425) 440-0880", 4,"http://johnhowiesteak.com"))
serverRestaurantArray.push(new RestaurantObject("The Grill from Ipanema", "Brazilian", "2313 1st Ave Seattle, WA 98121", "(206) 457-4885", 4, "https://www.seattlegrillfromipanema.com"));
serverRestaurantArray.push(new RestaurantObject("Din Tai Fung", "Chinese", "700 Bellevue Way NE, Bellevue, WA 98004", "(425) 698-1095", 4, "https://www.dintaifungusa.com"));
serverRestaurantArray.push(new RestaurantObject("Mediterranean Grill", "Greek", "15253 Bel-Red Rd Suite C, Bellevue, WA 98007", "(425) 644-6066", 4, "https://www.medgrillbellevue.com"));
serverRestaurantArray.push(new RestaurantObject("Cascina Spinasse", "Italian", "1531 14th Ave Seattle, WA 98122", "(206) 251-7673", 4.5,"http://spinasse.com/"));
serverRestaurantArray.push(new RestaurantObject("Cactus Restaurants", "Mexican", "535 Bellevue Sq Bellevue, WA 98004", "(425) 455-4321", 4, "https://cactusrestaurants.com"));


// just one "site" with 2 pages, / and about

// use res.render to load up an ejs view file
// index page 

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

/* GET restaurantList. */
app.get('/divRestaurantList', function(req, res) {
    res.json(serverRestaurantArray);
});

/* POST to addRestaurant */
app.post('/addRestaurant', function(req, res) {
    console.log(req.body);
    serverRestaurantArray.push(req.body);
    // set the res(ponse) object's status propery to a 200 code, which means success
    res.status(200).send(JSON.stringify('success'));
  });

 /* DELETE to deleteRestaurant. */
 app.delete('/deleteRestaurant/:id', function(req, res) {
    let id = req.params.id;   // this is how you pick out items passed in the URL, there can be more than 1
     for(let i=0; i < serverRestaurantArray.length; i++) {
       if(id === (serverRestaurantArray[i].ID) ) {
       serverRestaurantArray.splice(i,1); //remove 1 element at loc i
       res.send('success')
       }
     }
     res.status(404); // if not found
})

app.put('/modifyRestaurant/:id', (req, res)=>{
    let id=req.params.id;
    let restaurantObject=req.body;
    //console.log(id);
    //console.log(movieObject);
    for(var i=0;i<serverRestaurantArray.length;i++){
        if(serverRestaurantArray[i].ID==id){
            serverRestaurantArray[i]=restaurantObject;//remove 1 element at loc i
            res.send('success');
        }
    }
    res.status(404); //if not found
});

// error page 
app.get('/error', function(req, res) {
    // should get real data from some real operation, but instead ...
    let message = "some text from someplace";
    let errorObject ={
        status: "this is real bad",
        stack: "somebody called #$% somebody who called somebody <awful>"
    };
    res.render('pages/error', {  // pass the data to the page renderer
        message: message,
        error: errorObject
    });
});



app.listen(3000);  // not setting port number in www.bin, simple to do here
console.log('3000 is the magic port');

module.exports = app;
