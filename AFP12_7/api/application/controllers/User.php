<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class User extends MY_Controller 
{	
	public function __construct()
	{
		parent::__construct();
		$this->load->model('User_model');
	}
	
	public function getStateList($country_id = NULL) {
		
		if(!empty($country_id)) {
			
			$result = [];
			$result = $this->User_model->getStateList($country_id);			
			echo json_encode($result);				
		}			
	}
	
	public function addUser()
	{
		$post_user = json_decode(trim(file_get_contents('php://input')), true);
		if ($post_user) 
			{
				if($post_user['UserId']>0)
				{
					$result = $this->User_model->edit_user($post_user);
					if($result)
					{
						echo json_encode($post_user);	
					}	
				}
				else
				{
					
					$result = $this->User_model->add_user($post_user); 
			
					if($result)
					{
						echo json_encode($post_user); 
						$config['protocol']='smtp';
						// $config['smtp_host']='ssl://smtp.googlemail.com';
						// $config['smtp_port']='465';
						$config['smtp_host']='mail.uatbyopeneyes.com';
						$config['smtp_port']='587';
						$config['smtp_user']='myopeneyes3937@gmail.com';
						$config['smtp_pass']='W3lc0m3@2018';
						$config['charset']='utf-8';
						$config['newline']="\r\n";
						$config['mailtype'] = 'html';	
											
						$this->email->initialize($config);

						$this->email->from('myopeneyes3937@gmail.com','Email Test');
						$this->email->to($post_user['EmailAddress']);
						
						
						$this->email->subject('Sending mail');
					
						$this->email->message('<table style="font-family:Arial, Helvetica, sans-serif; font-size:15px; line-height:22px; color:#000; border:1px solid #0333; width:600px; margin:0 auto;" cellpadding="0" cellspacing="0" border="0">
						<tr>
							<td style="padding:10px; border-bottom:1px solid #ccc; background:url(https://www.afponline.org/assets/images/afp-pattern.png) right -50px no-repeat #fafafa; background-size:300px;"><img src="https://www.afponline.org/assets/images/afp-logo.png" alt="" style="width:250px;" /></td>
						</tr>
						<tr>
							<td style="padding:10px;">
								<p style="color:#007699;"><strong>Hello '.$result->FirstName. '</strong></p>
								<p>Welcome to <strong>Association for Financial Professionals</strong>.</p>
								
								
								<p>If you did not ask to change your password, then you can ignore this email and your password will not be changed.<br> You will be able to use the link below only once.</p>
								<p><strong>Regards,<br><span style="color:#007699;">AFP TEAM</span></strong></p>
							</td>
						</tr>
						<tr>
							<td style="padding:10px; border-top:1px solid #ccc; background:#0085AD; text-align:center; color:#fff;">Copyright © 2018 Association for Financial Professionals - All rights reserved. </td>
						</tr>
					</table>');
						
						
						$this->email->send();
					}	
				}
					
			}
	}
	
	
	//Delete UserList
	
	public function deleteUser() {
		$post_user = json_decode(trim(file_get_contents('php://input')), true);		

		if ($post_user)
		 {
			if($post_user['id'] > 0){
				$result = $this->User_model->delete_user($post_user);
				if($result) {
					
					echo json_encode("Delete successfully");
					}
		 	}
		
			
		} 
			
	}
	//get userId edit
	public function getById($user_id=null)
	{	
		
		if(!empty($user_id))
		{
			$data=[];
			$data=$this->User_model->get_userdata($user_id);
			echo json_encode($data);
		}
	}
	
	
	
	// Add Status
	public function getAllUserList($role_id=null)
	{
		if(!empty($role_id))
		{
			$data=$this->User_model->getlist_user($role_id);
			echo json_encode($data);
		}
		
	}

	public function getAllUserList_tool()
	{
		$data=$this->User_model->getlist_user_tool();
		echo json_encode($data);

	}	

	public function getAllDefaultData()
	{
		//$data="";
		$data['company']=$this->User_model->getlist_company();
		$data['role']=$this->User_model->getlist_userrole();
		$data['country']=$this->User_model->getlist_country();
		$data['state']=$this->User_model->getlist_state();
		echo json_encode($data);
	}
}
