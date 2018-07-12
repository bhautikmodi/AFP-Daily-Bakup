<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class DashboardUser extends MY_Controller {


	public function __construct() {
	
		parent::__construct();
		
		$this->load->model('DashboardUser_model');
		
	}

	public function getAllAssement($UserId = NULL) {
		
		if (!empty($UserId)) {
			//$data="";
			$data['complete']=$this->DashboardUser_model->getAllAssement($UserId);	
			$data['pending']=$this->DashboardUser_model->getPendingAssement($UserId);	
			$data['user']=$this->DashboardUser_model->getuser($UserId);	
			echo json_encode($data);			
		}				
	}

	public function getUserAssessDetail($CAssessmentId = NULL) {
		
		if (!empty($CAssessmentId)) {
			//$data="";
			$data=$this->DashboardUser_model->getUserAssessDetail($CAssessmentId);		
			echo json_encode($data);			
		}				
	}
	
}
