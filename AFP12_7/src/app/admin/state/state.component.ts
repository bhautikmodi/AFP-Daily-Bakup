import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
declare var $: any;
import { StateService } from '../services/state.service';
import { Globals } from '../globals';
import { CommonService } from '../services/common.service';

@Component({
	selector: 'app-state',
	providers: [StateService, CommonService],
	templateUrl: './state.component.html',
	styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {
	CountryEntity;
	CountryList;

	stateEntity;
	header;
	btn_disable;
	submitted;
	constructor(private http: Http, private router: Router, private route: ActivatedRoute,
		private StateService: StateService, public globals: Globals, private CommonService: CommonService) { }

	ngOnInit() {
		this.globals.isLoading = true;	
		if(this.globals.authData.RoleId==4){		
			this.default();
		} else {
			this.CommonService.get_permissiondata({'RoleId':this.globals.authData.RoleId,'screen':'State'})
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
		this.StateService.getAllCountry()
		.then((data) => {
			this.CountryList = data;
			this.globals.isLoading = false;	
		},
		(error) => {
			//alert('error');
		});

	let id = this.route.snapshot.paramMap.get('id');
	if (id) {


		// this.header = 'Edit';
		this.StateService.getById(id)
			.then((data) => {
				this.stateEntity = data;
				this.globals.isLoading = false;	
			},
			(error) => {
				//alert('error');
				this.globals.isLoading = false;
				this.router.navigate(['/admin/pagenotfound']);
				//this.btn_disable = false;
				//this.submitted = false;
			});
	}
	else {
		this.stateEntity = {};
		this.stateEntity.StateId = 0;
		this.stateEntity.IsActive = '1';
		this.stateEntity.CountryId='';
	}
	setTimeout(function(){
		$(".state").addClass("selected");
		$(".gsetting").addClass("active");
		$(".state").parent().removeClass("display_block");	
	},500);
	}

	addState(stateForm) {
	
		
		let id = this.route.snapshot.paramMap.get('id');
		if (id) {
			this.stateEntity.UpdatedBy = this.globals.authData.UserId;
			this.submitted = false;
		} else {
			this.stateEntity.CreatedBy = this.globals.authData.UserId;
			this.stateEntity.UpdatedBy = this.globals.authData.UserId;
			this.stateEntity.StateId = 0;
			this.submitted = true;
		}
		if (stateForm.valid) {
			
			this.btn_disable = true;
			this.StateService.add(this.stateEntity)
				.then((data) => {
					//alert('success');
					this.btn_disable = false;
					this.submitted = false;
					this.stateEntity = {};
					stateForm.form.markAsPristine();
					if (id) {
						this.globals.message = 'State Updated Successfully';
						this.globals.type = 'success';
						this.globals.msgflag = true;
					} else {
						this.globals.message = 'State Added Successfully';
						this.globals.type = 'success';
						this.globals.msgflag = true;
					}


					this.router.navigate(['/admin/state/list']);
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

	clearForm(stateForm) {
		this.stateEntity = {};
		this.stateEntity.StateId = 0;
		this.stateEntity.IsActive = '1';
		this.submitted = false;
		stateForm.form.markAsPristine();
	}

}
