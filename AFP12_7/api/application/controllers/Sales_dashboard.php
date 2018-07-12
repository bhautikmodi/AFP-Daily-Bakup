<?php
defined('BASEPATH') OR exit('No direct script access allowed');


class Sales_dashboard extends MY_Controller 
{	
	public function __construct()
	{
		parent::__construct();
		$this->load->model('Sales_dashboard_model');
	}
	
	
	
	

	public function getAllUser() {
		
		//$data="";
		
		$data['user']=$this->Sales_dashboard_model->getlist_User();
		$data['com']=$this->Sales_dashboard_model->getlist_company();
		echo json_encode($data);
				
	}
	
	public function getUserList($CompanyId = NULL) {
		
		if(!empty($CompanyId)) {
			
			$result = [];
			$result = $this->Sales_dashboard_model->getUserList($CompanyId);			
			echo json_encode($result);				
		}			
	}
	//list all industry

	public function getUser()
	{
		$data = json_decode(trim(file_get_contents('php://input')), true);
		$post_user = $data['user'];
	    $com_reg = $data['com'];
		if ($data) 
			{			
		
					$result = $this->Sales_dashboard_model->getUser($post_user,$com_reg); 
			
					if($result)
					{
						echo json_encode($result); 
			
					}else
					{
						echo json_encode('error');
					}
				
					
			}
	}
	
}