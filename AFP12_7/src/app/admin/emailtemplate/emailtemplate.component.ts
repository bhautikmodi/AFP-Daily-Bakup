import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
import { EmailtemplateService } from '../services/emailtemplate.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
declare var $: any;
declare var CKEDITOR: any;
import { CommonService } from '../services/common.service';

@Component({
	selector: 'app-emailtemplate',
	providers: [EmailtemplateService, CommonService],
	templateUrl: './emailtemplate.component.html',
	styleUrls: ['./emailtemplate.component.css']
})
export class EmailtemplateComponent implements OnInit {
	emailEntity;
	submitted;
	btn_disable;
	header;
	des_valid;
	roleList;
	placeholderList;
	abcform;

	constructor(private http: Http, public globals: Globals, private router: Router, private EmailtemplateService: EmailtemplateService,
		private CommonService: CommonService, private route: ActivatedRoute) { }

	ngOnInit() {
		this.globals.isLoading = true;
	$("body").tooltip({
		selector: "[data-toggle='tooltip']"
	});
		this.globals.isLoading = true;
		if(this.globals.authData.RoleId==4){		
			this.default();
		} else {
			this.CommonService.get_permissiondata({'RoleId':this.globals.authData.RoleId,'screen':'Email Template'})
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
		this.des_valid = false;
		this.emailEntity = {};
		//CKEDITOR.replace('EmailBody');
		CKEDITOR.replace( 'EmailBody', {
			height: '300',
			resize_enabled : 'false',
			resize_maxHeight : '300',
			resize_maxWidth : '948',
			resize_minHeight: '300',
			resize_minWidth: '948', 
			 //extraAllowedContent: 'style;*[id,rel](*){*}'
			 extraAllowedContent: 'span;ul;li;table;td;style;*[id];*(*);*{*}'
	 });
		let id = this.route.snapshot.paramMap.get('id');
		this.EmailtemplateService.getDefaultList()
			.then((data) => {
				this.roleList = data['role'];
				this.placeholderList = data['placeholder'];
				this.globals.isLoading = false;
			},
			(error) => {
				//alert('error');
				this.globals.isLoading = false;
				this.router.navigate(['/admin/pagenotfound']);
			});
		if (id) {
			this.header = 'Edit';
			this.EmailtemplateService.getById(id)
				.then((data) => {
					if (data != "") {
						this.emailEntity = data;
						if (this.emailEntity.Cc == 0) {
							this.emailEntity.Cc = "";
						}
						if (this.emailEntity.Bcc == 0) {
							this.emailEntity.Bcc = "";
						}
						CKEDITOR.instances.EmailBody.setData(this.emailEntity.EmailBody);
						this.globals.isLoading = false;
					} else {
						this.router.navigate(['/admin/dashboard']);
					}
					
				},
				(error) => {
					//alert('error');
					this.globals.isLoading = false;
					this.router.navigate(['/admin/pagenotfound']);
				});
		} else {
			this.header = 'Add';
			this.emailEntity = {};
			this.emailEntity.EmailId = 0;
			this.emailEntity.Token = '';
			this.emailEntity.To = '';
			this.emailEntity.Cc = '';
			this.emailEntity.Bcc = '';
			this.emailEntity.IsActive = '1';
			//this.globals.isLoading = false;
		}

		CKEDITOR.on('instanceReady', function () {
			CKEDITOR.document.getById('contactList').on('dragstart', function (evt) {
				var target = evt.data.getTarget().getAscendant('div', true);
				CKEDITOR.plugins.clipboard.initDragDataTransfer(evt);
				var dataTransfer = evt.data.dataTransfer;
				dataTransfer.setData('text/html', '{' + target.getText() + '}');
			});
		});
		setTimeout(function(){
			$(".emailtemplate").addClass("selected");
			$(".email").addClass("active");
        	$(".emailtemplate").parent().removeClass("display_block");	
		},500); 
	}

	addEmailTemplate(EmailForm) {
		this.emailEntity.EmailBody = CKEDITOR.instances.EmailBody.getData();
		if (this.emailEntity.EmailBody != "") {
			this.des_valid = false;
		} else {
			this.des_valid = true;
		}
		let id = this.route.snapshot.paramMap.get('id');
		if (id) {
			this.emailEntity.UpdatedBy = this.globals.authData.UserId;
			this.submitted = false;
		} else {
			this.emailEntity.CreatedBy = this.globals.authData.UserId;
			this.emailEntity.UpdatedBy = this.globals.authData.UserId;
			this.submitted = true;
		}
		if (EmailForm.valid && this.des_valid == false) {
			this.btn_disable = true;
			this.emailEntity.check = 0;
			this.EmailtemplateService.add(this.emailEntity)
				.then((data) => {
					if (data == 'sure') {
						this.btn_disable = false;
						this.submitted = false;
						this.abcform = EmailForm;
						$('#Sure_Modal').modal('show');
					} else {
						this.btn_disable = false;
						this.submitted = false;
						this.emailEntity = {};
						EmailForm.form.markAsPristine();
						if (id) {
							this.globals.message = 'Data Updated Successfully!';
							this.globals.type = 'success';
							this.globals.msgflag = true;
						} else {
							this.globals.message = 'Data Added Successfully!';
							this.globals.type = 'success';
							this.globals.msgflag = true;
						}
						this.router.navigate(['/admin/emailtemplate/list']);
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
	}

	clearForm(EmailForm) {
		this.emailEntity = {};
		this.emailEntity.EmailId = 0;
		this.emailEntity.IsActive = '1';
		this.submitted = false;
		this.des_valid = false;
		this.emailEntity.Token = '';
		this.emailEntity.To = '';
		this.emailEntity.Cc = '';
		this.emailEntity.Bcc = '';
		CKEDITOR.instances.EmailBody.setData('');
		EmailForm.form.markAsPristine();
	}

	addConfirm(abcform) {
		
		this.emailEntity.check = 1;
		let id = this.route.snapshot.paramMap.get('id');
		this.EmailtemplateService.add(this.emailEntity)
			.then((data) => {
				$('#Sure_Modal').modal('hide');
				this.btn_disable = false;
				this.submitted = false;
				this.emailEntity = {};
				abcform.form.markAsPristine();
				if (id) {
					this.globals.message = 'Email Template Updated Successfully!';
					this.globals.type = 'success';
					this.globals.msgflag = true;
				} else {
					this.globals.message = 'Email Template Added Successfully!';
					this.globals.type = 'success';
					this.globals.msgflag = true;
				}
				this.router.navigate(['/admin/emailtemplate/list']);

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

