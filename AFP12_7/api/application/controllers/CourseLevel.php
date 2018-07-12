<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class CourseLevel extends My_Controller {


	public function __construct() {
	
		parent::__construct();
		
		$this->load->model('CourseLevel_model');
		
	}
	
	public function getAll() {
		
		//$data="";
		
		$data=$this->CourseLevel_model->getlist_CourseLevel();
		
		echo json_encode($data);
				
	}
	
	
	public function add() {
		
		$post_CourseLevel = json_decode(trim(file_get_contents('php://input')), true);		

		if ($post_CourseLevel) {
			if($post_CourseLevel['ConfigurationId'] > 0){
				$result = $this->CourseLevel_model->edit_CourseLevel($post_CourseLevel);
				if($result) {
					echo json_encode($post_CourseLevel);	
				}	
			} else {
				$result = $this->CourseLevel_model->add_CourseLevel($post_CourseLevel);
				if($result) {
					echo json_encode($post_CourseLevel);	
				}	
			}							
		}
		
	}
	
	public function getById($Configuration_id = NULL) {
		
		if (!empty($Configuration_id)) {
			$data = [];		
			$data = $this->CourseLevel_model->get_CourseLeveldata($Configuration_id);
			echo json_encode($data);			
		}
	}	
	
	public function delete() {
		$post_CourseLevel = json_decode(trim(file_get_contents('php://input')), true);		

		if ($post_CourseLevel)
		 {
			if($post_CourseLevel['id'] > 0){
				$result = $this->CourseLevel_model->delete_CourseLevel($post_CourseLevel);
				if($result) {
					
					echo json_encode("Delete successfully");
					}
		 	}
		
			
		} 
			
	}
	
	
}
