// start by creating data so we don't have to type it in each time
let restaurantArray = [];

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


// restaurantArray.push(new RestaurantObject("John Howie Steak Restaurant", "American", "11111 NE 8th St Ste 125 Bellevue, WA 98004", "(425) 440-0880", 4,"http://johnhowiesteak.com"));
// restaurantArray.push(new RestaurantObject("The Grill from Ipanema", "Brazilian", "2313 1st Ave Seattle, WA 98121", "(206) 457-4885", 4, "https://www.seattlegrillfromipanema.com"));
// restaurantArray.push(new RestaurantObject("Din Tai Fung", "Chinese", "700 Bellevue Way NE, Bellevue, WA 98004", "(425) 698-1095", 4, "https://www.dintaifungusa.com"));
// restaurantArray.push(new RestaurantObject("Mediterranean Grill", "Greek", "15253 Bel-Red Rd Suite C, Bellevue, WA 98007", "(425) 644-6066", 4, "https://www.medgrillbellevue.com"));
// restaurantArray.push(new RestaurantObject("Cascina Spinasse", "Italian", "1531 14th Ave Seattle, WA 98122", "(206) 251-7673", 4.5,"http://spinasse.com/"));
// restaurantArray.push(new RestaurantObject("Cactus Restaurants", "Mexican", "535 Bellevue Sq Bellevue, WA 98004", "(425) 455-4321", 4, "https://cactusrestaurants.com"));

//====================  login stuff  ==============================

let usersArray = [];
let CreateUserObject = function (pUsername, pPassword, pStyle) {
    this.Username = pUsername;
    this.Password = pPassword;
    this.Style = pStyle;  // users favorite restaurant style
}
usersArray.push(new CreateUserObject("admin", "admin", "Chinese"));
//==================================================


let selectedStyle = "not selected";

document.addEventListener("DOMContentLoaded", function () {

    loginstuff.style.display = "block";
    currentUser.style.display = "none";

    createList();

    // add button events ************************************************************************
    
    document.getElementById("buttonAdd").addEventListener("click", function () {
       // restaurantArray.push(
           let newRestaurant = new RestaurantObject(document.getElementById("title").value, selectedStyle, document.getElementById("address").value,
            document.getElementById("phone").value, document.getElementById("review").value, document.getElementById("URL").value);
            addNewRestaurant(newRestaurant);       
           // document.location.href = "index.html#ListAll";
        // also add the URL value
    });

    document.getElementById("modifyButton").addEventListener("click", function () {
        
            let newRestaurant = new RestaurantObject(document.getElementById("titleR").value, document.getElementById("styleR").value, document.getElementById("addressR").value,
             document.getElementById("phoneR").value, document.getElementById("reviewR").value, document.getElementById("URLR").value);
             modifyRestaurant(newRestaurant);       
             document.location.href = "index.html#ListAll";
         // also add the URL value
     });

    
    document.getElementById("buttonClear").addEventListener("click", function () {
        document.getElementById("title").value = "";
        document.getElementById("address").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("review").value = "";
        document.getElementById("URL").value = "";
    });

    $(document).bind("change", "#select-style", function (event, ui) {
        selectedStyle = $('#select-style').val();
    });

    document.getElementById("delete").addEventListener("click", function () {
        deleteRestaurant(document.getElementById("IDparmHere").innerHTML);
        createList();  // recreate li list after removing one
        document.location.href = "index.html#ListAll";  // go back to restaurant list 
    });

    // 2 sort button event methods
    document.getElementById("buttonSortName").addEventListener("click", function () {
        restaurantArray.sort(dynamicSort("Title"));
        createList();
        document.location.href = "index.html#ListAll";
    });

    document.getElementById("buttonSortStyle").addEventListener("click", function () {
        restaurantArray.sort(dynamicSort("Style"));
        createList();
        document.location.href = "index.html#ListAll";
    });

    // button on details page to view the restaurant website
    document.getElementById("website").addEventListener("click", function () {
        window.open(document.getElementById("oneURL").innerHTML);
    });

    document.getElementById("buttonSubsetAmerican").addEventListener("click", function () {
       
        createListSubset("American");  // recreate li list after removing one
    });

    document.getElementById("buttonSubsetBrazilian").addEventListener("click", function () {
       
        createListSubset("Brazilian");  // recreate li list after removing one
    });

    document.getElementById("buttonSubsetChinese").addEventListener("click", function () {

        createListSubset("Chinese");  // recreate li list after removing one
    });

    document.getElementById("buttonSubsetGreek").addEventListener("click", function () {

        createListSubset("Greek");  // recreate li list after removing one
    });

    document.getElementById("buttonSubsetItalian").addEventListener("click", function () {

        createListSubset("Italian");  // recreate li list after removing one
    });

    document.getElementById("buttonSubsetMexican").addEventListener("click", function () {

        createListSubset("Mexican");  // recreate li list after removing one
    });


    //====================  login stuff  ==============================

    document.getElementById("login").addEventListener("click", function () {
        let user = document.getElementById("username").value;
        let pw = document.getElementById("password").value;
        if (passwordCheck(user, pw) == true) {
            loginstuff.style.display = "none";
            currentUser.style.display = "block";
        }
        document.getElementById("showUser1").innerHTML = " You are logged in as " + document.getElementById("username").value;        
        document.getElementById("showUser2").innerHTML = " You are logged in as " + document.getElementById("username").value;        
        document.getElementById("showUser3").innerHTML = " You are logged in as " + document.getElementById("username").value;        
        document.getElementById("showUser4").innerHTML = " You are logged in as " + document.getElementById("username").value;        
        document.getElementById("showUser5").innerHTML = " You are logged in as " + document.getElementById("username").value;        
        document.getElementById("LoggedInUserName").innerHTML = document.getElementById("username").value
        document.location.href = "index.html#home";  // go back to Home page  
    });

    document.getElementById("createaccount").addEventListener("click", function () {
        if ((document.getElementById("username").value).length > 2 &&
            (document.getElementById("password").value).length > 2) {

            usersArray.push(new CreateUserObject(document.getElementById("username").value,
                document.getElementById("password").value, "Chinese")
            );
            document.getElementById("showUser1").innerHTML = " You are logged in as " + document.getElementById("username").value;
            document.getElementById("showUser2").innerHTML = " You are logged in as " + document.getElementById("username").value;
            document.getElementById("showUser3").innerHTML = " You are logged in as " + document.getElementById("username").value;
            document.getElementById("showUser4").innerHTML = " You are logged in as " + document.getElementById("username").value;
            document.getElementById("showUser5").innerHTML = " You are logged in as " + document.getElementById("username").value;
        
            // write the hidded element to keep track of who is logged in.
            document.getElementById("LoggedInUserName").innerHTML = document.getElementById("username").value;
            loginstuff.style.display = "none";
            currentUser.style.display = "block";
        }
        else {
            alert("Name and Password must be filled in");
        }
        document.location.href = "index.html#home";  // go back to home page 
    });

    document.getElementById("logout").addEventListener("click", function () {
        document.getElementById("LoggedInUserName").innerHTML = "loggedout";

        document.getElementById("showUser1").innerHTML = " You are not logged in";
        document.getElementById("showUser2").innerHTML = " You are not logged in";
        document.getElementById("showUser3").innerHTML = " You are not logged in";
        document.getElementById("showUser4").innerHTML = " You are not logged in";
        document.getElementById("showUser5").innerHTML = " You are not logged in";


        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
        loginstuff.style.display = "block";
        currentUser.style.display = "none";

        document.location.href = "index.html#home";  // go back to Home page


    });

    //=============================================================

    // end of add button events ************************************************************************

  
    // page before show code *************************************************************************
    $(document).on("pagebeforeshow", "#ListAll", function (event) {   // have to use jQuery 
        if ((document.getElementById("LoggedInUserName").innerHTML) === "loggedout") {
            showAllRestaurantsSection.style.display = "none";
            alert('please log in');
        }
        else {
            FillArrayFromServer();
           // createList();
            showAllRestaurantsSection.style.display = "block";
        }
    });

    $(document).on("pagebeforeshow", "#ListSome", function (event) {   // have to use jQuery 
        // clear prior data
        let divRestaurantList = document.getElementById("divRestaurantListSubset");
        while (divRestaurantList.firstChild) {    // remove any old data so don't get duplicates
            divRestaurantList.removeChild(divRestaurantList.firstChild);
        };
        FillArrayFromServer();
    });

    // need one for our details page to fill in the info based on the passed in ID
    $(document).on("pagebeforeshow", "#details", function (event) {   // have to use jQuery 
        // to compensate for some bug in jQuery mobile where this pagebeforeshow start with a stale value for IDparmHere
        // I added this. The error only happens the first time the browsers goes to the details page.
        if (document.getElementById("IDparmHere").innerHTML == "change1"){
            alert('sorry, temporary error, please try again');
            document.location.href = "index.html#ListAll";
        }
        //normal path
        else{
            let localID = document.getElementById("IDparmHere").innerHTML;
            console.log("in page before show:" + localID);
            let arrayPointer = GetArrayPointer(localID);
            document.getElementById("oneName").innerHTML = "The restaurant name is: " + restaurantArray[arrayPointer].Title;
            document.getElementById("oneStyle").innerHTML = "Restaurant style: " + restaurantArray[arrayPointer].Style;
            document.getElementById("oneAddress").innerHTML = "Address: " + restaurantArray[arrayPointer].Address;
            document.getElementById("onePhone").innerHTML = "Phone: " + restaurantArray[arrayPointer].Phone;
            document.getElementById("oneReview").innerHTML = "Review(1-5): " + restaurantArray[arrayPointer].Review;
            document.getElementById("oneURL").innerHTML = restaurantArray[arrayPointer].URL;
    
            document.getElementById("titleR").value = restaurantArray[arrayPointer].Title;
            document.getElementById("styleR").value =  restaurantArray[arrayPointer].Style;
            document.getElementById("addressR").value = restaurantArray[arrayPointer].Address;
            document.getElementById("phoneR").value = restaurantArray[arrayPointer].Phone;
            document.getElementById("reviewR").value = restaurantArray[arrayPointer].Review;
            document.getElementById("URLR").value = restaurantArray[arrayPointer].URL
        }

    });
 
    // end of page before show code *************************************************************************

});

// end of wait until document has loaded event  *************************************************************************

function passwordCheck(user, pw) {
    console.log(usersArray);
    console.log(user + "  " + pw);
    for (let i = 0; i < usersArray.length; i++) {
        if (user === usersArray[i].Username && pw === usersArray[i].Password) {
            return true
        }
    }
    alert("could not find account");
    return false;  // no match
}


// next 2 functions could be combined into 1 with a little work
// such as I could pass in a variable which said which divRestaurantList div it should draw
// to, and if no value is passed in to subset too, I could just include all.

function createList() {
    // clear prior data
    let divRestaurantList = document.getElementById("divRestaurantList");
    while (divRestaurantList.firstChild) {    // remove any old data so don't get duplicates
        divRestaurantList.removeChild(divRestaurantList.firstChild);
    };

    let ul = document.createElement('ul');

    restaurantArray.forEach(function (element,) {   // use handy array forEach method
        let li = document.createElement('li');
        // adding a class name to each one as a way of creating a collection
        li.classList.add('oneRestaurant'); 
        // use the html5 "data-parm" to encode the ID of this particular data object
        // that we are building an li from
        li.setAttribute("data-parm", element.ID);
        li.innerHTML = element.ID + ":  " + element.Title + "  " +element.Style;
        ul.appendChild(li);
    });
    divRestaurantList.appendChild(ul)

    // now we have the HTML done to display out list, 
    // next we make them active buttons
    // set up an event for each new li item, 
    let liArray = document.getElementsByClassName("oneRestaurant");
    Array.from(liArray).forEach(function (element) {
        element.addEventListener('click', function () {
        // get that data-parm we added for THIS particular li as we loop thru them
        let parm = this.getAttribute("data-parm");  // passing in the record.Id
        // get our hidden <p> and write THIS ID value there
        document.getElementById("IDparmHere").innerHTML = parm;
        // now jump to our page that will use that one item
        document.location.href = "index.html#details";
        });
    });
};

// function deleteRestaurant(which) {
//     console.log(which);
//     let arrayPointer = GetArrayPointer(which);
//     restaurantArray.splice(arrayPointer, 1);  // remove 1 element at index 
// }

//so replace client code with

function deleteRestaurant(which) {
    fetch('deleteRestaurant/' + which , {
        method: 'DELETE'
    })  
 // now wait for promise, saying server was happy with request or not
    .then(function (theResonsePromise) {
       alert("Restaurant successfully deleted in cloud")
     })

    .catch(function (err) {
         alert("Restaurant NOT deleted in cloud"+err);
     });      
};

// cycles thru the array to find the array element with a matching ID
function GetArrayPointer(localID) {
    for (let i = 0; i < restaurantArray.length; i++) {
        if (localID === restaurantArray[i].ID) {
            return i;
        }
    }
}
  

function createListSubset(whichType) {
    // clear prior data
    let divRestaurantList = document.getElementById("divRestaurantListSubset");
    while (divRestaurantList.firstChild) {    // remove any old data so don't get duplicates
        divRestaurantList.removeChild(divRestaurantList.firstChild);
    };

    let ul = document.createElement('ul');

    restaurantArray.forEach(function (element,) {
        
        if (element.Style === whichType) {
            // use handy array forEach method
            let li = document.createElement('li');
            // adding a class name to each one as a way of creating a collection
            li.classList.add('oneRestaurant');
            // use the html5 "data-parm" to encode the ID of this particular data object
            // that we are building an li from
            li.setAttribute("data-parm", element.ID);
            li.innerHTML = element.ID + ":  " + element.Title + "  " + element.Style;
            ul.appendChild(li);
        }
    });
    divRestaurantList.appendChild(ul)

    // now we have the HTML done to display out list, 
    // next we make them active buttons
    // set up an event for each new li item, 
    let liArray = document.getElementsByClassName("oneRestaurant");
    Array.from(liArray).forEach(function (element) {
        element.addEventListener('click', function () {
            // get that data-parm we added for THIS particular li as we loop thru them
            let parm = this.getAttribute("data-parm");  // passing in the record.Id
            // get our hidden <p> and write THIS ID value there
            document.getElementById("IDparmHere").innerHTML = parm;
            // now jump to our page that will use that one item
            document.location.href = "index.html#details";
        });
    });

};

/**
 *  https://ourcodeworld.com/articles/read/764/how-to-sort-alphabetically-an-array-of-objects-by-key-in-javascript
* Function to sort alphabetically an array of objects by some specific key.
* 
* @param {String} property Key of the object to sort.
*/
function dynamicSort(property) {
    let sortOrder = 1;

    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }

    return function (a, b) {
        if (sortOrder == -1) {
            return b[property].localeCompare(a[property]);
        } else {
            return a[property].localeCompare(b[property]);
        }
    }
}

function FillArrayFromServer(){
    // using fetch call to communicate with node server to get all data
    fetch('/divRestaurantList')
    .then(function (theResonsePromise) {  // wait for reply.  Note this one uses a normal function, not an => function
        return theResonsePromise.json();
    })
    .then(function (serverData) { // now wait for the 2nd promise, which is when data has finished being returned to client
    console.log(serverData);
    restaurantArray.length = 0;  // clear array
    restaurantArray = serverData;   // use our server json data which matches our objects in the array perfectly
    createList();  // placing this here will make it wait for data from server to be complete before re-doing the list
    })
    .catch(function (err) {
     console.log(err);
    })
}

// using fetch to push an object up to server
function addNewRestaurant(newRestaurant){
    // the required post body data is our movie object passed into this function
        
        // create request object
        const request = new Request('/addRestaurant', {
            method: 'POST',
            body: JSON.stringify(newRestaurant),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });
        
      // use that request object we just created for our fetch() call
      fetch(request)
      // wait for frist server promise response of "200" success 
      // (can name these returned promise objects anything you like)
         .then(function (theResonsePromise) {    // the .json sets up 2nd promise
          return theResonsePromise.json()  })
       // now wait for the 2nd promise, which is when data has finished being returned to client
          .then(function (theResonsePromiseJson) { 
            console.log(theResonsePromiseJson.toString()), 
            document.location.href = "#ListAll" 
            })
      // the client console log will write out the message I added to the Repsonse on the server
      .catch(function (err) {
          console.log(err);
      });   
    }; // end of addNewRestaurant

    //using fetch to push an object up to server
    function modifyRestaurant(newRestaurant){
        // restaurant constructor function give this a new ID, set it back to what it was 
        newRestaurant.ID=document.getElementById("IDparmHere").innerHTML;
        // create fetch request object

        //a put requires both a URL passed value and an object in the body
        //that way you could tell the server, find the object with this ID passed in the URL 
        //and replace it with an object that is in the body that MIGHT have an updated and different ID.
        const request=new Request('/modifyRestaurant/'+newRestaurant.ID,{
            method: 'PUT',
            body: JSON.stringify(newRestaurant),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });

        //use that request object we just created for our fetch() call
        fetch(request)
        //wait for first server promise response of "200" success
            .then(function(theResponsePromise){
                return theResponsePromise.json()
            })
            // now wait for the 2nd promise, which is when data has finished being returned to client
            .then(function(theResponsePromiseJson){
                console.log(theResponsePromiseJson.toString()),
                document.location.href="#ListAll"
            })
            // the client console log will write out the message I added to the Response on the server
            .catch(function(err){
                console.log(err);
            });

    }; // end of modifyRestaurant