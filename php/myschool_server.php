<html>
   <head>
      <title>MySchool server</title>
   </head>
   <body>
      <?php
         $file_database = "../sqlite/MySchool";
         $file_name = "../debug/myschool_server.debug";
         $myfile = fopen($file_name,"w");

         // SESSION
         session_start();

         $user =  $_SESSION['user'];
			$userid = $_SESSION['userid'];

         fwrite($myfile,"user : $user\n");
         fwrite($myfile,"userid : $userid\n");

         // takes raw data from the request
         $json = file_get_contents('php://input');
         fwrite($myfile,"$json\n");

         // converts it into a PHP object
         $data = json_decode($json);

         switch($data->action)
         {
            // ***************************
            // action : add_directory_root
            // champ1 : item
            // ***************************
            case 'add_directory_root':
               $db = new SQLite3($file_database);

               $request = "insert into Items (parentid,item,userid) values (null,'$data->champ1',$userid);";
               $result = $db->query($request);
               if($result == false)
               {
                  fwrite($myfile,"$request\n");
                  fwrite($myfile,"request add_directory_root KO\n");
               }
               else
               {
                  fwrite($myfile,"$request\n");
               }

               $db->close();

               // location
               header("Cache-Control: no-cache");
               $location = "Location: myschool.php?user=$user&userid=$userid";
               header($location);
               break;

            // **********************
            // action : add_directory
            // champ1 : parentid
            // champ2 : item
            // **********************
            case 'add_directory':
               $db = new SQLite3($file_database);

               $request = "insert into Items (parentid,item,userid) values ($data->champ1,'$data->champ2',$userid);";
               $result = $db->query($request);
               if($result == false)
               {
                  fwrite($myfile,"$request\n");
                  fwrite($myfile,"request add_directory KO\n");
               }
               else
               {
                  fwrite($myfile,"$request\n");
               }

               $db->close();

               // location
               header("Cache-Control: no-cache");
               $location = "Location: myschool.php?user=$user&userid=$userid";
               header($location);
               break;

            // *************************
            // action : delete_directory
            // champ1 : itemid
            // *************************
            case 'delete_directory':
               $db = new SQLite3($file_database);

               $request = "delete from Items where itemid = $data->champ1;";
               $result = $db->query($request);
               if($result == false)
               {
                  fwrite($myfile,"$request\n");
                  fwrite($myfile,"request delete_directory KO\n");
               }
               else
               {
                  fwrite($myfile,"$request\n");
               }

               $db->close();

               // location
               header("Cache-Control: no-cache");
               $location = "Location: myschool.php?user=$user&userid=$userid";
               header($location);
               break;

            // *************************
            // action : rename_directory
            // champ1 : itemid
            // champ2 : item
            // *************************
            case 'rename_directory':
               $db = new SQLite3($file_database);

               $request = "update Items set item = '$data->champ2' where itemid = $data->champ1;";
               $result = $db->query($request);
               if($result == false)
               {
                  fwrite($myfile,"$request\n");
                  fwrite($myfile,"request rename_directory KO\n");
               }
               else
               {
                  fwrite($myfile,"$request\n");
               }

               $db->close();

               // location
               header("Cache-Control: no-cache");
               $location = "Location: myschool.php?user=$user&userid=$userid";
               header($location);
               break;

            // ***************************
            // action : add_link_directory
            // champ1 : itemid
            // champ2 : link
            // champ3 : url
            // ***************************
            case 'add_link_directory':
               $db = new SQLite3($file_database);

               $request = "insert into Links (link,url,itemid) values ('$data->champ2','$data->champ3',$data->champ1);";
               $result = $db->query($request);
               if($result == false)
               {
                  fwrite($myfile,"$request\n");
                  fwrite($myfile,"request add_link_directory KO\n");
               }
               else
               {
                  fwrite($myfile,"$request\n");
               }

               $db->close();

               // location
               header("Cache-Control: no-cache");
               $location = "Location: myschool.php?user=$user&userid=$userid";
               header($location);
               break;

            // *****************
            // action : add_link
            // champ1 : itemid
            // champ2 : link
            // champ3 : url
            // *****************
            case 'add_link':
               $db = new SQLite3($file_database);

               $request = "insert into Links (link,url,itemid) values ('$data->champ2','$data->champ3',$data->champ1);";
               $result = $db->query($request);
               if($result == false)
               {
                  fwrite($myfile,"$request\n");
                  fwrite($myfile,"request add_link KO\n");
               }
               else
               {
                  fwrite($myfile,"$request\n");
               }

               $db->close();

               // location
               header("Cache-Control: no-cache");
               $location = "Location: myschool.php?user=$user&userid=$userid";
               header($location);
               break;

            // ********************
            // action : delete_link
            // champ1 : linkid
            // ********************
            case 'delete_link':
               $db = new SQLite3($file_database);

               $request = "delete from Links where linkid = $data->champ1;";
               $result = $db->query($request);
               if($result == false)
               {
                  fwrite($myfile,"$request\n");
                  fwrite($myfile,"request delete_link KO\n");
               }
               else
               {
                  fwrite($myfile,"$request\n");
               }

               $db->close();

               // location
               header("Cache-Control: no-cache");
               $location = "Location: myschool.php?user=$user&userid=$userid";
               header($location);
               break;

            // ********************
            // action : rename_link
            // champ1 : linkid
            // champ2 : link
            // ********************
            case 'rename_link':
               $db = new SQLite3($file_database);

               $request = "update Links set link = '$data->champ2' where linkid = $data->champ1;";
               $result = $db->query($request);
               if($result == false)
               {
                  fwrite($myfile,"$request\n");
                  fwrite($myfile,"request rename_link KO\n");
               }
               else
               {
                  fwrite($myfile,"$request\n");
               }

               $db->close();

               // location
               header("Cache-Control: no-cache");
               $location = "Location: myschool.php?user=$user&userid=$userid";
               header($location);
               break;
         }

         fclose($myfile);
      ?>
   </body>
</html>
