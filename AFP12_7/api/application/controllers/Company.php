<?php
defined('BASEPATH') OR exit('No direct script access allowed');
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json');

class Company extends My_Controller 
{	
	public function __construct()
	{
		parent::__construct();
		$this->load->model('Company_model');
	}
	

	public function getAllUserList()
	{
		//$data="";
		
		$data=$this->Company_model->getlist_user();
		//print_r($data);
		//.exit;
		echo json_encode($data);
	}

	public function addCompany()
	{
		
		$post_company = json_decode(trim(file_get_contents('php://input')), true);
		if ($post_company) 
			{
				if($post_company['CompanyId']>0)
				{
					$result = $this->Company_model->edit_company($post_company);
					if($result)
					{
						echo json_encode($post_company);	
					}	
				}
				else
				{
					$result = $this->Company_model->add_company($post_company);
					if($result)
					{
						echo json_encode($post_company);	
					}	
				}
					
			}
	}
	
	public function getById($company_id=null)
	{	
		
		if(!empty($company_id))
		{
			$data=[];
			$data=$this->Company_model->get_companydata($company_id);
			echo json_encode($data);
		}
	}
	
	
	
	public function getAll()
	{
		//$data="";
		
		$data=$this->Company_model->getlist_company();
		
		echo json_encode($data);
	}
	

	public function delete() {
		$post_company = json_decode(trim(file_get_contents('php://input')), true);		

		if ($post_company)
		 {
			if($post_company['id'] > 0){
				$result = $this->Company_model->delete_company($post_company);
				if($result) {
					
					echo json_encode("Delete successfully");
					}
		 	}
		
			
		} 
			
	}
	//list all industry
	public function getAllIndustry() {
		
		//$data="";
		
		$data=$this->Company_model->getlist_Industry();
		
		echo json_encode($data);
				
	}
	
}