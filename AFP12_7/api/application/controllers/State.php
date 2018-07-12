<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class State extends MY_Controller 
{	
	public function __construct()
	{
		parent::__construct();
		$this->load->model('State_model');
	}
	public function addState()
	{
		$post_state = json_decode(trim(file_get_contents('php://input')), true);
		if ($post_state) 
			{
				if($post_state['StateId']>0)
				{
					$result = $this->State_model->edit_state($post_state);
					if($result)
					{
						echo json_encode($post_state);	
					}	
				}
				else
				{
					$result = $this->State_model->add_state($post_state);
					if($result)
					{
						echo json_encode($post_state);	
					}	
				 }
					
			}
	}
	
	public function getById($state_id=null)
	{	
		
		if(!empty($state_id))
		{
			$data=[];
			$data=$this->State_model->get_statedata($state_id);
			echo json_encode($data);
		}
	}
	
	public function getAll()
	{
		//$data="";
		
		$data=$this->State_model->getlist_state();
		
		echo json_encode($data);
	}
	

	public function delete() {
		$post_state = json_decode(trim(file_get_contents('php://input')), true);		

		if ($post_state) {
			if($post_state['id'] > 0){
				$result = $this->State_model->delete_state($post_state);
				if($result) {
					
					echo json_encode("Delete successfully");
				}
				}
		
			
		} 
			
	}
	public function addproject()
	{

		$post_project = json_decode(trim(file_get_contents('php://input')), true);
		if ($post_project) 
			{
				
					$result = $this->Country_model->add_project($post_project);
					if($result)
					{
						echo json_encode($post_project);	
					}	
		
					
			}
	}
	
	
	public function getAllCountry()
	{
		//$data="";
		
		$data=$this->State_model->getlist_country();
		echo json_encode($data);
	}
	
}
