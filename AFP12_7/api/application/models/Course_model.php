<?php

class Course_model extends CI_Model
 {

	public function add_Course($post_Course) {
			if($post_Course['IsActive']==1)
					{
						$IsActive = true;
					} else {
						$IsActive = false;
					}
		if($post_Course) {
			
			$Course_data = array(
				
				'Name' =>trim($post_Course['Name']),
				'DomainId' =>trim($post_Course['DomainId']),
				'CourseLevelId' => trim($post_Course['CourseLevelId']),
				'KeyConcepts' => trim($post_Course['KeyConcepts']),
				'CreatedBy' => trim($post_Course['CreatedBy']),
				'UpdatedBy' => trim($post_Course['UpdatedBy']),
				'UpdatedOn' => date('y-m-d H:i:s'),
				'IsActive' => $IsActive
			
			);
			
			$res = $this->db->insert('tblmstcourse',$Course_data);
			
			if($res) {
				$log_data = array(
					'UserId' => trim($post_Course['CreatedBy']),
					'Module' => 'Course',
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
	
	public function getlist_Course() {
		$this->db->select('pr.CourseId,pr.Name,pr.KeyConcepts,pr.IsActive,ps.DisplayText,ps.ConfigurationId,pr.CourseLevelId,md.Name as DomainName');
		$this->db->join('tblmstdomain md', 'pr.DomainId = md.DomainId', 'left');
		$this->db->join('tblmstconfiguration ps', 'pr.CourseLevelId = ps.ConfigurationId', 'left');
		$this->db->order_by('CourseId','asc');
		$result = $this->db->get('tblmstcourse pr');
		
		
		$res = array();
		if($result->result()) {
			$res = $result->result();
		}
		return $res;
		
	}
	
	
	public function get_Coursedata($Course_Id = NULL)
	{
		
		if($Course_Id) {
			
			$this->db->select('CourseId,Name,CourseLevelId,KeyConcepts,IsActive,DomainId');
			$this->db->where('CourseId',$Course_Id);
			$result = $this->db->get('tblmstcourse');
			
			$company_data = array();
			foreach($result->result() as $row) {
				$company_data = $row;
			}
			return $company_data;
			
		} else {
			return false;
		}
	}
	
	
	public function edit_Course($post_Course) {
	
		if($post_Course) {
			 if($post_Course['IsActive']==1)
					{
						$IsActive = true;
					} else {
						$IsActive = false;
					}
			$Course_data = array(
				'Name' =>trim($post_Course['Name']),
				'DomainId' =>trim($post_Course['DomainId']),
				'CourseLevelId' => trim($post_Course['CourseLevelId']),
				'KeyConcepts' => trim($post_Course['KeyConcepts']),
				'UpdatedBy' => trim($post_Course['UpdatedBy']),
				'UpdatedOn' => date('y-m-d H:i:s'),
				'IsActive' => $IsActive
			
			);
			
			$this->db->where('CourseId',$post_Course['CourseId']);
			$res = $this->db->update('tblmstcourse',$Course_data);
			
			if($res) {
				$log_data = array(
					'UserId' => trim($Course_data['UpdatedBy']),
					'Module' => 'Course',
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
	
	
	public function delete_Course($post_course) {
	
		if($post_course) {
			
			$this->db->where('CourseId',$post_course['id']);
			$res = $this->db->delete('tblmstcourse');
			
			if($res) {
				$log_data = array(
					'UserId' => trim($post_course['Userid']),
					'Module' => 'Course',
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
	public function getCourseLevelList() {
	
		$this->db->select('ConfigurationId,Value,Key,IsActive');
		$this->db->where('key="CourseLevel"');
		$this->db->where('IsActive="1"');
		$this->db->order_by('Value','asc');
		$result = $this->db->get('tblmstconfiguration');
		
		$res = array();
		if($result->result()) {
			$res = $result->result();
		}
		return $res;
		
	}
}
