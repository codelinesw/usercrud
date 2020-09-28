<?php namespace Controllers;

require('Models/Users.php');

use Models\Users as Users;

class users_{

	private $Users;

	public function __construct(){
		$this->Users = new Users();
	}

	public function index(){
		echo "hola";
	}

	public function add(){
		header('Access-Control-Allow-Origin: *');
		$code   		= isset($_POST['code']) ? $_POST['code'] : '';
		$names   	 	= isset($_POST['names']) ? $_POST['names'] : '';
		$lastnames  = isset($_POST['lastnames']) ? $_POST['lastnames'] : '';
		$email   		= isset($_POST['email']) ? $_POST['email'] : '';

		if(empty($code) && empty($names) && empty($lastnames) && empty($email)){
			echo "empty";
		}else if(empty($code)){
			echo "empty";
		}else if(empty($names)){
			echo "empty";
		}else if(empty($lastnames)){
			echo "empty";
		}else if(empty($email)){
			echo "empty";
		}else{
			$this->Users->set('u_code',$code);
			$this->Users->set('u_names',$names);
			$this->Users->set('u_lastnames',$lastnames);
			$this->Users->set('u_email',$email);
			$this->Users->add();
		}

	}

	public function list(){
		header('Access-Control-Allow-Origin: *');
		$this->Users->list();
	}

	public function listforid(){
		header('Access-Control-Allow-Origin: *');
		$id = isset($_POST['id']) ? $_POST['id'] : '';
		if(!empty($id)){
			$this->Users->listforid($id);
		}
	}

	public function update(){
		header('Access-Control-Allow-Origin: *');
		$code   		= isset($_POST['code']) ? $_POST['code'] : '';
		$names   	 	= isset($_POST['names']) ? $_POST['names'] : '';
		$lastnames  = isset($_POST['lastnames']) ? $_POST['lastnames'] : '';
		$email   		= isset($_POST['email']) ? $_POST['email'] : '';
		$id   		= isset($_POST['id']) ? $_POST['id'] : '';

		if(empty($code) && empty($names) && empty($lastnames) && empty($email)){
			echo "empty";
		}else if(empty($code)){
			echo "empty";
		}else if(empty($names)){
			echo "empty";
		}else if(empty($lastnames)){
			echo "empty";
		}else if(empty($email)){
			echo "empty";
		}else{
			if(empty($id)){
				echo "nid";
			}else{
				$this->Users->set('u_code',$code);
				$this->Users->set('u_names',$names);
				$this->Users->set('u_lastnames',$lastnames);
				$this->Users->set('u_email',$email);
				$this->Users->set('indices',$id);
				$this->Users->update();
			}
		}
	}

	public function delete(){
		//echo 'Memoria inicial: ' . memory_get_usage() . '';
		header('Access-Control-Allow-Origin: *');
		$id   = isset($_POST['id']) ? $_POST['id'] : 0;
		if($id != 0){
			$this->Users->set('indices',$id);
			$this->Users->delete();
		}else{
			echo "empty";
		}
		//echo 'Memoria final: ' . memory_get_usage() . '';
	}



}



 ?>