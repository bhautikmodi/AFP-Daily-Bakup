import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SalesDashboardService } from '../services/sales-dashboard.service';
import { Globals } from '.././globals';
import { ActivatedRoute } from '@angular/router';
declare var AmCharts: any;
declare var $: any;
@Component({
  selector: 'app-user-assessment-list',
  providers: [ SalesDashboardService ],
  templateUrl: './user-assessment-list.component.html',
  styleUrls: ['./user-assessment-list.component.css']
})
export class UserAssessmentListComponent implements OnInit {
  assessmentList;
  userList;
  padinglist;
  constructor(private SalesDashboardService: SalesDashboardService, public globals: Globals, private route: ActivatedRoute,private router: Router) { }


  ngOnInit() {  
    this.globals.isLoading = true;
    
    this.userList='';
    let id = this.route.snapshot.paramMap.get('id');    
    this.SalesDashboardService.getAllAssement(id)
		.then((data) => 
		{
      this.assessmentList = data['complete'];
      this.padinglist = data['pending'];
      
      this.userList = data['user'];
      var colorarray = ['#001F49','#799628','#F79317','#1BAC98','#65287E','#B8044A'];
      // console.log(this.assessmentList);
      setTimeout(()=>{ 
        var j = 0; 
        var colorarray = ['#001F49','#799628','#F79317','#1BAC98','#65287E','#B8044A'];
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
      if ($("body").height() < $(window).height()) {
        $('footer').addClass('footer_fixed');
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
