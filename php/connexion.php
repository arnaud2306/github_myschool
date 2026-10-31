<?php 
    $file_database = "../sqlite/MySchool";
    $file_name = "../debug/myschool_connexion.debug";
    $myfile = fopen($file_name,"w");


    // si il existe les champs pseudo, password et qu'il sont pas vides
    if(!empty($_POST['pseudo']) && !empty($_POST['password']))
    {
        $pseudo = htmlspecialchars($_POST['pseudo']); 
        $password = htmlspecialchars($_POST['password']);
        
        // pseudo transformé en minuscules
        $pseudo = strtolower($pseudo);
     
        // on regarde si l'utilisateur est inscrit dans la table utilisateurs
        $db = new SQLite3($file_database);

        $stmt = $db->prepare("select * from Users where pseudo=(:pseudo);");
        $stmt->bindParam(':pseudo',$pseudo,SQLITE3_TEXT);
        $result = $stmt->execute();
        if($result == FALSE)
        {
           fwrite($myfile,"Execution KO\n");
           fclose($myfile);
        }
        else
        {
           fwrite($myfile,"Execution OK\n");

           $infos_user = array();

           $rows = 0;
           while($res = $result->fetchArray())
           {
              $infos_user[$rows]['userid'] = $res['userid'];
              $infos_user[$rows]['pseudo'] = $res['pseudo'];
              $infos_user[$rows]['email'] = $res['email'];
              $infos_user[$rows]['password'] = $res['password'];
              $rows++;
           }

           if($rows > 0)
           {
              $db_pseudo =  $infos_user[0]['pseudo'];
              $db_userid =  $infos_user[0]['userid'];
              $db_password = $infos_user[0]['password'];

              // SESSION
              session_start();

              $_SESSION['user'] = $db_pseudo;
              $_SESSION['userid'] = $db_userid;

              fwrite($myfile,"pseudo : $db_pseudo\n");
              fwrite($myfile,"userid : $db_userid\n");

              $db_password_hash = password_hash($db_password,PASSWORD_DEFAULT);

              fwrite($myfile,"rows : $rows\n");

              if(password_verify($password,$db_password_hash))
              {
                 fwrite($myfile,"password OK\n");

                 // location
//               $location = "Location: myschool.php?user=$db_pseudo&userid=$db_userid";
                 $location = "Location: myschool.php";
                 header($location);
              }
              else
              {
                 fwrite($myfile,"password KO\n");

                 // location
                 header('Location: ../index.php?login_err=password');
              }
           }
           else
           {
              fwrite($myfile,"rows = 0\n");

              // location
              header('Location: ../index.php?login_err=already');
           }

           fclose($myfile);
        }
    }

    // si le formulaire est envoyé sans aucune données
    else
    {
	    // location
       header('Location: ../index.php');
    }
?> 
