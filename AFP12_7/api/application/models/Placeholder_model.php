<?php

class Placeholder_model extends CI_Model
 {

	public function add_placeholder($post_placeholder) {
	
		if($post_placeholder) {
			
			if(trim($post_placeholder['IsActive'])==1){
				$IsActive = true;
			} else {
				$IsActive = false;
			}

			$placeholder_data = array(
				'PlaceholderName' => trim($post_placeholder['PlaceholderName']),
				'ColumnId' => trim($post_placeholder['ColumnId']),
				'IsActive' => $IsActive,
				'CreatedBy' => trim($post_placeholder['CreatedBy']),
				'UpdatedBy' => trim($post_placeholder['UpdatedBy']),
				'UpdatedOn' => date('y-m-d H:i:s'),
			);
			
			$res = $this->db->insert('tblmstemailplaceholder',$placeholder_data);
			
			if($res) {
				return true;
			} else {
				return false;
			}
	
		} else {
			return false;
		}
	}
	
	public function getlist_placeholder() {
	
		$this->db->select('p.PlaceholderId,t.DisplayName as tablename,c.DisplayName as columnname,t.TableId,c.ColumnId,p.PlaceholderName,p.IsActive');
		$this->db->join('tblmsttablecolumn c', 'p.ColumnId = c.ColumnId', 'left');
		$this->db->join('tblmsttable t', 'c.TableId = t.TableId', 'left');		
		$this->db->order_by('PlaceholderId','asc');
		$result = $this->db->get('tblmstemailplaceholder p');
		
		$res = array();
		if($result->result()) {
			$res = $result->result();
		}
		return $res;
		
	}
	
	
	public function get_placeholderdata($placeholder_id = NULL) {
		
		if($placeholder_id) {
			
			$this->db->select('p.PlaceholderId,p.PlaceholderName,p.ColumnId,p.IsActive,c.TableId');
			$this->db->where('PlaceholderId',$placeholder_id);
			$this->db->join('tblmsttablecolumn c', 'p.ColumnId = c.ColumnId', 'left');	
			$result = $this->db->get('tblmstemailplaceholder p');
			
			$placeholder_data = array();
			foreach($result->result() as $row) {
				$placeholder_data = $row;
			}
			return $placeholder_data;
			
		} else {
			return false;
		}
	}
	
	
	public function edit_placeholder($post_placeholder) {
	
		if($post_placeholder) {
			
			if(trim($post_placeholder['IsActive'])==1){
				$IsActive = true;
			} else {
				$IsActive = false;
			}

			$placeholder_data = array(
				'PlaceholderName' => trim($post_placeholder['PlaceholderName']),
				'ColumnId' => trim($post_placeholder['ColumnId']),
				'IsActive' => $IsActive,
				'UpdatedBy' => trim($post_placeholder['UpdatedBy']),
				'UpdatedOn' => date('y-m-d H:i:s'),
			);
			
			$this->db->where('PlaceholderId',trim($post_placeholder['PlaceholderId']));
			$res = $this->db->update('tblmstemailplaceholder',$placeholder_data);
			
			if($res) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}	
	
	}
	
	
	public function delete_placeholder($placeholder_id) {
	
		if($placeholder_id) {
			
			$this->db->where('PlaceholderId',$placeholder_id);
			$res = $this->db->delete('tblmstemailplaceholder');
			
			if($res) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}
	
	public function getTableList() {
	
		$this->db->select('TableId,TableName,DisplayName,IsActive');
		$this->db->where('IsActive',1);
		$this->db->order_by('TableName','asc');
		$result = $this->db->get('tblmsttable');
		
		$res = array();
		if($result->result()) {
			$res = $result->result();
		}
		return $res;
		
	}

	public function getColumnList($table_id = NULL) {
		
		if($table_id) {
			
			$this->db->select('ColumnId,DisplayName');
			$this->db->where('TableId',$table_id);
			$this->db->order_by('DisplayName','asc');
			$result = $this->db->get('tblmsttablecolumn');
			
			$res = array();
			if($result->result()) {
				$res = $result->result();
			}
			return $res;
			
		} else {
			return false;
		}
	}
	
}
