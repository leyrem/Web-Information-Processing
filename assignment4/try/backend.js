// THIS IS THE BACKEND APPLICATION.
// This file can be run on the terminal as a standlone backend application.
// Run it as: node backend.js
// It executes the different queries and connects to the database.

// Code is referenced from John Keating's demos.

var http = require("http"); // creating an API using http
var url = require("url"); // using url to extract the route (e.g. /, /api/user)
var querystring = require("querystring"); // this will contain the body of the POST request
var fs = require("fs"); // file handling to read the index.html served for / route
var port = 8000; // port the server with listen on



// Managing a relational (mysql) database connection

var mysql = require("mysql");
var con = mysql.createConnection({
  host: "webcourse.cs.nuim.ie",
  user: "u220037",
  password: "ooxahmieSh6quoQu",
  database: "cs230_u220037",
});

// Make the connection.
// Initially the database tables are already created and contain some data. See file assignment04.sql.
con.connect(function (err) {
  if (err) throw err;
  console.log("Database: Connected!");
  // CREATING/INSERTING DATA 
  // Here I create hand-crafted data to insert in the database.
  const person1 = {title:"Mr",firstname:"John", surname:"Doe", mobile:50897672, email:"john@gmail.com", address_line_1:"55 Amstromg", address_line_2:"Avenue", town:"Maynooth", county:"Kildare", eircode:"W23 Y2F4"};
  const person2 = {title:"Ms", firstname:"Erica", surname:"Smith", mobile:89667272, email:"erica@gmail.com", address_line_1:"35 Laurence", address_line_2:"Greenfield", town:"Lucan", county:"Kildare", eircode:"H76 Y822"};
  const person3 = {title:"Ms",firstname:"Carol", surname:"Lopez", mobile:6572822, email:"@gmail.com", address_line_1:"34 Paul", address_line_2:"Court", town:"Mullingar", county:"WestMeath", eircode:"7823 G2F4"};
  const people = [person1, person2, person3];

for(let i = 0; i < people.length; i++){
  var insert_user_sql = `INSERT INTO user_data (id, title, first_name,surname, mobile,email) VALUES (NULL, '${people[i].title}', '${people[i].firstname}','${people[i].surname}',${people[i].mobile},'${people[i].email}')`;
  con.query(insert_user_sql, function (err, result) {
    if (err) {
      throw err;
    } else {
      console.log(
        `USER PERSONAL DATA INSERTED: ['${people[i].title}','${people[i].firstname}','${people[i].surname}','${people[i].mobile}', '${people[i].email}']\n`
      );
      // Here I insert home address data.
      var insert_user_home_address_sql = `INSERT INTO user_home_address (id, address_line_1, address_line_2,town, county, eircode) VALUES (${result.insertId}, '${people[i].address_line_1}', '${people[i].address_line_2}','${people[i].town}','${people[i].county}','${people[i].eircode}')`;
      con.query(insert_user_home_address_sql, function (err_h, result_h){
        if(err_h) throw err_h;
        console.log(
          `USER HOME ADDRESS INSERTED: ['${people[i].address_line_1}','${people[i].address_line_2}','${people[i].town}','${people[i].county}', '${people[i].eircode}']\n`
        );
      });
      // Here I insert shipping address data, in this case the same as the home address data.
      var insert_user_shipping_address_sql = `INSERT INTO user_shipping_address (id, address_line_1, address_line_2,town, county, eircode) VALUES (${result.insertId}, '${people[i].address_line_1}', '${people[i].address_line_2}','${people[i].town}','${people[i].county}','${people[i].eircode}')`;
      con.query(insert_user_shipping_address_sql, function (err_s, result_s){
        if(err_s) throw err_s;
        console.log(
          `USER SHIPPING ADDRESS INSERTED: ['${people[i].address_line_1}','${people[i].address_line_2}','${people[i].town}','${people[i].county}', '${people[i].eircode}']\n`
        );
      });
    }
  });
  console.log("\n");
}

// RETRIEVING DATA 
const person_to_retrieve = {firstname: "Peter", surname:"Parker"};
var retrive_user_sql = `SELECT * FROM user_data WHERE first_name = '${person_to_retrieve.firstname}' and surname ='${person_to_retrieve.surname}'`;
con.query(retrive_user_sql, function(err, result){
  if (err) throw err;
  if(result.length > 0){
    for(let i = 0; i < result.length; i++){
      console.log(
        `USER data Retrieved: ['${result[i].title}','${result[i].first_name}','${result[i].surname}','${result[i].mobile}', '${result[i].email}']\n`
      );
    }
  }
});

// UPDATING DATA 
const person_to_update = {firstname: "Amy", surname:"White"};
var new_title = "Mx";
var new_email = "AmyNew@gmail.com";
var new_mobile = 78622290;
var new_address_line_1 = "67 Croosroad";
var update_user_sql = `UPDATE user_data SET title = '${new_title}', mobile = '${new_mobile}', email = '${new_email}' WHERE first_name = '${person_to_update.firstname}' and surname ='${person_to_update.surname}'`;

con.query(update_user_sql, function (err, result){
  if(err) throw err;
  var id = result.insertId;
  console.log(result.affectedRows + " record(s) updated for user data");

  // Here I update the address data as well. I set the same data for both the home and shipping address.
  var update_user_home_address_sql = `UPDATE user_home_address SET address_line_1 = '${new_address_line_1}' WHERE id = ${id}`;
  var update_user_shipping_address_sql = `UPDATE user_shipping_address SET address_line_1 = '${new_address_line_1}' WHERE id = ${id}`;

  con.query(update_user_home_address_sql, function (err, result){
    if(err) throw err;
    console.log(result.affectedRows + " record(s) updated for user home address");
  });
  con.query(update_user_shipping_address_sql, function (err, result){
    if(err) throw err;
    console.log(result.affectedRows + " record(s) updated for user shipping address");
  });
});


// DELETING DATA
const person_to_delete = {firstname: "Laura", surname:"Jimenez", email:"laura.jimenez@gmail.com", mobile: 78897468};
var delete_user_sql = `DELETE FROM user_data WHERE first_name = '${person_to_delete.firstname}' and surname ='${person_to_delete.surname}' and email ='${person_to_delete.email}' and mobile = ${person_to_delete.mobile} `;
con.query(delete_user_sql, function (err, result) {
  if (err) throw err;
  console.log("Number of records deleted: " + result.affectedRows);
});
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
