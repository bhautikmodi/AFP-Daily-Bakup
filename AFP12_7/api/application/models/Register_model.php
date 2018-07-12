<?php

class Register_model extends CI_Model
{
	public function getlist_country() {
	
		$this->db->select('CountryId,CountryName');
		$this->db->where('IsActive="1"');
		$this->db->order_by('CountryName','asc');
		$result = $this->db->get('tblmstcountry');
		$res = array();
		if($result->result()) {
			$res = $result->result();
		}
		return $res;
		
	}
	//List state
	public function getlist_state()
	{
		$this->db->select('StateId,StateName');
		$this->db->order_by('StateName','asc');
		$result=$this->db->get('tblmststate');
		
		$res=array();
		if($result->result())
		{
			$res=$result->result();
		}
		return $res;
	}
	public function getStateList($country_id = NULL) {
		
		if($country_id) {
			
			$this->db->select('StateId,StateName');
			$this->db->order_by('StateName','asc');
			$this->db->where('IsActive="1"');
			$this->db->where('CountryId',$country_id);
			$result = $this->db->get('tblmststate');
				
			
			$res = array();
			if($result->result()) {
				$res = $result->result();
			}
			return $res;
			
		} else {
			return false;
		}
	}
	
	public function company_default($CompanyId = NULL) {
		
		if($CompanyId) {
			
			// $this->db->select('CompanyId,Name,IndustryId,Website,PhoneNumber');
			// $this->db->where('CompanyId',$CompanyId);
			// $result = $this->db->get('tblcompany');
		$this->db->select('pr.CompanyId,pr.Name,pr.IndustryId,pr.Website,pr.PhoneNo,ps.IndustryId,ps.IndustryName');
		$this->db->join('tblmstindustry ps', 'pr.IndustryId = ps.IndustryId', 'left');
		$this->db->where('CompanyId',$CompanyId);
		//$this->db->where('IsActive="1"');
		$result = $this->db->get('tblcompany pr');
			$company_data = array();
			foreach($result->result() as $row) {
				$company_data = $row;
			}
			return $company_data;
			
		} else {
			return false;
		}
		
	}
	public function add_Register($post_user)
	{	
		if($post_user)
		{	
			if(isset($post_user['PhoneNumberl']) && !empty($post_user['PhoneNumberl'])){
				$phone1 = $post_user['PhoneNumberl'];
			}	else {
				$phone1 = '';
			}
			if(isset($post_user['Address2']) && !empty($post_user['Address2'])){
				$Address2 = $post_user['Address2'];
			}	else {
				$Address2 = '';
			}
			$this->db->select('RoleId');
			$this->db->where('EmailAddress',trim($post_user['EmailAddress']));
			$query_r=$this->db->get('tbluserinvitation');
			$r=$query_r->result();
			$RoleId = $r[0]->RoleId;

				$user_data=array(
						"RoleId"=>$RoleId,
						"CompanyId"=>$post_user['CompanyId'],
						"FirstName"=>$post_user['FirstName'],
						"LastName"=>$post_user['LastName'],
						"Title"=>$post_user['Title'],
						"EmailAddress"=>$post_user['EmailAddress'],
						"Password"=>md5($post_user['Password']),
						"Address1"=>$post_user['Address1'],
						"Address2"=>$Address2,
						"CountryId"=>$post_user['CountryId'],
						"StateId"=>$post_user['StateId'],
						"City"=>$post_user['City'],
						"ZipCode"=>$post_user['ZipCode'],
						"PhoneNumber"=>$post_user['PhoneNumber'],
						"PhoneNumberl"=>$phone1,
						"CreatedBy" =>1,
						"UpdatedBy" =>1,
						'UpdatedOn' => date('y-m-d H:i:s'),
						'VCode' => '',
					);	
				$res=$this->db->insert('tbluser',$user_data);
				if($res)
				 {
					$this->db->select('UserId,FirstName,LastName,RoleId,EmailAddress');
					$this->db->order_by('UserId','desc');
					$this->db->limit(1);
					$query=$this->db->get('tbluser');
					if ($query->num_rows() == 1)
					 {	
						 $d=$query->result();
						 $Invitation_data = array(
						'UserId' =>$d[0]->UserId,
						'Status' =>1,
						'code' =>'',
						'CreatedOn' => date('y-m-d H:i:s'),
						'UpdatedOn' => date('y-m-d H:i:s')
					);
	
					$this->db->where('EmailAddress',trim($post_user['EmailAddress']));
					$res = $this->db->update('tbluserinvitation',$Invitation_data); 
						return $query->result();
					} 
					else 
					{
							return false;
					}
					//return true;
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
	
	
	
		
		
	public function get_userdata($user_id=Null)
	{
	  if($user_id)
	  {
		  
		  $this->db->select('us.UserId,us.CompanyId,us.FirstName,us.LastName,us.Title,us.EmailAddress,us.Address1,
			us.Address2,us.CountryId,us.StateId,us.City,us.ZipCode,us.PhoneNumber,us.PhoneNumberl,us.IsActive,
			tc.CompanyId,tc.Name,tc.Website,tc.PhoneNo,
			in.IndustryId,in.IndustryName');
			
			$this->db->join('tblcompany tc', 'us.CompanyId = tc.CompanyId', 'left');
			$this->db->join('tblmstindustry in','tc.IndustryId = in.IndustryId', 'left');
			$this->db->where('UserId=',$user_id);
			$result = $this->db->get('tbluser us');
		
			// $this->db->select('pr.CompanyId,pr.Name,pr.IndustryId,pr.Website,pr.PhoneNumber,ps.IndustryId,ps.IndustryName');
		// $this->db->join('tblmstindustry ps', 'pr.IndustryId = ps.IndustryId', 'left');
		// $this->db->where('CompanyId',$CompanyId);
		// $result = $this->db->get('tblcompany pr');
	

		 // $this->db->select('*');
		 // $this->db->where('UserId',$user_id);
		 // $result=$this->db->get('tbluser');
		 $user_data= array();
		 foreach($result->result() as $row)
		 {
			$user_data=$row;
			
		 }
		 return $user_data;
		 
	  }
	  else
	  {
		  return false;
	  }
	}
 public function edit_user($post_user) {
		if($post_user['IsActive']==1)
					{
						$IsActive = true;
					} else {
						$IsActive = false;
					}
		if($post_user) 
		{
				$user_data = array(
				//"ProjectStatusId"=>$post_user['ProjectStatusId'],
				//"RoleId"=>$data['RoleId'],
				//"CompanyId"=>$data['CompanyId'],
				"FirstName"=>$post_user['FirstName'],
				"LastName"=>$post_user['LastName'],
				"Title"=>$post_user['Title'],
				"EmailAddress"=>$post_user['EmailAddress'],
				//"Password"=>$post_user['Password'],
				"Address1"=>$post_user['Address1'],
				"Address2"=>$post_user['Address2'],
				"CountryId"=>$post_user['CountryId'],
				"StateId"=>$post_user['StateId'],
				"City"=>$post_user['City'],
				"ZipCode"=>$post_user['ZipCode'],
				"PhoneNumber"=>$post_user['PhoneNumber'],
				"PhoneNumberl"=>$post_user['PhoneNumberl'],
				"IsActive"=>$IsActive,
				'CreatedOn' => date('y-m-d H:i:s'),
				'UpdatedOn' => date('y-m-d H:i:s')
			);
			
			
			
			
			$this->db->where('UserId',$post_user['UserId']);
			$res = $this->db->update('tbluser',$user_data);
			
			if($res) 
			{
				return true;
			} else
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