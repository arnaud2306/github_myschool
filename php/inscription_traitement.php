<?php

    class MyDB extends SQLite3
    {
        function __construct()
        {
            $this->open('../sqlite/MySchool',SQLITE3_OPEN_READWRITE);
        }
    }

    echo "inscription_traitement.php step 1";
    echo "<br>";

    $db = new MyDB();

    // Si les variables existent et qu'elles ne sont pas vides
    if(!empty($_POST['pseudo']) && !empty($_POST['email']) && !empty($_POST['password']) && !empty($_POST['password_retype']))
    {
        $pseudo = htmlspecialchars($_POST['pseudo']);
        $email = htmlspecialchars($_POST['email']);
        $password = htmlspecialchars($_POST['password']);
        $password_retype = htmlspecialchars($_POST['password_retype']);

        echo "inscription_traitement.php step 2";
        echo "<br>";

        $stmt = $db->prepare("select pseudo,email,password from Users where pseudo=(:pseudo);");
        $stmt->bindParam(':pseudo',$pseudo,SQLITE3_TEXT);
        $result = $stmt->execute();
        if($result == FALSE)
        {
           echo "Execution select KO";
           echo "<br>";
        }
        else
        {
           echo "Execution select OK";
           echo "<br>";

           $rows = 0;
           while($result->fetchArray())
           {
              echo "fetch";
              echo "<br>";
              $rows++;
           }

           // si la requete renvoie un 0 alors l'utilisateur n'existe pas
           if($rows == 0)
           {
              echo "inscription_traitement.php step 3";
              echo "<br>";

              // on verifie que la longueur du pseudo <= 100
              if(strlen($pseudo) <= 100)
              {
                 // on verifie que la longueur du mail <= 100
                 if(strlen($email) <= 100)
                 {
                     // si l'email est de la bonne forme
                     if(filter_var($email, FILTER_VALIDATE_EMAIL))
                     {
                        // si les deux mdp saisis sont bons
                         if($password === $password_retype)
                         {
                            // on hash le mot de passe avec Bcrypt, via un coût de 12
                            $cost = ['cost' => 12];
                            $password = password_hash($password, PASSWORD_BCRYPT, $cost);

                            // on stocke l'adresse IP
                            $ip = $_SERVER['REMOTE_ADDR']; 

                            // on insère dans la base de données
                            $stmt = $db->prepare('insert into Users(pseudo, email, password) values((:pseudo), (:email), (:password))');
                            $stmt->bindParam(':pseudo',$pseudo,SQLITE3_TEXT);
                            $stmt->bindParam(':email',$email,SQLITE3_TEXT);
                            $stmt->bindParam(':password',$password,SQLITE3_TEXT);
                            $result = $stmt->execute();
                            if($result == FALSE)
                            {
                               echo "Execution insert KO";
                               echo "<br>";
                            }
                            else
                            {
                               echo "Execution insert OK";
                               echo "<br>";
                            
                               // on redirige vers index.php
                               header('Location: ../index.php');
                               die();
                            }
                        }
                        // else password retype
                        else
                        {
                            header('Location: inscription.php?reg_err=password');
                            die();
                        }
                    }
                    // else check email
                    else
                    {
                        header('Location: inscription.php?reg_err=email');
                        die();
                    }
                 }
                 // else check email size
                 else
                 {
                    header('Location: inscription.php?reg_err=email_length');
                    die();
                 }
              }
              // else check pseudo size
              else
              {
                  header('Location: inscription.php?reg_err=pseudo_length');
                  die();
              }
           } // fin rows = 0
           else
           {
              header('Location: inscription.php?reg_err=already');
              die();
           }
        } // fin requete OK
    }
/*
        // On vérifie si l'utilisateur existe
        $check = $bdd->prepare('SELECT pseudo, email, password FROM utilisateurs WHERE email = ?');
        $check->execute(array($email));
        $data = $check->fetch();
        $row = $check->rowCount();

        $email = strtolower($email); // on transforme toute les lettres majuscule en minuscule pour éviter que Foo@gmail.com et foo@gmail.com soient deux compte différents ..
        
        // Si la requete renvoie un 0 alors l'utilisateur n'existe pas 
        if($row == 0)
        { 
            if(strlen($pseudo) <= 100){ // On verifie que la longueur du pseudo <= 100
                if(strlen($email) <= 100){ // On verifie que la longueur du mail <= 100
                    if(filter_var($email, FILTER_VALIDATE_EMAIL)){ // Si l'email est de la bonne forme
                        if($password === $password_retype){ // si les deux mdp saisis sont bon

                            // On hash le mot de passe avec Bcrypt, via un coût de 12
                            $cost = ['cost' => 12];
                            $password = password_hash($password, PASSWORD_BCRYPT, $cost);
                            
                            // On stock l'adresse IP
                            $ip = $_SERVER['REMOTE_ADDR']; 

                            // On insère dans la base de données
                            $insert = $bdd->prepare('INSERT INTO utilisateurs(pseudo, email, password, ip, token) VALUES(:pseudo, :email, :password, :ip, :token)');
                            $insert->execute(array(
                                'pseudo' => $pseudo,
                                'email' => $email,
                                'password' => $password,
                                'ip' => $ip,
                                'token' => bin2hex(openssl_random_pseudo_bytes(64))
                            ));
                            // On redirige avec le message de succès
                            header('Location:inscription.php?reg_err=success');
                            die();
                        }else{ header('Location: inscription.php?reg_err=password'); die();}
                    }else{ header('Location: inscription.php?reg_err=email'); die();}
                }else{ header('Location: inscription.php?reg_err=email_length'); die();}
            }else{ header('Location: inscription.php?reg_err=pseudo_length'); die();}
        }
        else
        {
            header('Location: inscription.php?reg_err=already');
            die();
        }
*/
?>
