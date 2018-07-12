import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
import { IndustryService } from '../services/industry.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../services/common.service';
declare var $: any;
@Component({
	selector: 'app-industry',
	providers: [IndustryService, CommonService],
	templateUrl: './industry.component.html',
	styleUrls: ['./industry.component.css']
})
export class IndustryComponent implements OnInit {

	IndustryEntity;
	submitted;
	btn_disable;
	header;
	constructor(private http: Http, public globals: Globals, private router: Router, private IndustryService: IndustryService,
		private route: ActivatedRoute, private CommonService: CommonService) { }


	ngOnInit() {
		this.globals.isLoading = true;
		$("body").tooltip({
			selector: "[data-toggle='tooltip']"
		});
		if(this.globals.authData.RoleId==4){		
			this.default();
		} else {
			this.CommonService.get_permissiondata({'RoleId':this.globals.authData.RoleId,'screen':'Industry'})
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
		this.globals.msgflag = false;

		this.IndustryEntity = {};
		let id = this.route.snapshot.paramMap.get('id');
		if (id) {
			this.header = 'Edit';
			this.IndustryService.getById(id)
				.then((data) => {
					this.IndustryEntity = data;
					this.globals.isLoading = false;

				},
				(error) => {
					//alert('error');
					this.globals.isLoading = false;
					this.router.navigate(['/admin/pagenotfound']);
				});
		} else {
			this.header = 'Add';
			this.IndustryEntity = {};
			this.IndustryEntity.IndustryId = 0;
			this.IndustryEntity.IsActive = '1';
			this.globals.isLoading = false;
		}
		setTimeout(function(){
			$(".industry").addClass("selected");
			$(".gsetting").addClass("active");
        	$(".industry").parent().removeClass("display_block");	
		},500);
	}

	addIndustry(IndustryForm) {
		let id = this.route.snapshot.paramMap.get('id');
		if (id) {
			this.IndustryEntity.UpdatedBy = this.globals.authData.UserId;
			this.submitted = false;
		} else {
			this.IndustryEntity.CreatedBy = this.globals.authData.UserId;
			this.IndustryEntity.UpdatedBy = this.globals.authData.UserId;
			this.submitted = true;
		}
		if (IndustryForm.valid) {
			this.btn_disable = true;
			this.IndustryService.add(this.IndustryEntity)
				.then((data) => {
					//alert('success');
					this.btn_disable = false;
					this.submitted = false;
					this.IndustryEntity = {};
					IndustryForm.form.markAsPristine();

					if (id) {
						this.globals.message = 'Industry Updated Successfully';
						this.globals.type = 'success';
						this.globals.msgflag = true;
					} else {
						this.globals.message = 'Industry Added Successfully';
						this.globals.type = 'success';
						this.globals.msgflag = true;
					}
					this.router.navigate(['/admin/industry/list']);
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

	clearForm(IndustryForm) {
		this.IndustryEntity = {};
		this.IndustryEntity.IndustryId = 0;
		this.IndustryEntity.IsActive = '1';
		this.submitted = false;
		IndustryForm.form.markAsPristine();
	}
}
