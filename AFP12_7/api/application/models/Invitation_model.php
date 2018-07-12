<?php

class Invitation_model extends CI_Model
 {
	function getlist_company()
	{
		$this->db->select('CompanyId as value,Name as label');
		$this->db->order_by('Name','asc');
		$this->db->where('IsActive=',1);
		$result=$this->db->get('tblcompany');
		
		$res=array();
		if($result->result())
		{
			$res=$result->result();
		}
		return $res;
	}
	function get_company($CompanyId)
	{
		if($CompanyId) 
		{
			$this->db->select('CompanyId,Name,Website,PhoneNo,IndustryId');
			$this->db->where('IsActive',1);
			$this->db->where('CompanyId',$CompanyId);
			$result=$this->db->get('tblcompany');
			
			$company_data = array();
			foreach($result->result() as $row) 
			{
				$company_data = $row;
			}
			return $company_data;
		}
		else {
			return false;
		   }
	}

	
	public	function getlist_Industry()
	{
		$this->db->select('IndustryId,IndustryName,IsActive');
		$this->db->where('IsActive="1"');
		$this->db->order_by('IndustryName','asc');
		$result=$this->db->get('tblmstindustry');
		
		$res=array();
		if($result->result())
		{
			$res=$result->result();
		}
		return $res;
	}
	public function getlist_userrole()
	{
		$this->db->select('RoleId,RoleName');
		$this->db->where('RoleName!=','IT');
		$result=$this->db->get('tblmstuserrole');
		
		$res=array();
		if($result->result())
		{
			$res=$result->result();
		}
		return $res;
	}
	public	function get_invimsg()
	{
		$this->db->select('ConfigurationId,Key,Value');
		$this->db->where('Key','InvitationMsgSuccess');
		$result1=$this->db->get('tblmstconfiguration');
		
		$this->db->select('ConfigurationId,Key,Value');
		$this->db->where('Key','InvitationMsgRevoke');
		$result2 = $this->db->get('tblmstconfiguration');

		$this->db->select('ConfigurationId,Key,Value');
		$this->db->where('Key','InvitationMsgPending');
		$result3 = $this->db->get('tblmstconfiguration');
		foreach($result1->result() as $row) {
			$res['Success'] = $row->Value;
		}
		foreach($result2->result() as $row) {
			$res['Revoke'] = $row->Value;
		}
		foreach($result3->result() as $row) {
			$res['Pending'] = $row->Value;
		}
		return $res;
	}
	
	public function add_Invitation($post_Invitation) {
		
		if($post_Invitation) {
			// if($post_Invitation['IsActive']==1){
			// 	$IsActive = true;
			// } else {
			// 	$IsActive = false;
			// }
			
			
			
				$this->db->select('EmailAddress');
				$this->db->from('tbluserinvitation');
				$this->db->where('EmailAddress',trim($post_Invitation['EmailAddress']));
				$this->db->limit(1);
				$query = $this->db->get();
				
				if ($query->num_rows() == 1) {
					return false;
				} 
				else 
				{
					 if(isset($post_Invitation['CompanyId']))
					 {
						$Invitation_data = array(
							'CompanyId' => trim($post_Invitation['CompanyId']),
						'EmailAddress' =>  trim($post_Invitation['EmailAddress']),
						'Code' =>  trim($post_Invitation['Code']),
						'RoleId' =>  trim($post_Invitation['RoleId']),
						'UpdatedOn' => date('y-m-d H:i:s')
					);
					$res = $this->db->insert('tbluserinvitation',$Invitation_data);
					
					if($res) {
						return true;
					} else {
						return false;
					}

					 }else
					 {
						
						
						if($post_Invitation['IndustryId'])
						{
						 $post_Invi=$post_Invitation['IndustryId'];
						}else
						{
						 $post_Invi='0';
						}
					 $company_data=array(
			 
						 "Name"=> trim($post_Invitation['Name']),
						 "IndustryId"=> trim($post_Invi),
						 "Website"=> trim($post_Invitation['Website']),
						 "PhoneNo"=> trim($post_Invitation['PhoneNo']),
						 'CreatedBy' => trim($post_Invitation['CreatedBy']),
						 'UpdatedBy' => trim($post_Invitation['UpdatedBy']),
						 'UpdatedOn' => date('y-m-d H:i:s')
					 );	
					 
					 $query=$this->db->insert('tblcompany',$company_data);
 
					 $this->db->select('CompanyId');
					 $this->db->order_by('CompanyId','desc');
					 $this->db->limit(1);
					 $result=$this->db->get('tblcompany');
					 
						 $company_data = array();
						 foreach($result->result() as $row) 
						 {
							 $company_data = $row;
						 }
				 
					 $Invitation_data = array(
							 'CompanyId' => trim($company_data->CompanyId),
						 'EmailAddress' =>  trim($post_Invitation['EmailAddress']),
						 'Code' =>  trim($post_Invitation['Code']),
						 'RoleId' =>  trim($post_Invitation['RoleId']),
						 'UpdatedOn' => date('y-m-d H:i:s')
					 );
					 $res = $this->db->insert('tbluserinvitation',$Invitation_data);
					 
					 if($res) {
						 return true;
					 } else {
						 return false;
					 }
					 }
				}
	
		} else {
			return false;
		}
	}
	
	public function getlist_Invitation() {

		$this->db->select('ui.UserInvitationId,ui.EmailAddress,r.RoleId,r.RoleName,ui.Status,ui.CompanyId,ui.Code,ui.IsActive,ui.UpdatedOn,tc.CompanyId,tc.Name');
		$this->db->join('tblmstuserrole r', 'ui.RoleId = r.RoleId', 'left');
		$this->db->join('tblcompany tc', 'ui.CompanyId = tc.CompanyId', 'left');
		$this->db->order_by('UserInvitationId','asc');
		$result = $this->db->get('tbluserinvitation ui');	
		$res = array();
		if($result->result()) {
			$res = $result->result();
		}
		return $res;
		
	}
	public function getlist_DesInvitation() {

		$this->db->select('ConfigurationId,Value,IsActive');	
		$this->db->where('Key="Invitation"');
		$result = $this->db->get('tblmstconfiguration');	
		
			$Desinvi_data = array();
			foreach($result->result() as $row) {
				$Desinvi_data = $row;
			}
			return $Desinvi_data;
		
		
	}
	public function delete_Invitation($post_revoke) {
	
	if($post_revoke) {
		
			$Invitation_data = array(
				'Status' => 2,
				'code' =>'',
				'UpdatedOn' => date('y-m-d H:i:s')
			
			);
			
			$this->db->where('UserInvitationId',$post_revoke['id']);
			$res = $this->db->update('tbluserinvitation',$Invitation_data);
			
			if($res) {
				$log_data = array(
					'UserId' => trim($post_revoke['Userid']),
					'Module' => 'Invitation',
					'Activity' =>'Revoke'
	
				);
				$log = $this->db->insert('tblactivitylog',$log_data);
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}	
		
	}
	public function ReInvite_Invitation($post_Invitation) {
	
	if($post_Invitation) {
		
			$Invitation_data = array(
				'Status' => 0,
				'code' =>trim($post_Invitation['Code']),
				'UpdatedBy' => trim($post_Invitation['UpdatedBy']),
				'UpdatedOn' => date('y-m-d H:i:s')
				
			
			);
			
			$this->db->where('UserInvitationId',$post_Invitation['UserInvitationId']);
			$res = $this->db->update('tbluserinvitation',$Invitation_data);
			
			if($res) {		
				$log_data = array(
				'UserId' => trim($post_Invitation['UpdatedBy']),
				'Module' => 'Invitation',
				'Activity' =>'RatiInvitation'

			);
			$log = $this->db->insert('tblactivitylog',$log_data);
				return true;
			} else {
				return false;
			}
		}
		else {
			
			return false;
		}	
		
	}
	
	
	
	
}
