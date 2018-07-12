import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../services/common.service';
import { UserService } from '../services/user.service';
import { Globals } from '../globals';
declare var $,unescape,newWin: any;
@Component({
  selector: 'app-userlist',
   providers: [ UserService ],
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  userList;
 deleteEntity;
	msgflag;
	message;
	type;
	
	permissionEntity;
	//globals;
   constructor(private http: Http,private authService: AuthService, private router: Router, private route: ActivatedRoute, private UserService: UserService,public globals: Globals,private CommonService: CommonService,) { }

  ngOnInit()
  {
	
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
		this.CommonService.get_permissiondata({'RoleId':this.globals.authData.RoleId,'screen':'User'})
	
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

  
  default(){		
	this.UserService.getAllUser(this.globals.authData.RoleId)
	//.map(res => res.json())
	.then((data) => 
	{
		
		this.userList = data;
			setTimeout(function(){
      $('#dataTables-example').dataTable( {
        "oLanguage": {
          "sLengthMenu": "_MENU_ Users per Page",
					"sInfo": "Showing _START_ to _END_ of _TOTAL_ Users",
					"sInfoFiltered": "(filtered from _MAX_ total Users)"
        }
			});
			$(".user").addClass("selected");
	},500); 
	this.globals.isLoading = false;	
	}, 
	(error) => 
	{
		this.globals.isLoading = false;
		this.router.navigate(['/admin/pagenotfound']);
		//alert('error');
	});	
    this.msgflag = false;
	}
  
  deleteUser(user)
	{ 
		this.deleteEntity =  user;
		$('#Delete_Modal').modal('show');					
	}
  
  deleteConfirm(user)
	{ 	
		var del={'Userid':this.globals.authData.UserId,'id':user.UserId};
		this.UserService.deleteUser(del)
		.then((data) => 
		{
			let index = this.userList.indexOf(user);
			$('#Delete_Modal').modal('hide');
			if (index != -1) {
				this.userList.splice(index, 1);
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
			this.globals.message = 'User Deleted Successfully';
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
