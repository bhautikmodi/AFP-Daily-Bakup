<?php

class Forgotpass_model extends CI_Model
{
	
	public function forgot_pass($post_pass) 
	{
		if($post_pass)
		{
				$this->db->select('UserId,EmailAddress,VCode');				
				$this->db->where('EmailAddress',trim($post_pass['EmailAddress']));
				//$this->db->where('Status',0);
				
				$this->db->limit(1);
				$this->db->from('tbluser');
				$query = $this->db->get();
				
				if ($query->num_rows() == 1) 
				{
					$pass_data = array(
						//'Status' =>0,
						'VCode' =>$post_pass['VCode'],
						
						'CreatedOn' => date('y-m-d H:i:s'),
						'UpdatedOn' => date('y-m-d H:i:s')
					);
					
					$this->db->where('EmailAddress',trim($post_pass['EmailAddress']));
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