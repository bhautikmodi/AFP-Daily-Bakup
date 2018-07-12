<?php

class Sales_dashboard_model extends CI_Model
{
	

	
	//list Industry
	public function getlist_company() {
	
		$this->db->select('CompanyId as value,Name as label');
		//$this->db->where('IsActive="1"');
		$this->db->order_by('Name','asc');
		$result = $this->db->get('tblcompany');
		
		$res = array();
		if($result->result()) {
			$res = $result->result();
		}
		return $res;
		
	}
	public function getlist_User() {
	
		$this->db->select('UserId,CONCAT(FirstName," ",LastName) as Name');
		//$this->db->where('IsActive="1"');
		$result = $this->db->get('tbluser');
		
		$res = array();
		if($result->result()) {
			$res = $result->result();
		}
		return $res;
		
	}
	public function getUserList($CompanyId = NULL) {
		
		if($CompanyId) {
			
			$this->db->select('UserId,CONCAT(FirstName," ",LastName) as Name');
			$this->db->where('IsActive="1"');
			$this->db->where('CompanyId',$CompanyId);
			$result = $this->db->get('tbluser');
				
			
			$res = array();
			if($result->result()) {
				$res = $result->result();
			}
			return $res;
			
		} else {
			return false;
		}
	}
	public function getUser($post_user,$com_reg)
	{
	 
		$this->db->select('us.UserId,us.CompanyId,us.FirstName,us.LastName,us.Title,us.EmailAddress,us.Address1,
		us.Address2,us.CountryId,us.StateId,us.City,us.ZipCode,us.PhoneNumber,us.IsActive,
		tc.CompanyId,tc.Name,tc.Website,tc.PhoneNo,(SELECT ca.EndTime FROM tblcandidateassessment AS ca WHERE ca.EndTime != "NULL" && ca.UserId = us.UserId ORDER by ca.CAssessmentId DESC limit 1) as lastdate, (SELECT COUNT(ca.CAssessmentId) FROM tblcandidateassessment as ca WHERE ca.UserId = us.UserId && ca.EndTime != "NULL") as totalass');
		$this->db->join('tblcompany tc', 'us.CompanyId = tc.CompanyId', 'left');
		$this->db->order_by('lastdate','desc');
		$this->db->where('us.RoleId',3);
		//$this->db->join('tblcandidateassessment cass', 'us.UserId = cass.UserId', 'left');
		if($post_user>0)
		{
			$this->db->where('us.UserId',$post_user);
		}
		if($com_reg>0)
		{
			$this->db->where('tc.CompanyId',$com_reg);
		}
		
		$result = $this->db->get('tbluser us');
		$user_data= array();
		if($result->result())
		{
		   $user_data=$result->result();
		   
		}
		return $user_data;
		
	 
	}
}