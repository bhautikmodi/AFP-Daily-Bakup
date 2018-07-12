<?php

class User_model extends CI_Model
{
	
	public function getStateList($country_id = NULL) {
		
		if($country_id) {
			
			$this->db->select('StateId,StateName');
			$this->db->where('CountryId',$country_id);
			$this->db->order_by('StateName','asc');
			$this->db->where('IsActive=',1);
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
	
	public function add_user($post_user)
	{	if($post_user['IsActive']==1)
					{
						$IsActive = true;
					} else {
						$IsActive = false;
					}
		if($post_user)
		{
			 
			$user_data=array(
				"RoleId"=>trim($post_user['RoleId']),
				"CompanyId"=>trim($post_user['CompanyId']),
				"FirstName"=>trim($post_user['FirstName']),
				"LastName"=>trim($post_user['LastName']),
				"Title"=>trim($post_user['Title']),
				"EmailAddress"=>trim($post_user['EmailAddress']),
				"Password"=>trim($post_user['Password']),
				"Address1"=>trim($post_user['Address1']),
				"Address2"=>trim($post_user['Address2']),
				"CountryId"=>trim($post_user['CountryId']),
				"StateId"=>trim($post_user['StateId']),
				"City"=>trim($post_user['City']),
				"ZipCode"=>trim($post_user['ZipCode']),
				"PhoneNumber"=>trim($post_user['PhoneNumber']),
				"PhoneNumberl"=>trim($post_user['PhoneNumberl']),
				"IsActive"=>$IsActive,
				"CreatedBy" =>1,
				"UpdatedBy" =>1,
			);	
				
				$res=$this->db->insert('tbluser',$user_data);
				if($res)
				{
					return true;
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
	
	//list project status
	public function getlist_user($role_id)
	{
		if($role_id) 
		{

			$this->db->select('us.UserId,us.RoleId as RoleId,us.CompanyId,us.FirstName,us.LastName,us.Title,us.EmailAddress,us.Password,us.Address1,
			us.Address2,us.CountryId,us.StateId,us.City,us.ZipCode,us.PhoneNumber,us.IsActive,cp.Name,cp.Name,usms.RoleName,(select count(CAssessmentId) from tblcandidateassessment where UserId=us.UserId and EndTime is not NULL) as total,(select count(CAssessmentId) from tblcandidateassessment where UserId=us.UserId and EndTime is NULL) as notgiven');
			$this->db->join('tblcompany cp','cp.CompanyId = us.CompanyId', 'left');
			$this->db->join('tblmstuserrole usms','usms.RoleId = us.RoleId', 'left');
			$this->db->order_by('us.FirstName','asc');
			// $this->db->order_by('StateName','asc');
			if($role_id!=4){
				$this->db->where('us.RoleId!=',4);
			}
			$result = $this->db->get('tbluser us');
			
			$res=array();
			if($result->result())
			{
				$res=$result->result();
			}
			return $res;
		} 
		else 
		{
			return false;
		}
	}

	public function getlist_user_tool()
	{
		
		$this->db->select('us.UserId,us.RoleId as RoleId,us.CompanyId,us.FirstName,us.LastName,us.Title,us.EmailAddress,us.Password,us.Address1,
		us.Address2,us.CountryId,us.StateId,us.City,us.ZipCode,us.PhoneNumber,us.IsActive,cp.Name,cp.Name,usms.RoleName,(select count(CAssessmentId) from tblcandidateassessment where UserId=us.UserId and EndTime is not NULL) as total,(select count(CAssessmentId) from tblcandidateassessment where UserId=us.UserId and EndTime is NULL) as notgiven');
		$this->db->join('tblcompany cp','cp.CompanyId = us.CompanyId', 'left');
		$this->db->join('tblmstuserrole usms','usms.RoleId = us.RoleId', 'left');
		$this->db->order_by('UserId','asc');
		$result = $this->db->get('tbluser us');
		
		$res=array();
		if($result->result())
		{
			$res=$result->result();
		}
		return $res;
		
	}
		
	
	//Delete UserList
	public function delete_user($post_user) 
	{
	
		if($post_user) 
		{
			
			$this->db->where('UserId',$post_user['id']);
			$res = $this->db->delete('tbluser');
			
			if($res) {
				$this->db->where('UserId',$post_user['id']);
				$qur = $this->db->delete('tbluserinvitation');
				$log_data = array(
					'UserId' => trim($post_user['Userid']),
					'Module' => 'User',
					'Activity' =>'Delete'
	
				);
				$log = $this->db->insert('tblactivitylog',$log_data);
				return true;
			} else {
				return false;
			}
		} 
		else 
		{
			return false;
		}
		
	}
	
	//Edit ProjectList
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
				"RoleId"=>$post_user['RoleId'],
				"CompanyId"=>trim($post_user['CompanyId']),
				"FirstName"=>trim($post_user['FirstName']),
				"LastName"=>trim($post_user['LastName']),
				"Title"=>trim($post_user['Title']),
				"EmailAddress"=>trim($post_user['EmailAddress']),
				"Password"=>trim($post_user['Password']),
				"Address1"=>trim($post_user['Address1']),
				"Address2"=>trim($post_user['Address2']),
				"CountryId"=>trim($post_user['CountryId']),
				"StateId"=>trim($post_user['StateId']),
				"City"=>trim($post_user['City']),
				"ZipCode"=>trim($post_user['ZipCode']),
				"PhoneNumber"=>trim($post_user['PhoneNumber']),
				"PhoneNumberl"=>trim($post_user['PhoneNumberl']),
				"IsActive"=>$IsActive,
				'CreatedOn' => date('y-m-d H:i:s'),
				'UpdatedBy' =>trim($post_user['UpdatedBy']),
				'UpdatedOn' => date('y-m-d H:i:s')
			);
			
			
			
			
			$this->db->where('UserId',trim($post_user['UserId']));
			$res = $this->db->update('tbluser',$user_data);
			
			if($res) 
			{
				$log_data = array(
					'UserId' => trim($post_user['UpdatedBy']),
					'Module' => 'User',
					'Activity' =>'Update'

				);
				$log = $this->db->insert('tblactivitylog',$log_data);
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
	
	
	public function get_userdata($user_id=Null)
	{
	  if($user_id)
	  {
		  
		  $this->db->select('UserId,RoleId,CompanyId,FirstName,LastName,Title,EmailAddress,Password,Address1,
		Address2,CountryId,StateId,City,ZipCode,PhoneNumber,PhoneNumberl,IsActive');
		$this->db->where('user.UserId=',$user_id);
		
		//$this->db->join('tblmststate sta', 'sta.StateId = user.UserId', 'left');
		$result = $this->db->get('tbluser user');
		
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
	
	
	//List state
	function getlist_state()
	{
		$this->db->select('StateId,StateName,StateAbbreviation,CountryId,IsActive');
		$this->db->where('IsActive=',1);
		$this->db->order_by('StateName','asc');
		$result=$this->db->get('tblmststate');
		
		$res=array();
		if($result->result())
		{
			$res=$result->result();
		}
		return $res;
	}
	
	function getlist_company()
	{
		$this->db->select('CompanyId,Name');
		$this->db->where('IsActive=',1);
		$this->db->order_by('Name','asc');
		$result=$this->db->get('tblcompany');
		
		$res=array();
		if($result->result())
		{
			$res=$result->result();
		}
		return $res;
	}
	
	//list user role
	public function getlist_userrole()
	{
		$this->db->select('RoleId,RoleName');
		$this->db->where('RoleName!=','IT');
		$this->db->order_by('RoleName','asc');
		$result=$this->db->get('tblmstuserrole');
		
		$res=array();
		if($result->result())
		{
			$res=$result->result();
		}
		return $res;
	}
	
	public function getlist_country() {
	
		$this->db->select('CountryId,CountryName,CountryAbbreviation,PhonePrefix,IsActive');
		$this->db->where('IsActive=',1);
		$this->db->order_by('CountryName','asc');
		$result = $this->db->get('tblmstcountry');
		$res = array();
		if($result->result()) {
			$res = $result->result();
		}
		return $res;
		
	}
	
	
}