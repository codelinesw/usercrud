<?php namespace Config;


class Request{

	private $controller;
	private $method;
	private $parameter;

	public function __construct()
	{
		if(isset($_GET['url']))
		{	
			$rute = filter_input(INPUT_GET, 'url', FILTER_SANITIZE_URL);
			$rute = explode("/",$rute);
			$rute = array_filter($rute);
			
			if(empty($rute[0]))
			{
				$this->controller = "index";
			}else
			{
				$this->controller = strtolower(array_shift($rute));
			}

			$this->method = strtolower(array_shift($rute));
	
		    if(!isset($this->method)){
		       $this->method = "index";
		    }
	      	$this->parameter = implode("",$rute);
			
		}
	}

	public function getController()
	{
		return $this->controller;
	}

	public function getMethod()
	{
		return $this->method;
	}

	public function getParameter()
	{
		return $this->parameter;
	}

}





 ?>