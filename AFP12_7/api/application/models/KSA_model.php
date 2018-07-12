<?php

class KSA_model extends CI_Model
 {

	public function add_ksa($post_ksa) {
	
		if($post_ksa) {
			
			if(trim($post_ksa['IsActive'])==1){
				$IsActive = true;
			} else {
				$IsActive = false;
			}

			$ksa_data = array(
				'Name' => trim($post_ksa['Name']),
				'CAreaId' => trim($post_ksa['CAreaId']),
				'IsActive' => $IsActive,
				'CreatedBy' => trim($post_ksa['CreatedBy']),
				'UpdatedBy' => trim($post_ksa['UpdatedBy']),
				'UpdatedOn' => date('y-m-d H:i:s'),
			);
			
			$res = $this->db->insert('tblmstksa',$ksa_data);
			
			if($res) {
				$log_data = array(
					'UserId' => trim($post_ksa['CreatedBy']),
					'Module' => 'Ksa',
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
	
	public function getlist_ksa() {
	
		$this->db->select('ksa.KSAId,ksa.Name as ksaName,ksa.IsActive,area.CAreaId,area.Name as CAreaName,(SELECT COUNT(ck.CKSAId) FROM tblcandidateksa as ck WHERE ksa.KSAId=ck.KSAId) as isdisabled');
		$this->db->join('tblmstcompetencyarea area', 'ksa.CAreaId = area.CAreaId', 'left');
		$this->db->order_by('KSAId','asc');
		$result = $this->db->get('tblmstksa ksa');
		
		$res = array();
		if($result->result()) {
			$res = $result->result();
		}
		return $res;
		
	}
	
	
	public function get_ksadata($ksa_id = NULL) {
		
		if($ksa_id) {
			
			$this->db->select('ksa.KSAId,ksa.Name,ksa.CAreaId,ksa.IsActive,(SELECT COUNT(ck.CKSAId) FROM tblcandidateksa as ck WHERE ksa.KSAId=ck.KSAId) as isdisabled');
			$this->db->where('KSAId',$ksa_id);
			$result = $this->db->get('tblmstksa ksa');
			
			$ksa_data = array();
			foreach($result->result() as $row) {
				$ksa_data = $row;
			}
			return $ksa_data;
			
		} else {
			return false;
		}
	}
	
	
	public function edit_ksa($post_ksa) {
	
		if($post_ksa) {
			
			if(trim($post_ksa['IsActive'])==1){
				$IsActive = true;
			} else {
				$IsActive = false;
			}

			$ksa_data = array(
				'Name' => trim($post_ksa['Name']),
				'CAreaId' => trim($post_ksa['CAreaId']),
				'IsActive' => $IsActive,
				'UpdatedBy' => trim($post_ksa['UpdatedBy']),
				'UpdatedOn' => date('y-m-d H:i:s'),
			);
			
			$this->db->where('KSAId',trim($post_ksa['KSAId']));
			$res = $this->db->update('tblmstksa',$ksa_data);
			
			if($res) {
				$log_data = array(
					'UserId' => trim($post_ksa['UpdatedBy']),
					'Module' => 'Ksa',
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
	
	
	public function delete_ksa($post_ksa) {
	
		if($post_ksa) {
			
			$this->db->where('KSAId',$post_ksa['id']);
			$res = $this->db->delete('tblmstksa');
			
			if($res) {
				if($res) {
					$log_data = array(
					'UserId' => trim($post_ksa['Userid']),
					'Module' => 'Ksa',
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
	public function getCAreaList() {
	
		$this->db->select('CAreaId,Name');
		$this->db->where('IsActive',1);
		$this->db->order_by('Name','asc');
		$result = $this->db->get('tblmstcompetencyarea');
		
		$res = array();
		if($result->result()) {
			$res = $result->result();
		}
		return $res;
		
	}
	
}
