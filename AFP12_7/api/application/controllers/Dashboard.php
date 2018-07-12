<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Dashboard extends My_Controller {


	public function __construct() {
	
		parent::__construct();
		
		$this->load->model('Dashboard_model');
		
	}
	
	public function getAll($RoleId = NULL) {
		
		if(!empty($RoleId)){

			$result=$this->Dashboard_model->getlist_User($RoleId);
			$data['user']=$result;
			
			$result1=$this->Dashboard_model->getlist_Domain();
			$data['domain']=$result1;
			
			$result2=$this->Dashboard_model->getlist_Carea();
			$data['Carea']=$result2;
			
			$result3=$this->Dashboard_model->getlist_Tksa();
			$data['Tksa']=$result3;	   
			
			$result4=$this->Dashboard_model->getlist_Course();
			$data['Course']=$result4;

			$result5=$this->Dashboard_model->getlist_Company();
			$data['Company']=$result5;
		
			echo json_encode($data);
		}
				
	}

	public function getPendingAssessment() {		
		//$data="";
		$data=$this->Dashboard_model->getPendingAssessment();		
		echo json_encode($data);				
	}
	
}
