<?php

class Changepass_model extends CI_Model
{
	
	public function change_pass($post_pass) 
	{
		if($post_pass)
		{
				$this->db->select('UserId,Password,EmailAddress,FirstName');				
				$this->db->where('UserId',trim($post_pass['UserId']));
				$this->db->where('Password',md5(trim($post_pass['Password'])));
				//$this->db->where('Status',0);
				$this->db->limit(1);
				$this->db->from('tbluser');
				$query = $this->db->get();
				
				if ($query->num_rows() == 1) 
				{
					$pass_data = array(
						//'Status' =>1,
						//'code' =>'',
						'Password'=>md5($post_pass['nPassword']),
						'CreatedOn' => date('y-m-d H:i:s'),
						'UpdatedOn' => date('y-m-d H:i:s')
					);
			
					$this->db->where('UserId',trim($post_pass['UserId']));
					//$this->db->where('Code',trim($post_pass['Code']));
					$res = $this->db->update('tbluser',$pass_data);
					if($res)
					{
					    $pass = array();
						foreach($query->result() as $row) {
							$pass = $row;
						}
						return $pass;
					}else
					{
						return false;
					}
				
				} 
				else
				{
					return false;
				}
				
		} 
		else
		{
				return false;
		}
				
				
				
	
		
	}


	
	
	
	
	
	
	
	
	
}