<?php

class Company_model extends CI_Model
{

	public function getlist_user()
	{
		// $this->db->select('us.UserId,us.RoleId,us.CompanyId,us.FirstName,us.LastName,us.Title,us.EmailAddress,us.Password,us.Address1,
		// us.Address2,us.CountryId,us.StateId,us.City,us.ZipCode,us.PhoneNumber,us.IsActive,cp.Name,cp.Name,usms.RoleName');
		// $this->db->join('tblcompany cp','cp.CompanyId = us.CompanyId', 'left');
		// $this->db->join('tblmstuserrole usms','usms.RoleId = us.RoleId', 'left');
		// $this->db->where('usms.RoleName!=','IT');
		$this->db->select('ca.UserId,u.FirstName,u.LastName,cmp.Name,COUNT(ca.UserId) as total');
		$this->db->group_by('ca.UserId');
		//$this->db->join('tblmstteamsize ts','ts.TeamSizeId = ca.TeamSizeId', 'left');
		$this->db->join('tbluser u','u.UserId = ca.UserId', 'left');
		$this->db->join('tblcompany cmp','cmp.CompanyId = u.CompanyId', 'left');
		$this->db->order_by('CompanyId','asc');
		$this->db->where('ca.EndTime!=','NULL');
		$result = $this->db->get('tblcandidateassessment as ca');
		
		$res=array();
		if($result->result())
		{
			$res=$result->result();
		}
		return $res;
	}
		
	
	public function add_company($post_company)
	{	if($post_company['IsActive']==1)
					{
						$IsActive = true;
					} else {
						$IsActive = false;
					}
		if($post_company)
		{
			$company_data = array(
				'Name' => $post_company['Name'],
				'IndustryId' => $post_company['IndustryId'],
				'Website' => $post_company['Website'],
				'PhoneNo' => $post_company['PhoneNo'],
				'IsActive' => $IsActive,
				'UpdatedOn' => date('y-m-d H:i:s')
				
			);
				
				$res=$this->db->insert('tblcompany',$company_data);
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
	
	public function get_companydata($company_id=Null)
	{
	  if($company_id)
	  {
		// $this->db->select('area.CAreaId,area.DomainId,area.Name,area.Description,area.KeyConcepts,area.IsActive,(SELECT COUNT(mk.KSAId) FROM tblmstksa as mk WHERE area.CAreaId=mk.CAreaId) as isdisabled');
		// $this->db->where('CAreaId',$area_id);
		// $result = $this->db->get('tblmstcompetencyarea area');
		 $this->db->select('cp.CompanyId,cp.Name,cp.IndustryId,cp.Website,cp.PhoneNo,cp.IsActive,(SELECT COUNT(u.UserId) FROM tbluser as u WHERE u.CompanyId=cp.CompanyId) as isdisabled');
		 $this->db->order_by('cp.Name','asc');
		 $this->db->where('CompanyId',$company_id);
		 $result=$this->db->get('tblcompany cp');
		 $company_data= array();
		 foreach($result->result() as $row)
		 {
			$company_data=$row;
			
		 }
		 return $company_data;
		 
	  }
	  else
	  {
		  return false;
	  }
	}
	
	 public function edit_company($post_company)
	 {
		if($post_company['IsActive']==1)
					{
						$IsActive = true;
					} else {
						$IsActive = false;
					}
		if($post_company) {
			
			$company_data = array(
				'Name' => $post_company['Name'],
				'IndustryId' => $post_company['IndustryId'],
				'Website' => $post_company['Website'],
				'PhoneNo' => $post_company['PhoneNo'],
				'IsActive' => $IsActive,
				'UpdatedBy' =>trim($post_company['UpdatedBy']),
				'UpdatedOn' => date('y-m-d H:i:s')
				//'UpdatedOn' => date("m/d/y", strtotime(now()))
			);
			
			$this->db->where('CompanyId',trim($post_company['CompanyId']));
			$res = $this->db->update('tblcompany',$company_data);
			
			if($res) 
			{	$log_data = array(
				'UserId' => trim($post_company['UpdatedBy']),
				'Module' => 'Company',
				'Activity' =>'Update'

			);
			$log = $this->db->insert('tblactivitylog',$log_data);
				return true;
			} else
				{
				 return false;
			    }
		}
		else 
		{
			return false;
		}	
	
	}
	
	function getlist_company()
	{
		$this->db->select('cp.CompanyId,cp.Name,cp.IndustryId,cp.Website,cp.PhoneNo,cp.IsActive,in.IndustryName,(SELECT COUNT(u.UserId) FROM tbluser as u WHERE u.CompanyId=cp.CompanyId) as isdisabled');
		$this->db->join('tblmstindustry in', 'cp.IndustryId = in.IndustryId', 'left');
		//$this->db->where('IsActive="1"');
		$this->db->order_by('CompanyId','asc');
		$result = $this->db->get('tblcompany cp');
		
		
		$res=array();
		if($result->result())
		{
			$res=$result->result();
		}
		return $res;
	}
	
	public function delete_company($post_company) 
	{
	
		if($post_company) 
		{
			
			$this->db->where('CompanyId',$post_company['id']);
			$res = $this->db->delete('tblcompany');
			
			if($res) {
				$log_data = array(
					'UserId' => trim($post_company['Userid']),
					'Module' => 'Company',
					'Activity' =>'Delete'
	
				);
				$log = $this->db->insert('tblactivitylog',$log_data);
				return true;
			} else {
				return false;
			}
		} 
		else 
		{
			return false;
		}
		
	}
	
	
	//list Industry
	public function getlist_Industry() {
	
		$this->db->select('IndustryId,IndustryName');
		//$this->db->where('IsActive="1"');
		$this->db->order_by('IndustryName','asc');
		$result = $this->db->get('tblmstindustry');
		
		$res = array();
		if($result->result()) {
			$res = $result->result();
		}
		return $res;
		
	}
	
}