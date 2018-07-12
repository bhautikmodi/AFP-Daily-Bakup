import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from '../services/dashboard.service';
import { Globals } from '.././globals';
declare var AmCharts: any;

@Component({
  selector: 'app-dashboard',
   providers: [ DashboardService ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 Dashboard;
 //globals;
   constructor( private http: Http,public globals: Globals, private router: Router, private DashboardService: DashboardService,private route:ActivatedRoute) { }

  ngOnInit() {
		//this.globals = this.global;
		this.globals.isLoading = true;
  this.Dashboard={};
	this.DashboardService.getAll(this.globals.authData.RoleId)
	//.map(res => res.json())
	.then((data) => 
	{
		this.Dashboard.user = data['user'];
		this.Dashboard.domain = data['domain'];
		this.Dashboard.Carea = data['Carea'];
		this.Dashboard.Tksa = data['Tksa'];
		this.Dashboard.Course = data['Course'];
		this.Dashboard.Company = data['Company'];
		this.globals.isLoading = false;
	}, 
	(error) => 
	{
		//alert('error');
		this.globals.isLoading = false;
		this.router.navigate(['/admin/pagenotfound']);
	});	  
  }

}
