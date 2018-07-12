import { Component,ViewEncapsulation } from '@angular/core';
import { Globals } from './globals';
import { ActivatedRoute } from '@angular/router';
import { RemainingService } from './services/remaining.service';

@Component({
  selector: 'admin-root',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminComponent {
	remainingList;
	//globals;
	
	constructor(private route: ActivatedRoute,public globals: Globals) { }
    
    ngOnInit()
  {
		//this.globals = this.global;
	this.globals.IsAdmin = true;
    	
  }
}
