import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SalesUserService } from '../services/sales-user.service';
import { Globals } from '.././globals';
import { ActivatedRoute } from '@angular/router';
declare var AmCharts: any;
declare var $: any;

@Component({
  selector: 'app-report',
  providers: [ SalesUserService ],
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  reportdata;
  userData;
  assList;

  constructor( private SalesUserService: SalesUserService,public globals: Globals, private route: ActivatedRoute,private router: Router) { }

  ngOnInit() {
    this.globals.isLoading = true;	
    setTimeout(function(){ 
      if ($("body").height() < $(window).height()) {
        $('footer').addClass('footer_fixed');
      } 
    }, 1000);

    this.userData = {};
    let id = this.route.snapshot.paramMap.get('id');    
  this.SalesUserService.getUserReport(id)
  .then((data) => 
  {     
    this.userData = data['user'];
    this.reportdata = data['domainAss'];
    this.assList = data['assList'];
    var chart = AmCharts.makeChart("linediv", {
      "type": "serial",
       "theme": "none",
       "dataProvider": this.reportdata,
      "valueAxes": [{
        "integersOnly": true,
        "minimum": 0,
		"maximum": 5,
		"precision" : 0,
        "axisAlpha": 1,
        "dashLength": 5,
        "gridCount": 10,
        "position": "left",
		"titleFontSize" : 16,
        "title": "Rating Scale"
    }],
       "startDuration": 0,
       "graphs": this.assList,
       "chartCursor": {
        "cursorAlpha": 0,
        "zoomable": false,
		"valueZoomable": false,
		"valueLineBalloonEnabled": false,
		"valueLineEnabled": false,
    },
		   "responsive": {
			"enabled": true
			},
       "categoryField": "domain",
      "categoryAxis": {
		"gridPosition": "start",
		"dashLength": 5,
		"position": "left",
		"titleFontSize" : 16,
		"title": "Domains",
		"autoWrap": true,
		"rollOverGraphAlpha" : 0
	},
    "legend": {
    "maxColumns": 3,
	"precision" : 0,	
    "position": "bottom",
    "useGraphSettings": true,
    "markerSize": 15,
    "divId": "legenddiv",
	"equalWidths": false,
	"textClickEnabled" : 1
     },
   });
   this.globals.isLoading = false;	
  }, 
  (error) => 
  {
    //alert('error');
    this.globals.isLoading = false;
				this.router.navigate(['/pagenotfound']);
  });	 
  }
}
