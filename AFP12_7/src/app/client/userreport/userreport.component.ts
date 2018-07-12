import { Component, OnInit } from '@angular/core';
declare var $: any;
import { Globals } from '../globals';

@Component({
  selector: 'app-userreport',
  templateUrl: './userreport.component.html',
  styleUrls: ['./userreport.component.css']
})
export class UserreportComponent implements OnInit {

  constructor(public globals: Globals) { }

  ngOnInit() {
    this.globals.isLoading = false;
    setTimeout(function(){ 
      if ($("body").height() < $(window).height()) {
        $('footer').addClass('footer_fixed');
      } 
    }, 1000);


  }

}
