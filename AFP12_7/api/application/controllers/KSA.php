<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class KSA extends My_Controller {

	public function __construct() {
	
		parent::__construct();
		
		$this->load->model('KSA_model');
		
	}
	
	public function getAll() {
		
		//$data="";
		
		$data=$this->KSA_model->getlist_ksa();
		
		echo json_encode($data);
				
	}
	
	
	public function add() {
		
		$post_ksa = json_decode(trim(file_get_contents('php://input')), true);		

		if ($post_ksa) {
			if($post_ksa['KSAId'] > 0){
				$result = $this->KSA_model->edit_ksa($post_ksa);
				if($result) {
					echo json_encode($post_ksa);	
				}	
			} else {
				$result = $this->KSA_model->add_ksa($post_ksa);
				if($result) {
					echo json_encode($post_ksa);	
				}	
			}							
		}
		
	}
	
	public function getById($ksa_id = NULL) {
		
		if (!empty($ksa_id)) {
			//$data="";	
			$data = $this->KSA_model->get_ksadata($ksa_id);
			echo json_encode($data);			
		}
	}	
	
	
	public function delete() {
		$post_ksa = json_decode(trim(file_get_contents('php://input')), true);		

		if ($post_ksa)
		 {
			if($post_ksa['id'] > 0){
				$result = $this->KSA_model->delete_ksa($post_ksa);
				if($result) {
					
					echo json_encode("Delete successfully");
					}
		 	}
		
			
		} 
			
	}
	public function getCAreaList() {
		
		//$data="";
		
		$data=$this->KSA_model->getCAreaList();
		
		echo json_encode($data);
				
	}
	
}
