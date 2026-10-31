<!doctype html>

<html>
	<head>
		<title>MySchool</title>
	</head>
	<body>
      <?php
         // database
         $filename_sqlite = '../sqlite/MySchool';

         // server files
         $filename_xsl = 'myschool.xsl';

         // debug
         $filename_debug = '../debug/myschool.debug';

         // session_start
         session_start();

         // SESSION
			$user = $_SESSION['user'];
			$userid = $_SESSION['userid'];

         $debug_file = fopen($filename_debug,"w");
         fwrite($debug_file,"user : $user\n");
         fwrite($debug_file,"userid : $userid\n");
         fclose($debug_file);

/*
         if(isset($_GET['user']))
         {
            $user = htmlspecialchars($_GET['user']);

            $debug_file = fopen($filename_debug,"a");
            fwrite($debug_file,"user : $user\n");
            fclose($debug_file);
         }
         else
         {
            header('Location: ../index.php');
         }

         if(isset($_GET['userid']))
         {
            $userid = htmlspecialchars($_GET['userid']);

            $debug_file = fopen($filename_debug,"a");
            fwrite($debug_file,"userid : $userid\n");
            fclose($debug_file);
         }
         else
         {
            header('Location: ../index.php');
         }
*/
         // génération fichier XML
         $filename_xml = '../tmp/myschool.' . $user . '.xml';
         $filename_html = '../tmp/myschool.' . $user . '.html';

         $myfile = fopen($filename_xml,"w");
         fwrite($myfile,'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>');
         fwrite($myfile,"\n");
         fwrite($myfile,'<?xml-stylesheet type="text/css" href="myschool_tree.css"?>');
         fwrite($myfile,"\n");
         fwrite($myfile,'<?xml-stylesheet type="text/css" href="myschool.css"?>');
         fwrite($myfile,"\n");
/*
         fwrite($myfile,'<?xml-stylesheet type="text/xsl" href="myschool.xsl"?>');
         fwrite($myfile,"\n");
*/
         fwrite($myfile,"\n");
         fwrite($myfile,'<document>');
         fwrite($myfile,"\n");
         fclose($myfile);

         $db = new SQLite3($filename_sqlite);
       
         // ExtractAllItems 
         ExtractAllItems($userid,$filename_xml,$db);
 
         $myfile = fopen($filename_xml,"a");
         fwrite($myfile,'</document>');
         fwrite($myfile,"\n");
         fclose($myfile);

         // conversion fichier HTML
         $output = null;
         $retval = null;

         $command = 'xsltproc ../myschool.xsl ' . $filename_xml . ' > ' . $filename_html;
         $result = exec($command,$output,$retval);
         if($retval == true)
         {
            $debug_file = fopen($filename_debug,"a");
            fwrite($debug_file,"xsltproc OK\n");
            fclose($debug_file);
         }
/*
         else
         {
            $debug_file = fopen($filename_debug,"a");
            fwrite($debug_file,"$command\n");
            fwrite($debug_file,"xsltproc KO\n");
            fwrite($debug_file,print_r($output,true));
            fwrite($debug_file,"\n");
            fclose($debug_file);
         }
*/

         // location
         $location = 'Location: /php/' . $filename_html . '?userid=' . $userid;
         header($location);

// *********
// FONCTIONS
// *********

         // ExtractAllItems
         function ExtractAllItems($userid_P,$file_P,$db_P)
         {
            $request = "select distinct itemid,item from Items where parentid is null and userid = $userid_P order by item;";

            $result = $db_P->query($request);
            if($result == FALSE)
            {
               echo "Execution KO<br>";
            }
            else
            {
               while($row = $result->fetchArray(SQLITE3_ASSOC))
               {
                  $itemid = $row['itemid'];
                  $item = $row['item'];

                  // ExtractItem
                  ExtractItem($itemid,$item,$file_P,$db_P);
               }
            }
         }
 
         // ExtractItem
         function ExtractItem($itemid_P,$item_P,$file_P,$db_P)
         {
            $myfile = fopen($file_P,"a");
            fwrite($myfile,"\t<item itemid=\"$itemid_P\">$item_P\n");
            fclose($myfile);

            // ExtractLinks
            ExtractLinks($itemid_P,$file_P,$db_P);

            $request = "select itemid,item from Items where parentid = $itemid_P order by item;";

            $result = $db_P->query($request);
            if($result == FALSE)
            {
               echo "Execution KO<br>";
            }
            else
            {
               while($row = $result->fetchArray(SQLITE3_ASSOC))
               {
                  $itemid = $row['itemid'];
                  $item = $row['item'];

                  // ExtractItem
                  ExtractItem($itemid,$item,$file_P,$db_P);
               }

               $myfile = fopen($file_P,"a");
               fwrite($myfile,"\t</item>\n");
               fclose($myfile);
            }
         }

         // ExtractLinks
         function ExtractLinks($itemid_P,$file_P,$db_P)
         {
            $request = "select * from Links where itemid = $itemid_P order by link;";

            $result = $db_P->query($request);
            if($result == FALSE)
            {
               echo "Execution KO<br>";
            }
            else
            {
               $myfile = fopen($file_P,"a");

               while($row = $result->fetchArray(SQLITE3_ASSOC))
               {
                  $linkid = $row['linkid'];
                  $link = $row['link'];
                  $url = $row['url'];
                  $itemid = $row['itemid'];

                  fwrite($myfile,"\t<name linkid=\"$linkid\" itemid=\"$itemid\">$link</name>\n");
                  fwrite($myfile,"\t<url>$url</url>\n");
               }

               fclose($myfile);
            }
         }
      ?>
	</body>
</html>
