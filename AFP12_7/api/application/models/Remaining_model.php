<?php

class Remaining_model extends CI_Model
{
	
	
	public function add_remaining($post_remaining)
	{	if($post_remaining['IsActive']==1)
					{
						$IsActive = true;
					} else {
						$IsActive = false;
					}
		if($post_remaining)
		{
			 
			$remaining_data=array(
				"RoleId"=>trim($post_remaining['RoleId']),
				"CompanyId"=>trim($post_remaining['CompanyId']),
				"FirstName"=>trim($post_remaining['FirstName']),
				"LastName"=>trim($post_remaining['LastName']),
				"EmailAddress"=>trim($post_remaining['EmailAddress']),
				"Password"=>trim($post_remaining['Password']),
				"Address1"=>trim($post_remaining['Address1']),
				"Address2"=>trim($post_remaining['Address2']),
				"CountryId"=>trim($post_remaining['CountryId']),
				"StateId"=>trim($post_remaining['StateId']),
				"City"=>trim($post_remaining['City']),
				"ZipCode"=>trim($post_remaining['ZipCode']),
				"PhoneNumber"=>trim($post_remaining['PhoneNumber']),
				"IsActive"=>$IsActive,
				"CreatedBy" =>1,
				"UpdatedBy" =>1,
			);	
				
				$res=$this->db->insert('tblmstconfiguration',$remaining_data);
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
	
	
	
	public function getlist_days()
	{
		//$date1=date('Y-m-d H:i:s');
		$this->db->select('RDaysId,Day,IsActive');
		//$this->db->select('*');
		$result=$this->db->get('tblmstreminderdays');
		$res=array();
		if($result->result())
		{
			$res=$result->result();
		}
		return $res;
	}
	
	//list project status
	// public function getlist_remaining()
	// {
		 
	
		// // $this->db->select('user.UserId,user.EmailAddress,ca.CAssessmentId,ca.StartTime,ca.EndTime');
		// // $this->db->where('ca.StartTime >=',$date1);
		// // $this->db->join('tbluser user', 'ca.UserId = user.UserId', 'left');
		// // $result = $this->db->get('tblcandidateassessment ca');
		
	
		// $res=array();
		// if($result->result())
		// {
			// $res=$result->result();
		// }
		// return $res;
	// }
		
	// function getlist_value($datetime1)
	// {
	// 	$this->db->select('user.UserId,user.EmailAddress,ca.CAssessmentId,ca.StartTime,ca.EndTime');
	// 	$this->db->where('ca.StartTime',$datetime1);
	// 	//$this->db->where('ca.EndTime=','NULL');
	// 	$this->db->join('tbluser user', 'ca.UserId = user.UserId', 'left');
	// 	$result = $this->db->get('tblcandidateassessment ca');
	// 	$res=array();
	// 	if($result->result())
	// 	{
	// 		$res=$result->result();
	// 	}
	// 	return $res;
	// }




	public function getlist_value($datetime1)
	{
		$this->db->select('user.UserId,user.FirstName,user.EmailAddress,ca.CAssessmentId,ca.StartTime,ca.EndTime,ca.submitedDate');
		$this->db->where('DATE(ca.StartTime)',$datetime1);
		$this->db->where('ca.EndTime is NULL');
		$this->db->join('tbluser user','ca.UserId = user.UserId', 'left');
		$result = $this->db->get('tblcandidateassessment ca');
		$res=array();
		if($result->result())
		{
			$res=$result->result();
		}
		return $res;
	}


	
	//Delete UserList
	public function delete_remaining($confi_id) 
	{
	
		if($confi_id) 
		{
			
			$this->db->where('ConfigurationId',$confi_id);
			$res = $this->db->delete('tblmstconfiguration');
			
			if($res) {
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
	 public function edit_remaining($post_remaining) {
		if($post_remaining['IsActive']==1)
					{
						$IsActive = true;
					} else {
						$IsActive = false;
					}
		if($post_remaining) 
		{
				$remaining_data = array(
				//"ProjectStatusId"=>$post_remaining['ProjectStatusId'],
				"RoleId"=>trim($post_remaining['RoleId']),
				"CompanyId"=>trim($post_remaining['CompanyId']),
				"FirstName"=>trim($post_remaining['FirstName']),
				"LastName"=>trim($post_remaining['LastName']),
				"EmailAddress"=>trim($post_remaining['EmailAddress']),
				"Password"=>trim($post_remaining['Password']),
				"Address1"=>trim($post_remaining['Address1']),
				"Address2"=>trim($post_remaining['Address2']),
				"CountryId"=>trim($post_remaining['CountryId']),
				"StateId"=>trim($post_remaining['StateId']),
				"City"=>trim($post_remaining['City']),
				"ZipCode"=>trim($post_remaining['ZipCode']),
				"PhoneNumber"=>trim($post_remaining['PhoneNumber']),
				"IsActive"=>$IsActive,
				'CreatedOn' => date('y-m-d H:i:s'),
				'UpdatedOn' => date('y-m-d H:i:s')
			);
			
			$this->db->where('ConfigurationId',trim($post_remaining['ConfigurationId']));
			$res = $this->db->update('tblmstconfiguration',$remaining_data);
			
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
	
	
	public function get_userdata($confi_id=Null)
	{
	  if($confi_id)
	  {
		 $this->db->select('ConfigurationId,Key,Value');
		 //$this->db->select('*');
		 $this->db->where('ConfigurationId',$confi_id);
		 $result=$this->db->get('tblmstconfiguration');
		 $company_data= array();
		 foreach($result->result() as $row)
		 {
			$company_data=$row;
			
		 }
		 return $company_data;
		 
	  }
	  else
	  {
		  return false;
	  }
	}
	
	
	
	
	
}