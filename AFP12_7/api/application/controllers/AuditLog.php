<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class AuditLog extends MY_Controller {


    public function __construct() {
	
		parent::__construct();
		
		$this->load->model('AuditLog_model');
		
	}

	public function getEmailLog() {
		
		//$data="";
		$data=$this->AuditLog_model->getEmailLog();		
		echo json_encode($data);
				
	}

	public function getLoginLog() {
		
		//$data="";
		$data=$this->AuditLog_model->getLoginLog();		
		echo json_encode($data);
				
	}

	public function getActivityLog() {
		
		//$data="";
		$data=$this->AuditLog_model->getActivityLog();		
		echo json_encode($data);
				
	}
	
}
