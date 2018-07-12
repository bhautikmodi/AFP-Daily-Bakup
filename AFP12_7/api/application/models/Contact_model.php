<?php

class Contact_model extends CI_Model
 {

	public function add_Contact($post_Contact) {
	
		if($post_Contact) {
			
			$Contact_data = array(
				'FirstName' =>  trim($post_Contact['FirstName']),
				'LastName' =>  trim($post_Contact['LastName']),
				'EmailAddress' =>  trim($post_Contact['EmailAddress']),
				'CompanyName' => trim($post_Contact['CompanyName']),
				'Comments' => trim($post_Contact['Comments'])
			
			
			);
			
			$res = $this->db->insert('tblcontactus',$Contact_data);
			if($res) {
						return $res;
					}else{
					return false;
					
				}
			// if($res) {
			// 	$log_data = array(
			// 		'UserId' => trim($post_Contact['CreatedBy']),
			// 		'Module' => 'Contact',
			// 		'Activity' =>'Add'

			// 	);
			// 	$log = $this->db->insert('tblactivitylog',$log_data);
			// 	return true;
			// } else {
			// 	return false;
			// }
	
		} else {
			return false;
		}
	}
	public function get_userdata($CId=Null)
	{
	  if($CId)
	  {
		  
		  $this->db->select('us.UserId,us.CompanyId,us.FirstName,us.LastName,us.EmailAddress,
			tc.CompanyId,tc.Name as CompanyName');
			$this->db->join('tblcompany tc', 'us.CompanyId = tc.CompanyId', 'left');
			$this->db->where('UserId=',$CId);
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
	// public function getlist_CourseLevel() {	
	// $this->db->select('con.ConfigurationId,con.Key,con.Value,con.DisplayText,con.Description,con.IsActive,(SELECT COUNT(CourseId) FROM tblmstcourse as mc WHERE mc.CourseLevelId=con.ConfigurationId) as isdisabled');
	// 		$this->db->where('key="CourseLevel"');
	// 	$result = $this->db->get('tblmstconfiguration as con');		
	// 	$res = array();
	// 	if($result->result()) {
	// 		$res = $result->result();
	// 	}
	// 	return $res;
		
	// }
	
	
	
	
	
	// public function get_CourseLeveldata($Configuration_id = NULL)
	// {
		
	// 	if($Configuration_id) {
			
	
	// 		$this->db->select('ConfigurationId,Value,DisplayText,Description,IsActive');
	// 		$this->db->where('ConfigurationId',$Configuration_id);
	// 		$result = $this->db->get('tblmstconfiguration');
			
	// 		$company_data = array();
	// 		foreach($result->result() as $row) {
	// 			$company_data = $row;
	// 		}
	// 		return $company_data;
			
	// 	} else {
	// 		return false;
	// 	}
	// }
	
	
	// public function edit_CourseLevel($post_CourseLevel) {
	
	// 	if($post_CourseLevel) {
	// 		if($post_CourseLevel['IsActive']==1){
	// 			$IsActive = true;
	// 		} else {
	// 			$IsActive = false;
	// 		}
	// 		$CourseLevel_data = array(
				
	// 			'Value' =>  trim($post_CourseLevel['CourseLevel']),
	// 			'DisplayText' =>  trim($post_CourseLevel['Keyword']),
	// 			'Description' =>  trim($post_CourseLevel['Description']),
	// 			'UpdatedBy' => trim($post_CourseLevel['UpdatedBy']),
	// 			'UpdatedOn' => date('y-m-d H:i:s'),  
	// 			'IsActive' => $IsActive
			
	// 		);
			
	// 		$this->db->where('ConfigurationId',$post_CourseLevel['ConfigurationId']);
	// 		$res = $this->db->update('tblmstconfiguration',$CourseLevel_data);
			
	// 		if($res) {
	// 			$log_data = array(
	// 				'UserId' => trim($post_CourseLevel['UpdatedBy']),
	// 				'Module' => 'CourseLevel',
	// 				'Activity' =>'Update'

	// 			);
	// 			$log = $this->db->insert('tblactivitylog',$log_data);
	// 			return true;
	// 		} else {
	// 			return false;
	// 		}
	// 	} else {
	// 		return false;
	// 	}	
	
	// }
	
	
	
	
}
