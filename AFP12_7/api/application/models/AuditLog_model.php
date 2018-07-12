<?php

class AuditLog_model extends CI_Model
 {	
	public function getEmailLog() {
	
		$this->db->select('el.EmailLogId,el.From,el.Cc,el.Bcc,el.To,el.Subject,el.MessageBody,el.CreatedOn');
		$this->db->order_by('el.EmailLogId',"desc");
		$result = $this->db->get('tblemaillog as el');		
		$res = array();
		if($result->result()) {
			$res = $result->result();
		}
		return $res;
		
	}

	public function getLoginLog() {
	
		$this->db->select('ll.tblLoginLogId,ll.UserId,ll.LoginType,ll.PanelType,ll.CreatedOn,CONCAT(u.FirstName," ",u.LastName) as UserName,ur.RoleName');
		$this->db->order_by('ll.tblLoginLogId',"desc");
		$this->db->join('tbluser u', 'u.UserId = ll.UserId', 'left');
		$this->db->join('tblmstuserrole ur', 'ur.RoleId = u.RoleId', 'left');
		$result = $this->db->get('tblloginlog as ll');		
		$res = array();
		if($result->result()) {
			$res = $result->result();
		}
		return $res;
		
	}

	public function getActivityLog() {
	
		$this->db->select('al.ActivityLogId,al.UserId,al.Module,al.Activity,al.CreatedOn,CONCAT(u.FirstName," ",u.LastName) as UserName,ur.RoleName');
		$this->db->order_by('al.ActivityLogId',"desc");
		$this->db->join('tbluser u', 'u.UserId = al.UserId', 'left');
		$this->db->join('tblmstuserrole ur', 'ur.RoleId = u.RoleId', 'left');
		$result = $this->db->get('tblactivitylog as al');		
		$res = array();
		if($result->result()) {
			$res = $result->result();
		}
		return $res;
		
	}
}
