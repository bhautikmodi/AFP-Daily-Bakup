import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { CommonService } from '../services/common.service';
declare var $: any;

@Component({
	selector: 'app-user',
	providers: [UserService, CommonService],
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
	CountryList;
	roleList;
	companyList;
	stateList;
	userEntity;
	submitted;
	btn_disable;
	header;
	constructor(private http: Http, public globals: Globals, private router: Router, private route: ActivatedRoute,
		private UserService: UserService, private CommonService: CommonService) { }

	ngOnInit() {
		this.globals.isLoading = true;	
		this.userEntity = {};
		if(this.globals.authData.RoleId==4){		
			this.default();
		} else {
			this.CommonService.get_permissiondata({'RoleId':this.globals.authData.RoleId,'screen':'User'})
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
	}

	default(){
		this.stateList = [];
		this.UserService.getAllDefaultData()
		.then((data) => {
			this.CountryList = data['country'];
			this.roleList = data['role'];
			this.companyList = data['company'];
			this.stateList = data['state'];
			this.globals.isLoading = false;	
		},
		(error) => {
			//alert('error');
			this.globals.isLoading = false;
			this.router.navigate(['/admin/pagenotfound']);
		});

		// this.UserService.getAllCountry()
		// 	.then((data) => {
		// 		this.CountryList = data;

		// 	},
		// 	(error) => {
		// 		alert('error');
		// 	});

		// this.UserService.getAllRole()
		// 	//.map(res => res.json())
		// 	.then((data) => {
		// 		this.roleList = data;
		// 	},
		// 	(error) => {
		// 		alert('error');
		// 	});

		// this.UserService.getAllCompany()
		// 	//.map(res => res.json())
		// 	.then((data) => {
		// 		this.companyList = data;
		// 	},
		// 	(error) => {
		// 		alert('error');
		// 	});

		// this.UserService.getAllState()
		// .then((data) => 
		// {
		// this.stateList = data;
		// }, 
		// (error) => 
		// {
		// alert('error');
		// });	

		let id = this.route.snapshot.paramMap.get('id');
		if (id) {
			this.header = 'Edit';
			this.UserService.getById(id)
				.then((data) => {
					
					this.userEntity = data;
					if (this.userEntity.CountryId > 0) {
						this.UserService.getStateList(this.userEntity.CountryId)
							.then((data) => {
								this.stateList = data;
								this.globals.isLoading = false;	
							},
							(error) => {
								//alert('error');
								this.globals.isLoading = false;	
							});
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
		else {
			this.header = 'Add';
			this.userEntity = {};
			this.userEntity.CountryId='';
			this.userEntity.StateId='';
			// this.userEntity.IsActive = '1';
		}
		setTimeout(function(){
			$(".user").addClass("selected");
		},500);
	}

	addUser(userForm) {
		
		
		let id = this.route.snapshot.paramMap.get('id');
		if (id) {
			this.userEntity.UpdatedBy = this.globals.authData.UserId;
			this.submitted = false;
		} else {
			this.userEntity.CreatedBy = this.globals.authData.UserId;
			this.userEntity.UpdatedBy = this.globals.authData.UserId;
			this.userEntity.UserId = 0;
			this.submitted = true;
		}
		if (userForm.valid) {
			this.btn_disable = true;
			this.UserService.add(this.userEntity)
				.then((data) => {
					//alert('success');
					//this.aa=true;
					this.btn_disable = false;
					this.submitted = false;
					this.userEntity = {};
					userForm.form.markAsPristine();
					if (id) {
						this.globals.message = 'User Updated Successfully';
						this.globals.type = 'success';
						this.globals.msgflag = true;
					} else {
						this.globals.message = 'User Added Successfully';
						this.globals.type = 'success';
						this.globals.msgflag = true;
					}


					this.router.navigate(['/admin/users/list']);
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


	getStateList(userForm) {
		userForm.form.controls.StateId.markAsDirty();
		this.userEntity.StateId='';
		if (this.userEntity.CountryId > 0) {
			this.UserService.getStateList(this.userEntity.CountryId)
				.then((data) => {
					this.stateList = data;
				},
				(error) => {
					//alert('error');
					this.globals.isLoading = false;
					this.router.navigate(['/admin/pagenotfound']);
				});
		} else {
			this.stateList = [];
		}
	}

}
