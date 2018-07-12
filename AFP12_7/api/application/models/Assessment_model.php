<?php

class Assessment_model extends CI_Model
 {

	public function getlist_ksa($CAssessmentId = NULL) {
		
		if($CAssessmentId) {

			$this->db->select('CAssessmentId');
			$this->db->where('CAssessmentId',$CAssessmentId);
			$this->db->where('EndTime',NULL);
			$query = $this->db->get('tblcandidateassessment');	
			if($query->num_rows()==1){
				
				$this->db->select('CAssessmentId,AssessmentName,Description');
				$this->db->where('ca.CAssessmentId',$CAssessmentId);
				$details = $this->db->get('tblcandidateassessment as ca');
				foreach($details->result() as $row)
				{
				   $detail=$row;				   
				}	
				
				$this->db->select('ck.CKSAId,ck.CAssessmentId,ck.KSAId,ck.RatingScaleId,ksa.Name');
				$this->db->join('tblmstksa ksa', 'ksa.KSAId = ck.KSAId', 'left');
				$this->db->order_by('ck.CKSAId','asc');
				$this->db->where('ck.CAssessmentId',$CAssessmentId);
				$query = $this->db->get('tblcandidateksa as ck');	
				$result = $query->result();
				$data = array();
				$j = -1;
				for($i=0; $i<$query->num_rows(); $i++) {
					if($i==0 || $i%6==0){
						$res = array();
						$j++;
					}					
					array_push($res,$result[$i]);			
					$data[$j]['row'] = $res;
				}
				//$data1="";
				$data1['ksaDetails']=$detail;
				//shuffle($data);
				$data1['ksa']=$data;
				$data1['totalksa']=$query->num_rows();
				return $data1;
			} else {
				return 'fail';
			}			
		}	
			
	}

	public function edit_ksa($post_ksa) {
		if($post_ksa)
		{
			$ksa_data = array(
				'RatingScaleId' => trim($post_ksa['RatingScaleId']),
				'UpdatedOn' => date('y-m-d H:i:s')
			);
				$this->db->where('CKSAId',trim($post_ksa['CKSAId']));
				$res=$this->db->update('tblcandidateksa',$ksa_data);
				if($res)
				{
					return true;
				}
				else
				{
					return false;
				}
		} 
		else
		{
			return false;
		}
	}

	public function finalSubmit($CAssessmentId = NULL) {
		if($CAssessmentId) {
			$candidate_ksa = array(
				'EndTime' => date('y-m-d H:i:s'),
				'UpdatedOn' => date('y-m-d H:i:s')
			);
			$this->db->where('CAssessmentId',$CAssessmentId);
			$res=$this->db->update('tblcandidateassessment',$candidate_ksa);
			if($res)
			{
				$this->db->select('DomainKSAId');
				$this->db->where('CAssessmentId',$CAssessmentId);
				$query1 = $this->db->get('tbldomainwiseksa');

				$this->db->select('CAreaKSAId');
				$this->db->where('CAssessmentId',$CAssessmentId);
				$query2 = $this->db->get('tblcareawiseksa');

				$this->db->select('RatingScaleKSAId');
				$this->db->where('CAssessmentId',$CAssessmentId);
				$query2 = $this->db->get('tblratingscalewiseksa');

				if($query1->num_rows()==0){
					$domain = $this->db->query('INSERT INTO tbldomainwiseksa (CAssessmentId, DomainId, AvgRatingScale, NoOfKSA, PercentOfKSA) SELECT '.$CAssessmentId.' AS CAssessmentId, d.DomainId, round(AVG(cank.RatingScaleId), 2) AS AvgRatingScale, COUNT(cank.CAssessmentId) AS NoOfKSA, round((100*COUNT(cank.CAssessmentId))/(SELECT COUNT(CAssessmentId) FROM tblcandidateksa WHERE CAssessmentId = '.$CAssessmentId.'), 2) AS PercentOfKSA FROM tblcandidateksa AS cank LEFT JOIN tblmstksa AS k ON k.KSAId = cank.KSAId LEFT JOIN tblmstcompetencyarea AS ca ON ca.CAreaId = k.CAreaId LEFT JOIN tblmstdomain AS d ON d.DomainId = ca.DomainId  WHERE cank.CAssessmentId = '.$CAssessmentId.' GROUP BY d.DomainId');
				}
				if($query2->num_rows()==0){
					$carea = $this->db->query('INSERT INTO tblcareawiseksa (CAssessmentId, CAreaId, NoOfKSA, PercentOfKSA) SELECT '.$CAssessmentId.' AS CAssessmentId, ca.CAreaId, COUNT(cank.CAssessmentId) AS NoOfKSA, round((100*COUNT(cank.CAssessmentId))/(SELECT COUNT(CAssessmentId) FROM tblcandidateksa WHERE CAssessmentId = '.$CAssessmentId.'), 2) AS PercentOfKSA FROM tblcandidateksa AS cank LEFT JOIN tblmstksa AS k ON k.KSAId = cank.KSAId LEFT JOIN tblmstcompetencyarea AS ca ON ca.CAreaId = k.CAreaId WHERE cank.CAssessmentId = '.$CAssessmentId.' GROUP BY ca.CAreaId');
				}
				if($query2->num_rows()==0){
					$rsacle = $this->db->query('INSERT INTO tblratingscalewiseksa (CAssessmentId, RatingScaleId, NoOfKSA, PercentOfKSA) SELECT '.$CAssessmentId.' AS CAssessmentId, rs.RatingScaleId, COUNT(cank.CAssessmentId) AS NoOfKSA, round((100*COUNT(cank.CAssessmentId))/(SELECT COUNT(CAssessmentId) FROM tblcandidateksa WHERE CAssessmentId = '.$CAssessmentId.'), 2) AS PercentOfKSA FROM tblcandidateksa AS cank LEFT JOIN tblmstksa AS k ON k.KSAId = cank.KSAId LEFT JOIN tblmstratingscale AS rs ON rs.RatingScaleId = cank.RatingScaleId WHERE cank.CAssessmentId = '.$CAssessmentId.' GROUP BY rs.RatingScaleId');
				}
				
				$query = $this->db->query('select UserId from tblcandidateassessment where CAssessmentId = '.$CAssessmentId);
				return $query->result();
			}
			else
			{
				return false;
			}
		}
		else
		{
			return false;
		}
	}	

	public function getResult($CAssessmentId = NULL){
		if($CAssessmentId) {
			$this->db->select('CAssessmentId');
			$this->db->where('CAssessmentId',$CAssessmentId);
			$this->db->where('EndTime!=',NULL);
			$query = $this->db->get('tblcandidateassessment');	
			if($query->num_rows()==1){

				$this->db->select('ca.CAssessmentId,ca.TeamSizeId,ca.AssessmentName,ca.Description,ts.TeamSize');
				$this->db->where('ca.CAssessmentId',$CAssessmentId);
				$this->db->join('tblmstteamsize ts', 'ts.TeamSizeId = ca.TeamSizeId', 'left');
				$query = $this->db->get('tblcandidateassessment ca');
				$assessment_data = array();				
				foreach($query->result() as $row)
				{
				   $assessment_data=$row;				   
				}				
				$this->db->select('d.Name as domain, dksa.AvgRatingScale as ratingscale, "#001F49" as color');
				$this->db->where('dksa.CAssessmentId',$CAssessmentId);
				$this->db->join('tblmstdomain d', 'd.DomainId = dksa.DomainId', 'left');
				$query = $this->db->get('tbldomainwiseksa dksa');
				$domain_data = array();
				if($query->result())
				{
				   $domain_data=$query->result();				   
				}
				//$data = '';
				$data['assessment'] = $assessment_data;
				$data['domain'] = $domain_data;
				return $data;
			} else {
				return 'fail';
			}			
		}	
	}
	
}
