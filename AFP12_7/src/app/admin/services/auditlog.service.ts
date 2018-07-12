import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
import {HttpClient} from "@angular/common/http";
import { Router } from '@angular/router';
@Injectable()
export class AuditlogService {
  constructor(private http: HttpClient, private globals: Globals, private router: Router) { 
  }

  getEmailLog(){     
	let promise = new Promise((resolve, reject) => {     
    this.http.get(this.globals.baseAPIUrl + 'AuditLog/getEmailLog')
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

  getLoginLog(){     
    let promise = new Promise((resolve, reject) => {     
      this.http.get(this.globals.baseAPIUrl + 'AuditLog/getLoginLog')
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
    
    getActivityLog(){     
      let promise = new Promise((resolve, reject) => {     
        this.http.get(this.globals.baseAPIUrl + 'AuditLog/getActivityLog')
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


