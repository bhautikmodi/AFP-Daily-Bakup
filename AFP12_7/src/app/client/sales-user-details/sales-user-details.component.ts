import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SalesUserService } from '../services/sales-user.service';
import { Globals } from '.././globals';
import { ActivatedRoute } from '@angular/router';
import {HttpClient} from "@angular/common/http";
declare var AmCharts: any;
declare var $,PerfectScrollbar: any;

@Component({
  selector: 'app-sales-user-details',
  providers: [ SalesUserService ],
  templateUrl: './sales-user-details.component.html',
  styleUrls: ['./sales-user-details.component.css']
})
export class SalesUserDetailsComponent implements OnInit {
  domainData;
  domainDatapre;
  ratingscale;
  areaksa;
  rcourse;
  ksaList;
  allcourse;
  assessmentData;
  constructor( private http: HttpClient,private SalesUserService: SalesUserService,public globals: Globals, private route: ActivatedRoute,private router: Router) { }



  ngOnInit() { debugger
   this.globals.isLoading = true;
   this.assessmentData='';

let id = this.route.snapshot.paramMap.get('id');    
this.SalesUserService.getUserAssessDetail(id) 
.then((data) => 
{ 
  if(data=='fail'){
    this.router.navigate(['/dashboard']);
  } else {
    this.domainData = data['domain'];
    this.domainDatapre = data['domainrs'];
    this.areaksa=data['carears'];
    this.rcourse=data['rcourse'];
    this.allcourse=data['allcourse'];
    this.ksaList = data['ksa'];
    this.assessmentData = data['assessment'];
    // this.rscaleData = data['rscale'];
      var colorarray = ['#001F49','#799628','#F79317','#1BAC98','#65287E','#B8044A'];
      for(let obj of this.domainData)
        {
          let j = this.domainData.indexOf(obj);
          this.domainData[j].color = colorarray[j];
          if(this.domainData[j].ratingscale<=1){
            this.domainData[j].rscalename = "General Awareness";
          } else if(this.domainData[j].ratingscale<=2){
            this.domainData[j].rscalename = "Developing";
          } else if(this.domainData[j].ratingscale<=3){
            this.domainData[j].rscalename = "Intermediate";
          } else if(this.domainData[j].ratingscale<=4){
            this.domainData[j].rscalename = "Advanced";
          }  
        }
     
      // var colorarray = ['#001F49','#799628','#F79317','#1BAC98','#65287E','#B8044A'];
      // for(let obj of this.domainDatapre)
      //   {
      //     let j = this.domainDatapre.indexOf(obj);
      //     this.domainDatapre[j].color = colorarray[j];
      //   }

      //   var colorarray = ['#001F49','#799628','#F79317','#1BAC98','#65287E','#B8044A'];
      // for(let obj of this.ratingscale)
      //   {
      //     let j = this.ratingscale.indexOf(obj);
      //     this.ratingscale[j].color = colorarray[j];
      //   }

      //   var colorarray = ['#001F49','#799628','#F79317','#1BAC98','#65287E','#B8044A'];
      //   for(let obj of this.areaksa)
      //     {
      //       let j = this.areaksa.indexOf(obj);
      //       this.areaksa[j].color = colorarray[j];
      //     }
    var chart = AmCharts.makeChart("gneraluser_result", {
      "type": "serial",
      "startDuration": 0,
      "dataProvider": this.domainData,
      "valueAxes": [{
        "position": "left",
        "title": "Rating Scale",
      "axisAlpha": 1, 
      "titleFontSize" : 16,
      "integersOnly": true,
        "minimum": 0,
      "maximum": 5,
      "precision" : 0,
        "dashLength": 5
      }],
      "categoryField": "domain",
      "categoryAxis": {
        "gridPosition": "start",
      "title": "Domains",
      "axisAlpha": 1, 
      "titleFontSize" : 16,
      "dashLength": 5,
        "autoWrap": true
      },
		   "responsive": {
			"enabled": true
			},
      "graphs": [{
        "balloonText": "<b>[[rscalename]]</b>",
        "fillColorsField": "color",
        "fillAlphas": 1,
        "lineAlpha": 0.2,
        "type": "column",
        "valueField": "ratingscale",
      "fixedColumnWidth": 30,
      "labelText" : "[[value]]"
      }],
      "chartCursor": {
        "categoryBalloonEnabled": false,
        "cursorAlpha": 0,
        "zoomable": false
      }
    });
 
    var chart = AmCharts.makeChart("chartdiv1", {
        "type": "serial",
      "theme": "light",
        "legend": {
            "horizontalGap": 0,
            "maxColumns": 4,
            "position": "bottom",
        "useGraphSettings": true,
        "markerSize": 10
        },
        "dataProvider": this.areaksa,
        "valueAxes": [{
            "stackType": "regular",
            "axisAlpha": 1,
            "gridAlpha": 0,
        "dashLength": 5,
        "minimum": 0,
      "maximum": 100
        }],
        "graphs": [{
            "balloonText": "<b>[[title]]</b><br><b>[[value]]%</b>",
            "fillAlphas": 0.6,
        "fillColors": "#632D6B",
            "labelText": "[[value]]%",
            "lineAlpha": 0.3,
            "title": "1 - General Awareness",
            "type": "column",
        "color": "#000000",
            "valueField": "awareness"
        }, {
            "balloonText": "<b>[[title]]</b><br><b>[[value]]%</b>",
            "fillAlphas": 0.6,
        "fillColors": "#F68E2F",
            "labelText": "[[value]]%",
            "lineAlpha": 0.3,
            "title": "2 - Developing",
            "type": "column",
        "color": "#000000",
            "valueField": "developing"
        }, {
            "balloonText": "<b>[[title]]</b><br><b>[[value]]%</b>",
            "fillAlphas": 0.6,
        "fillColors": "#269A8A",
            "labelText": "[[value]]%",
            "lineAlpha": 0.3,
            "title": "3 - Intermediate",
            "type": "column",
        "color": "#000000",
            "valueField": "intermediate"
        }, {
            "balloonText": "<b>[[title]]</b><br><b>[[value]]%</b>",
            "fillAlphas": 0.6,
        "fillColors": "#A41C36",
            "labelText": "[[value]]%",
            "lineAlpha": 0.3,
            "title": "4 - Advanced",
            "type": "column",
        "color": "#000000",
            "valueField": "advanced"
        }],
        "categoryField": "ratingscale",
        "categoryAxis": {
            "gridPosition": "start",
            "axisAlpha": 1,
            "gridAlpha": 0,
            "position": "left",
        "dashLength": 5,"autoWrap": true
        },
        "export": {
          "enabled": true
         }
    
    });

    var chart = AmCharts.makeChart("chartdiv", {
        "type": "serial",
      "theme": "light",
        "legend": {
            "horizontalGap": 0,
            "maxColumns": 4,
            "position": "bottom",
        "useGraphSettings": true,
        "markerSize": 10
        },
        "dataProvider": this.domainDatapre,
        "valueAxes": [{
            "stackType": "regular",
            "axisAlpha": 1,
            "gridAlpha": 0,
        "dashLength": 5,
        "minimum": 0,
      "maximum": 100
        }],
        "graphs": [{
            "balloonText": "<b>[[title]]</b><br><b>[[value]]%</b>",
            "fillAlphas": 0.6,
            "labelText": "[[value]]%",
            "lineAlpha": 0.3,
        "fillColors": "#632D6B",
            "title": "1 - General Awareness",
            "type": "column",
        "color": "#000000",
            "valueField": "awareness"
        }, {
            "balloonText": "<b>[[title]]</b><br><b>[[value]]%</b>",
            "fillAlphas": 0.6,
            "labelText": "[[value]]%",
            "lineAlpha": 0.3,
        "fillColors": "#F68E2F",
            "title": "2 - Developing",
            "type": "column",
        "color": "#000000",
            "valueField": "developing"
        }, {
            "balloonText": "<b>[[title]]</b><br><b>[[value]]%</b>",
            "fillAlphas": 0.6,
            "labelText": "[[value]]%",
            "lineAlpha": 0.3,
        "fillColors": "#269A8A",
            "title": "3 - Intermediate",
            "type": "column",
        "color": "#000000",
            "valueField": "intermediate"
        }, {
            "balloonText": "<b>[[title]]</b><br><b>[[value]]%</b>",
            "fillAlphas": 0.6,
        "fillColors": "#A41C36",
            "labelText": "[[value]]%",
            "lineAlpha": 0.3,
            "title": "4 - Advanced",
            "type": "column",
        "color": "#000000",
            "valueField": "advanced"
        }],
        "categoryField": "ratingscale",
        "categoryAxis": {
            "gridPosition": "start",
            "axisAlpha": 1,
            "gridAlpha": 0,
            "position": "left",
        "dashLength": 5,"autoWrap": true
        },
        "export": {
          "enabled": true
         }
    
    });
   
  //   var chart = AmCharts.makeChart( "domain_chart", {
  //     "type": "pie",
  //    "startDuration": 0,
  //     "dataProvider": this.domainDatapre,
  //     "valueField": "value",
  //     "titleField": "domain",
  //     "labelRadius": -20,
  //     "labelText": "[[percents]]%",
  //     "labelTickColor": "#FFFFFF",
  //     "color" : "#fff",
  //     "labelColorField": "#FFFFFF",
  //     // "balloonText": "",
  //     "colorField": "color",
  //     "percentPrecision" : 0,
  //     "balloon":{
  //        "fixedPosition":true
  //     },
	//   "legend":{
	// 	"position":"bottom",
	// 	"autoMargins":true,  "equalWidths":true, "switchable":false,
	// 	"align":"center", 
	// 	"valueAlign": "center",
  //       "labelWidth": '100%',
  //       "valueWidth": 0, "maxColumns": 2
	//  },
	//   "responsive": {
	// 		"enabled": true
	// 		},
  //    "balloonText": "[[domain]]<br><b>([[percents]]%)</b>",
  //     "export": {
  //       "enabled": false
  //     }
  //   });
  //   var chart = AmCharts.makeChart( "scale_chart", {
  //     "type": "pie",
  //    "startDuration": 0,
  //     "dataProvider": this.ratingscale,
  //     "valueField": "value",
  //     "titleField": "domain",
  //     "labelRadius": -20,
  //     "labelText": "[[percents]]%",
  //     "labelTickColor": "#FFFFFF",
  //     "color" : "#fff",
  //     "labelColorField": "#FFFFFF",
  //     // "balloonText": "",
  //     "colorField": "color",
  //     "percentPrecision" : 0,
  //     "balloon":{
  //        "fixedPosition":true
  //     },
	//     "legend":{
	// 	"position":"bottom",
	// 	"autoMargins":true,  "equalWidths":true, "switchable":false,
	// 	"align":"center", 
	// 	"valueAlign": "center",
  //       "labelWidth": '100%',
  //       "valueWidth": 0,"maxColumns": 2
	//  },
	// 	   "responsive": {
	// 		"enabled": true
	// 		},
  //     "balloonText": "[[domain]]<br><b>([[percents]]%)</b>",
  //     "export": {
  //       "enabled": false
  //     }
  //   });
  //   var chart = AmCharts.makeChart( "ca_chart", {
  //       "type": "pie",
  //      "startDuration": 0,
  //       "dataProvider": this.areaksa,
  //       "valueField": "value",
  //       "titleField": "domain",
  //       "labelRadius": -20,
  //       "labelText": "[[percents]]%",
  //       "labelTickColor": "#FFFFFF",
  //       "color" : "#fff",
  //       "labelColorField": "#FFFFFF",
  //       // "balloonText": "",
  //       "colorField": "color",
  //       "percentPrecision" : 0,
  //       "balloon":{
  //        	"fixedPosition":true
  //       },
	// 	 "legend":{
	// 	"position":"bottom",
	// 	"autoMargins":true,  "equalWidths":true, "switchable":false,
	// 	"align":"center", 
	// 	"valueAlign": "center",
  //       "labelWidth": '100%',
  //       "valueWidth": 0,
	// 	"maxColumns": 2
	//  },
	// 	   "responsive": {
	// 		"enabled": true
	// 		},
  //       "balloonText": "[[domain]]<br><b>([[percents]]%)</b>",
  //       "export": {
  //         "enabled": false
  //       }
  //     });
      new PerfectScrollbar('.preview_ksa .scroll_table');
   new PerfectScrollbar('.course_rec .scroll_course');
  }
  setTimeout(function(){ 
    if ($("body").height() < $(window).height()) {
      $('footer').addClass('footer_fixed');
    } 
  }, 1000);
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
