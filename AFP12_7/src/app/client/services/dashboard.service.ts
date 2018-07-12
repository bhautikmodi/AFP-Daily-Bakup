import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Globals } from '.././globals';
import {HttpClient} from "@angular/common/http";
@Injectable()
export class DashboardService {

  constructor( private http: HttpClient,private globals: Globals,private router: Router) { }

  getAllAssement(UserId) 
  { 
	let promise = new Promise((resolve, reject) => { 
    this.http.get(this.globals.baseAPIUrl + 'DashboardUser/getAllAssement/'+UserId)

      .toPromise()
      .then(
        res => { // Success
          resolve(res);
        },
        msg => { // Error

      reject(msg);
      this.globals.isLoading = false;	
      this.router.navigate(['/pagenotfound']);
        }
      );
	});		
  return promise;
  }

  getUserAssessDetail(CAssessmentId) 
  { 
	let promise = new Promise((resolve, reject) => { 
    this.http.get(this.globals.baseAPIUrl + 'DashboardUser/getUserAssessDetail/'+CAssessmentId)
      .toPromise()
      .then(
        res => { // Success
          resolve(res);
        },
        msg => { // Error
          
      reject(msg);
      this.globals.isLoading = false;	
    	this.router.navigate(['/pagenotfound']);
        }
      );
	});		
  return promise;
  }

}
