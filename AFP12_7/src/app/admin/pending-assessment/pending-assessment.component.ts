import { Component, OnInit, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PendingAssessmentService } from '../services/pending-assessment.service';
import { CommonService } from '../services/common.service';
import { Globals } from '.././globals';
declare var $,unescape: any;

@Component({
  selector: 'app-pending-assessment',
  providers: [ PendingAssessmentService,CommonService ],
  templateUrl: './pending-assessment.component.html',
  styleUrls: ['./pending-assessment.component.css']
})
export class PendingAssessmentComponent implements OnInit {

	pendingAssList;
	permissionEntity;
	
	constructor(private el: ElementRef, private http: Http, private router: Router, private route: ActivatedRoute,
		 private PendingAssessmentService: PendingAssessmentService, private CommonService: CommonService, public globals: Globals) 
  {
	
  }

  ngOnInit() { 
	$('.print').on('click',function(){
		window.print();
	})

	this.globals.isLoading = true;
	this.permissionEntity = {}; 
	if(this.globals.authData.RoleId==4){
		this.permissionEntity.View=1;
		this.permissionEntity.AddEdit=1;
		this.permissionEntity.Delete=1;
		this.default();
	} else {		
		this.CommonService.get_permissiondata({'RoleId':this.globals.authData.RoleId,'screen':'Pending Assessment'})
		.then((data) => 
		{
			this.permissionEntity = data;
			if(this.permissionEntity.View==1 ||  this.permissionEntity.AddEdit==1 || this.permissionEntity.Delete==1){
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
	this.PendingAssessmentService.getPendingAssessment()
	.then((data) => 
	{ 
		this.pendingAssList = data;	
		setTimeout(function(){
		$('#dataTables-example').dataTable( {
			"oLanguage": {
			"sLengthMenu": "_MENU_ Incomplete Assessments per Page",
						"sInfo": "Showing _START_ to _END_ of _TOTAL_ Incomplete Assessments",
						"sInfoFiltered": "(filtered from _MAX_ total Incomplete Assessments)",
						"sInfoEmpty": "Showing 0 to 0 of 0 Incomplete Assessments"
			}
		});
			$(".pendingass").addClass("selected");
			$(".email").addClass("active");
        	$(".pendingass").parent().removeClass("display_block");
		},100); 
		this.globals.isLoading = false;	
	}, 
	(error) => 
	{
		//alert('error');
		this.globals.isLoading = false;
		this.router.navigate(['/admin/pagenotfound']);
	});
  }

    printData()
	{
		var divToPrint=document.getElementById("dataTables-example");
		var newWin= window.open("");
		newWin.document.write(divToPrint.outerHTML);
		newWin.print();
		newWin.close();
	}

	tableToExcel(table, name)
	{
		var uri = 'data:application/vnd.ms-excel;base64,'
		, template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
		, base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) }
		, format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
		if (!table.nodeType){ table = document.getElementById(table)
		var ctx = {worksheet: name || 'Worksheet', table: table.outerHTML}
		window.location.href = uri + base64(format(template, ctx))}
	}

}


