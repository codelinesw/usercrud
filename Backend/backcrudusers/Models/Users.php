<?php namespace Models;

require('ORM/ORM.php');
use ORM\ORM as ORM;

class Users{

  protected static $table = 'u_users';
  private $data = [];
  private $Orm;

  public function __construct($value = null){
    $this->data = null;
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

  public function add(){
   $this->Orm->addTable(static::$table);
   $this->Orm->insert($this->data);
  }

  public function list(){
    $this->Orm->addTable(static::$table);
    $this->Orm->select($this->data);
  }

  public function listforid($id){
    $this->Orm->addTable(static::$table);
    $this->Orm->addWhere('id_user',$id);
    $this->Orm->select($this->data);
  }  

  public function update(){
     $this->Orm->addTable(static::$table);
     $this->Orm->addWhere('id_user');
     $this->Orm->addIn($this->data);
     $this->Orm->update($this->data);
  }

   public function delete(){
    $this->Orm->addTable(static::$table);
    $this->Orm->addWhere('id_user');
    $this->Orm->addIn($this->data);
    $this->Orm->delete();
   }


}







 ?>
