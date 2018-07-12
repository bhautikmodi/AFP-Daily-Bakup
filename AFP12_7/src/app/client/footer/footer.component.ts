import { Component, OnInit } from '@angular/core';
import { Globals } from '.././globals';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  providers: [ Globals ],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  //globals;
  constructor(public globals: Globals) { }

  ngOnInit() {
    
  }

}
