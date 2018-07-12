import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { SalesDashboardService } from '../services/sales-dashboard.service';
import {IOption} from 'ng-select';
declare var $: any;
@Component({
  selector: 'app-sales-dashboard',
  providers: [SalesDashboardService],
  templateUrl: './sales-dashboard.component.html',
  styleUrls: ['./sales-dashboard.component.css']
})
export class SalesDashboardComponent implements OnInit {
	CompanyList;
	UserList;
	Usersearch;
	SalesDashboardEntity;
	submitted;
	btn_disable;
	header;
	vardisabled;
	//globals;
	p;
	
  constructor(private http: Http, public globals: Globals, private router: Router, private route: ActivatedRoute,
		private SalesDashboardService: SalesDashboardService) { }


	ngOnInit() {  debugger
		//this.globals = this.global;
		this.globals.isLoading = true;	
		
		
		$('.select2').select2();
		
	
		var data = {'com': '','user':''};
		this.SalesDashboardService.add(data)
			.then((data) => { 
				//alert('success');
				if(data=='error')
				{
					this.Usersearch=[];
					
				}else{		
					this.Usersearch = data;
					
				}
				
				this.btn_disable = false;
				this.submitted = false;
				setTimeout(function(){ 
					if ($("body").height() < $(window).height()) {
					  $('footer').addClass('footer_fixed');
					} 
				  }, 1000);	
				  //this.globals.isLoading = false;	
				  


				  this.SalesDashboardService.getAllUser()
				  //.map(res => res.json())
				  .then((data) => {
					  this.UserList = data['user'];
					  this.CompanyList = data['com'];
					  this.globals.isLoading = false;	
				  },
				  (error) => {
					  //alert('error');
					  this.globals.isLoading = false;
					  this.router.navigate(['/pagenotfound']);
				  });


			},
			(error) => {
				//alert('error');
				this.btn_disable = false;
				this.submitted = false;
				this.globals.isLoading = false;
				this.router.navigate(['/pagenotfound']);
			});



			this.vardisabled=true;
    this.SalesDashboardEntity={};
		this.SalesDashboardEntity.CompanyId='';
		this.SalesDashboardEntity.UserId='';
		this.Usersearch=[];
		this.UserList=[];
		this.CompanyList=[];

   // $('.user_box').click(function(){
					
			//$('.user_box').removeClass('active');
			//$(this).addClass('active');
		//});
		
		
		
		
  }
  addSalesDashboard(SalesDashboardForm) {
		
		if (SalesDashboardForm.valid) {
			this.globals.isLoading = true;	
			this.btn_disable = true;
		//   this.SalesDashboardEntity.CompanyId;
		// 	this.SalesDashboardEntity.UserId;
		this.vardisabled=true;
			var data = {'com': this.SalesDashboardEntity.CompanyId,'user':this.SalesDashboardEntity.UserId};
			this.SalesDashboardService.add(data)
				.then((data) => {
					//alert('success');
					if(data=='error')
					{
						this.Usersearch=[];
					}
					else
					{		
						this.Usersearch = data;
					}
			
					this.btn_disable = false;
					this.submitted = false;
					this.globals.isLoading = false;	
				
				},
				(error) => {
					//alert('error');
					this.btn_disable = false;
					this.submitted = false;
					this.globals.isLoading = false;
					this.router.navigate(['/pagenotfound']);
				});
		}
		
	}
	getUserList(SalesDashboardForm)
	{ 
			
		SalesDashboardForm.form.controls.UserId.markAsDirty();
		this.SalesDashboardEntity.UserId='';
		if(this.SalesDashboardEntity.CompanyId > 0){
			this.globals.isLoading = true;
			this.SalesDashboardService.getUserList(this.SalesDashboardEntity.CompanyId)
			.then((data) => 
			{
				this.UserList = data;
				this.globals.isLoading = false;	
			}, 
			(error) => 
			{
				//alert('error');
				this.globals.isLoading = true;
			});
		} else {
			this.UserList = [];
		}
	}
	clickid()
  {
	var id = $('.user_box.active input').val();
	this.router.navigate(['/user-assessment-list/'+id]);
	
	//alert(id);
   
  
  }
//   addclass(i){
	  
// 	  $('.user_box').removeClass('active');
// 	  $('#cbox'+i).addClass('active');
// 	  var id = $('.user_box.active input').val();
// 	if(id>0)
// 	{
// 		this.vardisabled=false;
// 	}
// 	else{
// 		this.vardisabled=true;
// 	}
// 		//e.currentTarget.addClass('active');
// 	}
	clearForm(SalesDashboardForm) {
		this.SalesDashboardEntity = {};
		this.SalesDashboardEntity.UserId = '';
		this.SalesDashboardEntity.CompanyId = '';
	
		this.submitted = false;
		SalesDashboardForm.form.markAsPristine();
	}
	onSelected(option: IOption) {
        this.SalesDashboardEntity.CompanyId = `${option.value}`;
    }
}
