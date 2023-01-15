<?php
// Database details
$servername = "webcourse.cs.nuim.ie"; 
$username = "u220037"; 
$password = "ooxahmieSh6quoQu";
$dbname = "cs230_u220037";
$tablename_user = "user_data";
$tablename_user_home_address = "user_home_address";
$tablename_user_shipping_address = "user_shipping_address";


// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die ("Database ".$dbname.": connection failed: " . $conn->connect_error);
} else {
  echo "Connected to database succesfully!\n";
}


echo "<div class=\"noResults\"> Initiating app !</div>";

$title = $_POST['title'];
$firstname = $_POST['firstname'];
$surname = $_POST['surname'];
$mobile = $_POST['mobile'];
$email = $_POST['email'];
$address_line_1 = $_POST['address_line_1'];
$address_line_2 = $_POST['address_line_2'];
$town = $_POST['town'];
$county = $_POST['county'];
$eircode = $_POST['eircode'];
$address_line_1_s = $_POST['address_line_1_s'];
$address_line_2_s = $_POST['address_line_2_s'];
$town_s = $_POST['town_s'];
$county_s = $_POST['county_s'];
$eircode_s = $_POST['eircode_s'];

$insert_user_sql = "INSERT INTO $tablename_user (id, title, first_name, surname, mobile, email) VALUES (NULL,'$title','$firstname', '$surname', $mobile,'$email')";
$result = $conn->query($insert_user_sql);
if($result === TRUE){
  $last_id = $conn->insert_id;
  echo "<div class=\"noResults\"> User data inserted successfully. Last inserted ID is: ".$last_id." !</div>";
  //echo "User data inserted successfully. Last inserted ID is: " . $last_id;

  $insert_user_home_address_sql = "INSERT INTO $tablename_user_home_address (id, address_line_1,address_line_2,town,county,eircode) VALUES ($last_id,'$address_line_1','$address_line_2', '$town', '$county','$eircode')";
  $insert_user_shipping_address_sql = "INSERT INTO $tablename_user_shipping_address (id, address_line_1,address_line_2,town,county,eircode) VALUES ($last_id,'$address_line_1_s','$address_line_2_s', '$town_s', '$county_s','$eircode_s')";

  $result_home = $conn->query($insert_user_home_address_sql);
  if($result_home === TRUE){
    echo "User home address inserted succesfully";
  } else {
    echo "Error: " . $insert_user_home_address_sql . "<br>" . $conn->error;
  }

  $result_shipping = $conn->query($insert_user_shipping_address_sql);
  if($result_shipping === TRUE){
    echo "User shipping address inserted succesfully";
  } else {
    echo "Error: " . $insert_user_shipping_address_sql . "<br>" . $conn->error;
  }
} else {
  echo "Error: " . $insert_user_sql . "<br>" . $conn->error;
}

/*if (isset($_POST['firstname'])) {
   
 
   $firstname = $_POST['firstname'];
   $insert_user_sql = "INSERT INTO $tablename_user (id, title, first_name, surname, mobile, email) VALUES (NULL,'Mr','John', 'Doe', 78544389,'john@example.com')";

   $sql = "SELECT * from $tablename WHERE title LIKE '%$s%' ORDER BY ID limit 5";
   $result = $conn->query($sql);
   if ($result->num_rows > 0) {
      while ($row = $result->fetch_assoc()) {
        $a = $row['title']; $i = $row['id'];
        echo "  <div class=\"divTitles\">";
        echo "    <img src=\"imgs/$i.jpg\" height=\"40\" width=\"40\" style=\"border-radius:5px;float:left;\">";
        echo "    <div class=\"titleName\" onclick=\"selectMe('$a');\">$a</div><br>";
        echo "  </div>";
      }
   } else {
     echo "<div class=\"noResults\">No Result Found !</div>";
   }
}*/

?>
