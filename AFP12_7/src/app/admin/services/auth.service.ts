import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
import { JwtHelper } from 'angular2-jwt';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  constructor(private http: Http,private globals: Globals, private router: Router) { }
  
  login(loginEntity){  
	let promise = new Promise((resolve, reject) => {
    this.http.post(this.globals.baseAPIUrl + 'Login/check_login', loginEntity, this.globals.headerpath)
      .toPromise()
      .then( 
        res => { // Success 
			let result = res.json();
			if(result && result=='access denite'){
				
			}
			else if(result && result.token){
				localStorage.setItem('token',result.token);				
				this.globals.authData = new JwtHelper().decodeToken(result.token);
			}
		  resolve(res.json());
        },
        msg => { // Error
			reject(msg.json());
			this.globals.isLoading = false;
        }
      );
	});		
	return promise;
  }
  logout(admin){ 
		let promise = new Promise((resolve, reject) => {
		this.http.post(this.globals.baseAPIUrl + 'Login_user/logout',admin, this.globals.headerpath)
			.toPromise()
			.then(
				res => { // Success
					this.globals.authData = '';
					localStorage.removeItem('token');
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
 
   
  isLoggedIn() {  
	  let jwtHelper = new JwtHelper();
	  let token = localStorage.getItem('token');
	  if(!token) {
		  return false;
	  }
	  let isExpired = jwtHelper.isTokenExpired(token) ? true : false;	 
	  return !isExpired;
	}
	
	public getToken(): string {
    return localStorage.getItem('token');
	}
	

	db_mode(){  
		let promise = new Promise((resolve, reject) => {
			this.http.get(this.globals.baseAPIUrl + 'Login_user/db_mode', this.globals.headerpath)
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

  
}
