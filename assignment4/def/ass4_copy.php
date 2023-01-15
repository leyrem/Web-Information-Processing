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

// INSERTING NEW DATA

$titles = array("Mr", "Ms", "Mr");
$names = array("John", "Emma", "Mark");
$surnames = array("Doe","Smith","Jimenez");
$mobiles = array(788989, 568788, 562229);
$emails = array("Johnd@gmail.com", "emmag@hotmail.com", "markJ@gmail.com");
$addresses_line_1 = array("57 Straffan", "48 Rail Prk", "55 Monasterio");
$addresses_line_2 = array("Greenfield", "Old RailPalr", "Iranzu");
$towns = array("Maynooth", "Mullingar", "Corella");
$counties = array("Kildare", "Westmeath", "Navarra");
$eircodes = array("W23 Y2F4", "Y77 P977", "W316 R591");

echo "Inserting new data into database\n";
for($i = 0; $i < 3; $i +=1){
  $insert_user_sql = "INSERT INTO $tablename_user (id, title, first_name, surname, mobile, email) VALUES (NULL,'$titles[$i]','$names[$i]', '$surnames[$i]', $mobiles[$i],'$emails[$i]')";
  $result = $conn->query($insert_user_sql);
  if ($result === TRUE) {
    $last_id = $conn->insert_id;
    echo "User ".$names[$i]." data inserted successfully. Last inserted ID is: " . $last_id."\n";
    $insert_user_home_address_sql = "INSERT INTO $tablename_user_home_address (id, address_line_1,address_line_2,town,county,eircode) VALUES ($last_id,'$addresses_line_1[$i]','$addresses_line_2[$i]', '$towns[$i]', '$counties[$i]','$eircodes[$i]')";
    $insert_user_shipping_address_sql = "INSERT INTO $tablename_user_shipping_address (id, address_line_1,address_line_2,town,county,eircode) VALUES ($last_id,'$addresses_line_1[$i]','$addresses_line_2[$i]', '$towns[$i]', '$counties[$i]','$eircodes[$i]')";

    $result_home = $conn->query($insert_user_home_address_sql);
    if($result_home === TRUE){
      echo "User home address inserted succesfully\n";
    } else {
      echo "Error: " . $insert_user_home_address_sql . "\n" . $conn->error;
    }

    $result_shipping = $conn->query($insert_user_shipping_address_sql);
    if($result_shipping === TRUE){
      echo "User shipping address inserted succesfully\n";
    } else {
      echo "Error: " . $insert_user_shipping_address_sql . "\n" . $conn->error;
    }
  } else {
    echo "Error: " . $insert_user_sql . "\n" . $conn->error;
  }
  echo "\n";
}




// RETRIEVING Data
echo "RETRIEVING data from database\n";
echo "\n";
$first_name_u = 'John';
$surname = 'Doe';
$retrieve_user_sql = "SELECT * FROM $tablename_user WHERE first_name = '$first_name_u' and surname = '$surname'";
$result_retrieve_user = $conn->query($retrieve_user_sql);

if ($result_retrieve_user->num_rows > 0) {
  // output data of each row
  while($row = $result_retrieve_user->fetch_assoc()) {
    $id_user_retrieved = $row["id"];
    echo "User Found! id: " . $row["id"]. " - Title: ".$row["title"]." - Name: " . $row["first_name"]. " - Surname: " . $row["surname"]. " - Mobile: ".$row["mobile"]." - Email: ".$row["email"]."\n";
    
    $retrieve_user_home_address_sql = "SELECT * FROM $tablename_user_home_address WHERE id = $id_user_retrieved";
    $result_retrieve_user_home_address = $conn->query($retrieve_user_home_address_sql);
    if($result_retrieve_user_home_address->num_rows > 0){
      while($row_h = $result_retrieve_user_home_address->fetch_assoc()){
        echo "Home address: - Address Line 1: ".$row_h["address_line_1"]." - Address line 2: " . $row_h["address_line_2"]. " - Town: " . $row_h["town"]. " - County: ".$row_h["county"]." - Eircode: ".$row_h["eircode"]."\n";
      }
    } else {
      echo "No results for home address for name supplied: ".$first_name_u."\n";
    }
    
    $retrieve_user_shipping_address_sql = "SELECT * FROM $tablename_user_shipping_address WHERE id = $id_user_retrieved";
    $result_retrieve_user_shipping_address = $conn->query($retrieve_user_shipping_address_sql);
    if($result_retrieve_user_shipping_address->num_rows > 0){
      while($row_s = $result_retrieve_user_shipping_address->fetch_assoc()){
        echo "Shipping address: - Address Line 1: ".$row_s["address_line_1"]." - Address line 2: " . $row_s["address_line_2"]. " - Town: " . $row_s["town"]. " - County: ".$row_s["county"]." - Eircode: ".$row_s["eircode"]."\n";
      }
    } else {
      echo "No results for shipping address for name supplied: ".$first_name_u."\n";
    }
    echo "\n";

  }
} else {
  echo "No results for name supplied: ".$first_name_u."\n";
}

// UPDATING Data
/*echo "UPDATING data from database\n";
$new_title = 'Mx';
$new_mobile = 88888;
$new_email = 'JohnNewEmail@gmail.com';
$new_address_line_1 = '23 Rail Park';
$update_user_sql = "UPDATE $tablename_user SET title = '$new_title', mobile = $new_mobile, email = '$new_email' WHERE first_name = '$first_name_u' and surname = '$surname'";
$update_address_sql = "UPDATE $tablename_user_home_address SET address_line_1 = '$new_address_line_1' WHERE id = $id_user_retrieved";

$result_update_user = $conn->query($update_user_sql);
$result_update_address = $conn->query($update_address_sql);

if ($result_update_user === TRUE) {
  echo "Data of user: ".$first_name_u." ".$surname." updated successfully \n";
} else {
  echo "Error updating record: " . $conn->error;
}

if ($result_update_address === TRUE) {
  echo "Address of user ".$first_name_u." ".$surname." updated successfully \n";
} else {
  echo "Error updating address record: " . $conn->error;
}
echo "\n";*/

//DELETING data
echo "DELETING data from database\n";
$del_first_name = $names[1];
$del_surname = $surnames[1];
$delete_email = $emails[1];
$delete_mobile = $mobiles[1];
$delete_user_sql = "DELETE FROM $tablename_user WHERE first_name = '$del_first_name' and surname = '$del_surname' and email = '$delete_email' and mobile = $delete_mobile";
$result_delete_user = $conn->query($delete_user_sql);
if ($result_delete_user === TRUE) {
  echo "User data for ".$del_first_name." ".$del_surname." deleted successfully \n";
} else {
  echo "Error deleting record: \n" . $conn->error;
}

$conn->close();
?>
