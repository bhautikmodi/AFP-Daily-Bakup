<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Email_Template extends My_Controller {

	public function __construct() {
	
		parent::__construct();
		
		$this->load->model('Email_Template_model');
		
	}
	
	public function getAll() {
		
		//$data="";
		
		$data=$this->Email_Template_model->getlist_email();
		
		echo json_encode($data);
				
	}
	
	
	public function add() {
		
		$post_email = json_decode(trim(file_get_contents('php://input')), true);		

		if ($post_email) {
			if($post_email['EmailId'] > 0){
				$result = $this->Email_Template_model->edit_email($post_email);
				if($result) {
					echo json_encode($result);
				}	
			} else {
				$result = $this->Email_Template_model->add_email($post_email);
				if($result) {
					echo json_encode($result);				
				}	
			}							
		}
		
	}
	
	public function getById($email_id = NULL) {		
		if (!empty($email_id)) {
			$data = "";		
			$data = $this->Email_Template_model->get_emaildata($email_id);
			echo json_encode($data);			
		}
	}	
	
	public function delete($email_id = NULL) {
		
		if(!empty($email_id)) {

			$result = $this->Email_Template_model->delete_email($email_id);
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
	
	public function getDefaultList() {		
		//$data="";		
		$data['role']=$this->Email_Template_model->getRoleList();
		$data['placeholder']=$this->Email_Template_model->getPlaceholderList();		
		echo json_encode($data);				
	}

}
