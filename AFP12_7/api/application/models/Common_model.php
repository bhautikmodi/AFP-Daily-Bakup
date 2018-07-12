<?php

class Common_model extends CI_Model
 {
	
	public function get_permissiondata($data = NULL)
	{		
		if($data) {
			
			$this->db->select('rp.PermissionId,rp.RoleId,rp.ScreenId,rp.View,rp.AddEdit,rp.Delete');
			$this->db->join('tblrolespermission rp', 'rp.ScreenId = s.ScreenId', 'left');
			$this->db->where('s.Name',trim($data['screen']));
			$this->db->where('rp.RoleId',trim($data['RoleId']));
			$this->db->where('rp.IsActive',1);
			$result = $this->db->get('tblmstscreen s');
			
			$permission_data = array();
			foreach($result->result() as $row) {
				$permission_data = $row;
			}
			return $permission_data;
			
		} else {
			return false;
		}
	}
	
}
