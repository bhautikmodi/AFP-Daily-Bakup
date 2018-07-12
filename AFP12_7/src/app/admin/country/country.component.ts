import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
import { CountryService } from '../services/country.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../services/common.service';
declare var $: any;

@Component({
	selector: 'app-country',
	providers: [CountryService, CommonService],
	templateUrl: './country.component.html',
	styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
	CountryEntity;
	submitted;
	btn_disable;
	header;
	constructor(private http: Http, public globals: Globals, private router: Router,
		private CountryService: CountryService, private route: ActivatedRoute, private CommonService: CommonService) { }

	ngOnInit() {
		this.globals.isLoading = true;
		if(this.globals.authData.RoleId==4){		
			this.default();
		} else {
			this.CommonService.get_permissiondata({'RoleId':this.globals.authData.RoleId,'screen':'Country'})
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
		this.CountryEntity = {};
		let id = this.route.snapshot.paramMap.get('id');
		if (id) {
			this.header = 'Edit';
			this.CountryService.getById(id)
				.then((data) => {
					this.CountryEntity = data;
					this.globals.isLoading = false;
				},
				(error) => {
					alert('error');
					this.globals.isLoading = false;
				});
		} else {
			this.header = 'Add';
			this.CountryEntity = {};
			this.CountryEntity.CountryId = 0;
			this.CountryEntity.IsActive = '1';
			this.globals.isLoading = false;
		}
		setTimeout(function(){
			$(".country").addClass("selected");
			$(".gsetting").addClass("active");
        	$(".country").parent().removeClass("display_block");	
		},500);
	}

	addCountry(CountryForm) {
		let id = this.route.snapshot.paramMap.get('id');
		if (id) {
			this.CountryEntity.UpdatedBy = this.globals.authData.UserId;
			this.submitted = false;
		} else {
			this.CountryEntity.CreatedBy = this.globals.authData.UserId;
			this.CountryEntity.UpdatedBy = this.globals.authData.UserId;
			this.submitted = true;
		}
		if (CountryForm.valid) {
			this.btn_disable = true;
			this.CountryService.add(this.CountryEntity)
				.then((data) => {
					//alert('success');
					this.btn_disable = false;
					this.submitted = false;
					this.CountryEntity = {};
					CountryForm.form.markAsPristine();
					if (id) {
						this.globals.message = 'Country Updated Successfully';
						this.globals.type = 'success';
						this.globals.msgflag = true;
					} else {
						this.globals.message = 'Country Added Successfully';
						this.globals.type = 'success';
						this.globals.msgflag = true;
					}
					this.router.navigate(['/admin/country/list']);
				},
				(error) => {
					alert('error');
					this.btn_disable = false;
					this.submitted = false;
				});
		}
	}

	clearForm(CountryForm) {
		this.CountryEntity = {};
		this.CountryEntity.CountryId = 0;
		this.CountryEntity.IsActive = '1';
		this.submitted = false;
		CountryForm.form.markAsPristine();
	}

}
