<?php

class InvitationCode_model extends CI_Model
 {
	
	
	public function Invitation_code($post_Invitation) 
	{      
		
		$datetime1=date('Y-m-d',strtotime('-'.'30'.'days'));
		$this->db->select('UserInvitationId,EmailAddress,UpdatedOn');	
		$this->db->where('EmailAddress',trim($post_Invitation['EmailAddress']));
		$this->db->where('UpdatedOn >',$datetime1);
		$this->db->limit(1);
		$result = $this->db->get('tbluserinvitation');	
		if ($result->num_rows() == 1) 
		{
				$d=trim($post_Invitation['Code']);
				$this->db->select('UserInvitationId,Status,Code,EmailAddress,CompanyId');				
				$this->db->where('EmailAddress',trim($post_Invitation['EmailAddress']));	
				$this->db->where('Code = BINARY ',$d);
				$this->db->limit(1);
				$this->db->from('tbluserinvitation');
				$query = $this->db->get();
			
				if ($query->num_rows() == 1) 
				{
					return $query->result();
				
				} else
				{
					$this->db->select('UserInvitationId,EmailAddress,Status');				
					$this->db->where('EmailAddress',trim($post_Invitation['EmailAddress']));
					$this->db->where('Status',2);
					$this->db->from('tbluserinvitation');
					$query = $this->db->get();
				
					if($query->num_rows() == 1)
					{
						return 'revoked';
						
					}else
					{
						return 'code';
						
					}
					
				}
		}else
		{
				$this->db->select('UserInvitationId,EmailAddress');	
				$this->db->where('EmailAddress',trim($post_Invitation['EmailAddress']));
				$result = $this->db->get('tbluserinvitation');	
				if($result->num_rows() == 1)
							{
								return 'days';
								
							}else
							{
								
								return 'email';
								
							}
			
		}
		
		
	}
	
	
}
