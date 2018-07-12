import { Injectable } from '@angular/core';
import { CanActivate,RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Globals } from '.././globals';
declare var $: any;
@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService : AuthService,private router: Router, public globals: Globals) { }

  canActivate(route,state:RouterStateSnapshot) { 
	
	if(state.url=='/admin/access-denied'||state.url=='/admin/pagenotfound'){
		this.globals.isLoading = false;
	} else {
		this.globals.isLoading = true;
	}
	if(state.url=='/admin/pagenotfound'||state.url=='/admin/access-denied'){
		this.globals.pageNotFound = false;
		if(this.authService.isLoggedIn()==true){
			this.globals.IsLoggedIn = true;
		} else {
			this.globals.IsLoggedIn = false;
		}
		return true;
	} else {
		this.globals.pageNotFound = true;
	}
	  
	  if(this.authService.isLoggedIn()==true){
			if(state.url.split('/')[3] != undefined){
				this.globals.currentLink = '/'+state.url.split('/')[1]+'/'+state.url.split('/')[2]+'/'+state.url.split('/')[3];
			} else {
				this.globals.currentLink = '/'+state.url.split('/')[1]+'/'+state.url.split('/')[2];
			}
		  if(state.url=='/admin/login'){
			  this.globals.IsLoggedIn = false;
			  this.router.navigate(['/admin/dashboard']);
			  return false;
		  } else {
			  this.globals.IsLoggedIn = true;
			  return true;
		  }		  
	  } else {
		   if(state.url=='/admin/login'||state.url=='/admin/access-denied'){
			  this.globals.IsLoggedIn = false;
			  return true;
		   } else {
			   this.globals.IsLoggedIn = false;
			   this.router.navigate(['/admin/login']);
			   return false;
		   }		  
	  }
  }
  
}
