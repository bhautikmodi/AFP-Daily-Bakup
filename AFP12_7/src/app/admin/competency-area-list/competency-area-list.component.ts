import { Component, OnInit, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CompetencyAreaService } from '../services/competency-area.service';
import { CommonService } from '../services/common.service';
import { Globals } from '.././globals';
declare var $,unescape: any;

@Component({
  selector: 'app-competency-area-list',
	providers: [ CompetencyAreaService,CommonService ],
  templateUrl: './competency-area-list.component.html',
  styleUrls: ['./competency-area-list.component.css']
})
export class CompetencyAreaListComponent implements OnInit {
	areaList;
	deleteEntity;
	msgflag;
	message;
	type;
	permissionEntity;
	//globals;
	
	constructor(private el: ElementRef, private http: Http, private router: Router, private route: ActivatedRoute,
		 private CompetencyAreaService: CompetencyAreaService, private CommonService: CommonService, public globals: Globals) 
  {
	
  }

	ngOnInit() { 
		$('.print').on('click',function(){
			window.print();
		})
	
		this.globals.isLoading = true;
		$("body").tooltip({
			selector: "[data-toggle='tooltip']"
		});
		//this.globals = this.global;
		this.permissionEntity = {}; 
		if(this.globals.authData.RoleId==4){
			this.permissionEntity.View=1;
			this.permissionEntity.AddEdit=1;
			this.permissionEntity.Delete=1;
			this.default();
		} else {		
			this.CommonService.get_permissiondata({'RoleId':this.globals.authData.RoleId,'screen':'Competency Area'})
			.then((data) => 
			{
				this.permissionEntity = data;
				if(this.permissionEntity.View==1 ||  this.permissionEntity.AddEdit==1 || this.permissionEntity.Delete==1){
					this.default();
				} else {
					this.router.navigate(['/access-denied']);
				}		
			},
			(error) => 
			{
				//alert('error');
				this.globals.isLoading = false;
				this.router.navigate(['/pagenotfound']);
			});	
		}			
		}
	
	default(){
		this.CompetencyAreaService.getAll()
	.then((data) => 
	{ 
		this.areaList = data;	
		setTimeout(function(){
      $('#dataTables-example').dataTable( {
        "oLanguage": {
          "sLengthMenu": "_MENU_ Competencies per Page",
					"sInfo": "Showing _START_ to _END_ of _TOTAL_ Competencies",
					"sInfoFiltered": "(filtered from _MAX_ total Competencies)",
					"sInfoEmpty": "Showing 0 to 0 of 0 Competencies  "
        }
	  });
	  $(".carea").addClass("selected");
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
	this.globals.isLoading = false;
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
	
	deletearea(area)
	{ 
		this.deleteEntity =  area;
		$('#Delete_Modal').modal('show');					
	}

	deleteConfirm(area)
	{ 
		var del={'Userid':this.globals.authData.UserId,'id':area.CAreaId};
		this.CompetencyAreaService.delete(del)
		.then((data) => 
		{
			let index = this.areaList.indexOf(area);
			$('#Delete_Modal').modal('hide');
			if (index != -1) {
				this.areaList.splice(index, 1);			
			}	
			this.globals.message = 'Competency Area Deleted Successfully!';
			this.globals.type = 'success';
			this.globals.msgflag = true;
		}, 
		(error) => 
		{
			$('#Delete_Modal').modal('hide');
			if(error.text){
				this.globals.message = "You can't delete this record because of their dependency!";
				this.globals.type = 'danger';
				this.globals.msgflag = true;
			}	
		});		
	}
	
}


