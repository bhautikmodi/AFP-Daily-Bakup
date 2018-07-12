<?php

class AssessmentDetails_model extends CI_Model
 {
	public function add_AssessmentDetails($post_AssessmentDetails) {
			
		if($post_AssessmentDetails) {
			if(isset($post_AssessmentDetails['Description']) && !empty($post_AssessmentDetails['Description'])) 
			{
				$des=$post_AssessmentDetails['Description'];
			}
			else
			{
				$des='';
			}
			$AssessmentDetails_data = array(
				'UserId'=>trim($post_AssessmentDetails['UserId']),
				'AssessmentName' => trim($post_AssessmentDetails['AssessmentName']),
				'TeamSizeId' => trim($post_AssessmentDetails['TeamSizeId']),
				'Description' => trim($des),
				'CreatedBy' => trim($post_AssessmentDetails['CreatedBy']),
				'UpdatedBy' => trim($post_AssessmentDetails['UpdatedBy']),
				'UpdatedOn' => date('y-m-d H:i:s'),
				'StartTime' => date('y-m-d H:i:s'),		
			);
			$res = $this->db->insert('tblcandidateassessment',$AssessmentDetails_data);
			if($res) {				
				$insert_id = $this->db->insert_id();
				$ksaq = $this->db->query('SELECT Value FROM tblmstconfiguration as config WHERE config.Key = "NoOfKSA" LIMIT 1');
				$ksa = $ksaq->result();
				$totalksa = $ksa[0]->Value; 
				$result = $this->db->query('SELECT CAreaId,(SELECT COUNT(k1.KSAId) FROM tblmstksa AS k1 WHERE k1.CAreaId=ca.CAreaId and k1.IsActive=1) AS totalksa,(SELECT COUNT(k1.KSAId) FROM tblmstksa AS k1 WHERE k1.CAreaId=ca.CAreaId and k1.IsActive=1) AS tempksa, 0 AS destksa from tblmstcompetencyarea as ca left join tblmstdomain as d ON ca.DomainId=d.DomainId where d.IsActive=1 and ca.IsActive=1');
				$obj = $result->result(); 
				$i = 0;
				while($i<$totalksa){
					foreach($obj as $row) {
						if($row->tempksa > 0){
							$row->tempksa = $row->tempksa - 1;
							$row->destksa = $row->destksa + 1;
							$i++;
							if($i==$totalksa){
								break;
							}
						}			
					}
				}	
				$res = array();
				foreach($obj as $row) {
					$data = $this->db->query('SELECT '.$insert_id.' as CAssessmentId,ksa.KSAId as KSAId FROM tblmstksa AS ksa  WHERE ksa.CAreaId = '.$row->CAreaId.' order by RAND() LIMIT '.$row->destksa);	
					$array = json_decode(json_encode($data->result()), True);
		 			$res = array_merge($res,$array);
				}
				shuffle($res);
				foreach($res as $obj) {
					$data = $this->db->query('INSERT INTO tblcandidateksa (CAssessmentId, KSAId) VALUES ('.$obj["CAssessmentId"].','.$obj["KSAId"].')');	
				}				
				return $insert_id;
			} else {
				return false;
			}
	
		} else {
			return false;
		}
	}	
	
	public function getTeamSizeList() {
	
		$this->db->select('TeamSizeId,TeamSize,IsActive');
		$this->db->where('IsActive',1);
		$result = $this->db->get('tblmstteamsize');
		
		$res = array();
		if($result->result()) {
			$res = $result->result();
		}
		return $res;
		
	}
	
}
