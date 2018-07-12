<?php

class Rolepermission_model extends CI_Model
 {

	public function getuserrolelist()
	{
		$this->db->select('RoleId,RoleName');
		$this->db->where('RoleName!=','IT');
		$this->db->where('RoleName!=','General User');
		$result=$this->db->get('tblmstuserrole');
		
		$res=array();
		if($result->result())
		{
			$res=$result->result();
		}
		return $res;
	}

	public function getpermissionlist($role_id = NULL)
	{
		if($role_id){
			$query = "SELECT s.ScreenId,s.Name,s.IsActive,r.PermissionId,(CASE WHEN r.AddEdit = 1 THEN 'true' ELSE NULL END) AS AddEdit,(CASE WHEN r.Delete = 1 THEN 'true' ELSE NULL END) AS dlt,(CASE WHEN r.View = 1 THEN 'true' ELSE NULL END) AS View FROM tblmstscreen as s LEFT JOIN tblrolespermission as r ON s.ScreenId = r.ScreenId WHERE s.IsActive = 1 AND r.RoleId = ".$role_id;
			$result = $this->db->query($query);
			$res=array();
			if($result->result())
			{
				$res=$result->result();
			}
			return $res;
		} else {
			return false;
		}
		
	}

	public function update_permission($post_permission) {
	
		if($post_permission) {

			foreach($post_permission as $post){

				if($post['View']==true){
					$View = 1;
				} else {
					$View = 0;
				}
				if($post['AddEdit']==true){
					$AddEdit = 1;
				} else {
					$AddEdit = 0;
				}
				if($post['dlt']==true){
					$dlt = 1;
				} else {
					$dlt = 0;
				}

				$permission_data = array(
					'View' => $View,
					'AddEdit' => $AddEdit,
					'Delete' => $dlt,
					'UpdatedBy' => 1,
					'UpdatedOn' => date('y-m-d H:i:s'),
				);				
				$this->db->where('PermissionId',$post['PermissionId']);
				$res = $this->db->update('tblrolespermission',$permission_data);
			}			
			if($res) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}	
	
	}

	// INSERT INTO tblrolespermission (ScreenId,RoleId,CreatedBy,UpdatedBy,UpdatedOn) 
	// SELECT s.ScreenId, 3, 1, 1, '2018-04-04 12:46:13'
	// FROM tblmstscreen as s 
}
