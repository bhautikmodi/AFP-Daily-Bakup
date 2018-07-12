import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
import { Router } from '@angular/router';
@Injectable()
export class ContactusService {

  constructor( private http: Http,private globals: Globals,private router: Router) { }
  add(ContactEntity){  
    
   let promise = new Promise((resolve, reject) => {
     this.http.post(this.globals.baseAPIUrl + 'Contact/add', ContactEntity, this.globals.headerpath)
       .toPromise()
       .then( 
         res => { // Success 
       resolve(res.json());
         },
         msg => { // Error
       reject(msg.json());
       this.globals.isLoading = false;
       this.router.navigate(['/pagenotfound']);
         }
       );
   });		
   return promise;
   }
   getById(CId){
    let promise = new Promise((resolve, reject) => {
      this.http.get(this.globals.baseAPIUrl + 'Contact/getById/' + CId, this.globals.headerpath)
        .toPromise()
        .then(
          res => { // Success
            resolve(res.json());
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
