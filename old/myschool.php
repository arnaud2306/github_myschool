<html>
	<head>
		<title>
			MySchool XML
		</title>
	</head>
	<body>
		<?php
			class MySchool
			{
				public $m_items;
				public $m_nb_items;

				public function __construct($filename)
				{
					$this->m_items = array();
					$this->m_nb_items = 0;

					$this->parser = new XMLReader;

					// open
					if($this->parser->open($filename))
					{
						while($this->parser->read())
						{
							if($this->parser->nodeType == XMLReader::ELEMENT)
							{
								// champ item
								if($this->parser->localName == 'item')
								{
									// move to textnode
									$this->parser->read();

									$this->m_buglist[$this->m_nb_items] = $this->parser->value;
									$this->m_nb_items++;
								}
							}
						}

						// close
						$this->parser->close();
					}
					else
					{
						echo "open KO<br>";
					}
				}

				public function ShowHeader()
				{
					echo '<table border="1">';
					echo '<tr>';
					echo '<td align=center bgcolor=grey>';
					echo '<strong>';
					echo "Item";
					echo '</strong>';
					echo '</td>';
					echo '</tr>';
				}

				public function ShowItems()
				{
					for($indice = 0; $indice < $this->m_nb_items; $indice++)
					{
					   // item
					   echo '<tr>';
					   echo '<td>';
					   echo "{$this->m_buglist[$indice]}";
					   echo '</td>';
					   echo '</tr>';
    				}
					echo '</table>';
			   }
			}

			$buglist = new MySchool("myschool.xml");
			
			$buglist->ShowHeader();
			$buglist->ShowItems();
			echo '<br>';
		?>
	</body>
</html>
