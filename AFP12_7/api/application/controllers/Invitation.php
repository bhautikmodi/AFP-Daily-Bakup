<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Invitation extends CI_Controller {


	public function __construct() {
	
		parent::__construct();
		
		$this->load->model('Invitation_model');
		
	}

	public function getAllCompany()
	{
		//$data="";	
		$data['company']=$this->Invitation_model->getlist_company();
		$data['role']=$this->Invitation_model->getlist_userrole();
		echo json_encode($data);
	}
	public function getCompany($CompanyId=null)
	{
		if(!empty($CompanyId))
		{
		//$data="";
		$data=$this->Invitation_model->get_company($CompanyId);
		echo json_encode($data);
		}
	}
	public function check1(){

		$userId = 21;
		$EmailToken = 'Change Password';
		
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

		$query = $this->db->query("SELECT et.Subject,et.EmailBody,et.BccEmail,(SELECT GROUP_CONCAT(EmailAddress SEPARATOR ',') FROM tbluser WHERE RoleId = et.Cc && ISActive = 1) AS totalcc,(SELECT GROUP_CONCAT(EmailAddress SEPARATOR ',') FROM tbluser WHERE RoleId = et.Bcc && ISActive = 1) AS totalbcc FROM tblemailtemplate AS et WHERE et.Token = '".$EmailToken."' && et.IsActive = 1");
		foreach($query->result() as $row){ 			
			$queryTo = $this->db->query('SELECT EmailAddress FROM tbluser where UserId = '.$userId); 
			$rowTo = $queryTo->result();
			$query1 = $this->db->query('SELECT p.PlaceholderId,p.PlaceholderName,t.TableName,c.ColumnName FROM tblmstemailplaceholder AS p LEFT JOIN tblmsttablecolumn AS c ON c.ColumnId = p.ColumnId LEFT JOIN tblmsttable AS t ON t.TableId = c.TableId WHERE p.IsActive = 1');
			$body = $row->EmailBody;
			foreach($query1->result() as $row1){			
				$query2 = $this->db->query('SELECT '.$row1->ColumnName.' AS ColumnName FROM '.$row1->TableName.' AS tn LEFT JOIN tblmstuserrole AS role ON tn.RoleId = role.RoleId LEFT JOIN tblmstcountry AS con ON tn.CountryId = con.CountryId LEFT JOIN tblmststate AS st ON tn.StateId = st.StateId LEFT JOIN tblcompany AS com ON tn.CompanyId = com.CompanyId LEFT JOIN tblmstindustry AS ind ON com.IndustryId = ind.IndustryId WHERE tn.UserId = '.$userId);
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
				echo 'success';
			}else
			{
				echo 'fail';
			}
		}
		die;		
	}

	public function check2(){

		$EmailToken = 'Start Assessment';

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

		$config['protocol']='smtp';
		$config['smtp_host']='mail.uatbyopeneyes.com';
		$config['smtp_port']='587';
		$config['smtp_user']=$smtpEmail;
		$config['smtp_pass']=$smtpPassword;
		$config['charset']='utf-8';
		$config['newline']="\r\n";
		$config['mailtype'] = 'html';							
		$this->email->initialize($config);

		$query = $this->db->query("SELECT et.Subject,et.EmailBody,et.BccEmail,(SELECT GROUP_CONCAT(UserId SEPARATOR ',') FROM tbluser WHERE RoleId = et.To && ISActive = 1) AS totalTo,(SELECT GROUP_CONCAT(EmailAddress SEPARATOR ',') FROM tbluser WHERE RoleId = et.Cc && ISActive = 1) AS totalcc,(SELECT GROUP_CONCAT(EmailAddress SEPARATOR ',') FROM tbluser WHERE RoleId = et.Bcc && ISActive = 1) AS totalbcc FROM tblemailtemplate AS et WHERE et.Token = '".$EmailToken."' && et.IsActive = 1");
		foreach($query->result() as $row){ 	
			$userId_ar = explode(',', $row->totalTo);			 
			 foreach($userId_ar as $userId){
				$queryTo = $this->db->query('SELECT EmailAddress FROM tbluser where UserId = '.$userId); 
				$rowTo = $queryTo->result();
				$query1 = $this->db->query('SELECT p.PlaceholderId,p.PlaceholderName,t.TableName,c.ColumnName FROM tblmstemailplaceholder AS p LEFT JOIN tblmsttablecolumn AS c ON c.ColumnId = p.ColumnId LEFT JOIN tblmsttable AS t ON t.TableId = c.TableId WHERE p.IsActive = 1');
				$body = $row->EmailBody;
				foreach($query1->result() as $row1){			
					$query2 = $this->db->query('SELECT '.$row1->ColumnName.' AS ColumnName FROM '.$row1->TableName.' AS tn LEFT JOIN tblmstuserrole AS role ON tn.RoleId = role.RoleId LEFT JOIN tblmstcountry AS con ON tn.CountryId = con.CountryId LEFT JOIN tblmststate AS st ON tn.StateId = st.StateId LEFT JOIN tblcompany AS com ON tn.CompanyId = com.CompanyId LEFT JOIN tblmstindustry AS ind ON com.IndustryId = ind.IndustryId WHERE tn.UserId = '.$userId);
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
					echo 'success';
				}else
				{
					echo 'fail';
				}
			} 
		}
		die;		
	}
	
	public function getAll() {
		
		//$data="";
		
		$data['Inv']=$this->Invitation_model->getlist_Invitation();
		
		$data['Disinv']=$this->Invitation_model->getlist_DesInvitation();
	
		echo json_encode($data);
				
	}
	
	public function getAllIndustry()
	{
		//$data="";	
	
		$data=$this->Invitation_model->getlist_Industry();
	
		echo json_encode($data);
	}
	public function add() {
								
		$post_Invitation = json_decode(trim(file_get_contents('php://input')), true);		
		if ($post_Invitation) {
					$chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
					$res = "";
					for ($i = 0; $i < 6; $i++) {
						$res .= $chars[mt_rand(0, strlen($chars)-1)];
					}
					
					$post_Invitation['Code']= $res;
				$result = $this->Invitation_model->add_Invitation($post_Invitation);
				if($result) {
					//echo json_encode($post_Invitation);	

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

					$this->email->from($smtpEmail,'AFP - Association for Financial Professionals');
					$this->email->to($post_Invitation['EmailAddress']);	
					$subject = 'AFP Corporate Training Skills Assessment - Invitation Code';
					$this->email->subject($subject);
				

					$body = '<table style="font-family:Arial, Helvetica, sans-serif; font-size:15px; line-height:22px; color:#000; border:1px solid #0333; width:600px; margin:0 auto;" border="0" cellpadding="0" cellspacing="0">
					<tbody>
						<tr>
							<td style="padding:10px; border-bottom:1px solid #ccc; background-color:#fafafa"><a href="https://www.afponline.org" target="_blank"><img alt="" src="https://www.afponline.org/assets/images/afp-logo.png" style="width:250px" /></a></td>
						</tr>
						<tr>
						  <td></td>
						</tr>
						<tr>
							<td style="padding:10px;">
							<p>We would like to invite you to use the AFP Corporate Training Skills Assessment tool.</p>
				
							<p>Please <a href="http://localhost:4200/invitation">click here<a>  to complete your registration using the invitation code listed below.
							 You will be required to set up a profile with a username and password allowing you to use the tool at your convenience.</p>
							
							
							<p>Invitation code : '.$post_Invitation['Code'].'</p>
				
							<p>Please do not share this code, and use it within thirty days.If you have any questions, please contact me at rpinover@AFPonline.org or<br> +1 301.961.8884.</p>
				
							
							<p>
							<p>Regards,<br>
							Robert Pinover<br>
							Client Success Specialist<br>
							<a href="https://www.afponline.org/">Association for Financial Professionals</a> (AFP)<br><br>
							</p>
						
							</td>
						</tr>
						<tr>
							<td style="padding:10px; border-top:5px solid #a51c36; background:#072b49; text-align:center; color:#fff;">Copyright &copy; 2018 Association for Financial Professionals - All rights reserved. </td>
						</tr>
					</tbody>
				</table>';

					$this->email->message($body);

					if($this->email->send())
					{
						$email_log = array(
							'From' => trim($smtpEmail),
							'Cc' => '',
							'Bcc' => '',
							'To' => trim($post_Invitation['EmailAddress']),
							'Subject' => trim($subject),
							'MessageBody' => trim($body),
						);
						
						$res = $this->db->insert('tblemaillog',$email_log);
						$log_data = array(
							'UserId' => trim($post_Invitation['UpdatedBy']),
							'Module' => 'Invitation',
							'Activity' =>'Add'
			
						);
						$log = $this->db->insert('tblactivitylog',$log_data);
						echo json_encode("success");
					}else
					{
						echo json_encode("notsend");
					}
				}	else{
					
					echo json_encode("email duplicate");
				}
										
		}
		
	}
	
	public function delete() {
		$post_revoke= json_decode(trim(file_get_contents('php://input')), true);		

		if ($post_revoke)
		 {
			if($post_revoke['id'] > 0){
				$result = $this->Invitation_model->delete_Invitation($post_revoke);
				if($result) {
					
					echo json_encode("Delete successfully");
					}
		 	}
		
			
		} 
			
	}
	public function ReInvite() {
		$post_Invitation = json_decode(trim(file_get_contents('php://input')), true);
		if(!empty($post_Invitation)) {
			$chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
			$res = "";
			for ($i = 0; $i < 6; $i++) {
				$res .= $chars[mt_rand(0, strlen($chars)-1)];
			}
			
			$post_Invitation['Code']= $res;
			$result = $this->Invitation_model->ReInvite_Invitation($post_Invitation);			
			if($result) {
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

					$config['protocol']='smtp';
					$config['smtp_host']='mail.uatbyopeneyes.com';
					$config['smtp_port']='587';
					$config['smtp_user']=$smtpEmail;
					$config['smtp_pass']=$smtpPassword;
					$config['charset']='utf-8';
					$config['newline']="\r\n";
					$config['mailtype'] = 'html';	
										
					$this->email->initialize($config);

					$this->email->from($smtpEmail,'AFP - Association for Financial Professionals');
					$this->email->to($post_Invitation['EmailAddress']);	
					$subject = 'AFP Corporate Training Skills Assessment - Invitation Code';
					$this->email->subject($subject);
					$body = '<table style="font-family:Arial, Helvetica, sans-serif; font-size:15px; line-height:22px; color:#000; border:1px solid #0333; width:600px; margin:0 auto;" border="0" cellpadding="0" cellspacing="0">
					<tbody>
						<tr>
							<td style="padding:10px; border-bottom:1px solid #ccc; background-color:#fafafa"><a href="https://www.afponline.org" target="_blank"><img alt="" src="https://www.afponline.org/assets/images/afp-logo.png" style="width:250px" /></a></td>
						</tr>
						<tr>
						  <td></td>
						</tr>
						<tr>
							<td style="padding:10px;">
							<p>We would like to invite you to use the AFP Corporate Training Skills Assessment tool.</p>
				
							<p>Please <a href="http://localhost:4200/invitation">click here<a>  to complete your registration using the invitation code listed below.
							 You will be required to set up a profile with a username and password allowing you to use the tool at your convenience.</p>
							
							
							<p>Invitation code : '.$post_Invitation['Code'].'</p>
				
							<p>Please do not share this code, and use it within thirty days.If you have any questions, please contact me at rpinover@AFPonline.org or<br> +1 301.961.8884.</p>
				
							
							<p>
							<p>Regards,<br>
							Robert Pinover<br>
							Client Success Specialist<br>
							<a href="https://www.afponline.org/">Association for Financial Professionals</a> (AFP)<br><br>
							</p>
						
							</td>
						</tr>
						<tr>
							<td style="padding:10px; border-top:5px solid #a51c36; background:#072b49; text-align:center; color:#fff;">Copyright &copy; 2018 Association for Financial Professionals - All rights reserved. </td>
						</tr>
					</tbody>
				</table>';
				

					$this->email->message($body);

					if($this->email->send())
					{
						$email_log = array(
							'From' => trim($smtpEmail),
							'Cc' => '',
							'Bcc' => '',
							'To' => trim($post_Invitation['EmailAddress']),
							'Subject' => trim($subject),
							'MessageBody' => trim($body),
						);
						
						$res = $this->db->insert('tblemaillog',$email_log);
						echo json_encode("success");
					}else
					{
						echo json_encode("error");
					}
					
			}	
			
		} 
			
	}
	

	public function invimsg() {
		
		//$data="";
		
		$data=$this->Invitation_model->get_invimsg();
		echo json_encode($data);
				
	}

}
