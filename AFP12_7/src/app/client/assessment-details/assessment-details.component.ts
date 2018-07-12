import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AssessmentDetailsService } from '../services/assessment-details.service';
import { debug } from 'util';
declare var $: any;
@Component({
  selector: 'app-assessment-details',
	providers: [ AssessmentDetailsService ],
  templateUrl: './assessment-details.component.html',
  styleUrls: ['./assessment-details.component.css']
})
export class AssessmentDetailsComponent implements OnInit {
AsmtDetailsEntity;
submitted;
btn_disable;
TeamSizeList;
header;
	type;
  constructor( private http: Http,public globals: Globals, private AssessmentDetailsService: AssessmentDetailsService, private router: Router,private route:ActivatedRoute) { }

  ngOnInit() 
  {
	$('[data-toggle="tooltip"]').tooltip();
	this.globals.isLoading = true;
	setTimeout(function(){ 
		if ($("body").height() < $(window).height()) {
			$('footer').addClass('footer_fixed');
		} 
	}, 1000);

	
	  this.AsmtDetailsEntity={};
	  this.AsmtDetailsEntity.TeamSizeId = '';
	  this.AssessmentDetailsService.getTeamSize()
	  .then((data) => 
	  {
		  this.TeamSizeList = data;
		  this.globals.isLoading = false;
	  }, 
	  (error) => 
	  {
		  //alert('error');
		  this.globals.isLoading = false;
		  this.router.navigate(['/pagenotfound']);
	  });		
  }
addAsmtDetails(AsmtDetailsForm)
	{		
			
			this.AsmtDetailsEntity.CreatedBy = this.globals.authData.UserId;
			this.AsmtDetailsEntity.UpdatedBy = this.globals.authData.UserId;
			this.submitted = true;
	
			// this.RegisterEntity.CreatedBy = this.globals.authData.UserId;
			this.AsmtDetailsEntity.UserId = this.globals.authData.UserId;
			this.submitted = true;
		
			
		
		if(AsmtDetailsForm.valid){
			this.btn_disable = true;
			this.globals.isLoading = true;
			this.AssessmentDetailsService.add(this.AsmtDetailsEntity)
			.then((data) => 
			{
				//alert('success');
				this.btn_disable = false;
				this.submitted = false;
				this.AsmtDetailsEntity = {};
				AsmtDetailsForm.form.markAsPristine();
				this.globals.isLoading = false;
					this.globals.message = 'Add successfully';
					this.globals.type = 'success';
					this.globals.msgflag = true;
							
				this.router.navigate(['/assessment/'+data]);
			}, 
			(error) => 
			{
				//alert('error');
				this.globals.isLoading = false;
				this.router.navigate(['/pagenotfound']);
				this.btn_disable = false;
				this.submitted = false;
			});
		} 		
	}
}
