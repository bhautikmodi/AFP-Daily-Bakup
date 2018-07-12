<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Remaining extends CI_Controller 
{	
	public function __construct()
	{
		parent::__construct();
		$this->load->model('Remaining_model');
	}
	
	
	public function addRemaining()
	{
		$post_remaining = json_decode(trim(file_get_contents('php://input')), true);
		if ($post_remaining) 
			{
				if($post_remaining['ConfigurationId']>0)
				{
					$result = $this->Remaining_model->edit_remaining($post_remaining);
					if($result)
					{
						echo json_encode($post_remaining);	
					}	
				}
				else
				{
					
					$result = $this->Remaining_model->add_remaining($post_remaining); 
					if($result)
					{
						echo json_encode($post_remaining);	
					}	

				}
					
			}
	}
	
	
	//Delete UserList
	public function delete($confi_id = NULL) 
	{
		
		if(!empty($confi_id)) {

			$result = $this->Remaining_model->delete_remaining($confi_id);			
			if($result) {
				echo json_encode("Delete successfully");	
			}	
			
		} 
			
	}
	
	//get userId edit
	public function getById($confi_id=null)
	{	
		//$this->load->model('Country_model');
		if(!empty($confi_id))
		{
			$data=[];
			$data=$this->Remaining_model->get_remainingdata($confi_id);
			echo json_encode($data);
		}
	}
	
	
	
	public function getDays()
	{
		//$data="";
		
		$data=$this->Remaining_model->getlist_days();
		if($data)
		{
			foreach($data as $days)
			{ 
				   $Day=$days->Day;
				   $datetime1=date('Y-m-d',strtotime('-'.$Day.'days'));
			
				$data2=$this->Remaining_model->getlist_value($datetime1);
	
				if($data2)
				{						
					foreach ($data2 as $users)
					{
						$this->db->select('ca.AssessmentName,ca.StartTime,ts.TeamSize');
						$this->db->join('tblmstteamsize ts', 'ts.TeamSizeId = ca.TeamSizeId', 'left');
						$this->db->where('ca.CAssessmentId',$users->CAssessmentId);
						$smtp2 = $this->db->get('tblcandidateassessment ca');	
						foreach($smtp2->result() as $row) {
							$ass_name = $row->AssessmentName;
							$ass_start_date = $row->StartTime;
							$team_size = $row->TeamSize;
						} 
						
						$users->EmailAddress;
						 $userId=$users->UserId;
						 $userId_backup=$userId;
						 $EmailToken = 'Reminder of Assessment';
				 
						 $this->db->select('Value');
						 $this->db->where('Key','EmailFrom');
						 $smtp1 = $this->db->get('tblmstconfiguration');	
						 foreach($smtp1->result() as $row) {
							 $smtpEmail = $row->Value;
						 }
						 $this->db->select('Value');
						 $this->db->where('Key','EmailPassword');
						 $smtp2 = $this->db->get('tblmstconfiguration');	
						 foreach($smtp2->result() as $row) {
							 $smtpPassword = $row->Value;
						 }

						//  $config['protocol']='smtp';
						// // $config['smtp_host']='ssl://smtp.googlemail.com';
						// // $config['smtp_port']='465';
						// $config['smtp_host']='mail.uatbyopeneyes.com';
						// $config['smtp_port']='587';
						// $config['smtp_user']=$smtpEmail;
						// $config['smtp_pass']=$smtpPassword;
				 
						$config['protocol']='mail';
						$config['smtp_host']='mail.afponline.org';
						$config['smtp_port']='25';

						 
						 $config['charset']='utf-8';
						 $config['newline']="\r\n";
						 $config['mailtype'] = 'html';							
						 $this->email->initialize($config);
				 
						 $query = $this->db->query("SELECT et.To,et.Subject,et.EmailBody,et.BccEmail,(SELECT GROUP_CONCAT(UserId SEPARATOR ',') FROM tbluser WHERE RoleId = et.To && ISActive = 1) AS totalTo,(SELECT GROUP_CONCAT(EmailAddress SEPARATOR ',') FROM tbluser WHERE RoleId = et.Cc && ISActive = 1) AS totalcc,(SELECT GROUP_CONCAT(EmailAddress SEPARATOR ',') FROM tbluser WHERE RoleId = et.Bcc && ISActive = 1) AS totalbcc FROM tblemailtemplate AS et WHERE et.Token = '".$EmailToken."' && et.IsActive = 1");
						 foreach($query->result() as $row){ 
							$row->EmailBody = str_replace("{ assessment_name }",$ass_name,$row->EmailBody);
							$row->EmailBody = str_replace("{ assessment_start_date }",$ass_start_date,$row->EmailBody);
							$row->EmailBody = str_replace("{ team_size }",$team_size,$row->EmailBody);
							$row->EmailBody = str_replace("{ remainder_day }",$Day,$row->EmailBody);
							
							if($row->To==3){			
								$queryTo = $this->db->query('SELECT EmailAddress FROM tbluser where UserId = '.$userId); 
								$rowTo = $queryTo->result();
								$query1 = $this->db->query('SELECT p.PlaceholderId,p.PlaceholderName,t.TableName,c.ColumnName FROM tblmstemailplaceholder AS p LEFT JOIN tblmsttablecolumn AS c ON c.ColumnId = p.ColumnId LEFT JOIN tblmsttable AS t ON t.TableId = c.TableId WHERE p.IsActive = 1');
								$body = $row->EmailBody;
								foreach($query1->result() as $row1){			
									$query2 = $this->db->query('SELECT '.$row1->ColumnName.' AS ColumnName FROM '.$row1->TableName.' AS tn LEFT JOIN tblmstuserrole AS role ON tn.RoleId = role.RoleId LEFT JOIN tblmstcountry AS con ON tn.CountryId = con.CountryId LEFT JOIN tblmststate AS st ON tn.StateId = st.StateId LEFT JOIN tblcompany AS com ON tn.CompanyId = com.CompanyId LEFT JOIN tblmstindustry AS ind ON com.IndustryId = ind.IndustryId WHERE tn.UserId = '.$userId);
									$result2 = $query2->result();
									$body = str_replace("{ ".$row1->PlaceholderName." }",$result2[0]->ColumnName,$body);					
								} 
								if($row->BccEmail!=''){
									$bcc = $row->BccEmail.','.$row->totalbcc;
								} else {
									$bcc = $row->totalbcc;
								}
								$this->email->from($smtpEmail, 'AFP Admin');
								$this->email->to($rowTo[0]->EmailAddress);		
								$this->email->subject($row->Subject);
								$this->email->cc($row->totalcc);
								$this->email->bcc($bcc);
								$this->email->message($body);
								if($this->email->send())
								{
									$email_log = array(
										'From' => trim($smtpEmail),
										'Cc' => trim($row->totalcc),
										'Bcc' => trim($bcc),
										'To' => trim($rowTo[0]->EmailAddress),
										'Subject' => trim($row->Subject),
										'MessageBody' => trim($body),
									);
									
									$res = $this->db->insert('tblemaillog',$email_log);
								}else
								{
									//echo json_encode("Fail");
								}
							} else {
								$userId_ar = explode(',', $row->totalTo);			 
								foreach($userId_ar as $userId){
								   $queryTo = $this->db->query('SELECT EmailAddress FROM tbluser where UserId = '.$userId); 
								   $rowTo = $queryTo->result();
								   $query1 = $this->db->query('SELECT p.PlaceholderId,p.PlaceholderName,t.TableName,c.ColumnName FROM tblmstemailplaceholder AS p LEFT JOIN tblmsttablecolumn AS c ON c.ColumnId = p.ColumnId LEFT JOIN tblmsttable AS t ON t.TableId = c.TableId WHERE p.IsActive = 1');
								   $body = $row->EmailBody;
								   foreach($query1->result() as $row1){			
									   $query2 = $this->db->query('SELECT '.$row1->ColumnName.' AS ColumnName FROM '.$row1->TableName.' AS tn LEFT JOIN tblmstuserrole AS role ON tn.RoleId = role.RoleId LEFT JOIN tblmstcountry AS con ON tn.CountryId = con.CountryId LEFT JOIN tblmststate AS st ON tn.StateId = st.StateId LEFT JOIN tblcompany AS com ON tn.CompanyId = com.CompanyId LEFT JOIN tblmstindustry AS ind ON com.IndustryId = ind.IndustryId WHERE tn.UserId = '.$userId_backup);
									   $result2 = $query2->result();
									   $body = str_replace("{ ".$row1->PlaceholderName." }",$result2[0]->ColumnName,$body);					
								   } 
								   $this->email->from($smtpEmail, 'AFP Admin');
								   $this->email->to($rowTo[0]->EmailAddress);		
								   $this->email->subject($row->Subject);
								   $this->email->cc($row->totalcc);
								   $this->email->bcc($row->BccEmail.','.$row->totalbcc);
								   $this->email->message($body);
								   if($this->email->send())
								   {
									   //echo 'success';
								   }else
								   {
									   //echo 'fail';
								   }
							   }
							}
							
						 }
						
					}
					echo json_encode("Success");
				}
			}			
			
		}
	}
	
	
	
	// public function getAll()
	// {
	// 	//$data="";
		
	// 	$data=$this->Remaining_model->getlist_remaining();
	
	// 	if($data)
			
	// 				$config['protocol']='smtp';
	// 				$config['smtp_host']='ssl://smtp.googlemail.com';
	// 				$config['smtp_port']='465';
	// 				$config['smtp_user']='myopeneyes3937@gmail.com';
	// 				$config['smtp_pass']='W3lc0m3@2018';
	// 				$config['charset']='utf-8';
	// 				$config['newline']="\r\n";
	// 				$config['mailtype'] = 'html';	
	// 		   foreach ($data as $users)
	// 		   {
	// 				//echo json_encode($users);
					
										
	// 				$this->email->initialize($config);

	// 				$this->email->from('myopeneyes3937@gmail.com','Email Test');
	// 				$this->email->to($users->EmailAddress);
					
					
	// 				$this->email->subject('Sending mail');
	// 				$this->email->message('sending mail recive.....');
					
					
					
	// 				if($this->email->send()){
	// 					//echo json_encode('success');
	// 				} else {
	// 					//echo json_encode('asdasd');
	// 				}
				
	// 		   }
				
	// 			echo json_encode('success');
		
		
		
	// }
	
	
}
