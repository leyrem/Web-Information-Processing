//
// AJAX - API - Database Demo
//
// CS230 Demo Program - John G. Keating
//
// (c) 2021
//

//
// Note: This version (index-db.js) connects to an MySQL Database rather than
//       maintaining an "in-memory" database using a variable! You will need
//       access to a database in order for this to work (use Webcourse, etc.)
//

// Load the NodeJS modules required

var http = require("http"); // creating an API using http
var url = require("url"); // using url to extract the route (e.g. /, /api/user)
var querystring = require("querystring"); // this will contain the body of the POST request
var fs = require("fs"); // file handling to read the index.html served for / route
var port = 8000; // port the server with listen on

var server = http.createServer(); // create the server

//
// This is the new section that manages a relational (mysql) database connection
//
var mysql = require("mysql");
// use YOUR credentials to create your database connection
var con = mysql.createConnection({
  host: "webcourse.cs.nuim.ie",
  user: "u220037",
  password: "ooxahmieSh6quoQu",
  database: "cs230_u220037",
});
// And make the connection - re-used later
con.connect(function (err) {
  if (err) throw err;
  console.log("Database: Connected!");
});

// watch for Ctrl-C and then close database connection!
process.on("SIGINT", function () {
  con.end(function (err) {
    if (err) {
      return console.log("error:" + err.message);
    }
    console.log("\nDatabase: Disconnected!");
    process.exit();
  });
});

// listen for requests from clients
server.on("request", function (request, response) {
  var currentRoute = url.format(request.url); // get the route (/ or /api/user)
  var currentMethod = request.method; // get the HTTP request type (POST - Create; GET - Retrieve)
  var requestBody = ""; // will contain the extracted POST data later

  // determine the route (/ or /api/user)
  switch (currentRoute) {
    //
    // If no API call made then the default route is / so
    // just return the default index.html file to the user.
    // This contains the forms, etc. for making the CRUD
    // requests (only Create and Retrieve implemented)
    //
    case "/":
      fs.readFile(__dirname + "/index.html", function (err, data) {
        // get the file and add to data
        var headers = {
          // set the appropriate headers
          "Content-Type": "text/html",
        };
        response.writeHead(200, headers);
        response.end(data); // return the data (index.html)
      }); // as part of the response

      break;

    //
    // Handle the requests from client made using the route /api/user
    // These come via AJAX embedded in the earlier served index.html
    // There will be a single route (/api/user) but two HTTP request methods
    // POST (for Create) and GET (for Retrieve)
    //
    case "/api/user":
      // Handle a POST request;  the user is sending user data via AJAX!
      // This is the CRUD (C)reate request. These data need to be
      // extracted from the POST request and saved to the database!

      if (currentMethod === "POST") {
        // read the body of the POST request
        request.on("data", function (chunk) {
          requestBody += chunk.toString();
        });

        // determine the POST request Content-type (and log to console)
        // Either: (i)  application/x-www-form-urlencoded or (ii) application/json
        const { headers } = request;
        let ctype = headers["content-type"];
        console.log("RECEIVED Content-Type: " + ctype + "\n");

        // finished reading the body of the request
        request.on("end", function () {
          var userData = "";
          // saving the user from the body to the database
          if (ctype.match(new RegExp("^application/x-www-form-urlencoded"))) {
            userData = querystring.parse(requestBody);
          } else {
            userData = JSON.parse(requestBody);
          }
          // log the user data to console
          console.log(
            "USER DATA RECEIVED: \n\n" +
              JSON.stringify(userData, null, 2) +
              "\n"
          );
          // we have the data supplied so make the database connection and
          // the (unvalidated) data. Without validation we just hope everything
          // works out okay - for production we would need to perform validation
          var insert_user_sql = `INSERT INTO user_data (id, title, first_name,surname, mobile,email) VALUES (NULL, '${userData.title}', '${userData.firstname}','${userData.surname}',${userData.mobile},'${userData.email}')`;
          con.query(insert_user_sql, function (err, result) {
            if (err) throw err;
            console.log(
              `USER RECORD INSERTED: ['${userData.title}','${userData.firstname}','${userData.surname}','${userData.mobile}', '${userData.email}']\n`
            );
            // respond to the user with confirmation message
            var headers = {
              "Content-Type": "text/plain",
            };
            // handle the responses here after the database query completes!
            response.writeHead(200, headers);
            response.end(
              "User (" +
                userData.firstname +
                " " +
                userData.surname +
                ") data added to the Database!"
            );

            var insert_user_home_address_sql = `INSERT INTO user_home_address (id, address_line_1, address_line_2,town, county, eircode) VALUES (${result.insertId}, '${userData.address_line_1}', '${userData.address_line_2}','${userData.town}','${userData.county}','${userData.eircode}')`;
            con.query(insert_user_home_address_sql, function (err_h, result_h){
              if(err_h) throw err_h;
              console.log(
                `USER HOME ADDRESS INSERTED: ['${userData.address_line_1}','${userData.address_line_2}','${userData.town}','${userData.county}', '${userData.eircode}']\n`
              );
              // respond to the user with confirmation message
            var headers = {
              "Content-Type": "text/plain",
            };
            // handle the responses here after the database query completes!
            response.writeHead(200, headers);
            response.end(
              "User (" +
                userData.firstname +
                " " +
                userData.surname +
                ") home address added to the Database!"
            );
            });
            var insert_user_shipping_address_sql = `INSERT INTO user_shipping_address (id, address_line_1, address_line_2,town, county, eircode) VALUES (${result.insertId}, '${userData.address_line_1_s}', '${userData.address_line_2_s}','${userData.town_s}','${userData.county_s}','${userData.eircode_s}')`;
            con.query(insert_user_shipping_address_sql, function (err_s, result_s){
              if(err_s) throw err_s;
              console.log(
                `USER SHIPPING ADDRESS INSERTED: ['${userData.address_line_1_s}','${userData.address_line_2_s}','${userData.town_s}','${userData.county_s}', '${userData.eircode_s}']\n`
              );
              // respond to the user with confirmation message
            var headers = {
              "Content-Type": "text/plain",
            };
            // handle the responses here after the database query completes!
            response.writeHead(200, headers);
            response.end(
              "User (" +
                userData.firstname +
                " " +
                userData.surname +
                ") shipping address added to the Database!"
            );
            });
          });
        });
      }

      // Handle a GET request;  the user is requesting user data via AJAX!
      // This is the CRUD (R)etrieve request. These data need to be
      // extracted from the database and returned to the user as JSON!
      else if (currentMethod === "GET") {
        var headers = {
          "Content-Type": "application/json",
        };
        // make the database query using the connection created earlier
        con.query(
          "SELECT first_name, surname, mobile, email FROM user_data",
          function (err, result, fields) {
            if (err) throw err;
            //output details to the console
            console.log(
              "USER DATABASE REQUESTED: \n\n" +
                JSON.stringify(result, null, 2) +
                "\n"
            );
            // notice we include the processing in here so that is processed as part
            // of the callback - if it is outside this function then it could progress
            // before the data are returned from the database.
            response.writeHead(200, headers); // return headers for everything okay!
            response.end(JSON.stringify(result)); // return unprocessed result from SQL Query
          }
        );
      }
      break;
  }
});

// Set up the HTTP server and listen on port 8000
server.listen(port, function () {
  console.log("\nAJAX - API - Database Demo");
  console.log("CS230 Demo Program - John G. Keating\n(c) 2021\n");
  console.log("AJAX (HTTP) API server running on port: " + port + "\n");
});
