import { Injectable } from '@angular/core';
import { Http } from '@angular//http';
import { Globals } from '.././globals';
import {HttpClient} from "@angular/common/http";
import { Router } from '@angular/router';
@Injectable()
export class PendingAssessmentService {

  constructor(private http: HttpClient, private globals: Globals, private router: Router) { }

  getPendingAssessment(){     
    let promise = new Promise((resolve, reject) => {     
      this.http.get(this.globals.baseAPIUrl + 'Dashboard/getPendingAssessment')
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
