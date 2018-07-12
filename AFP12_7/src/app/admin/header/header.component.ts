import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Globals } from '../globals';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
globals;
db_mode;
  constructor(private router: Router,private global: Globals, private authService: AuthService) { }

  ngOnInit() {
    this.globals = this.global;
    this.authService.db_mode()
      .then((data) => 
      {
        this.db_mode = data;
      }, 
      (error) => 
      {
        //alert('error');
        this.globals.isLoading = false;
        this.router.navigate(['/admin/pagenotfound']);
      });
  }
  logout()
    { 
        var admin={'Userid':this.globals.authData.UserId,'paneltype':1};
        this.authService.logout(admin)
	//.map(res => res.json())
      .then((data) => 
      {
        this.globals.isLoading = true;
        window.location.href = '/admin/login';
            
      }, 
      (error) => 
      {
       // alert('error');
       this.globals.isLoading = false;
	     this.router.navigate(['/admin/pagenotfound']);
      });
          
    }
  // logout(){	 
  //   this.authService.logout();
  //   this.globals.isLoading = true;
  //   window.location.href = '/admin/login';		
  // }

  dashboard(path){ 
    $(".nav-second-level").parent().removeClass("active");
    $(".nav-second-level").addClass("display_block");
    $(".test").removeClass("selected");
    $("#dash").addClass("selected");
    this.globals.msgflag = false;	  
    this.globals.currentLink = this.router.url;
    this.router.navigate([path]);
  }

}
