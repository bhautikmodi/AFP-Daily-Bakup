import { Component, OnInit, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { SettingsService } from '../services/settings.service';
import { CommonService } from '../services/common.service';
import { Globals } from '.././globals';
import { debuglog } from 'util';
declare var $: any;

@Component({
  selector: 'app-settings',
  providers: [ SettingsService,CommonService ],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  
  teamsizeEntity;
	submitted;
	btn_disable;
	submitted1;
	btn_disable1;
	submitted2;
	btn_disable2;
	submitted3;
	btn_disable3;
	submitted4;
	btn_disable4;
	submitted5;
	btn_disable5;
	submitted6;
	btn_disable6;
  	header;
  	teamsizeList;
	deleteEntity;
	configEntity;
	updateEntity;
	cmsgflag;
	cmessage;
	cmsgflag1;
	cmessage1;
	reminderDaysList;
	permissionEntity;
	ContactEntity;
	NoOfCArea;
	ksaError;
	totksaError;
	NoKSA;
	InviEntity;
	//globals;

  constructor(private el: ElementRef, private http: Http, private router: Router, 
	private route: ActivatedRoute, private SettingsService: SettingsService,private CommonService: CommonService, public globals: Globals)
    {
		
	 }

  ngOnInit() {
	this.globals.isLoading = true;	
	//this.globals = this.global;
	this.permissionEntity = {}; 
	this.ksaError = false;
	this.totksaError = false;
	$("body").tooltip({
			selector: "[data-toggle='tooltip']"
	});
	if(this.globals.authData.RoleId==4){
		this.permissionEntity.View=1;
		this.permissionEntity.AddEdit=1;
		this.permissionEntity.Delete=1;
		this.default();
	} else {		
		this.CommonService.get_permissiondata({'RoleId':this.globals.authData.RoleId,'screen':'Configuration'})
		.then((data) => 
		{
			this.permissionEntity = data;
			if(this.permissionEntity.View==1 ||  this.permissionEntity.AddEdit==1 || this.permissionEntity.Delete==1){
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
  }

  default(){
	var item = { 'Day': '', 'CreatedBy': this.globals.authData.UserId, 'UpdatedBy':this.globals.authData.UserId};
    this.reminderDaysList = [];
    this.reminderDaysList.push(item);
	this.submitted3 = false;
	 this.header = 'Add';
	 this.teamsizeEntity = {};
	 this.teamsizeEntity.TeamSizeId = 0;
	 this.configEntity = {};
	 this.ContactEntity={};
	 this.InviEntity={};
	 this.cmsgflag = false;
   this.SettingsService.getAll(this.globals.authData.UserId)
	.then((data) =>  
	{ 
		
		this.teamsizeList = data['teamsize'];	
		this.configEntity.noofksa = data['noofksa']['Value'];	
		this.configEntity.invitation = data['invitation']['Value'];	
		this.reminderDaysList = data['remainingdays'];
		this.configEntity.emailpassword = data['emailpassword']['Value'];		
		this.configEntity.emailfrom = data['emailfrom']['Value'];
		this.NoOfCArea = data['cArea'];
		this.NoKSA=data['NoKsa'];
		this.ContactEntity.ContactFrom = data['Contact']['Value'];
		this.InviEntity.Success = data['Invimsg']['Success'];
		this.InviEntity.Revoke = data['Invimsg']['Revoke'];
		this.InviEntity.Pending = data['Invimsg']['Pending'];
		
		setTimeout(function(){
      $('#dataTables-example').dataTable( {
        "oLanguage": {
          "sLengthMenu": "_MENU_ Team Size per Page",
					"sInfo": "Showing _START_ to _END_ of _TOTAL_ Team Size",
					"sInfoFiltered": "(filtered from _MAX_ total Team Size)",
					"sInfoEmpty": "Showing 0 to 0 of 0 Team Size"
        }
	  });
	  		$(".setting").addClass("selected");
			$(".email").addClass("active");
        	$(".setting").parent().removeClass("display_block");
    },100); 
	this.globals.isLoading = false;	
	}, 
	(error) => 
	{
		//alert('error');
		this.globals.isLoading = false;
		this.router.navigate(['/admin/pagenotfound']);	
	});
  }

  AddNewRDays(index){ 
	var item = { 'Day': '', 'CreatedBy': this.globals.authData.UserId, 'UpdatedBy':this.globals.authData.UserId};
	if (this.reminderDaysList.length <= index + 1) {
		this.reminderDaysList.splice(index + 1, 0, item);
	}
  }

  DeleteRDays(item){ 
	var index = this.reminderDaysList.indexOf(item);	
	this.reminderDaysList.splice(index, 1);		
  }

	getTeamSizeList(){	
		this.SettingsService.getTeamSizeList()
		.then((data) => 
		{ 
			this.teamsizeList = data;	
		}, 
		(error) => 
		{
			//alert('error');
			this.globals.isLoading = false;
			this.router.navigate(['/admin/pagenotfound']);
		});	
	}


  addTeamSize(teamsizeForm)
	{	
		if(this.teamsizeEntity.TeamSizeId>0){			
			this.teamsizeEntity.UpdatedBy = this.globals.authData.UserId;
			this.submitted = false;
		} else {			
			this.teamsizeEntity.CreatedBy = this.globals.authData.UserId;
			this.teamsizeEntity.UpdatedBy = this.globals.authData.UserId;
			this.submitted = true;
		}
		if(teamsizeForm.valid){
			this.btn_disable = true;
			this.SettingsService.add(this.teamsizeEntity)
			.then((data) => 
			{
				//alert('success');			
				this.btn_disable = false;
				this.submitted = false;
				this.header = 'Add';
				if(this.teamsizeEntity.TeamSizeId>0){
					this.globals.message = 'Team Size Updated Successfully';
					this.globals.type = 'success';
					this.globals.msgflag = true;
				} else {
					//this.teamsizeList.push(data);
					this.globals.message = 'Team Size Added Successfully';
					this.globals.type = 'success';
					this.globals.msgflag = true;
				}
	 			this.teamsizeEntity = {};
	 			this.teamsizeEntity.TeamSizeId = 0;
				teamsizeForm.form.markAsPristine();				
				this.getTeamSizeList();	
			}, 
			(error) => 
			{
				//alert('error');
				this.btn_disable = false;
				this.submitted = false;
				this.globals.isLoading = false;
				this.router.navigate(['/admin/pagenotfound']);
			});
		} 		
	}

	editteamsize(teamsize){
		this.header = 'Edit';
		this.submitted = false;
		this.teamsizeEntity = teamsize;
	}

	cancleForm(teamsizeForm){
	 this.header = 'Add';
	 this.teamsizeEntity = {};
	 this.teamsizeEntity.TeamSizeId = 0;
	 this.submitted = false;
	 teamsizeForm.form.markAsPristine();
	}
	
  deleteteamsize(teamsize)
	{ 
		this.deleteEntity =  teamsize;
		$('#Delete_Modal').modal('show');					
	}

	deleteConfirm(teamsize)
	{	
	    var del={'Userid':this.globals.authData.UserId,'id':teamsize.TeamSizeId};
		this.SettingsService.delete(del)
		.then((data) => 
		{ 
			let index = this.teamsizeList.indexOf(teamsize);
			$('#Delete_Modal').modal('hide');
			if (index != -1) {
				this.teamsizeList.splice(index, 1);				
			}			
			//alert(data);
			this.globals.message = 'Team Size Deleted Successfully';
			this.globals.type = 'success';
			this.globals.msgflag = true;
		}, 
		(error) => 
		{
			$('#Delete_Modal').modal('hide');
			if(error.text){
				this.globals.message = "You can't delete this record because of their dependency!";
				this.globals.type = 'danger';
				this.globals.msgflag = true;
			}	
		});		
	}	 

	addNoOfKSA(ksaForm)
	{		
		this.updateEntity = {};
		this.updateEntity.Key = 'NoOfKSA';
		this.updateEntity.Value = this.configEntity.noofksa;
		this.updateEntity.UpdatedBy = this.globals.authData.UserId;
		//this.submitted1 = true;
		if(ksaForm.valid){
			if(+this.configEntity.noofksa >= +this.NoOfCArea){
				if(+this.configEntity.noofksa <= +this.NoKSA){
					this.ksaError = false;
					this.totksaError = false;
								
					this.btn_disable1 = true;
					this.SettingsService.update_config(this.updateEntity)
					.then((data) => 
					{		
						this.btn_disable1 = false;
						this.submitted1 = false;
						this.updateEntity = {};
						ksaForm.form.markAsPristine();				 
						this.cmsgflag = true;
						this.cmessage = 'No of KSA Updated Successfully';
					}, 
					(error) => 
					{
						//alert('error');
						this.btn_disable1 = false;
						this.submitted1 = false;
						this.globals.isLoading = false;
						this.router.navigate(['/admin/pagenotfound']);
					});
				} else {
					this.totksaError = true;
				}
			} else {
				this.ksaError = true;
			}
		} 		
	}

	addinvitation(invitationForm)
	{		
		this.updateEntity = {};
		this.updateEntity.Key = 'Invitation';
		this.updateEntity.Value = this.configEntity.invitation;
		this.updateEntity.UpdatedBy = this.globals.authData.UserId;
		//this.submitted2 = true;
		if(invitationForm.valid){
			this.btn_disable2 = true;
			this.SettingsService.update_config(this.updateEntity)
			.then((data) => 
			{		
				this.btn_disable2 = false;
				this.submitted2 = false;
	 			this.updateEntity = {};
				 invitationForm.form.markAsPristine();
				 this.cmsgflag = true;
				 this.cmessage = 'Invitation Features Updated Successfully';
			}, 
			(error) => 
			{
				//alert('error');
				this.btn_disable2 = false;
				this.submitted2 = false;
				this.globals.isLoading = false;
				this.router.navigate(['/admin/pagenotfound']);
			});
		} 		
	}

	addRDays(rdaysForm)
	{		
		this.submitted3 = true;
		if(rdaysForm.valid){
			this.btn_disable3 = true;
			this.SettingsService.addRemainigDays(this.reminderDaysList)
			.then((data) =>
			{
				this.btn_disable3 = false;
				this.submitted3 = false;
				this.cmsgflag = true;
				this.cmessage = 'Remaining Days Updated Successfully';
			},
			(error) =>
			{
				//alert('error');
				this.btn_disable3 = false;
				this.submitted3 = false;
				this.globals.isLoading = false;
				this.router.navigate(['/admin/pagenotfound']);
			});
		}
		// this.updateEntity = {};
		// this.updateEntity.Key = 'RemainingDays';
		// this.updateEntity.Value = this.configEntity.remainingdays;
		// this.updateEntity.UpdatedBy = this.globals.authData.UserId;
		// this.submitted3 = true;
		// if(rdaysForm.valid){
		// 	this.btn_disable3 = true;
		// 	this.SettingsService.update_config(this.updateEntity)
		// 	.then((data) => 
		// 	{		
		// 		this.btn_disable3 = false;
		// 		this.submitted3 = false;
	 	// 		this.updateEntity = {};
		// 		 rdaysForm.form.markAsPristine();
		// 		 this.cmsgflag = true;
		// 		 this.cmessage = 'Remaining Days update successfully';
		// 	}, 
		// 	(error) => 
		// 	{
		// 		alert('error');
		// 		this.btn_disable3 = false;
		// 		this.submitted3 = false;
		// 	});
		// } 		
	}

	addEmailFrom(fromForm)
	{	
		//this.submitted4 = true;
		if(fromForm.valid){
			this.btn_disable4 = true;
			this.SettingsService.update_email({'EmailFrom':this.configEntity.emailfrom,'EmailPassword':this.configEntity.emailpassword,'UpdatedBy':this.globals.authData.UserId})
			.then((data) => 
			{		
				this.btn_disable4 = false;
				this.submitted4 = false;
	 			this.updateEntity = {};
				 fromForm.form.markAsPristine();
				 this.cmsgflag = true;
				 this.cmessage = 'SMTP Details Updated Successfully';
			}, 
			(error) => 
			{
				//alert('error');
				this.btn_disable4 = false;
				this.submitted4 = false;
				this.globals.isLoading = false;
				this.router.navigate(['/admin/pagenotfound']);
			});
		} 		
	}
	addcontact(contForm)
	{	
	
		this.submitted5 = true;
		if(contForm.valid){
			this.btn_disable5 = true;
			this.SettingsService.addcontact(this.ContactEntity)
			.then((data) => 
			{		
				this.btn_disable5 = false;
				this.submitted5 = false;
	 			this.updateEntity = {};
				 contForm.form.markAsPristine();
				 this.cmsgflag = true;
				 this.cmessage= 'Contact Us Email Updated Successfully';
			}, 
			(error) => 
			{
				//alert('error');
				this.btn_disable5 = false;
				this.submitted5 = false;
				this.globals.isLoading = false;
				this.router.navigate(['/admin/pagenotfound']);
			});
		} 		
	}
	addInvitation(InvitationForm)
	{	
	
		this.submitted6 = true;
		if(InvitationForm.valid){
			this.btn_disable6 = true;
			this.SettingsService.addinvimsg(this.InviEntity)
			.then((data) => 
			{		
				this.btn_disable6 = false;
				this.submitted6 = false;
	 			this.updateEntity = {};
				 InvitationForm.form.markAsPristine();
				 this.cmsgflag = true;
				 this.cmessage= 'Invitation Message Updated Successfully';
			}, 
			(error) => 
			{
				//alert('error');
				this.btn_disable6 = false;
				this.submitted6 = false;
				this.globals.isLoading = false;
				this.router.navigate(['/admin/pagenotfound']);
			});
		} 		
	}

}
