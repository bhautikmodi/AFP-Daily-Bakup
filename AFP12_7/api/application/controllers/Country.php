<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Country extends MY_Controller {


	public function __construct() {
	
		parent::__construct();
		
		$this->load->model('Country_model');
		
	}
	
	public function getAll() {
		
		//$data="";
		
		$data=$this->Country_model->getlist_Country();
		
		echo json_encode($data);
				
	}
	
	
	public function add() {
		
		$post_Country = json_decode(trim(file_get_contents('php://input')), true);		

		if ($post_Country) {
			if($post_Country['CountryId'] > 0){
				$result = $this->Country_model->edit_Country($post_Country);
				if($result) {
					echo json_encode($post_Country);	
				}	
			} else {
				$result = $this->Country_model->add_Country($post_Country);
				if($result) {
					echo json_encode($post_Country);	
				}	
			}							
		}
		
	}
	
	public function getById($Country_Id = NULL) {
		
		if (!empty($Country_Id)) {
			$data = [];		
			$data = $this->Country_model->get_Countrydata($Country_Id);
			echo json_encode($data);			
		}
	}	
	

		
	public function delete() {
		$post_Country = json_decode(trim(file_get_contents('php://input')), true);		

		if ($post_Country) {
			if($post_Country['id'] > 0){
				$result = $this->Country_model->delete_Country($post_Country);
				if($result) {
					
					echo json_encode("Delete successfully");
				}
				}
		
			
		} 
			
	}
	
	
}
