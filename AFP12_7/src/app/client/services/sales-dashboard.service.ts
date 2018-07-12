import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
import {HttpClient} from "@angular/common/http";
import { Router } from '@angular/router';
@Injectable()
export class SalesDashboardService {

  constructor(private http: HttpClient, private globals: Globals,private router: Router) { }
  add(data){ 
    let promise = new Promise((resolve, reject) => { debugger
      this.http.post(this.globals.baseAPIUrl + 'Sales_dashboard/getUser', data)
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
  getAllUser()
  {
	let promise = new Promise((resolve, reject) => {
    this.http.get(this.globals.baseAPIUrl + 'Sales_dashboard/getAllUser')
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
  getUserList(CompanyId){
    let promise = new Promise((resolve, reject) => {
      this.http.get(this.globals.baseAPIUrl + 'Sales_dashboard/getUserList/' + CompanyId)
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
    // getUserAssessDetail(CAssessmentId) 
    // { 
    // let promise = new Promise((resolve, reject) => { 
    //   this.http.get(this.globals.baseAPIUrl + 'DashboardUser/getUserAssessDetail/'+CAssessmentId, this.globals.headerpath)
    //     .toPromise()
    //     .then(
    //       res => { // Success
    //         resolve(res.json());
    //       },
    //       msg => { // Error
    //     reject(msg);
    //       }
    //     );
    // });		
    // return promise;
    // }
}
