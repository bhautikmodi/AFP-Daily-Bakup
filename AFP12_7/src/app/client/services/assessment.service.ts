import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
import { Router } from '@angular/router';
import {HttpClient} from "@angular/common/http";
@Injectable()
export class AssessmentService {

  constructor(private http: HttpClient,private globals: Globals,private router: Router) { }

  getAllksa(UserId) 
  { 
	let promise = new Promise((resolve, reject) => { 
    this.http.get(this.globals.baseAPIUrl + 'Assessment/getAllKSA/'+UserId)
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

  saveKsa(ksaEntity)
  { 
	let promise = new Promise((resolve, reject) => { 
    this.http.post(this.globals.baseAPIUrl + 'Assessment/saveKsa',ksaEntity)
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

  finalSubmit(CAssessmentId)
  {debugger
	let promise = new Promise((resolve, reject) => { 
    this.http.get(this.globals.baseAPIUrl + 'Assessment/finalSubmit/'+CAssessmentId)
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

  testKsa() 
  { 
	let promise = new Promise((resolve, reject) => { 
    this.http.get(this.globals.baseAPIUrl + 'AssessmentDetails/test')
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
