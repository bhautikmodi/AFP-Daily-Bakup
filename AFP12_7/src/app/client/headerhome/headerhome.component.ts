import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Globals } from '../globals';
@Component({
  selector: 'app-headerhome',
  templateUrl: './headerhome.component.html',
  styleUrls: ['./headerhome.component.css']
})
export class HeaderhomeComponent implements OnInit {
  //globals;
  db_mode;
  constructor(  private authService: AuthService,private router: Router,public globals: Globals) { }

  ngOnInit() 
  {
    //this.globals = this.global;
    this.authService.db_mode()
      .then((data) => 
      {
        this.db_mode = data;
      }, 
      (error) => 
      {
        //alert('error');
        this.globals.isLoading = false;
				this.router.navigate(['/pagenotfound']);
      });
  }
  home()
  {
    if(this.globals.currentLink!='/'){
      this.globals.check_login=false;
      this.router.navigate(['/dashboard']);
    }

  }

  AdminLogin(){
    window.open(this.globals.baseUrl+'/admin');
   }
   
  logout()
  { 
      var panel={'Userid':this.globals.authData.UserId,'paneltype':0};
      this.authService.logout(panel)
//.map(res => res.json())
    .then((data) => 
    {
      this.globals.isLoading = true;
      window.location.href = '/login';
          
    }, 
    (error) => 
    {
     // alert('error');
     this.globals.isLoading = false;
     this.router.navigate(['/pagenotfound']);
    });
        
  }
  register()
    {
      window.location.href = '/invitation';
    }
    log()
    {
      window.location.href = '/login';
    }
}
