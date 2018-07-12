<?php

class Competency_Area_model extends CI_Model
 {

	public function add_area($post_area) {
	
		if($post_area) {
			
			if(trim($post_area['IsActive'])==1){
				$IsActive = true;
			} else {
				$IsActive = false;
			}

			$area_data = array(
				'Name' => trim($post_area['Name']),
				'DomainId' => trim($post_area['DomainId']),
				'Description' => trim($post_area['Description']),
				'KeyConcepts' => trim($post_area['KeyConcepts']),
				'IsActive' => $IsActive,
				'CreatedBy' => trim($post_area['CreatedBy']),
				'UpdatedBy' => trim($post_area['UpdatedBy']),
				'UpdatedOn' => date('y-m-d H:i:s'),
			);
			
			$res = $this->db->insert('tblmstcompetencyarea',$area_data);
			
			if($res) {
				$log_data = array(
					'UserId' => trim($post_area['CreatedBy']),
					'Module' => 'Competency_Area',
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
	
	public function getlist_area() {
	
		$this->db->select('area.CAreaId,area.Name as AreaName,area.Description,area.KeyConcepts,area.IsActive,domain.DomainId,domain.Name as DomainName,(SELECT COUNT(mk.KSAId) FROM tblmstksa as mk WHERE area.CAreaId=mk.CAreaId) as isdisabled');
		$this->db->join('tblmstdomain domain', 'area.DomainId = domain.DomainId', 'left');
		$this->db->order_by('CAreaId','asc');
		$result = $this->db->get('tblmstcompetencyarea area');
		
		$res = array();
		if($result->result()) {
			$res = $result->result();
		}
		return $res;
		
	}
	
	
	public function get_areadata($area_id = NULL) {
		
		if($area_id) {
			
			$this->db->select('area.CAreaId,area.DomainId,area.Name,area.Description,area.KeyConcepts,area.IsActive,(SELECT COUNT(mk.KSAId) FROM tblmstksa as mk WHERE area.CAreaId=mk.CAreaId) as isdisabled');
			$this->db->where('CAreaId',$area_id);
			$result = $this->db->get('tblmstcompetencyarea area');
			
			$area_data = array();
			foreach($result->result() as $row) {
				$area_data = $row;
			}
			return $area_data;
			
		} else {
			return false;
		}
	}
	
	
	public function edit_area($post_area) {
	
		if($post_area) {
			
			if(trim($post_area['IsActive'])==1){
				$IsActive = true;
			} else {
				$IsActive = false;
			}

			$area_data = array(
				'Name' => trim($post_area['Name']),
				'DomainId' => trim($post_area['DomainId']),
				'Description' => trim($post_area['Description']),
				'KeyConcepts' => trim($post_area['KeyConcepts']),
				'IsActive' => $IsActive,
				'UpdatedBy' => trim($post_area['UpdatedBy']),
				'UpdatedOn' => date('y-m-d H:i:s'),
			);
			
			$this->db->where('CAreaId',trim($post_area['CAreaId']));
			$res = $this->db->update('tblmstcompetencyarea',$area_data);
			
			if($res) {
				$log_data = array(
					'UserId' => trim($post_area['UpdatedBy']),
					'Module' => 'Competency_Area',
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
	
	
	public function delete_area($post_area) {
	
		if($post_area) {
			
			$this->db->where('CAreaId',$post_area['id']);
			$res = $this->db->delete('tblmstcompetencyarea');
			
			if($res) {
				$log_data = array(
					'UserId' => trim($post_area['Userid']),
					'Module' => 'Competency_Area',
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
	
	public function getDomainList() {
	
		$this->db->select('DomainId,Name,IsActive');
		//$this->db->where('IsActive',1);
		$this->db->order_by('Name','asc');
		$result = $this->db->get('tblmstdomain');
		
		$res = array();
		if($result->result()) {
			$res = $result->result();
		}
		return $res;
		
	}
	
}
