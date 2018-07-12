<?php
defined('BASEPATH') OR exit('No direct script access allowed');
use \Firebase\JWT\JWT;

class Register extends CI_Controller 
{	
	public function __construct()
	{
		parent::__construct();
		$this->load->model('Register_model');
		include APPPATH . 'vendor/firebase/php-jwt/src/JWT.php';
	}
	
	
	
		public function getAllCountry()
	{
		
				//$data="";
				
				$data=$this->Register_model->getlist_country();

				
				echo json_encode($data);
		
	}
	public function getCompany($CompanyId = NULL)
	{
		if(!empty($CompanyId)) 
		{
				//$data="";
				
				$data=$this->Register_model->company_default($CompanyId);
				
				echo json_encode($data);
		}
	}
	// List all state
	public function getAllState()
	{
		//$data="";
		
		$data=$this->Register_model->getlist_state();
		
		echo json_encode($data);
	}
	public function getStateList($country_id = NULL) {
		
		if(!empty($country_id)) {
			
			$result = [];
			$result = $this->Register_model->getStateList($country_id);			
			echo json_encode($result);				
		}			
	}
	
	public function addRegister()
	{
		$post_user = json_decode(trim(file_get_contents('php://input')), true);

					
		if ($post_user) 
			{			
			if($post_user['UserId']>0)
				{
					$result = $this->Register_model->edit_user($post_user);
					if($result)
					{
						$token = array(
							"UserId" => $post_user['UserId'],
							"RoleId" => $post_user['RoleId'],
							"EmailAddress" => $post_user['EmailAddress'],
							"FirstName" => $post_user['FirstName'],
							"LastName" => $post_user['LastName']
							);

							$jwt = JWT::encode($token, "MyGeneratedKey","HS256");
							$output['token'] = $jwt;
						echo json_encode($output);	
					}	
				}
				else
				{
					
					$result = $this->Register_model->add_Register($post_user); 
					
					if($result)
					{
							$token = array(
							"UserId" => $result[0]->UserId,
							"RoleId" => $result[0]->RoleId,
							"EmailAddress" => $result[0]->EmailAddress,
							"FirstName" => $result[0]->FirstName,
							"LastName" => $result[0]->LastName
							);

							$jwt = JWT::encode($token, "MyGeneratedKey","HS256");
							$output['token'] = $jwt;
						
							$userId=$result[0]->UserId;
							$userId_backup=$userId;
							$EmailToken = 'Registration';
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
					
							$config['protocol']='mail';
							$config['smtp_host']='mail.afponline.org';
							$config['smtp_port']='25';

							$config['charset']='utf-8';
							$config['newline']="\r\n";
							$config['mailtype'] = 'html';							
							$this->email->initialize($config);
					
							$query = $this->db->query("SELECT et.To,et.Subject,et.EmailBody,et.BccEmail,(SELECT GROUP_CONCAT(UserId SEPARATOR ',') FROM tbluser WHERE RoleId = et.To && ISActive = 1) AS totalTo,(SELECT GROUP_CONCAT(EmailAddress SEPARATOR ',') FROM tbluser WHERE RoleId = et.Cc && ISActive = 1) AS totalcc,(SELECT GROUP_CONCAT(EmailAddress SEPARATOR ',') FROM tbluser WHERE RoleId = et.Bcc && ISActive = 1) AS totalbcc FROM tblemailtemplate AS et WHERE et.Token = '".$EmailToken."' && et.IsActive = 1");
							foreach($query->result() as $row){ 
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
										if($userId>0){
									   $queryTo = $this->db->query('SELECT EmailAddress FROM tbluser where UserId = '.$userId); 
									   $rowTo = $queryTo->result();
									   $query1 = $this->db->query('SELECT p.PlaceholderId,p.PlaceholderName,t.TableName,c.ColumnName FROM tblmstemailplaceholder AS p LEFT JOIN tblmsttablecolumn AS c ON c.ColumnId = p.ColumnId LEFT JOIN tblmsttable AS t ON t.TableId = c.TableId WHERE p.IsActive = 1');
									   $body = $row->EmailBody;
									   foreach($query1->result() as $row1){			
										   $query2 = $this->db->query('SELECT '.$row1->ColumnName.' AS ColumnName FROM '.$row1->TableName.' AS tn LEFT JOIN tblmstuserrole AS role ON tn.RoleId = role.RoleId LEFT JOIN tblmstcountry AS con ON tn.CountryId = con.CountryId LEFT JOIN tblmststate AS st ON tn.StateId = st.StateId LEFT JOIN tblcompany AS com ON tn.CompanyId = com.CompanyId LEFT JOIN tblmstindustry AS ind ON com.IndustryId = ind.IndustryId WHERE tn.UserId = '.$userId_backup);
										   $result2 = $query2->result();
										   $body = str_replace("{ ".$row1->PlaceholderName." }",$result2[0]->ColumnName,$body);					
									   } 
									   $queryCompany = $this->db->query('SELECT c.Name FROM tbluser as u left join tblcompany as c ON u.CompanyId=c.CompanyId where UserId = '.$userId_backup); 
										$rowCompany = $queryCompany->result();
										$row->Subject = $row->Subject.' - '.$rowCompany[0]->Name;

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
							echo json_encode($output);			
					}
					else
					{
						echo json_encode('error ');
					}
				}
					
			}
	}
public function getById($user_id=null)
	{	
		
		if(!empty($user_id))
		{
			$data=[];
			$data=$this->Register_model->get_userdata($user_id);
			echo json_encode($data);
		}
	}

	

	
	

}
