<?php namespace Models;

class Connection{
	
	private $host = "localhost;";
	private $user = "root";
	private $pass = "";
	private $database = "crudusers";
	private $connection_;

	public function __construct()
	{
		$this->connection_ = new \PDO("mysql:host=".$this->host."dbname=".$this->database,$this->user,$this->pass);
		
	}

	/**
	 * This method is for init all steatment
	 * @param type Sentence SQL
	 * @return void
	 */
	public function _prepare_($sql){
		if($this->connection_){
			$data = $this->connection_->prepare($sql);
			return $data;	
		}
		
	}


	/**
	 * @param  string
	 * @return string without special characteres
	 */
	public function protection($text){
		if($this->connection_){
			$string = $this->connection_->quote($text);
			return $string;
		}
	}

	public function saludar($ss){
		return 'ss';
	}
}



 ?>