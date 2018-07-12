import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Globals } from '../globals';
import { RemainingService } from '../services/remaining.service';

@Component({
  selector: 'app-remaininglist',
  templateUrl: './remaininglist.component.html',
  styleUrls: ['./remaininglist.component.css']
})
export class RemaininglistComponent implements OnInit {
	remainingList;
	//globals;
	constructor(private http: Http, private router: Router, private route: ActivatedRoute, private RemainingService: RemainingService,public globals: Globals) { }

  ngOnInit()
  {
		this.globals.isLoading = true;
		//this.globals = this.global;
	this.RemainingService.getAll()
	//.map(res => res.json())
	.then((data) => 
	{
		this.remainingList = data;
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
