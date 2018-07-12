<?php

class Domain_model extends CI_Model
 {

	public function add_domain($post_domain) {
	
		if($post_domain) {
			
			if(trim($post_domain['IsActive'])==1){
				$IsActive = true;
			} else {
				$IsActive = false;
			}

			$domain_data = array(
				'Name' => trim($post_domain['Name']),
				'IsActive' => $IsActive,
				'CreatedBy' => trim($post_domain['CreatedBy']),
				'UpdatedBy' => trim($post_domain['UpdatedBy']),
				'UpdatedOn' => date('y-m-d H:i:s'),
			);
			
			$res = $this->db->insert('tblmstdomain',$domain_data);
			
			if($res) {
				$log_data = array(
					'UserId' => trim($post_domain['CreatedBy']),
					'Module' => 'Domain',
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
	
	public function getlist_domain() {
	
		$this->db->select('dom.DomainId,dom.Name,dom.IsActive,(SELECT COUNT(mc.CAreaId) FROM tblmstcompetencyarea as mc WHERE mc.DomainId=dom.DomainId) as isdisabled');
		$this->db->order_by('DomainId','asc');
		$result = $this->db->get('tblmstdomain as dom');		
		$res = array();
		if($result->result()) {
			$res = $result->result();
		}
		return $res;
		
	}
	
	
	public function get_domaindata($domain_id = NULL) {
		
		if($domain_id) {
			
			$this->db->select('dom.DomainId,dom.Name,dom.IsActive,(SELECT COUNT(mc.CAreaId) FROM tblmstcompetencyarea as mc WHERE mc.DomainId=dom.DomainId) as isdisabled');
			$this->db->where('dom.DomainId',$domain_id);
			$result = $this->db->get('tblmstdomain as dom');
			
			$domain_data = array();
			foreach($result->result() as $row) {
				$domain_data = $row;
			}
			return $domain_data;
			
		} else {
			return false;
		}
	}
	
	
	public function edit_domain($post_domain) {
	
		if($post_domain) {

			if(trim($post_domain['IsActive'])==1){
				$IsActive = true;
			} else {
				$IsActive = false;
			}

			$domain_data = array(
				'Name' => trim($post_domain['Name']),
				'IsActive' => $IsActive,
				'UpdatedBy' => trim($post_domain['UpdatedBy']),
				'UpdatedOn' => date('y-m-d H:i:s'),
			);
			
			$this->db->where('DomainId',trim($post_domain['DomainId']));
			$res = $this->db->update('tblmstdomain',$domain_data);
			
			if($res) {
				$log_data = array(
					'UserId' => trim($post_domain['UpdatedBy']),
					'Module' => 'Domain',
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
	
	
	public function delete_domain($post_domain) {
	
		if($post_domain) {
			
			$this->db->where('DomainId',$post_domain['id']);
			$res = $this->db->delete('tblmstdomain');
			
			if($res) {$log_data = array(
				'UserId' => trim($post_domain['Userid']),
				'Module' => 'Domain',
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

		// if($domain_id) {

		// 	$this->db->select('CAreaId');
		// 	$this->db->where('DomainId',$domain_id);
		// 	$result = $this->db->get('tblmstcompetencyarea');
		// 	if($result->num_rows()==0){
		// 		$this->db->where('DomainId',$domain_id);
		// 		$res = $this->db->delete('tblmstdomain');
				
		// 		if($res) {
		// 			return true;
		// 		} else {
		// 			return false;
		// 		}
		// 	} else {
		// 		return false;
		// 	}
			
		// } else {
		// 	return false;
		// }
		
	}
	
}
