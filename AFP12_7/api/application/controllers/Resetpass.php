<?php
defined('BASEPATH') OR exit('No direct script access allowed');



class Resetpass extends CI_Controller 
{	
	public function __construct()
	{
		parent::__construct();
		$this->load->model('Reset_model');
	}
	
	
	public function resetuserpass()
		{
								
		$post_pass = json_decode(trim(file_get_contents('php://input')), true);		
		if ($post_pass)
			{
					
				$result = $this->Reset_model->reset_pass($post_pass);
				if($result)
				{
						echo json_encode('Success');
				}	
				else
				{
					
					echo json_encode('Code duplicate');
				}
										
		}
		
	}
	

	public function resetpasslink()
		{
								
		$post_passlink = json_decode(trim(file_get_contents('php://input')), true);		
		if ($post_passlink)
			{
					
				$result = $this->Reset_model->reset_passlink($post_passlink);
			
				if($result)
				{
						echo json_encode('Success');
				}	
				else
				{
					
					echo json_encode('Code duplicate');
				}
										
			}
		}
		
		public function resetpasslink2()
		{				
		$post_passlink = json_decode(trim(file_get_contents('php://input')), true);		
		if ($post_passlink)
			{
				
			
				$result = $this->Reset_model->reset_passlink2($post_passlink);
				
				if($result)
				{
						echo json_encode('Success');
				}	
				else
				{
					
					echo json_encode('fail');
				}
										
		}
		
	}

	
	
	
	
	
	
}
