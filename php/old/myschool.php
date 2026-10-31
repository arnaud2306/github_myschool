<html>
	<head>
		<title>MySchool</title>
	</head>
	<body>
		<style>
			tab { padding-left: 2em; }
		</style>
		<link rel="stylesheet" href="../css/myschool.css">
		<link rel="stylesheet" href="../css/myschool_tree.css">
      <?php
			include 'myschool_debug.php';

			$xml = simplexml_load_file("../myschool.xml");
			$filename = "myschool.txt";

			$depth = 0;

			// processItem
			function processItem(SimpleXMLElement $node,$depth_param)
			{
				$filename = "myschool.txt";

				// element
				$element = $node->getName();
				if($element == "name")
				{
					echo "<li>";		debug_to_file($filename,"<li>");
					echo "{$node}";	debug_to_file($filename,"{$node}");
					echo "</li>";		debug_to_file($filename,"</li>");
				}

				if($element == "url")
				{
					echo "<li>";		debug_to_file($filename,"<li>");
					echo "{$node}";	debug_to_file($filename,"{$node}");
					echo "</li>";		debug_to_file($filename,"</li>");
				}

				if($element == "item")
				{
					$depth_param++;

					echo "<li><span class='box'>";	debug_to_file($filename,"<li><span class=box>");
					echo "ITEM";							debug_to_file($filename,"ITEM");
					echo "</span>";						debug_to_file($filename,"</span>");
					echo "<ul class='nested'>";		debug_to_file($filename,"<ul class=nested>");
				}

				$childNodes = $node->children();
				if(count($childNodes) == 0)
				{
					$depth = 0;
					
					echo "</li>";		debug_to_file($filename,"</li>");
					echo "</ul>";		debug_to_file($filename,"</ul>");
				}
				else
				{
					foreach($childNodes as $newNode)
					{
						processItem($newNode,$depth_param);
					}
				}
			}

			if($xml)
			{
				erase_file($filename);

				echo '<div class="bg-container">';
				echo "<ul id='MySchool'>";			debug_to_file($filename,"<ul id=MySchool>");
				processItem($xml,$depth);
				echo "</ul>";							debug_to_file($filename,"</ul>");
				echo '</div>';
			}
			else
			{
				echo "simplexml_load_file KO";
			}
      ?>
	</body>
</html>
