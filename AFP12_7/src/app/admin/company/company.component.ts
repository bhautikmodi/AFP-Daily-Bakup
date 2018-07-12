import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from '../services/company.service';
import { CommonService } from '../services/common.service';
declare var $: any;
@Component({
	selector: 'app-company',
	providers: [CompanyService, CommonService],
	templateUrl: './company.component.html',
	styleUrls: ['./company.component.css']
})

export class CompanyComponent implements OnInit {
	IndustryList;
	companyEntity;
	submitted;
	btn_disable;
	header;
	constructor(private http: Http, public globals: Globals, private router: Router, private route: ActivatedRoute,
		private CompanyService: CompanyService, private CommonService: CommonService) { }

	ngOnInit() {
		this.globals.isLoading = true;
		$('[data-toggle="tooltip"]').tooltip();	
		this.companyEntity = {};
		if(this.globals.authData.RoleId==4){		
			this.default();
		} else {
			this.CommonService.get_permissiondata({'RoleId':this.globals.authData.RoleId,'screen':'Company'})
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
		this.CompanyService.getAllIndustry()
		//.map(res => res.json())
		.then((data) => {
			this.IndustryList = data;
		},
		(error) => {
			//alert('error');
			this.globals.isLoading = false;
			this.router.navigate(['/admin/pagenotfound']);
		});

	let id = this.route.snapshot.paramMap.get('id');
	if (id) {
		this.header = 'Edit';
		this.CompanyService.getById(id)
			.then((data) => {
				this.companyEntity = data;
				this.globals.isLoading = false;
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
		this.companyEntity = {};
		this.companyEntity.CompanyId = 0;
		this.companyEntity.IsActive = '1';
		this.globals.isLoading = false;
	}
	setTimeout(function(){
		$(".company").addClass("selected");
	},500);
	}

	addCompany(companyForm) {
		
		let id = this.route.snapshot.paramMap.get('id');
		if (id) {
			this.companyEntity.UpdatedBy = this.globals.authData.UserId;
			this.submitted = false;
		} else {
			this.companyEntity.CreatedBy = this.globals.authData.UserId;
			this.companyEntity.UpdatedBy = this.globals.authData.UserId;
			this.companyEntity.CompanyId = 0;
			this.submitted = true;
		}
		if (companyForm.valid) {
			this.btn_disable = true;
			this.CompanyService.add(this.companyEntity)
				.then((data) => {
					//alert('success');
					//this.aa=true;
					this.btn_disable = false;
					this.submitted = false;
					this.companyEntity = {};
					companyForm.form.markAsPristine();
					if (id) {
						this.globals.message = 'Company Updated Successfully';
						this.globals.type = 'success';
						this.globals.msgflag = true;
					} else {
						this.globals.message = 'Company Added Successfully';
						this.globals.type = 'success';
						this.globals.msgflag = true;
					}

					this.router.navigate(['/admin/company/list']);
				},
				(error) => {
					alert('error');
					this.btn_disable = false;
					this.submitted = false;
				});

		}
	}

	clearForm(companyForm) {
		this.companyEntity = {};
		this.companyEntity.CompanyId = 0;
		this.companyEntity.IsActive = '1';
		this.submitted = false;
		companyForm.form.markAsPristine();
	}

}
