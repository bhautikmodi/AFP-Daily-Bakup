<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Rolepermission extends MY_Controller {


    public function __construct() {
	
		parent::__construct();
		
		$this->load->model('Rolepermission_model');
		
	}

	public function getLeftMenu($role_id = NULL){
		if (!empty($role_id)) {
			if($role_id!=4){
				$query = "SELECT s.ScreenId,s.ParentId,s.DisplayName,s.Url,s.Icon,s.SelectedClass FROM `tblmstscreen` AS s LEFT JOIN tblrolespermission AS r ON s.ScreenId=r.ScreenId WHERE r.RoleId=$role_id and (s.ParentId=0 or s.ScreenId=s.ParentId) and (r.View=1 or r.AddEdit=1 or r.Delete=1) ORDER BY s.SerialNo ASC";
				$res = $this->db->query($query);
				$array = json_decode(json_encode($res->result()), True);
				$result = array();
				foreach($array as $row){
					if($row['ScreenId']==$row['ParentId']){
						$sub_query = "SELECT s.ScreenId,s.ParentId,s.DisplayName,s.Url,s.Icon,s.SelectedClass FROM `tblmstscreen` AS s LEFT JOIN tblrolespermission AS r ON s.ScreenId=r.ScreenId WHERE r.RoleId=2 and s.ParentId!=s.ScreenId and s.ParentId=".$row['ScreenId']." and (r.View=1 or r.AddEdit=1 or r.Delete=1) ORDER BY s.SerialNo ASC";
						$sub_res = $this->db->query($sub_query);
						$sub_array = json_decode(json_encode($sub_res->result()), True); 
						$row['child']=$sub_array;
						if(count($sub_array)>0){
							$row['check']=true;
							array_push($result,$row);
						}
					} else {
						$row['check']=false;
						array_push($result,$row);
					}				
				}
				echo json_encode($result);

			} elseif($role_id==4){
				$query = "SELECT s.ScreenId,s.ParentId,s.DisplayName,s.Url,s.Icon,s.SelectedClass FROM `tblmstscreen` AS s WHERE s.ParentId=0 or s.ScreenId=s.ParentId ORDER BY s.SerialNo ASC";
				$res = $this->db->query($query);
				$array = json_decode(json_encode($res->result()), True);
				$result = array();
				foreach($array as $row){
					if($row['ScreenId']==$row['ParentId']){
						$sub_query = "SELECT s.ScreenId,s.ParentId,s.DisplayName,s.Url,s.Icon,s.SelectedClass FROM `tblmstscreen` AS s WHERE s.ParentId!=s.ScreenId and s.ParentId=".$row['ScreenId']." ORDER BY s.SerialNo ASC";
						$sub_res = $this->db->query($sub_query);
						$sub_array = json_decode(json_encode($sub_res->result()), True); 
						$row['child']=$sub_array;
						if(count($sub_array)>0){
							$row['check']=true;
							array_push($result,$row);
						}
					} else {
						$row['check']=false;
						array_push($result,$row);
					}				
				}
				echo json_encode($result);

			}
		}
	}

	public function getDefault()
	{
		//$data="";		
		$data['role']=$this->Rolepermission_model->getuserrolelist();
		$data['permission']=$this->Rolepermission_model->getpermissionlist(1);		
		echo json_encode($data);
	}

	public function getRolePermission($role_id = NULL)
	{
		if (!empty($role_id)) {
			//$data="";
			$data=$this->Rolepermission_model->getpermissionlist($role_id);		
			echo json_encode($data);			
		}		
	}

	public function update_permission() {
		
		$post_permission = json_decode(trim(file_get_contents('php://input')), true);		

		if ($post_permission) {
			$result = $this->Rolepermission_model->update_permission($post_permission);
			if($result) {
				echo json_encode($result);	
			}							
		}
		
	}	
		
}
