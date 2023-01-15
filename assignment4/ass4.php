<?php
// Database details
$servername = "localhost"; $username = "nodeuser"; $password = "nodeuser"; 
$dbname = "USER"; $tablename = "user_data";

if (isset($_POST['string'])) {
   // Create connection
   $conn = new mysqli($servername, $username, $password, $dbname);
   // Check connection
   if ($conn->connect_error) {
     die ("Database ".$dbname.": connection failed: " . $conn->connect_error);
   } 

   // $s = mysql_real_escape_string($_POST['string']);
   $s = $_POST['string'];
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
}

?>