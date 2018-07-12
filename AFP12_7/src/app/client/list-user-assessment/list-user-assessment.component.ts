import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
 import { ListUserAssessmentService } from '../services/list-user-assessment.service';
//import { CommonService } from '../services/common.service';
import { Globals } from '../globals';
declare var $: any;

@Component({
  
  selector: 'app-list-user-assessment',
  providers: [ ListUserAssessmentService ],
  templateUrl: './list-user-assessment.component.html',
  styleUrls: ['./list-user-assessment.component.css']
})
export class ListUserAssessmentComponent implements OnInit {

  companyList;
	deleteEntity;
	msgflag;
	message;
	type;
  permissionEntity;
  userAssessList;

  constructor(private http: Http, private router: Router, private route: ActivatedRoute, 
		private ListUserAssessmentService: ListUserAssessmentService, public globals: Globals) { }

  ngOnInit() 
  {

    

    // 
    // this.ListUserAssessmentService.getAllCompany	()
    // .then((data) => 
    // { 
    
  
    //   this.companyList = data;	
    //   setTimeout(function(){
    //     $('#dataTables-example').dataTable( {
    //       "oLanguage": {
    //         "sLengthMenu": "_MENU_ Registered Company per Page",
    //         "sInfo": "Showing _START_ to _END_ of _TOTAL_ Registered Company",
    //         "sInfoFiltered": "(filtered from _MAX_ total Registered Company)"
    //       }
    //     });
    //   },500); 
  
    // }, 
    // (error) => 
    // {
    //   //alert('error');
    // });	
    // this.msgflag = false;
  
    
    
this.globals.isLoading = true;
    this.ListUserAssessmentService.getAllUserAssess()
    .then((data) => 
    { 
    
  
      this.userAssessList = data;	
      setTimeout(function(){
        $('#dataTables-example1').dataTable( {
          "oLanguage": {
            "sLengthMenu": "_MENU_ Users per Page",
            "sInfo": "Showing _START_ to _END_ of _TOTAL_ Users",
            "sInfoFiltered": "(filtered from _MAX_ total Users)"
          }
        });
		
		$('#dataTables-example1').dataTable();
				$('#dataTables-example1_filter input').addClass('input-sm');
		
        if ($("body").height() < $(window).height()) {
          $('footer').addClass('footer_fixed');
        } 
        
      },500); 
      this.globals.isLoading = false;
    }, 
    (error) => 
    {
      //alert('error');
      this.globals.isLoading = false;
      this.router.navigate(['/pagenotfound']);
    });	
    this.msgflag = false;



  }



		


}
