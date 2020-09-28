<?php namespace ORM;


class Mapping{

	/**
	 * Global variables
	 * @var Some store text strings and other arrangements
	*/
	private $table;
	private $fields;
	private $values;
	private $where;
	private $group_by;
	private $order_by;
	private $limit;
	private $offset;
	private $typejoin;
	private $join;
	private $type;
	private $include_count;
	private $alias;
	private $in;
	private $indices;




	public function __construct(){

	}

	/**
	 * This method allow enctyp any string
	 * @param  [type] $data  This parameter is the string to encrypt
	 * @param  [type] $key   This key is the password for our encryption, note that we will need this key later to decrypt
	 * @param  [type] $method This method is the type encrypt for our encryption, note that we will need this key later to decrypt
	 * @return [type]  a new string but already encrypt
	 */

	public function encrypt( $data,  $key,  $method) {

	    $ivSize = openssl_cipher_iv_length($method);
	    $iv = openssl_random_pseudo_bytes($ivSize);

	    $encrypted = openssl_encrypt($data, $method, $key, OPENSSL_RAW_DATA, $iv);
	    
	    // For storage/transmission, we simply concatenate the IV and cipher text
	    $encrypted = base64_encode($iv . $encrypted);

	    return $encrypted;
	}

	/**
	 * This method allow enctyp any string
	 * @param  [type] $data  This parameter is the string that needed decrypt
	 * @param  [type] $key   This key is the password is used before, when the string was encrypted
	 * @param  [type] $method This method is the type of encryption that was used before, when the string was encrypted
	 * @return [type]  a new string but already decrypt
	 */

	public function decrypt($data, $key, $method){
	    $data = base64_decode($data);
	    $ivSize = openssl_cipher_iv_length($method);
	    $iv = substr($data, 0, $ivSize);
	    $data = openssl_decrypt(substr($data, $ivSize), $method, $key, OPENSSL_RAW_DATA, $iv);

	    return $data;
	}


	/**
	 * This method return a string with random data
	 * @return [type] random data
	 */
	public function generateToken(){
		return bin2hex(random_bytes(6));
	}

	/**
	 * This method change the state for attributes
	 * @param [type] $attr  Is the attribute for this class
	 * @param [type] $value The new value for the attribute
	 */
	public function set($attr,$value){
		$this->$attr = $value;
	}


	/**
	 * This method add one condition for setence SQL
	 * @param String
	 * @return clausule sql
	*/
	
	public function make_Condition($condition){
		$result = "";
		if(isset($condition)){
			if(is_array($condition)){
				$result .= " WHERE ".implode(" AND ", $condition);
			}else{
				$result .= "WHERE ".$condition;
			}
		}else{
			return $result;
		}

		return $result;
	}

	/**
	 * This method add one order for sentence SQL
	 * @param Array or String
	 *  @return type order
	*/
	
	public function make_Order($order){
		$result = "";
		if(isset($rorder)){
			if(is_array($order)){
				$result .= " ORDER BY ". implode(",", $order) .$this->order_by;
			}else{
				$result .= " ORDER BY ". $order .$this->order_by;
			}
		}
		return $result;
	}


	/**
	 * This method groups the fields for the SQL query
	 * @param Array of String
	 * @return type of order
	*/
	public function make_GroupBy($group){
		$result = "";
		if(isset($group)){
			if(is_array($group)){
				$result .= " ORDER BY ". implode(",", $group);
			}else{
				$result .= " ORDER BY ". $group;
			}
		}
		return $result;
	}

	/**
	 * This method relates two or more tables to bring the information
	 * @param Array or String
	 * @return  the relation of one or more tables
	*/
	public function make_Join($join){
		$result = "";
		if(isset($join)){
			if(is_array($join)){
				foreach ($join as $key => $value) {
					$result .= substr($key, 0,strpos($key," "))." JOIN ".$join[$key][0]." ON ".$join[$key][0].".".$join[$key][1]." = ".$join[$key][2].".".$join[$key][3]." ";
				}
			}else{
				$result = $this->typejoin." JOIN ".$this->join;
			}

		}

		return $result;
	}


	/**
	 * This method adds a limit for result to the information
	 * @param Array or String
	 * @return  the one o more limit for result
	*/

	public function make_Limit($limit){
		$result = '';
		if(isset($limit)){
			if(is_array($limit)){
				$result = 'LIMIT '.implode(',',$limit);
			}else{
				$result = 'LIMIT '.$limit;
			}
		}

		return $result;
	}

	/**
	 * @return SQL query SELECT
	 */
	public function prepareSelect(){

		$query = "SELECT ";
		if($this->include_count){
			$query .= "COUNT(*)";
		}

		if(isset($this->fields)){
			if(is_array($this->fields)){
				$query .= implode(",", $this->fields);
			}else{
				$query .= $this->fields;
			}
		}else{
			$query .= "*";
		}

		$query .= " FROM ";
		if(isset($this->table)){
			$query .= $this->table." ".$this->alias;
		}

		$query .= $this->make_Join($this->join);
		$query .= $this->make_Condition($this->where);
		$query .= $this->make_GroupBy($this->group_by);
		$query .= $this->make_Order($this->order_by);
		$query .= $this->make_Limit($this->limit);

		return $query;
	}

	/**
	 * This method return SQL query
	 * @return [type] String This string is an query for add new data
	*/
	public function prepareInsert(){

		$query = "INSERT INTO ";

		if(isset($this->fields)){
			if(is_array($this->fields)){
				$query .= "(".implode(",", $this->fields).") ";
			}else{
				$query .= $this->fields;
			}
		}

		if(isset($this->table)){
			// if(array_key_exists(0, $this->params)){
			// 	$query .= $this->table." VALUES";
			// 	$paramerList = [];
			// 	$valueList = [];
			// 	foreach ($this->params as $key => $value){
			// 	   $valueList[] = $value;
			// 	}
			// 	foreach ($valueList as $index => $data){
			// 	   	$parameterList[] = '(NULL,'.implode(' , ', array_keys($data)).')';
			// 	}
			// 	$query .= implode(' , ', $parameterList);
			// }else{
			// 	$values = array_keys($this->params);
			// 	$query .= $this->table." VALUES (NULL,".implode(" , ", $values).")";
			// }
			if(is_array($this->indices)){

			}else{
				$query .= $this->table." VALUES (NULL,".$this->indices.")";
			}
			
		}

	
		return $query;
	}

	/**
	 * This method return SQL query
	 * @return [type] String This string is an query for update data
	*/
	public function prepareUpdate(){

		$query = "UPDATE ";
		if(isset($this->table)){
			$query .= $this->table." ".$this->alias." SET ";
		}

		if(isset($this->fields)){
			if(is_array($this->fields)){
				$query .= implode(",", $this->fields)." ";
			}else{
				$query .= $this->fields;
			}
		}

		$query .= $this->make_Condition($this->where);
		return $query;

	}

	/**
	 * This method return SQL query
	 * @return [type] String This string is an query for delete data
	*/
	public function prepareDelete(){

		$query = "DELETE ";
		if(isset($this->table)){
			$query .= "FROM ".$this->table." ".$this->alias;
		}

		$query .= $this->make_Condition($this->where);
		if($this->in){
			$query .= ' IN('.$this->in.")";
		}
		return $query;

	}


	/**
	 * This method returns a query statement
	 * @return [type] SQL query
	*/
	public function select(){
		$this->addType('SELECT');
		return $this->prepare();
	}

	/**
	 * This method returns a query statement
	 * @return [type] SQL query for INSERT
	*/
	public function insert(){
		$this->addType('INSERT');
		return $this->prepare();
	}

	/**
	 * This method returns a query statement
	 * @return [type] SQL query for UPDATE
	*/

	public function update(){
		$this->addType('UPDATE');
		return $this->prepare();
	}

	/**
	 * This method returns a query statement
	 * @return [type] SQL query for DELETE
	*/
	public function delete(){
		$this->addType('DELETE');
		return $this->prepare();
	}

	/**
	 * This method allows you to encrypt the information that is sent
	 * @param  [type] $data  This parameter is the result of our query
	 * @param  [type] $index Get the index where you need to encrypt the information in the array, which represents the information obtained from the query to the database
	 * @return [type]  all indexed data already encrypted
	 */
	public function replaceData($data,$index){
		// CBC has an IV and thus needs randomness every time a message is encrypted
		$method = 'AES-256-CBC';
		// simple password hash
		$password = 'a1c4d3mi';
		$key = hash('sha256', $password);
		$index = $index['index'];
		if(is_array($index)){
			foreach ($index as  $value) {
				if($value == "r_rol_id"){
					$data[$value] = $this->generateToken().$data[$value].$this->generateToken();
				}else{
					$data[$value] = $this->generateToken().$this->encrypt($data[$value], $key, $method);
				}
				
			}

		}else{
			if($index == "description"){
				$lines = '';
				foreach ($data as $key => $value) {

					$file = file($value[$index]);
				   foreach ($file as $line) {
					$lines .= $line;
				   }
			 	   $data[$key][$index] = $lines;
				}
			 				 	   //print_r($data[$key][$index]);
				return json_encode($data);

			}else{
				$data[$index] = $this->generateToken().$this->encrypt($data[$index], $key, $method);
				return json_encode([$data]);
			}		

		}
		
		
	}

	/**
	 * This method checks if there is data for this query, in case that yes, then
	 * return data are json type
	 * @param  [type] PDOstatement
	 * @return [type] json type
	*/
	public function jsonObject($data,$index,$needReplace = true,$needJson = true){
		if($data->rowCount() > 0){
			if($needReplace){
				if($needJson){
					return $this->replaceData($data->fetchAll(\PDO::FETCH_ASSOC),$index);
				}else{
					return $this->replaceData($data->fetch(),$index);
				}
			}else{
				//print_r("other");
				return json_encode($data->fetchAll(\PDO::FETCH_ASSOC));
			}
			
		}else{
			return json_encode(array(array('response' => 'empty')));
		}
	}

	/**
	 * This method add params for any query
	 * @param [type] PDOstatement [description]
	 * @param [type] are array [description]
	 */
	public function addParams($stmt,$data){
		if(!is_array($data[0])){
			for($i=0; $i < count($data) ; $i++) {
				$stmt->bindParam(($i+1),$data[$i],\PDO::PARAM_INT);
			}
		}else{
			foreach($data as $key => $value) {
				$index = ($key+1);
				$stmt->bindParam($index,$value[0],$value[1]);
			}
		}
		// if(sizeof($data) > 1){
		// 	//print_r($data);
		// 	if(array_key_exists(0,$data)){
		// 		$data_ = [];
		// 		$count = 0;
		// 		foreach ($data as $key => $value) {
		// 			foreach ($value as $index => $data) {
		// 				$data_[$index] = $data;
		// 			}
		// 		}

		// 		foreach ($data_ as $key => $value) {
		// 			$stmt->bindParam($key,$data_[$key][0],$data_[$key][1]);
		// 		}

		// 	}else{
		// 		foreach ($data as $key => $value) {
		// 			#echo 'ley => '.$key . ' data => ' . $value[0].' type data => '.$value[1].'<br>';
		// 			$stmt->bindParam($key,$value[0],$value[1]);
		// 		}
		// 	}
			
		// }else{
		// 	if(array_key_exists(0,$data)){
		// 		$data_ = [];
		// 		$count = 0;
		// 		foreach ($data as $key => $value) {
		// 			foreach ($value as $index => $data) {
		// 				$data_[$index] = $data;
		// 			}
		// 		}

		// 		foreach ($data_ as $key => $value) {
		// 			$stmt->bindParam($key,$data_[$key][0],$data_[$key][1]);
		// 		}

		// 	}else{
		// 		$key = array_keys($data)[0];
		// 		$stmt->bindParam($key,$data[$key][0],$data[$key][1]);
		// 	}
		// }
	}
	/**
	 * This method return the information in an array
	 * @param  [type] PDOstatement
	 * @param  [type] params for query
	 * @return [type] Array 
	 */
	public function getData($stmt,$data,$needReplace = true){
		if($stmt->rowCount() > 0){
			if($needReplace){
				return $this->replaceData($stmt->fetchAll(\PDO::FETCH_ASSOC),$data);
			}else{
				//print_r("other");
				return $stmt->fetchAll(\PDO::FETCH_ASSOC);
			}
			
		}else{
			return json_encode(array(array('response' => 'empty')));
		}
	}

	/**
	 * This method execute a new statement SQL
	 * @param [type]  PDOstatement     
	 * @param [type]  array 	params for this query 
	 * @param boolean $needJson 
	*/
	public function ExecQuery($stmt,$data,$needJson = true,$needReplace = true){
		
		if(isset($data)){
			if(isset($data['params'])){
				$this->addParams($stmt,$data['params']);
			}
		}
		$stmt->execute();
		if($this->type != "SELECT"){
			if($stmt->rowCount() > 0){
				return 'success';
			}else{
				return 'failed';
			}
		}

		if($stmt && $needJson){
			return $this->jsonObject($stmt,$data,$needReplace,$needJson);
		}else{

			return $this->getData($stmt,$data,$needReplace);
		}
	}

	public function prepare(){
		$query = "";
		switch ($this->type) {
			case "SELECT":
				$query = $this->prepareSelect();
				break;
			case "INSERT":
				$query = $this->prepareInsert();	
				break;
			case "UPDATE":
				$query = $this->prepareUpdate();
				break;
			case "DELETE":
				$query = $this->prepareDelete();
				break;
			default:
				$query = $this->prepareSelect();
				break;
		}

		return $query;
	}

	//Setters

	public function addType($type){
	   $this->set('type',$type);
	}

	public function addTable($value){
	   $this->set('table',$value);
	}

	public function addFields($value){
	   $this->set('fields',$value);
	}

	public function addValues($value){
	   $this->set('params',$value);
	}

	public function addWhere($clause,$value){
	   $this->set($clause,$value);
	}

	public function addOrder($clause,$value){
	   $this->set($clause,$value);
	}

	public function addGroupBy($clause,$value){
	   $this->set($clause,$value);
	}

	public function addTypeJoin($clause,$value){
	   $this->set($clause,$value);
	}

	public function addJoin($clause,$value){
	   $this->set($clause,$value);
	}

	public function addIn($value){
		$this->set('in',$value);
	}

	public function addIndices($value){
		$this->set('indices',$value);
	}

	public function addLimit($value){
		$this->set('limit',$value);
	}

}




 ?>