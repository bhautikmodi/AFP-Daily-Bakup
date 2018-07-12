import { Component, OnInit, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CompetencyAreaService } from '../services/competency-area.service';
import { CommonService } from '../services/common.service';
import { Globals } from '.././globals';
declare var $: any;
declare var CKEDITOR: any;

@Component({
	selector: 'app-competency-area',
	providers: [CompetencyAreaService, CommonService],
	templateUrl: './competency-area.component.html',
	styleUrls: ['./competency-area.component.css']
})

export class CompetencyAreaComponent implements OnInit {
	areaEntity;
	domainList;
	submitted;
	btn_disable;
	header;
	des_valid;

	constructor(private el: ElementRef, private http: Http, private router: Router, private route: ActivatedRoute,
		private CompetencyAreaService: CompetencyAreaService, private CommonService: CommonService, public globals: Globals) {

	}
	ngOnInit() {
		this.globals.isLoading = true;
		$("body").tooltip({
			selector: "[data-toggle='tooltip']"
		});
		
		if(this.globals.authData.RoleId==4){		
			this.default();
		} else {
			this.CommonService.get_permissiondata({'RoleId':this.globals.authData.RoleId,'screen':'Competency Area'})
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
		this.des_valid = false;
		CKEDITOR.replace('Description');
		this.areaEntity = {};
		let id = this.route.snapshot.paramMap.get('id');
		this.globals.msgflag = false;
		this.CompetencyAreaService.getDomainList()
			.then((data) => {
				this.domainList = data;
				this.globals.isLoading = false;
			},
			(error) => {
				//alert('error');
			});
		if (id) {
			this.header = 'Edit';
			this.CompetencyAreaService.getById(id)
				.then((data) => {
					if (data != "") {
						this.areaEntity = data;
						CKEDITOR.instances.Description.setData(this.areaEntity.Description);
					} else {
						this.router.navigate(['/admin/dashboard']);
					}
					this.globals.isLoading = false;
				},
				(error) => {
					alert('error');
				});
		} else {
			this.header = 'Add';
			this.areaEntity = {};
			this.areaEntity.CAreaId = 0;
			this.areaEntity.IsActive = '1';
			this.areaEntity.DomainId = '';
			//this.globals.isLoading = false;
		}
		setTimeout(function(){
			$(".carea").addClass("selected");
		},500); 
	}

	addArea(areaForm) {
		
		this.areaEntity.Description = CKEDITOR.instances.Description.getData();
		if (this.areaEntity.Description != "") {
			this.des_valid = false;
		} else {
			this.des_valid = true;
		}
		let id = this.route.snapshot.paramMap.get('id');
		if (id) {
			this.areaEntity.UpdatedBy = this.globals.authData.UserId;
			this.submitted = false;
		} else {
			this.areaEntity.CreatedBy = this.globals.authData.UserId;
			this.areaEntity.UpdatedBy = this.globals.authData.UserId;
			this.submitted = true;
		}
		if (areaForm.valid && this.des_valid == false) {
			this.btn_disable = true;
			this.CompetencyAreaService.add(this.areaEntity)
				.then((data) => {
					//alert('success');
					this.btn_disable = false;
					this.submitted = false;
					this.areaEntity = {};
					areaForm.form.markAsPristine();
					if (id) {
						this.globals.message = 'Competency Area Updated Successfully';
						this.globals.type = 'success';
						this.globals.msgflag = true;
					} else {
						this.globals.message = 'Competency Area Added Successfully';
						this.globals.type = 'success';
						this.globals.msgflag = true;
					}
					this.router.navigate(['/admin/competency-area/list']);
				},
				(error) => {
					alert('error');
					this.btn_disable = false;
					this.submitted = false;
				});
		}
	}

	clearForm(areaForm) {
		this.areaEntity = {};
		this.areaEntity.CAreaId = 0;
		this.areaEntity.IsActive = '1';
		this.areaEntity.DomainId = '';
		this.submitted = false;
		this.des_valid = false;
		CKEDITOR.instances.Description.setData('');
		areaForm.form.markAsPristine();
	}



}
