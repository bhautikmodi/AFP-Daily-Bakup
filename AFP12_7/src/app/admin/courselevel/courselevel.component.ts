import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
import { CourselevelService } from '../services/courselevel.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../services/common.service';
declare var $: any;
@Component({
	selector: 'app-courselevel',
	providers: [CourselevelService, CommonService],
	templateUrl: './courselevel.component.html',
	styleUrls: ['./courselevel.component.css']
})
export class CourselevelComponent implements OnInit {
	
	CourseLevelEntity;
	submitted;
	btn_disable;
	header;
	constructor(private http: Http, public globals: Globals, private router: Router, private CourselevelService: CourselevelService,
		private route: ActivatedRoute, private CommonService: CommonService) { }

	ngOnInit() {
		this.globals.isLoading = true;
		$("body").tooltip({
			selector: "[data-toggle='tooltip']"
		});
		if(this.globals.authData.RoleId==4){		
			this.default();
		} else {
			this.CommonService.get_permissiondata({'RoleId':this.globals.authData.RoleId,'screen':'Course Level'})
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
		this.CourseLevelEntity = {};
		let id = this.route.snapshot.paramMap.get('id');
		if (id) {
			this.header = 'Edit';
			this.CourselevelService.getById(id)
				.then((data) => {
					this.CourseLevelEntity = data;
					this.CourseLevelEntity.CourseLevel = data['Value'];
					this.CourseLevelEntity.Keyword = data['DisplayText'];
					this.globals.isLoading = false;
				},
				(error) => {
					//alert('error');
					this.globals.isLoading = false;
					this.router.navigate(['/admin/pagenotfound']);
				});
		} else {
			this.header = 'Add';
			this.CourseLevelEntity = {};
			this.CourseLevelEntity.ConfigurationId = 0;
			this.CourseLevelEntity.IsActive = '1';
			this.globals.isLoading = false;
		}
		setTimeout(function(){
			$(".clevel").addClass("selected");
			$(".gsetting").addClass("active");
        	$(".clevel").parent().removeClass("display_block");	
		},500);
	}

	addCourseLevel(CourseLevelForm) {
		let id = this.route.snapshot.paramMap.get('id');
		if (id) {
			this.CourseLevelEntity.UpdatedBy = this.globals.authData.UserId;
			this.submitted = false;
		} else {
			this.CourseLevelEntity.CreatedBy = this.globals.authData.UserId;
			this.CourseLevelEntity.UpdatedBy = this.globals.authData.UserId;
			this.submitted = true;
		}
		if (CourseLevelForm.valid) {
			this.btn_disable = true;
			this.CourselevelService.add(this.CourseLevelEntity)
				.then((data) => {
					//alert('success');
					this.btn_disable = false;
					this.submitted = false;
					this.CourseLevelEntity = {};
					CourseLevelForm.form.markAsPristine();
					if (id) {
						this.globals.message = 'Course Level Updated Successfully';
						this.globals.type = 'success';
						this.globals.msgflag = true;
					} else {
						this.globals.message = 'Course Level Added Successfully';
						this.globals.type = 'success';
						this.globals.msgflag = true;
					}
					this.router.navigate(['/admin/courselevel/list']);
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


	clearForm(CourseLevelForm) {
		this.CourseLevelEntity = {};
		this.CourseLevelEntity.ConfigurationId = 0;
		this.CourseLevelEntity.IsActive = '1';
		this.submitted = false;
		CourseLevelForm.form.markAsPristine();
	}
}
