import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Globals } from '../globals';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginEntity;
	submitted;
	btn_disable;
	type;
	invalid;
	//globals;
 
  constructor(private http: Http, private router: Router, private route: ActivatedRoute, private AuthService : AuthService,public globals: Globals) { }

  ngOnInit() {
	//this.globals = this.global;
	this.globals.isLoading = false;
	setTimeout(function(){ 
		if ($("body").height() < $(window).height()) {
		  $('footer').addClass('footer_fixed');
		} 
	  }, 1000);


	  if ($("body").height() < $(window).height()) {
        $('footer').addClass('footer_fixed');
    }
	  this.loginEntity={};
  
  
	  
  }
   login(loginForm)
	{		
		this.submitted = true;
		if(loginForm.valid){
			this.btn_disable = true;
			this.globals.isLoading = true;
			this.AuthService.login(this.loginEntity)
			.then((data) => 
			{
				if(data='Code duplicate')
				{
					//alert('success');
					this.globals.message = 'User Login Successfully';
					this.globals.type = 'success';
					this.globals.msgflag = true;
				}else
					{
				//alert('error');
				this.btn_disable = false;
				this.submitted = false;
				this.invalid = false;
				this.loginEntity = {};
				loginForm.form.markAsPristine();
					}
				//this.router.navigate(['/welcome_register']);	
				if(this.globals.authData.RoleId==3){
					window.location.href = '/dashbord';
				} else {
					window.location.href = '/sales-admin-dashboard';
				}	
			}, 
			(error) => 
			{ 
				        this.globals.message = 'Invalid Email Address or Password';
						this.globals.type = 'danger';
						this.globals.isLoading = false;
						this.globals.msgflag = true;
						this.btn_disable = false;
						this.submitted = false;

				//this.globals.isLoading = false;
				// if(error.text){
				// 	this.invalid = true;
				// }				
				//this.btn_disable = false;
				//this.submitted = false;
			});
		} 		
	}

}
