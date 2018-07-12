<?php

class CourseLevel_model extends CI_Model
 {

	public function add_CourseLevel($post_CourseLevel) {
	
		if($post_CourseLevel) {
			if($post_CourseLevel['IsActive']==1){
				$IsActive = true;
			} else {
				$IsActive = false;
			}
			$CourseLevel_data = array(
				'Key' => 'CourseLevel',
				'Value' =>  trim($post_CourseLevel['CourseLevel']),
				'DisplayText' =>  trim($post_CourseLevel['Keyword']),
				'Description' =>  trim($post_CourseLevel['Description']),
				'CreatedBy' => trim($post_CourseLevel['CreatedBy']),
				'UpdatedBy' => trim($post_CourseLevel['UpdatedBy']),
				'UpdatedOn' => date('y-m-d H:i:s'),
				'IsActive' =>$IsActive
			
			);
			
			$res = $this->db->insert('tblmstconfiguration',$CourseLevel_data);
			
			if($res) {
				$log_data = array(
					'UserId' => trim($post_CourseLevel['CreatedBy']),
					'Module' => 'CourseLevel',
					'Activity' =>'Add'

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
	
	public function getlist_CourseLevel() {	
	$this->db->select('con.ConfigurationId,con.Key,con.Value,con.DisplayText,con.Description,con.IsActive,(SELECT COUNT(CourseId) FROM tblmstcourse as mc WHERE mc.CourseLevelId=con.ConfigurationId) as isdisabled');
			$this->db->where('key="CourseLevel"');
		$result = $this->db->get('tblmstconfiguration as con');		
		$res = array();
		if($result->result()) {
			$res = $result->result();
		}
		return $res;
		
	}
	
	
	
	
	
	public function get_CourseLeveldata($Configuration_id = NULL)
	{
		
		if($Configuration_id) {
			
	
			$this->db->select('con.ConfigurationId,con.Key,con.Value,con.DisplayText,con.Description,con.IsActive,(SELECT COUNT(CourseId) FROM tblmstcourse as mc WHERE mc.CourseLevelId=con.ConfigurationId) as isdisabled');
			$this->db->where('ConfigurationId',$Configuration_id);
			$result = $this->db->get('tblmstconfiguration as con');
			
			$company_data = array();
			foreach($result->result() as $row) {
				$company_data = $row;
			}
			return $company_data;
			
		} else {
			return false;
		}
	}
	
	
	public function edit_CourseLevel($post_CourseLevel) {
	
		if($post_CourseLevel) {
			if($post_CourseLevel['IsActive']==1){
				$IsActive = true;
			} else {
				$IsActive = false;
			}
			$CourseLevel_data = array(
				
				'Value' =>  trim($post_CourseLevel['CourseLevel']),
				'DisplayText' =>  trim($post_CourseLevel['Keyword']),
				'Description' =>  trim($post_CourseLevel['Description']),
				'UpdatedBy' => trim($post_CourseLevel['UpdatedBy']),
				'UpdatedOn' => date('y-m-d H:i:s'),  
				'IsActive' => $IsActive
			
			);
			
			$this->db->where('ConfigurationId',$post_CourseLevel['ConfigurationId']);
			$res = $this->db->update('tblmstconfiguration',$CourseLevel_data);
			
			if($res) {
				$log_data = array(
					'UserId' => trim($post_CourseLevel['UpdatedBy']),
					'Module' => 'CourseLevel',
					'Activity' =>'Update'

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
	
	
	public function delete_CourseLevel($post_CourseLevel) {
	
		if($post_CourseLevel) {
			
			$this->db->where('ConfigurationId',$post_CourseLevel['id']);
			$res = $this->db->delete('tblmstconfiguration');
			
			if($res) {
				$log_data = array(
					'UserId' => trim($post_CourseLevel['Userid']),
					'Module' => 'CourseLevel',
					'Activity' =>'Delete'

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
	
}
