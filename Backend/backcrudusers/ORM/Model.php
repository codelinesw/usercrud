<?php namespace ORM;


require('ORM.php');


class Model{

	private $data = [];
	private $join;
	protected static $table;
	private $Orm;

    public function __construct($value = null){
    	$this->data = $value;
    	$this->Orm = new ORM();
 	}
	public function get($property){
		return $this->data[$property];
	}

	public function set($property,$value){
		$this->data[$property] = $value;
	}

	public function getFields(){
		return $this->data;
	}

	public function list(){
		$this->Orm->addTable(static::$table);
		$this->Orm->join(['categories', 'users.idUser', 'categories.user_id']);
		$this->Orm->select($this->data);
	}

	public function add(){
		$this->Orm->addTable(static::$table);
		$this->Orm->insert($this->data);
	}

	public function update(){
		
		$this->Orm->addTable(static::$table);
		$this->Orm->addIn('organization_id',2);
		$this->Orm->update();
		
	}

}

 ?>