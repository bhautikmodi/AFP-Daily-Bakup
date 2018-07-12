import { Component, OnInit, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PlaceholderService } from '../services/placeholder.service';
import { CommonService } from '../services/common.service';
import { Globals } from '.././globals';
declare var $: any;

@Component({
	selector: 'app-placeholder',
	providers: [PlaceholderService, CommonService],
	templateUrl: './placeholder.component.html',
	styleUrls: ['./placeholder.component.css']
})

export class PlaceholderComponent implements OnInit {
	placeholderEntity;
	tableList;
	columnList;
	submitted;
	btn_disable;
	header;

	constructor(private el: ElementRef, private http: Http, private router: Router, private route: ActivatedRoute,
		private PlaceholderService: PlaceholderService, public globals: Globals, private CommonService: CommonService) {

	}
	ngOnInit() {
		this.globals.isLoading = true;
		if(this.globals.authData.RoleId!=4){
			this.router.navigate(['/admin/access-denied']);
		  }

		if(this.globals.authData.RoleId==4){		
			this.default();
		} else {
			this.CommonService.get_permissiondata({'RoleId':this.globals.authData.RoleId,'screen':'Placeholder Screen'})
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
		this.placeholderEntity = {};
		this.columnList = [];
		let id = this.route.snapshot.paramMap.get('id');
		this.globals.msgflag = false;
		this.PlaceholderService.getTableList()
			.then((data) => {
				this.tableList = data;
				this.globals.isLoading = false;
			},
			(error) => {
				//alert('error');
				this.globals.isLoading = false;
				this.router.navigate(['/admin/pagenotfound']);
			});
		if (id) {
			this.header = 'Edit';
			this.PlaceholderService.getById(id)
				.then((data) => {
					if (data != "") {
						this.placeholderEntity = data;
						if (this.placeholderEntity.TableId > 0) {
							this.PlaceholderService.getColumnList(this.placeholderEntity.TableId)
								.then((data) => {
									this.columnList = data;
									this.globals.isLoading = false;
								},
								(error) => {
									//alert('error');
									this.globals.isLoading = false;
								});
						}
					} else {
						this.router.navigate(['/dashboard']);
					}
				},
				(error) => {
					//alert('error');
					this.globals.isLoading = false;
					this.router.navigate(['/admin/pagenotfound']);
				});
		} else {
			this.header = 'Add';
			this.placeholderEntity = {};
			this.placeholderEntity.PlaceholderId = 0;
			this.placeholderEntity.IsActive = '1';
			this.placeholderEntity.TableId = '';
			this.placeholderEntity.ColumnId = '';
		}
		setTimeout(function(){
			$(".placeholder").addClass("selected");
			$(".email").addClass("active");
        	$(".placeholder").parent().removeClass("display_block");	
		},500); 
	}

	addPlaceholder(placeholderForm) {
		
		let id = this.route.snapshot.paramMap.get('id');
		if (id) {
			this.placeholderEntity.UpdatedBy = this.globals.authData.UserId;
			this.submitted = false;
		} else {
			this.placeholderEntity.CreatedBy = this.globals.authData.UserId;
			this.placeholderEntity.UpdatedBy = this.globals.authData.UserId;
			this.submitted = true;
		}
		if (placeholderForm.valid) {
			this.btn_disable = true;
			this.PlaceholderService.add(this.placeholderEntity)
				.then((data) => {
					//alert('success');
					this.btn_disable = false;
					this.submitted = false;
					this.placeholderEntity = {};
					placeholderForm.form.markAsPristine();
					if (id) {
						this.globals.message = 'Placeholder Updated Successfully!';
						this.globals.type = 'success';
						this.globals.msgflag = true;
					} else {
						this.globals.message = 'Placeholder Added Successfully!';
						this.globals.type = 'success';
						this.globals.msgflag = true;
					}
					this.router.navigate(['/admin/placeholder/list']);
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

	clearForm(placeholderForm) {
		this.placeholderEntity = {};
		this.placeholderEntity.PlaceholderId = 0;
		this.placeholderEntity.IsActive = '1';
		this.placeholderEntity.TableId = '';
		this.placeholderEntity.ColumnId = '';
		this.submitted = false;
		placeholderForm.form.markAsPristine();
	}

	getColumnList(placeholderForm) {
		
		placeholderForm.form.controls.ColumnId.markAsDirty();
		this.placeholderEntity.ColumnId = '';
		if (this.placeholderEntity.TableId > 0) {
			this.PlaceholderService.getColumnList(this.placeholderEntity.TableId)
				.then((data) => {
					this.columnList = data;
				},
				(error) => {
					//alert('error');
					this.globals.isLoading = false;
					this.router.navigate(['/admin/pagenotfound']);
				});
		} else {
			this.columnList = [];
		}
	}

}

