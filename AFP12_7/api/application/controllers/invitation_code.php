<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Invitation_code extends CI_Controller {


	public function __construct() {
	
		parent::__construct();
		
		$this->load->model('InvitationCode_model');
		
	}

	
	public function code()
		{
								
		$post_Invitation = json_decode(trim(file_get_contents('php://input')), true);		
		if ($post_Invitation)
			{
			
				$result = $this->InvitationCode_model->Invitation_code($post_Invitation);
				
				if($result=='days')
				{
					echo json_encode("days");
				}elseif($result=='revoked')
				{
					echo json_encode("revoked");
				}elseif($result=='email')
				{
					echo json_encode("email");
				}
				elseif($result=='code')
				{
					echo json_encode("code");
				}
				else{
					echo json_encode($result);
				}
										
		}
		
	}

	
	
}
