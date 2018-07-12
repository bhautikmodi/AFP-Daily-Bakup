<?php

class Industry_model extends CI_Model
 {

	public function add_Industry($post_Industry) {
			if($post_Industry['IsActive']==1)
					{
						$IsActive = true;
					} else {
						$IsActive = false;
					}
		if($post_Industry) {
			
			$Industry_data = array(
				
				'IndustryName' => trim($post_Industry['IndustryName']),
				'CreatedBy' => trim($post_Industry['CreatedBy']),
				'UpdatedBy' => trim($post_Industry['UpdatedBy']),
				'UpdatedOn' => date('y-m-d H:i:s'),
				'IsActive' => $IsActive
			
			);
			
			$res = $this->db->insert('tblmstindustry',$Industry_data);
			
			if($res) {
				$log_data = array(
					'UserId' => trim($post_Industry['CreatedBy']),
					'Module' => 'Industry',
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
	
	public function getlist_Industry() {
	
		$this->db->select('in.IndustryId,in.IndustryName,in.IsActive,(SELECT COUNT(CompanyId) FROM tblcompany as mc WHERE mc.IndustryId=in.IndustryId) as isdisabled');
		$this->db->order_by('IndustryName','asc');
		$result = $this->db->get('tblmstindustry as in');
		$res = array();
		if($result->result()) {
			$res = $result->result();
		}
		return $res;
		
	}
	
	
	public function get_Industrydata($Industry_Id = NULL)
	{
		
		if($Industry_Id) {
			
			$this->db->select('in.IndustryId,in.IndustryName,in.IsActive,(SELECT COUNT(CompanyId) FROM tblcompany as mc WHERE mc.IndustryId=in.IndustryId) as isdisabled');
			$this->db->where('IndustryId',$Industry_Id);
			$result = $this->db->get('tblmstindustry as in');
			
			$company_data = array();
			foreach($result->result() as $row) {
				$company_data = $row;
			}
			return $company_data;
			
		} else {
			return false;
		}
	}
	
	
	public function edit_Industry($post_Industry) {
	
		if($post_Industry) {
			 if($post_Industry['IsActive']==1)
					{
						$IsActive = true;
					} else {
						$IsActive = false;
					}
			$Industry_data = array(
				'IndustryName' => trim($post_Industry['IndustryName']),
				'UpdatedBy' => trim($post_Industry['UpdatedBy']),
				'UpdatedOn' => date('y-m-d H:i:s'),
				'IsActive' => $IsActive
			
			);
			
			$this->db->where('IndustryId',$post_Industry['IndustryId']);
			$res = $this->db->update('tblmstindustry',$Industry_data);
			
			if($res) {
				$log_data = array(
					'UserId' => trim($post_Industry['UpdatedBy']),
					'Module' => 'Industry',
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
	
	
	public function delete_Industry($post_Industry) {
	
		if($post_Industry) {
			
			$this->db->where('IndustryId',$post_Industry['id']);
			$res = $this->db->delete('tblmstindustry');
			
			if($res) {
				$log_data = array(
					'UserId' => trim($post_Industry['Userid']),
					'Module' => 'Industry',
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
