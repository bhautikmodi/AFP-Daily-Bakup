import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { InvitationService } from '../services/invitation.service';
declare var $: any;
@Component({
  selector: 'app-invitation',
   providers: [ InvitationService ],
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.css']
})
export class InvitationComponent implements OnInit {

constructor( private http: Http,public globals: Globals, private router: Router, private InvitationService: InvitationService,private route:ActivatedRoute) { }
 InvitationEntity;
	submitted;
	btn_disable;
	header;
	type;
	//globals;
	

  ngOnInit() 
  {
	//this.globals = this.global;
	this.globals.isLoading = true;
$('body').on('keyup', 'input.code', function(e){
      if($(this).val().length == $(this).attr('maxlength')){
        var inputs = $('input.code');
        inputs.eq(inputs.index(this) + 1).focus();
      }
      if(e.keyCode == 8 || e.keyCode == 46){
        var inputs = $('input.code');
        inputs.eq(inputs.index(this) - 1).focus();
      }
    }); 

	setTimeout(function(){ 
		if ($("body").height() < $(window).height()) {
			$('footer').addClass('footer_fixed');
		} 
	}, 1000);
  this.globals.msgflag=false;
	  this.InvitationEntity = {};
	    this.InvitationEntity = {};
	let id = this.route.snapshot.paramMap.get('id');
	if(id){
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
	this.globals.isLoading = false;
	}

  }
  
  
  
  addInvitation(InvitationForm)
	{		
	
		
			this.submitted = true;
		
		if(InvitationForm.valid){
			this.InvitationEntity.Code=this.InvitationEntity.code1+this.InvitationEntity.code2+this.InvitationEntity.code3+this.InvitationEntity.code4
			+this.InvitationEntity.code5+this.InvitationEntity.code6;
		
			this.btn_disable = true;
			 this.globals.isLoading = true;
			 this.InvitationEntity.Code=this.InvitationEntity.Code.toUpperCase();
			this.InvitationService.add(this.InvitationEntity)
			.then((data) => 
			{ 
				this.globals.isLoading = false;
			
					
					
		        if(data=='days')
				{
					this.globals.message = 'Your invitation code has expired!';
						this.globals.type = 'danger';
						this.globals.msgflag = true;
						this.btn_disable = false;
					this.submitted = false;

				}else if(data=='revoked')
				{
					this.globals.message = 'Your access has been revoked!';
						this.globals.type = 'danger';
						this.globals.msgflag = true;
						this.btn_disable = false;
					this.submitted = false;

				}
				else if(data=='email')
				{
					this.globals.message = "It seem either you have entered wrong invitation code or you have not invited yet. Please use other invitation code if you have or <a href='/contactus'> contact us</a> to be invited";
						this.globals.type = 'danger';
						this.globals.msgflag = true;
						this.btn_disable = false;
					this.submitted = false;

				}
				else if(data=='code')
				{
					this.globals.message = 'Please enter valid invitation code!';
					this.globals.type = 'danger';
					this.globals.msgflag = true;
					this.btn_disable = false;
					this.submitted = false;
				//this.router.navigate(['/register']);
				
					
				}else
				{
					var CompanyId=data[0]['CompanyId'];
					 localStorage.setItem('CompanyId',CompanyId);
					this.btn_disable = false;
					this.submitted = false;
						  localStorage.setItem('EmailAddress',this.InvitationEntity.EmailAddress);
					this.InvitationEntity = {};
					InvitationForm.form.markAsPristine();
						this.globals.message = 'Invitation code has been entered successfully. You will be redirected to registration process!';
						this.globals.type = 'success';
						this.globals.msgflag = true;
						
						//this.router.navigate(['/register']);
						window.location.href = '/register';
				}
				
			}, 
			(error) => 
			{
				//alert('error');
				this.btn_disable = false;
				this.submitted = false;
				this.globals.isLoading = false;
				this.router.navigate(['/pagenotfound']);
			});
		} 		
	}

}
