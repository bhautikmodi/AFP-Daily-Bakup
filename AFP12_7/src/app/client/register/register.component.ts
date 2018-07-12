import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
import { Router } from '@angular/router';
//import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { RegisterService } from '../services/register.service';
declare var $: any;

@Component({
  selector: 'app-register',
   providers: [ RegisterService ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
	RegisterEntity;
	CountryList;
	stateList;
	submitted;
	btn_disable;
	header;
	type;
	same;
	companydata;
	RegisterFormfinal;
	CompanyEntity;
	Disinv;
	modelvar;
  constructor( private http: Http,public globals: Globals, private router: Router, private RegisterService: RegisterService,private route:ActivatedRoute) { }


  ngOnInit() {
	this.globals.isLoading = true;
	
	  
			this.btn_disable = false;
			this.RegisterEntity={};
			this.companydata={};
		
			this.RegisterEntity.CountryId ='';
			this.RegisterEntity.StateId ='';
			
			
   
 	
	 let id = this.route.snapshot.paramMap.get('id');
	 if(id)
	 {
		 
	 }else{
	let token = localStorage.getItem('CompanyId');
	if(token==null)
	{
		this.router.navigate(['/invitation']);					
	}
	this.RegisterService.getCompany(token)
	.then((data) => 
	{ 
		
		this.companydata = data;
		this.globals.isLoading = false;	
		
	}, 
	(error) => 
	{
		//alert('error');
		this.globals.isLoading = false;
		this.router.navigate(['/pagenotfound']);
	});}

    this.Disinv = '';
	this.RegisterService.getAll()
	//.map(res => res.json())
	.then((data) => 
	{
			this.Disinv = data['Disinv'];
			
			
	}, 
	(error) => 
	{
		//alert('error');
		this.globals.isLoading = false;
		this.router.navigate(['/pagenotfound']);
	});		
	this.RegisterService.getAllCountry()
	.then((data) => 
	{ 
		this.CountryList = data;

		
	}, 
	(error) => 
	{
		//alert('error');
		this.globals.isLoading = false;
		this.router.navigate(['/pagenotfound']);
	});
	
	// let id = this.route.snapshot.paramMap.get('id');
					if (id) {
						this.header = 'Edit Profile';
						this.modelvar = 'change your profile';

						this.RegisterService.getById(id)
							.then((data) => {
								
									let token = localStorage.removeItem('CompanyId');
								this.RegisterEntity = data;
								this.companydata.Name=this.RegisterEntity.Name;
								this.companydata.IndustryName=this.RegisterEntity.IndustryName;
								this.companydata.PhoneNo=this.RegisterEntity.PhoneNo;
								this.companydata.Website=this.RegisterEntity.Website;
								if (this.RegisterEntity.CountryId > 0) {
									this.RegisterService.getStateList(this.RegisterEntity.CountryId)
										.then((data) => {
											this.stateList = data;
										},
										(error) => {
											alert('error');
										});
										this.globals.isLoading = false;	
								}
								

							},
							(error) => {
								//alert('error');
								this.btn_disable = false;
								this.submitted = false;
								this.globals.isLoading = false;
								this.router.navigate(['/pagenotfound']);
							});
					}
					else {
						this.header = 'Registration';
						this.modelvar = 'submit your Registration';
						this.RegisterEntity = {};
						this.RegisterEntity.CountryId='';
						this.RegisterEntity.StateId='';
						this.RegisterEntity.UserId =0;
						this.RegisterEntity.EmailAddress= localStorage.getItem('EmailAddress');
						this.globals.isLoading = false;	
						// if(this.Disinv.Value ==1)
						 // {
								// this.RegisterEntity.EmailAddress= localStorage.getItem('EmailAddress');
						 // }else 
						 // {
							// let token = localStorage.removeItem('EmailAddress');
						 // }
						 
					}
					setTimeout(()=>{  
						$('[data-toggle="tooltip"]').tooltip() ;
						if ($("body").height() < $(window).height()) {
							$('footer').addClass('footer_fixed');
						} else {
							$('footer').removeClass('footer_fixed');
						}
					},1000);

  }
  addRegister(RegisterForm)
	{		
					
			// this.RegisterEntity.CreatedBy = this.globals.authData.UserId;
			// this.RegisterEntity.UpdatedBy = this.globals.authData.UserId;
			let id = this.route.snapshot.paramMap.get('id');
		if (id) {
			
			this.submitted = false;
		} else {
			
			this.submitted = true;
		}
		
		
		if(RegisterForm.valid && !this.same){
			
			this.RegisterFormfinal = RegisterForm;
			$("#submit_Modal").modal('show');
			
			} 		
	}
	
	finalsubmit(RegisterForm){
		
		let id = this.route.snapshot.paramMap.get('id');
		if (id) {
			this.RegisterEntity.RoleId=this.globals.authData.RoleId;
			this.submitted = false;
		} else {
			
			this.submitted = true;
		}
		this.btn_disable = true;
			let token = localStorage.getItem('CompanyId');
			this.RegisterEntity.CompanyId=token;
			this.globals.isLoading = true;
			this.RegisterService.add(this.RegisterEntity)
			
			.then((data) => 
			{ 
				//alert('success');
				this.globals.isLoading = false;
				this.btn_disable = false;
				this.submitted = false;
				this.RegisterEntity = {};
				localStorage.removeItem('CompanyId');
				localStorage.removeItem('EmailAddress');
				RegisterForm.form.markAsPristine();
					if (id) {
						this.globals.message = 'Update successfully!';
						this.globals.type = 'success';
						this.globals.msgflag = true;
						this.router.navigate(['/dashboard']);
					} else {
						this.globals.message = 'Add successfully!';
						this.globals.type = 'success';
						this.globals.msgflag = true;
						if(this.globals.authData.RoleId==3){
							this.router.navigate(['/welcome_register']);
						} else {
							this.router.navigate(['/sales-admin-dashboard']);
						}
					}

							$("#submit_Modal").modal('hide');
				
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
	
	getStateList(RegisterForm)
	{ 
		RegisterForm.form.controls.StateId.markAsDirty();
		this.RegisterEntity.StateId='';
		if(this.RegisterEntity.CountryId > 0){
			this.RegisterService.getStateList(this.RegisterEntity.CountryId)
			.then((data) => 
			{
				this.stateList = data;
			}, 
			(error) => 
			{
				//alert('error');
				this.globals.isLoading = false;
				this.router.navigate(['/pagenotfound']);
			});
		} else {
			this.stateList = [];
		}
	}
	
	checkpassword(){ 
		if(this.RegisterEntity.cPassword != this.RegisterEntity.Password){
			this.same = true;
		} else {
			this.same = false;
		}
		
	}
	

}
