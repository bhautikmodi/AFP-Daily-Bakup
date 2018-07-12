import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {HttpClient} from "@angular/common/http";
import { Globals } from '.././globals';
import { Router } from '@angular/router';
@Injectable()
export class InvitationService {

  constructor(private http: HttpClient,private globals: Globals, private router: Router) { }

  getAllCompany(){
	 
    let promise = new Promise((resolve, reject) => {
      this.http.get(this.globals.baseAPIUrl + 'Invitation/getAllCompany')
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

  add(InvitationEntity)
  {
   let promise = new Promise((resolve, reject) => {
     this.http.post(this.globals.baseAPIUrl + 'Invitation/add', InvitationEntity)
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
   
   
    getAll()
   {
   let promise = new Promise((resolve, reject) => {
     this.http.get(this.globals.baseAPIUrl + 'Invitation/getAll')
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
   getIndustry(){
	 
    let promise = new Promise((resolve, reject) => {
      this.http.get(this.globals.baseAPIUrl + 'Invitation/getAllIndustry')
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
 delete(del)
   {
   let promise = new Promise((resolve, reject) => {		
     this.http.post(this.globals.baseAPIUrl + 'Invitation/delete', del)
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
   
    ReInvite(UserInvitationId)
   {
   let promise = new Promise((resolve, reject) => {		
     this.http.post(this.globals.baseAPIUrl + 'Invitation/ReInvite/' ,UserInvitationId)
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
  
   
  //  getById(UserInvitationId)
  //  {
  //  let promise = new Promise((resolve, reject) => {
  //    this.http.get(this.globals.baseAPIUrl + 'Invitation/getById/' + UserInvitationId, this.globals.headerpath)
  //      .toPromise()
  //      .then(
  //        res => { // Success
  //          resolve(res.json());
  //        },
  //        msg => { // Error
  //      reject(msg);
  //        }
  //      );
  //  });		
  //  return promise;
  //  }  
  getCompany(CompanyId){
	 
    let promise = new Promise((resolve, reject) => {
      this.http.get(this.globals.baseAPIUrl + 'Invitation/getCompany/' + CompanyId )
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
    invimsg()
   {
   let promise = new Promise((resolve, reject) => {
     this.http.get(this.globals.baseAPIUrl + 'Invitation/invimsg')
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
 
 
