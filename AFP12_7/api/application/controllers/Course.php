<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Course extends My_Controller {


	public function __construct() {
	
		parent::__construct();
		
		$this->load->model('Course_model');
		
	}
	
	public function getAll() {
		
		//$data="";
		
		$data=$this->Course_model->getlist_Course();
		
		echo json_encode($data);
				
	}
	
	
	public function add() {
		
		$post_Course = json_decode(trim(file_get_contents('php://input')), true);		

		if ($post_Course) {
			if($post_Course['CourseId'] > 0){
				$result = $this->Course_model->edit_Course($post_Course);
				if($result) {
					echo json_encode($post_Course);	
				}	
			} else {
				$result = $this->Course_model->add_Course($post_Course);
				if($result) {
					echo json_encode($post_Course);	
				}	
			}							
		}
		
	}
	
	public function getById($Course_Id = NULL) {
		
		if (!empty($Course_Id)) {
			$data = [];		
			$data = $this->Course_model->get_Coursedata($Course_Id);
			echo json_encode($data);			
		}
	}	
	
	
	public function delete() {
		$post_course = json_decode(trim(file_get_contents('php://input')), true);		

		if ($post_course)
		 {
			if($post_course['id'] > 0){
				$result = $this->Course_model->delete_Course($post_course);
				if($result) {
					
					echo json_encode("Delete successfully");
					}
		 	}
		
			
		} 
			
	}	
	public function getCourseLevelList() {
		
		//$data="";
		
		$data=$this->Course_model->getCourseLevelList();
		
		echo json_encode($data);
				
	}
	
	
}
