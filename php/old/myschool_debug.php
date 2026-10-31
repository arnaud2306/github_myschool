<?php
	// debug_to_console
	function debug_to_console($data)
	{
		$output = $data;
		if(is_array($output))
			$output = implode(',', $output);

		echo "<script>console.log('$output');</script>";
	}

	// debug_to_file
	function debug_to_file($filename,$data)
	{
		$data = $data . "\n";
		$retour = file_put_contents($filename,$data,FILE_APPEND);
		if($retour = false)
			debug_to_console("file_put_contents KO");
		else
			debug_to_console("file_put_contents OK");
	}

	// erase_file
	function erase_file($filename)
	{
		file_put_contents($filename,"");
	}
?>
