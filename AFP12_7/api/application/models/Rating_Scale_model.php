<?php

class Rating_Scale_model extends CI_Model
 {

	public function add_ratingscale($post_ratingscale) {
	
		if($post_ratingscale) {
			
			if($post_ratingscale['IsActive']==1){
				$IsActive = true;
			} else {
				$IsActive = false;
			}

			$ratingscale_data = array(
				'Name' => $post_ratingscale['Name'],
				'Description' => $post_ratingscale['Description'],
				'IsActive' => $IsActive,
				'CreatedBy' => $post_ratingscale['CreatedBy'],
				'UpdatedBy' => $post_ratingscale['UpdatedBy'],
				'UpdatedOn' => date('y-m-d H:i:s'),
			);
			
			$res = $this->db->insert('tblmstratingscale',$ratingscale_data);
			
			if($res) {
				$log_data = array(
					'UserId' => trim($post_ratingscale['UpdatedBy']),
					'Module' => 'Ratingscale',
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
	
	public function getlist_ratingscale() {
	
		$this->db->select('RatingScaleId,Name,Description,IsActive');
		$this->db->order_by('RatingScaleId','asc');
		$result = $this->db->get('tblmstratingscale');
		
		$res = array();
		if($result->result()) {
			$res = $result->result();
		}
		return $res;
		
	}
	
	
	public function get_ratingscaledata($ratingscale_id = NULL) {
		
		if($ratingscale_id) {
			
			$this->db->select('RatingScaleId,,Name,Description,IsActive');
			$this->db->where('RatingScaleId',$ratingscale_id);
			$result = $this->db->get('tblmstratingscale');
			
			$ratingscale_data = array();
			foreach($result->result() as $row) {
				$ratingscale_data = $row;
			}
			return $ratingscale_data;
			
		} else {
			return false;
		}
	}
	
	
	public function edit_ratingscale($post_ratingscale) {
	
		if($post_ratingscale) {

			if($post_ratingscale['IsActive']==1){
				$IsActive = true;
			} else {
				$IsActive = false;
			}

			$ratingscale_data = array(
				'Name' => $post_ratingscale['Name'],
				'Description' => $post_ratingscale['Description'],
				'IsActive' => $IsActive,
				'UpdatedBy' => $post_ratingscale['UpdatedBy'],
				'UpdatedOn' => date('y-m-d H:i:s'),
			);
			
			$this->db->where('RatingScaleId',$post_ratingscale['RatingScaleId']);
			$res = $this->db->update('tblmstratingscale',$ratingscale_data);
			
			if($res) {
				$log_data = array(
					'UserId' => trim($post_ratingscale['UpdatedBy']),
					'Module' => 'Ratingscale',
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
	
	
	public function delete_ratingscale($post_ratingscale) {
	
		if($post_ratingscale) {
			
			$this->db->where('RatingScaleId',$post_ratingscale['id']);
			$res = $this->db->delete('tblmstratingscale');
				
			if($res) {
				$log_data = array(
					'UserId' => trim($post_ratingscale['Userid']),
					'Module' => 'Ratingscale',
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
