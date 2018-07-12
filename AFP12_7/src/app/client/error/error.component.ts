import { Component, OnInit } from '@angular/core';
import { Globals } from '.././globals';
@Component({
  selector: 'app0-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  constructor( private globals: Globals) { }

  ngOnInit() {
    this.globals.isLoading = false;	
  }

}
