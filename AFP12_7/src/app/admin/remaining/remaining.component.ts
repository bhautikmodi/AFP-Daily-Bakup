import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { RemainingService } from '../services/remaining.service';

@Component({
  selector: 'app-remaining',
   providers: [RemainingService],
  templateUrl: './remaining.component.html',
  styleUrls: ['./remaining.component.css']
})
export class RemainingComponent implements OnInit {

   constructor( private http: Http,public globals: Globals, private router: Router,private route:ActivatedRoute,private RemainingService:RemainingService) { }

  ngOnInit()
  {
		
	 
  }

	
}
