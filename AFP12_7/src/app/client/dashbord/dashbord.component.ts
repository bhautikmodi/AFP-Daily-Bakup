import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../services/dashboard.service';
import { Globals } from '.././globals';
import { ActivatedRoute } from '@angular/router';
declare var AmCharts: any;
declare var $: any;

@Component({
  selector: 'app-dashbord',
  providers: [ DashboardService ],
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {

  assessmentList;
  passessmentList;
  constructor(private DashboardService: DashboardService, public globals: Globals, private route: ActivatedRoute,private router: Router) { }
  
   ngOnInit() {  
    this.globals.isLoading = true;	
    setTimeout(function(){ 
      if ($("body").height() < $(window).height()) {
        $('footer').addClass('footer_fixed');
      } 
    }, 1000);

    this.DashboardService.getAllAssement(this.globals.authData.UserId)
		.then((data) => 
		{
      this.assessmentList = data['complete'];
      this.passessmentList = data['pending'];
      setTimeout(()=>{ 
        var j = 0; 
        //var colorarray = ['#001F49','#799628','#F79317','#1BAC98','#65287E','#B8044A'];
        var colorarray = ['#002B49','#FFC35C','#0085AD','#8F993E','#A50034','#642F6C','#E94628','#21848B','#050000','#77C5D5','#FB8F2E','#B7006A','#005F67','#898D8D','#FABCAD'];
        for(let obj of this.assessmentList){          
        for(let domain of obj.domainlist){
          let k = obj.domainlist.indexOf(domain);
          this.assessmentList[j].domainlist[k].color = colorarray[k];
        }
        var chart = AmCharts.makeChart("dashboard_result_bar"+ j, {
          "type": "serial",
          "startDuration": 0,
          "dataProvider": obj.domainlist,
          "valueAxes": [{
            "position": "left",
          "axisAlpha": 1, 
          "integersOnly": true,
            "minimum": 0,
          "maximum": 5,
          "precision" : 0,
            "dashLength": 5
          }],
          "categoryField": "domain",
          "categoryAxis": {
            "gridPosition": "start",
          "axisAlpha": 1, 
          "titleFontSize" : 1,
          "dashLength": 5,
          "labelsEnabled": false
          },
		   "responsive": {
			"enabled": true
			},
          "graphs": [{
            "balloonText": "<b>[[category]]: [[value]]</b>",
            "fillColorsField": "color",
            "fillAlphas": 1,
            "lineAlpha": 0.2,
            "type": "column",
            "valueField": "ratingscale",
          "fixedColumnWidth": 20,
          "labelText" : "[[value]]"
          }],
          "chartCursor": {
            "categoryBalloonEnabled": false,
            "cursorAlpha": 0,
            "zoomable": false
          }
        });
        j++;
      }
    },100);
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
