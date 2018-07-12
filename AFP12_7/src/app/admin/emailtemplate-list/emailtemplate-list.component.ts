import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { EmailtemplateService } from '../services/emailtemplate.service';
import { CommonService } from '../services/common.service';
import { Globals } from '.././globals';
import { forEach } from '@angular/router/src/utils/collection';
declare var $,unescape: any;

@Component({
  selector: 'app-emailtemplate-list',
  providers: [ EmailtemplateService,CommonService ],
  templateUrl: './emailtemplate-list.component.html',
  styleUrls: ['./emailtemplate-list.component.css']
})
export class EmailtemplateListComponent implements OnInit {
	
  	EmailList;
	deleteEntity;
	msgflag;
	message;
	type;
	permissionEntity;
	//globals;

 constructor( private http: Http,public globals: Globals, private router: Router, 
	private EmailtemplateService: EmailtemplateService,private CommonService: CommonService, private route:ActivatedRoute) { }


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
		this.CommonService.get_permissiondata({'RoleId':this.globals.authData.RoleId,'screen':'Email Template'})
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
		this.EmailtemplateService.getAll()
		.then((data) => 
		{ 
			//alert(data);		
			// for(var i=1; i<=data.length; i++){
			// 	data[i].To=data[i].To.toString().replace("1","Admin");	
			// }		
			this.EmailList = data;
			setTimeout(function(){
				$('#dataTables-example').dataTable( {
					"oLanguage": {
						"sLengthMenu": "_MENU_ Email per Page",
						"sInfo": "Showing _START_ to _END_ of _TOTAL_ Email",
						"sInfoFiltered": "(filtered from _MAX_ total Email)"
					}
				});
				$(".emailtemplate").addClass("selected");
				$(".email").addClass("active");
        		$(".emailtemplate").parent().removeClass("display_block");	
			},500); 
			this.globals.isLoading = false;
		}, 
		(error) => 
		{
			//alert('error');
			this.globals.isLoading = false;
			this.router.navigate(['/admin/pagenotfound']);
		});	
		//this.msgflag = false;
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

	deleteEmail(Email)
	{ 
		this.deleteEntity =  Email;
		$('#Delete_Modal').modal('show');					
	}

	deleteConfirm(Email)
	{ 
		this.EmailtemplateService.delete(Email.EmailId)
		.then((data) => 
		{
			let index = this.EmailList.indexOf(Email);
			$('#Delete_Modal').modal('hide');
			if (index != -1) {
				this.EmailList.splice(index, 1);
			}	
		this.globals.message = 'Email Template Deleted Successfully!';
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

