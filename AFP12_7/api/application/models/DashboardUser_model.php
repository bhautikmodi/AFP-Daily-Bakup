<?php

class DashboardUser_model extends CI_Model
 {
    public function getAllAssement($UserId = NULL) {
		
		if($UserId) {

			$this->db->select('cass.CAssessmentId,ts.TeamSize,cass.AssessmentName,cass.StartTime');
			$this->db->where('UserId',$UserId);
            $this->db->where('EndTime!=',NULL);
            $this->db->order_by('CAssessmentId','desc');
            $this->db->join('tblmstteamsize ts', 'ts.TeamSizeId = cass.TeamSizeId', 'left');
			$query = $this->db->get('tblcandidateassessment as cass');	
            $data = array();
            foreach($query->result() as $row){   
                //$assessment_data = '';
                $assessment_data['assessment']=$row;             
                $this->db->select('d.Name as domain, dksa.AvgRatingScale as ratingscale, "#001F49" as color');
				$this->db->where('dksa.CAssessmentId',$row->CAssessmentId);
				$this->db->join('tblmstdomain d', 'd.DomainId = dksa.DomainId', 'left');
				$query1 = $this->db->get('tbldomainwiseksa dksa');
				if($query1->result())
				{
                    $assessment_data['domainlist']=$query1->result();				   
                }  
                array_push($data,$assessment_data);         
            }	
            return $data;	
		}				
    }

    public function getPendingAssement($UserId = NULL) {
		
		if($UserId) {

			$this->db->select('cass.CAssessmentId,cass.AssessmentName,cass.StartTime');
			$this->db->where('UserId',$UserId);
            $this->db->where('EndTime',NULL);
            $this->db->order_by('CAssessmentId','desc');
			$query = $this->db->get('tblcandidateassessment as cass');	
            $data = array();
            if($query->result())
            {
                $data=$query->result();				   
            }
            return $data;	
		}				
    }


    public function getuser($UserId = NULL) {
		
		if($UserId) {
          

                $this->db->select('us.FirstName,us.UserId');
                $this->db->where('us.UserId',$UserId);
                $query = $this->db->get('tbluser us');
                $assessment_data= array();
                foreach($query->result() as $row)
                {
                    $assessment_data=$row;
                    
                }
		     return $assessment_data;
            
        }
    }
    public function getUserAssessDetail($CAssessmentId = NULL) {
		
		if($CAssessmentId) {
            $this->db->select('CAssessmentId');
			$this->db->where('CAssessmentId',$CAssessmentId);
			$this->db->where('EndTime!=',NULL);
			$query = $this->db->get('tblcandidateassessment');	
			if($query->num_rows()==1){

                $this->db->select('ca.CAssessmentId,ca.TeamSizeId,ca.AssessmentName,ca.Description,ts.TeamSize,ca.EndTime,ca.submitedDate,ca.StartTime, (select count(CKSAId) from tblcandidateksa where CAssessmentId = '.$CAssessmentId.')as totalksa');
                $this->db->where('ca.CAssessmentId',$CAssessmentId);
                $this->db->join('tblmstteamsize ts', 'ts.TeamSizeId = ca.TeamSizeId', 'left');
                $query = $this->db->get('tblcandidateassessment ca');
                $assessment_data = array();				
                foreach($query->result() as $row)
                {
                    $assessment_data=$row;				   
                }				
                //$this->db->select('d.Name as domain, dksa.AvgRatingScale as ratingscale, "#001F49" as color, dksa.PercentOfKSA, IF(0<=dksa.AvgRatingScale<=1, "General Awareness") ELSEIF(1<dksa.AvgRatingScale<=2, "Developing") ELSEIF(2<dksa.AvgRatingScale<=3, "Intermediate") ELSEIF(3<dksa.AvgRatingScale<=4, "Advanced") END IF as rscalename');
                $this->db->select('d.Name as domain, dksa.AvgRatingScale as ratingscale, "#001F49" as color, dksa.PercentOfKSA, "General Awareness" as rscalename');
                $this->db->where('dksa.CAssessmentId',$CAssessmentId);
                $this->db->join('tblmstdomain d', 'd.DomainId = dksa.DomainId', 'left');
                $query = $this->db->get('tbldomainwiseksa dksa');
                $domain_data = array();
                if($query->result())
                {
                    $domain_data=$query->result();				   
                }
                $this->db->select('rsksa.PercentOfKSA,rs.Name,rs.Description');
                $this->db->join('tblmstratingscale rs', 'rs.RatingScaleId = rsksa.RatingScaleId', 'left');
                $this->db->order_by('rs.RatingScaleId','asc');
                $this->db->where('rsksa.CAssessmentId',$CAssessmentId);
                $query = $this->db->get('tblratingscalewiseksa as rsksa');
                $rscale_data = array();
                if($query->result())
                {
                    $rscale_data=$query->result();				   
                }
                $this->db->select('DomainId,Name');
				$this->db->where('IsActive',1);
                $query = $this->db->get('tblmstdomain');
                //$carea_data = '';
                foreach($query->result() as $row)
                {
                    $this->db->select('CAreaId,Name,Description');
					$this->db->where('DomainId',$row->DomainId);
					$this->db->where('IsActive',1);
					$query1 = $this->db->get('tblmstcompetencyarea'); 
					$row->carea = $query1->result();
					$carea_data[] = $row;					
                }

                //$data = '';
                $data['assessment'] = $assessment_data;
                $data['domain'] = $domain_data;
                $data['rscale'] = $rscale_data;
                $data['carea'] = $carea_data;
                return $data;
            } else {
                return 'fail';
            }	
		}				
	}

 }
