import { Component, OnInit, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { RolepermissionService } from '../services/rolepermission.service';
import { Globals } from '.././globals';
declare var $: any;

@Component({
  selector: 'app-rolepermission',
  providers: [ RolepermissionService ],
  templateUrl: './rolepermission.component.html',
  styleUrls: ['./rolepermission.component.css']
})
export class RolepermissionComponent implements OnInit {

  roleEntity;
  roleList;
  permissionList;
  btn_disable;
  //globals;

  constructor(private el: ElementRef, private http: Http, private router: Router, private route: ActivatedRoute, private RolepermissionService: RolepermissionService, public globals: Globals)
    {		

	  }
  ngOnInit() {
    //this.globals = this.global;
    this.globals.isLoading = true;
    if(this.globals.authData.RoleId!=4){
      this.router.navigate(['/admin/access-denied']);
    }

    this.roleEntity = {};
    this.roleEntity.RoleId = 1;
    this.RolepermissionService.getDefault()
    .then((data) => 
    { 
      this.roleList = data['role'];
      this.permissionList = data['permission'];
      setTimeout(function(){
        $(".permission").addClass("selected");
      },500); 
      this.globals.isLoading = false;
    }, 
    (error) => 
    {
      //alert('error');
      this.globals.isLoading = false;
      this.router.navigate(['/admin/pagenotfound']);
    });	 
  }

  getRolePermission(){ 
    this.RolepermissionService.getRolePermission(this.roleEntity.RoleId)
    .then((data) => 
    { 
      this.permissionList = data;
    }, 
    (error) => 
    {
      //alert('error');
      this.globals.isLoading = false;
      this.router.navigate(['/admin/pagenotfound']);
    });	 
  }

  updatePermission()
	{	
    this.btn_disable = true;
    this.RolepermissionService.update_permission(this.permissionList)
    .then((data) => 
    {
      this.globals.message = 'Data Updated Successfully!';
			this.globals.type = 'success';
			this.globals.msgflag = true;
      this.btn_disable = false;
    }, 
    (error) => 
    {
      this.btn_disable = false;
      //alert('error');
      this.globals.isLoading = false;
      this.router.navigate(['/admin/pagenotfound']);
    });
	}

}
