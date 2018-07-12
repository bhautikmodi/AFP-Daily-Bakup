<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Common extends CI_Controller {


    public function __construct() {
	
		parent::__construct();
		
		$this->load->model('Common_model');
		
	}

	public function hello1(){
		$CAssessmentId = 18;
		$data = $this->db->query('SELECT dk.DomainId,dk.AvgRatingScale,ROUND(dk.AvgRatingScale) as avg, d.Name FROM tbldomainwiseksa AS dk LEFT JOIN tblmstdomain AS d ON dk.DomainId = d.DomainId WHERE CAssessmentId='.$CAssessmentId);
		$obj = '';		
		foreach($data->result() as $row)
		{	
			$domain = array();
			$array = json_decode(json_encode($row), True);
			$domain = $array;
			//$data1 = $this->db->query('SELECT ConfigurationId,`Key`,`Value` FROM tblmstconfiguration AS cl WHERE cl.Key = "CourseLevel" AND ((cl.Value = "Foundational" AND '.$row->avg.' in (0,1,2)) OR  (cl.Value = "Intermediate" AND '.$row->avg.' in (0,1,2,3)) OR (cl.Value = "Advanced" AND '.$row->avg.' in (0,1,2,3,4)))');
			$data1 = $this->db->query('SELECT rs.Name, (SELECT c.ConfigurationId FROM tblmstconfiguration AS c WHERE c.Key="CourseLevel" AND (CASE WHEN (rs.Name="Developing" OR rs.Name="General Awareness") THEN c.value="Foundational" WHEN rs.Name="Intermediate" THEN c.value="Intermediate" WHEN rs.Name="Advanced" THEN c.value="Advanced" END)) as ConfigurationId FROM tblmstratingscale AS rs WHERE (rs.Name = "General Awareness" AND '.$row->avg.' in (0,1)) OR (rs.Name = "Developing" AND '.$row->avg.' in (0,1,2)) OR  (rs.Name = "Intermediate" AND '.$row->avg.' in (0,1,2,3)) OR (rs.Name = "Advanced" AND '.$row->avg.' in (0,1,2,3,4))');
			$domain['rs'] = array();                
			foreach($data1->result() as $row1)
			{	 
				              
				$array1 = json_decode(json_encode($row1), True);
				$data3 = $this->db->query('SELECT c.CourseId,c.Name,c.CourseLevelId FROM tblmstcourse AS c WHERE c.DomainId = '.$row->DomainId.' && c.CourseLevelId = '.$row1->ConfigurationId);
				$array2 = json_decode(json_encode($data3->result()), True);
				$array1['course'] = $array2;
				$domain['rs'][] = $array1;
			}
			$obj[] = $domain; 
		}  
		print_r($obj);
	}
	
	public function get_permissiondata() {
		
		$post_permission = json_decode(trim(file_get_contents('php://input')), true);		

		if ($post_permission) {
			$data = "";		
			$data = $this->Common_model->get_permissiondata($post_permission);
			echo json_encode($data);						
		}
				
	}	
	
}
