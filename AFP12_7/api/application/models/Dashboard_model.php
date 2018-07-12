<?php

class Dashboard_model extends CI_Model
 {	
	public function getlist_User($RoleId = NULL) {
		if($RoleId) {
			$this->db->select('UserId');
			if($RoleId!=4){
				$this->db->where('RoleId!=',4);
			}
			$result = $this->db->get('tbluser');
			return 	$result->num_rows();
		}
		else
		{
			return false;
		}
	}

	public function getlist_Domain() {
		
		$this->db->select('DomainId');
		$result1 = $this->db->get('tblmstdomain');
		return 	$result1->num_rows();
	}
	public function getlist_Carea() {
		
		$this->db->select('CAreaId');
		$result2 = $this->db->get('tblmstcompetencyarea');
		return 	$result2->num_rows();
	}
	public function getlist_Tksa() {
		
		$this->db->select('KSAId');
		$result3 = $this->db->get('tblmstksa');
		return 	$result3->num_rows();
	}
	public function getlist_Course() {
	
		$this->db->select('CourseId');
		$result4 = $this->db->get('tblmstcourse');
		return 	$result4->num_rows();
	}

	public function getlist_Company() {
	
		$this->db->select('CompanyId');
		$result5 = $this->db->get('tblcompany');
		return 	$result5->num_rows();
	}

	public function getPendingAssessment() {
	
		$this->db->select('ass.AssessmentName,ass.StartTime,u.EmailAddress, CONCAT(u.FirstName," ",u.LastName) as UserName, (select count(CKSAId) from tblcandidateksa where CAssessmentId = ass.CAssessmentId) as totalksa,(select count(CKSAId) from tblcandidateksa where CAssessmentId = ass.CAssessmentId && RatingScaleId > 0) as attendksa');
		$this->db->where('ass.EndTime',NULL);
		$this->db->join('tbluser u', 'u.UserId = ass.UserId', 'left');
		$result = $this->db->get('tblcandidateassessment as ass');		
		$res = array();
		if($result->result()) {
			$res = $result->result();
		}
		return $res;
		
	}
}
