<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Salesuser extends MY_Controller {


	public function __construct() {
	
		parent::__construct();
		
		$this->load->model('Salesuser_model');
		$this->load->model('DashboardUser_model');
		
	}


	public function getUserAssessDetail($CAssessmentId = NULL) {
		
		if (!empty($CAssessmentId)) {
			//$data="";
			$data['domain']=$this->Salesuser_model->getUserAssessDetail($CAssessmentId);
			$data['domainrs']=$this->Salesuser_model->getUserAssessDomainrs($CAssessmentId);
			$data['carears']=$this->Salesuser_model->getUserAssessCarears($CAssessmentId);
			$data['rcourse']=$this->Salesuser_model->getReCommendcourse($CAssessmentId);
			$data['allcourse']=$this->Salesuser_model->getallcourse($CAssessmentId);
			$data['ksa']=$this->Salesuser_model->getUserksa($CAssessmentId);
			$data['assessment']=$this->Salesuser_model->getUserassessment($CAssessmentId);
			echo json_encode($data);			
		}				
	}


	public function getUserReport($UserId = NULL) {		
		if (!empty($UserId)) {
			//$data="";
			$data['domainAss']=$this->Salesuser_model->getUserReport($UserId);
			$data['assList']=$this->Salesuser_model->getAssessmentList($UserId);
			$data['user']=$this->DashboardUser_model->getuser($UserId);	
			if($data){
				echo json_encode($data);
			}							
		}				
	}

	
	
}
