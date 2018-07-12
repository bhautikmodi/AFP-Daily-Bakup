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
	invalid;

  constructor(private http: Http, private router: Router, private route: ActivatedRoute, private authService : AuthService,
	public globals: Globals)
    {
		
	  }

  ngOnInit() {
	  this.globals.isLoading = false;
	  this.loginEntity = {};
	  this.invalid = false;
	  $("html").addClass("index_admin");
  }

  login(loginForm)
	{		
		this.submitted = true;
		if(loginForm.valid){
			this.btn_disable = true;
			this.globals.isLoading = true;
			this.authService.login(this.loginEntity)
			.then((data) => 
			{
				this.btn_disable = false;
				this.submitted = false;
				this.invalid = false;
				this.loginEntity = {};
				loginForm.form.markAsPristine(); 
				if(data=='access denite'){
					this.globals.isLoading = false;
					this.router.navigate(['/admin/access-denied']);
				} else {
					window.location.href = '/admin';
				}								
			}, 
			(error) => 
			{ 
				this.globals.isLoading = false;
				if(error.text){
					this.invalid = true;
				}				
				this.btn_disable = false;
				this.submitted = false;
			});
		} 		
	}
  
}

