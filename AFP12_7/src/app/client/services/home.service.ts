import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
import { Router } from '@angular/router';
@Injectable()
export class HomeService {

constructor( private http: Http,private globals: Globals,private router: Router) { }
  getAll()
   {
   let promise = new Promise((resolve, reject) => {
     this.http.get(this.globals.baseAPIUrl + 'Invitation/getAll', this.globals.headerpath)
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
