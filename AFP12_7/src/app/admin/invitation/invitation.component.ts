import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { InvitationService } from '../services/invitation.service';
import { CommonService } from '../services/common.service';
import {IOption} from 'ng-select';
declare var $: any;

@Component({
	selector: 'app-invitation',
	providers: [InvitationService, CommonService],
	templateUrl: './invitation.component.html',
	styleUrls: ['./invitation.component.css']
})
export class InvitationComponent implements OnInit {
	InvitationEntity;
	submitted;
	roleList;
	IndustryList;
	btn_disable;
	header;
	type;
	CompanyList;
	companyhide;
	ComL;
	isDisabled;
	submitted1;
	//globals;
	// myOptions;
	constructor(private http: Http, public globals: Globals, private router: Router, private InvitationService: InvitationService,
		private route: ActivatedRoute, private CommonService: CommonService) { }


	ngOnInit() {
		this.globals.isLoading = true;
		
		//this.globals = this.global;
		// this.myOptions= [
		// 	{label: 'Belgium', value: 'BE'},
		// 	{label: 'Luxembourg', value: 'LU'},
		// 	{label: 'Netherlands', value: 'NL'}
		// ];
		
		this.companyhide=false;
		if(this.globals.authData.RoleId==4){		
			this.default();
		} else {
			this.CommonService.get_permissiondata({'RoleId':this.globals.authData.RoleId,'screen':'User Invitation'})
			.then((data) => 
			{
				if(data['AddEdit']==1){
					this.default();
				} else {
					this.router.navigate(['/admin/access-denied']);
				}
			},
			(error) => 
			{
				//alert('error');
				this.globals.isLoading = false;
				this.router.navigate(['/admin/pagenotfound']);
			});	
			
		}
		this.ComL=[];
		
	}

	default(){
		this.globals.msgflag = false;
		this.InvitationEntity = {};
		this.InvitationEntity.CompanyId ='';
		this.InvitationEntity.RoleId ='';
		this.InvitationEntity.IndustryId ='';
		this.InvitationService.getAllCompany()
			//.map(res => res.json())
			.then((data) => {
				this.CompanyList = data['company'];;
				this.roleList = data['role'];
				this.globals.isLoading = false;
			},
			(error) => {
				//alert('error');
				this.globals.isLoading = false;
				this.router.navigate(['/admin/pagenotfound']);
			});

		let id = this.route.snapshot.paramMap.get('id');
		if (id) {
			//this.header = 'Edit';
			// this.InvitationService.getById(id)
			// .then((data) => 
			// {
			// 	this.InvitationEntity = data;

			// }, 
			// (error) => 
			// {
			// 	alert('error');
			// });	 
		} else {
			this.header = '';
			this.InvitationEntity = {};
			this.InvitationEntity.UserInvitationId = 0;
			this.InvitationEntity.IsActive = '1';
			this.InvitationEntity.IndustryId ='';
			this.InvitationEntity.CompanyId ='';
	     	this.InvitationEntity.RoleId ='';
			this.InvitationService.getIndustry()
			//.map(res => res.json())
			.then((data) => 
			{
				this.IndustryList = data;
				this.globals.isLoading = false;
			}, 
			(error) => 
			{
				//alert('error');
				this.globals.isLoading = false;
				this.router.navigate(['/admin/pagenotfound']);
			});	
		}
		setTimeout(function(){
			$(".invitation").addClass("selected");
			$(".email").addClass("active");
        	$(".invitation").parent().removeClass("display_block");	
		},500); 
	}

	addInvitation(InvitationForm) {
		
		let id = this.route.snapshot.paramMap.get('id');
		
		if (id) {
			this.InvitationEntity.UpdatedBy = this.globals.authData.UserId;
			this.submitted = false;
		} else {
			this.InvitationEntity.CreatedBy = this.globals.authData.UserId;
			this.InvitationEntity.UpdatedBy = this.globals.authData.UserId;
			this.submitted = true;
		}
		var s=this.InvitationEntity.EmailAddress;
		
		if (InvitationForm.valid) {
			this.btn_disable = true;
			this.globals.isLoading = true;
			this.InvitationService.add(this.InvitationEntity)
				.then((data) => {
					
					this.globals.isLoading = false;
					if (data == 'email duplicate') {
						this.globals.message = 'You already invited this Email Address';
						this.globals.type = 'danger';
						this.globals.msgflag = true;
						//this.router.navigate(['/invitation/add']);
					} else {
						//alert('success');
						
						this.btn_disable = false;
						this.submitted = false;
						this.InvitationEntity = {};
						InvitationForm.form.markAsPristine();
						if (id) {
							this.globals.message = 'Data Updated Successfully';
							this.globals.type = 'success';
							this.globals.msgflag = true;
						} else {
							
							this.globals.message = 'Invitation Code Sent Successfully to :' + s;
							this.globals.type = 'success';
							this.globals.msgflag = true;
							this.globals.isLoading = false;
						}
						this.router.navigate(['/admin/invite-a-user/list']);
					}

				},
				(error) => {
					//alert('error');
					this.btn_disable = false;
					this.submitted = false;
					this.globals.isLoading = false;
					this.router.navigate(['/admin/pagenotfound']);
				});
		}
	}


	clearForm(InvitationForm) {
		this.InvitationEntity = {};
		this.InvitationEntity.CompanyId ='';
		this.InvitationEntity.RoleId = '';
		this.InvitationEntity.IndustryId ='';
		this.InvitationEntity.UserInvitationId = 0;
		this.InvitationEntity.IsActive = '1';
		this.companyhide=false;
		this.submitted = false;
		InvitationForm.form.markAsPristine();
	}
	com()
	{
		this.companyhide=true;
		this.submitted1 = false;
		this.btn_disable = false;
		var email = this.InvitationEntity.EmailAddress;
		var RoleId = this.InvitationEntity.RoleId;
		this.InvitationEntity={};
		this.InvitationEntity.CompanyId ='';
		this.InvitationEntity.RoleId =RoleId;
		this.InvitationEntity.IndustryId ='';
		this.InvitationEntity.EmailAddress = email;
		//this.isDisabled=true;
		

	}
	
	onSelected(option: IOption) {
		this.InvitationEntity.CompanyId = `${option.value}`;
		this.InvitationService.getCompany(this.InvitationEntity.CompanyId)
		//.map(res => res.json())
		.then((data) => 
		{
			this.ComL = data;		
			this.companyhide = true;
			this.btn_disable = true;
			this.submitted1 = true;
			var email = this.InvitationEntity.EmailAddress;
			var RoleId = this.InvitationEntity.RoleId;
			this.InvitationEntity = data;
			this.InvitationEntity.RoleId =RoleId;
			this.InvitationEntity.EmailAddress = email;
		}, 
		(error) => 
		{
			//alert('error');
			this.globals.isLoading = false;
			this.router.navigate(['/admin/pagenotfound']);
		});	
		
	}
	del(){
		this.companyhide=false;
	}
}
