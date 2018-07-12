import { Component, OnInit, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { RatingScaleService } from '../services/rating-scale.service';
import { Globals } from '.././globals';
import { CommonService } from '../services/common.service';
declare var $: any;

@Component({
	selector: 'app-rating-scale',
	providers: [RatingScaleService, CommonService],
	templateUrl: './rating-scale.component.html',
	styleUrls: ['./rating-scale.component.css']
})

export class RatingScaleComponent implements OnInit {
	ratingscaleEntity;
	submitted;
	btn_disable;
	header;

	constructor(private el: ElementRef, private http: Http, private router: Router, private route: ActivatedRoute,
		private RatingScaleService: RatingScaleService, public globals: Globals, private CommonService: CommonService) {

	}
	ngOnInit() {
		this.globals.isLoading = true;
		if(this.globals.authData.RoleId==4){		
			this.default();
		} else {
			this.CommonService.get_permissiondata({'RoleId':this.globals.authData.RoleId,'screen':'Rating Scale'})
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
		this.ratingscaleEntity = {};
		let id = this.route.snapshot.paramMap.get('id');
		this.globals.msgflag = false;
		if (id) {
			this.header = 'Edit';
			this.RatingScaleService.getById(id)
				.then((data) => {
					this.ratingscaleEntity = data;
					this.globals.isLoading = false;
				},
				(error) => {
					//alert('error');
					this.globals.isLoading = false;
					this.router.navigate(['/admin/pagenotfound']);
				});
		} else {
			this.header = 'Add';
			this.ratingscaleEntity = {};
			this.ratingscaleEntity.RatingScaleId = 0;
			this.ratingscaleEntity.IsActive = '1';
			this.globals.isLoading = false;
		}
		setTimeout(function(){
			$(".rscale").addClass("selected");
			$(".gsetting").addClass("active");
        	$(".rscale").parent().removeClass("display_block");	
		},500);
	}

	addRatingScale(ratingscaleForm) {
		let id = this.route.snapshot.paramMap.get('id');
		if (id) {
			this.ratingscaleEntity.UpdatedBy = this.globals.authData.UserId;
			this.submitted = false;
		} else {
			this.ratingscaleEntity.CreatedBy = this.globals.authData.UserId;
			this.ratingscaleEntity.UpdatedBy = this.globals.authData.UserId;
			this.submitted = true;
		}
		if (ratingscaleForm.valid) {
			this.btn_disable = true;
			this.RatingScaleService.add(this.ratingscaleEntity)
				.then((data) => {
					//alert('success');
					this.btn_disable = false;
					this.submitted = false;
					this.ratingscaleEntity = {};
					ratingscaleForm.form.markAsPristine();
					if (id) {
						this.globals.message = 'Rating Scale Updated Successfully';
						this.globals.type = 'success';
						this.globals.msgflag = true;
					} else {
						this.globals.message = 'Rating Scale Added Successfully';
						this.globals.type = 'success';
						this.globals.msgflag = true;
					}
					this.router.navigate(['/admin/rating-scale/list']);
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

	clearForm(ratingscaleForm) {
		this.ratingscaleEntity = {};
		this.ratingscaleEntity.RatingScaleId = 0;
		this.ratingscaleEntity.IsActive = '1';
		this.submitted = false;
		ratingscaleForm.form.markAsPristine();
	}

}


