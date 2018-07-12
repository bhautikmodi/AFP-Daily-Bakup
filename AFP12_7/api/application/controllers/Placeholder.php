<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Placeholder extends My_Controller {

	public function __construct() {
	
		parent::__construct();
		
		$this->load->model('Placeholder_model');
		
	}
	
	public function getAll() {
		
		//$data="";
		
		$data=$this->Placeholder_model->getlist_placeholder();
		
		echo json_encode($data);
				
	}
	
	
	public function add() {
		
		$post_placeholder = json_decode(trim(file_get_contents('php://input')), true);		

		if ($post_placeholder) {
			if($post_placeholder['PlaceholderId'] > 0){
				$result = $this->Placeholder_model->edit_placeholder($post_placeholder);
				if($result) {
					echo json_encode($post_placeholder);	
				}	
			} else {
				$result = $this->Placeholder_model->add_placeholder($post_placeholder);
				if($result) {
					echo json_encode($post_placeholder);	
				}	
			}							
		}
		
	}
	
	public function getById($placeholder_id = NULL) {
		
		if (!empty($placeholder_id)) {
			$data = "";		
			$data = $this->Placeholder_model->get_placeholderdata($placeholder_id);
			echo json_encode($data);			
		}
	}	
	
	public function delete($placeholder_id = NULL) {
		
		if(!empty($placeholder_id)) {

			$result = $this->Placeholder_model->delete_placeholder($placeholder_id);
			if($result) {
				echo json_encode("Delete successfully");	
			} else {
				return $this->output
				->set_status_header(404)
				->set_output(json_encode(array(
						'text' => "You can't delete this record because of their dependency in another table.",
						'type' => 'danger'
				)));
			}
			
		} 
			
	}	
	
	public function getTableList() {
		
		//$data="";
		
		$data=$this->Placeholder_model->getTableList();
		
		echo json_encode($data);
				
	}

	public function getColumnList($table_id = NULL) {
		
		if(!empty($table_id)) {
			
			$result = "";
			$result = $this->Placeholder_model->getColumnList($table_id);			
			echo json_encode($result);				
		}			
	}
	
}
