import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
import { Router } from '@angular/router';
//import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { ContactusService } from '../services/contactus.service';

declare var $: any;

@Component({
  selector: 'app-contactus',
  providers: [ ContactusService ],
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  ContactEntity;
  submitted;
  submitted1;
	btn_disable;
	header;
	//globals;
  constructor( private http: Http,public globals: Globals, private router: Router, private ContactusService: ContactusService,private route:ActivatedRoute) { }


  ngOnInit() {
		//this.globals = this.global;
		this.globals.msgflag=false;
		this.globals.isLoading = true;
		if(this.globals.msgflag){
			this.globals.msgflag=true;
		} else {
			this.globals.msgflag=false;
		}		

		setTimeout(function(){ 
			if ($("body").height() < $(window).height()) {
				$('footer').addClass('footer_fixed');
			} 
		}, 1000);

		//this.globals.msgflag=false;
    	this.ContactEntity = {};
   

  let id = this.route.snapshot.paramMap.get('id');
	if (id) {
		this.header = 'Edit';
		this.ContactusService.getById(id)
			.then((data) => {
				this.ContactEntity = data;
				this.globals.isLoading = false;
			},
			(error) => {
				//alert('error');
				this.btn_disable = false;
        this.submitted = false;
				this.submitted1 = false;
				this.globals.isLoading = false;
				this.router.navigate(['/pagenotfound']);
			});
	}
	else {
		this.header = 'Add';
		this.ContactEntity = {};
		this.globals.isLoading = false;
	}
  }
  addContact(ContactForm) {
    let id = this.route.snapshot.paramMap.get('id');
	if (id) {
			this.submitted = false;
  }else
  {
    this.submitted = true;
  }
  this.submitted1 = true;
		if (ContactForm.valid) {
			this.globals.isLoading = true;
      this.btn_disable = true;
			this.ContactusService.add(this.ContactEntity)
				.then((data) => {
					//alert('success');
					this.btn_disable = false;
          this.submitted = false;
          this.submitted1 = false;
					this.ContactEntity = {};
			 
					ContactForm.form.markAsPristine();
						this.globals.message = 'Thank you! Your message has been successfully sent We will contact you very soon!';
						this.globals.type = 'success';
						this.globals.msgflag = true;
						this.globals.isLoading = false;
					this.router.navigate(['/contactus']);
				},
				(error) => {
				//	alert('error');
				this.submitted = false;
				this.globals.isLoading = false;
				this.router.navigate(['/pagenotfound']);
				
				});
		}
	}

}
