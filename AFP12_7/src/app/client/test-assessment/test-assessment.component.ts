import { Component, OnInit } from '@angular/core';
import { AssessmentService } from '../services/assessment.service';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Globals } from '.././globals';
declare var $: any;

@Component({
  selector: 'app-test-assessment',
  providers: [ AssessmentService ],
  templateUrl: './test-assessment.component.html',
  styleUrls: ['./test-assessment.component.css']
})
export class TestAssessmentComponent implements OnInit {

  ksaDetails;

  constructor(private http: Http, 
    private AssessmentService: AssessmentService, private globals: Globals, private router: Router) 
    {
    
    }
  ngOnInit() {
    this.globals.isLoading = true;
   

    this.ksaDetails=[];
    this.AssessmentService.testKsa()
		.then((data) => 
		{
      this.ksaDetails = data;
      setTimeout(function(){
        $('#dataTables-example').dataTable( {
          "oLanguage": {
            "sLengthMenu": "_MENU_ ksa per Page",
            "sInfo": "Showing _START_ to _END_ of _TOTAL_ ksa",
            "sInfoFiltered": "(filtered from _MAX_ total ksa)"
          }          
        });
        if ($("body").height() < $(window).height()) {
          $('footer').addClass('footer_fixed');
        } 
      },100);
      this.globals.isLoading = false;
    }, 
		(error) => 
		{
      //alert('error');
      this.globals.isLoading = false;
      this.router.navigate(['/pagenotfound']);
		});
  }

}
