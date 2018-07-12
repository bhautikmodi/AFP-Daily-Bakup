import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ChangepassService } from '../services/changepass.service';
declare var $: any;

@Component({
  selector: 'app-changepass',
   providers: [ChangepassService],
  templateUrl: './changepass.component.html',
  styleUrls: ['./changepass.component.css']
})
export class ChangepassComponent implements OnInit {
	newpassEntity;
	submitted;
	btn_disable;
	header;
	same;
	//globals;

  constructor( private http: Http,public globals: Globals, private router: Router,private route:ActivatedRoute,private ChangepassService:ChangepassService) { }

  ngOnInit() { 
	//this.globals = this.global;
	this.globals.isLoading = false;
	setTimeout(function(){ 
		if ($("body").height() < $(window).height()) {
			$('footer').addClass('footer_fixed');
		} 
	}, 1000);


	this.newpassEntity={};
  this.globals.msgflag = false;
 }
  
   addNewPassword(newpassForm)
  {	debugger	
		let id = this.route.snapshot.paramMap.get('id');
		
	//var id=new JwtHelper().decodeToken(id);
	this.newpassEntity.UserId = id;
		if(id){
			this.submitted = false;
		} else {
			this.newpassEntity.UserId = 0;
			this.submitted = true;
		}
		if(newpassForm.valid && !this.same)
		{	
		
			this.newpassEntity.UserId=this.globals.authData.UserId;
			this.btn_disable = true;
			this.globals.isLoading = true;
			this.ChangepassService.add(this.newpassEntity)
			.then((data) => 
			{
				if(data=='Code duplicate')
				{
						this.globals.message = 'You entered wrong current password';
						this.globals.type = 'danger';
						this.globals.msgflag = true;
						this.globals.isLoading = false;
						this.btn_disable = false;
						this.submitted = false;
					this.router.navigate(['/changepass/']);
				}
				else
					{
						//alert('success');
						//this.aa=true;
						this.btn_disable = false;
						this.submitted = false;
						this.newpassEntity = {};
						newpassForm.form.markAsPristine();
						this.globals.isLoading = false;
						this.globals.message = 'Your password has been changed';
						this.globals.type = 'success';
						this.globals.msgflag = true;
						
						this.router.navigate(['/changepass']);
					}
			}, 
			(error) => 
			{
				this.globals.isLoading = false;
				this.router.navigate(['/pagenotfound']);
				//alert('error');
				this.btn_disable = false;
				this.submitted = false;
			});	
		
		}
	}
  
  checkpassword(){ 
		if(this.newpassEntity.cPassword != this.newpassEntity.nPassword){
			this.same = true;
		} else {
			this.same = false;
		}
		
	}

}
