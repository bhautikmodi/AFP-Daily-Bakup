import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CourselevelService } from '../services/courselevel.service';
import { CommonService } from '../services/common.service';
import { Globals } from '.././globals';
declare var $,unescape: any;
@Component({
  selector: 'app-courselevellist',
  providers: [ CourselevelService,CommonService ],
  templateUrl: './courselevellist.component.html',
  styleUrls: ['./courselevellist.component.css']
})
export class CourselevellistComponent implements OnInit {
	CourselevelList;
	deleteEntity;
	msgflag;
	message;
	type;
	//globals;
	permissionEntity;
 constructor(private http: Http, private router: Router, private route: ActivatedRoute, 
	private CourselevelService: CourselevelService, private CommonService: CommonService, public globals: Globals) 
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
		this.CommonService.get_permissiondata({'RoleId':this.globals.authData.RoleId,'screen':'Course Level'})
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
	this.CourselevelService.getAll()
	.then((data) => 
	{ 
		this.CourselevelList = data;	
		setTimeout(function(){
      $('#dataTables-example').dataTable( {
        "oLanguage": {
          "sLengthMenu": "_MENU_ Course Level per Page",
					"sInfo": "Showing _START_ to _END_ of _TOTAL_ Course Level",
					"sInfoFiltered": "(filtered from _MAX_ total Course Level)"
        }
      }); $(".clevel").addClass("selected");
			$(".gsetting").addClass("active");
			$(".clevel").parent().removeClass("display_block");	
    },500); 
		this.globals.isLoading = false;
	}, 
	(error) => 
	{
		//alert('error');
		this.globals.isLoading = false;
		this.router.navigate(['/admin/pagenotfound']);
	});		
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

	
	deleteCourselevel(Courselevel)
	{ 
		this.deleteEntity =  Courselevel;
		$('#Delete_Modal').modal('show');					
	}

	deleteConfirm(Courselevel)
	{ 	
		var del={'Userid':this.globals.authData.UserId,'id':Courselevel.ConfigurationId};
	  this.CourselevelService.delete(del)
		.then((data) => 
		{
			let index = this.CourselevelList.indexOf(Courselevel);
			$('#Delete_Modal').modal('hide');
			if (index != -1) {
				this.CourselevelList.splice(index, 1);
				//this.router.navigate(['/domain/list']);
				// setTimeout(function(){
				// 	$('#dataTables-example').dataTable( {
				// 		"oLanguage": {
				// 			"sLengthMenu": "_MENU_ Domains per Page",
				// 			"sInfo": "Showing _START_ to _END_ of _TOTAL_ Domains",
				// 			"sInfoFiltered": "(filtered from _MAX_ total Domains)"
				// 		}
				// 	});
				// },3000); 
			}			
			//alert(data);
			this.globals.message = 'Course Level Deleted Successfully';
			this.globals.type = 'success';
			this.globals.msgflag = true;
		}, 
		(error) => 
		{
			$('#Delete_Modal').modal('hide');
			if(error.text){
				this.globals.message = "You can't delete this record because of their dependency";
				this.globals.type = 'danger';
				this.globals.msgflag = true;
			}	
		});		
	}
}
