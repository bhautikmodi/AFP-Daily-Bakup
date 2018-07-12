import { Component, OnInit } from '@angular/core';
import { AssessmentService } from '../services/assessment.service';
import { Router } from '@angular/router';
import { Globals } from '.././globals';
import { ActivatedRoute } from '@angular/router';
declare var $,PerfectScrollbar: any;

@Component({
  selector: 'app-assessment',
  providers: [ AssessmentService ],
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.css']
})
export class AssessmentComponent implements OnInit {

  ksaList;
  totalksa;
  addprogess;
  submit_true;
  arrayset;
  ksaDetails;
  percent;
  constructor(private AssessmentService: AssessmentService, public globals: Globals, private route: ActivatedRoute,private router: Router) { }

  ngOnInit() {
    this.globals.isLoading = true;
       
    this.ksaDetails={};
    
//     // Set the date we're counting down to
// var countDownDate = new Date("Apr 30, 2018 00:00:00").getTime();

// // Update the count down every 1 second
// var x = setInterval(function() {

//     // Get todays date and time
//     var now = new Date().getTime();
    
//     // Find the distance between now an the count down date
//     var distance = countDownDate + now;
    
//     // Time calculations for days, hours, minutes and seconds
//     //var days = Math.floor(distance / (1000 * 60 * 60 * 24));
//     //var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//     var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//     var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
//     // Output the result in an element with id="demo"
//     document.getElementById("demo").innerHTML = minutes + "m " + seconds + "s ";
    
//     // If the count down is over, write some text 
//     if (distance < 0) {
//         clearInterval(x);
//         document.getElementById("demo").innerHTML = "EXPIRED";
//     }
// }, 1000);
    

   
    var progress = document.getElementById("progress");
    $(progress).css("width", "0%");    
    let id = this.route.snapshot.paramMap.get('id');    
    this.AssessmentService.getAllksa(id)
		.then((data) => 
		{ 
      if(data=='fail'){
        this.globals.isLoading = false;
        this.router.navigate(['/dashboard']);
      } else {
		this.ksaDetails = data['ksaDetails'];
        this.ksaList = data['ksa'];
        this.totalksa = data['totalksa'];
        this.addprogess = 100/this.totalksa;
        setTimeout(()=>{  
		
	 "use strict";
if (screen.width>767) {
      $('#carousel').flexslider({
            animation: "slide",
            controlNav: false,
            animationLoop: false,
            slideshow: false,
            itemWidth: 120,
            minItems: 1,
            maxItems: 5,
            itemMargin: 5,
            asNavFor: '#slider'
          });
    
          $('#slider').flexslider({
            animation: "slide",
            controlNav: false,
            animationLoop: false,
            slideshow: false,
            sync: "#carousel"
          });
}
else {
      $('#carousel').flexslider({
        animation: "slide",
        controlNav: false,
        animationLoop: false,
        slideshow: false,
        itemWidth: 120,
		minItems: 1,
    	maxItems: 2,
        itemMargin: 5,
        asNavFor: '#slider'
      });

      $('#slider').flexslider({
        animation: "slide",
        controlNav: false,
        animationLoop: false,
        slideshow: false,
        sync: "#carousel"
      });
}
         
          $('[data-toggle="tooltip"]').tooltip();
          new PerfectScrollbar('.preview_ksa .scroll_table');

          for(let obj of this.ksaList){
            let j = this.ksaList.indexOf(obj);
            for(let child of obj.row){
              let i = this.ksaList[j].row.indexOf(child);
              if(child.RatingScaleId>0){
                $('#ksa'+((6*j)+i+1)+'_dots').removeClass('fa-circle-o');
                $('#ksa'+((6*j)+i+1)+'_dots').addClass('fa-dot-circle-o');
              }          
            }
          } 
          this.checkprogress();
          this.globals.isLoading = false;
        },100);
        setTimeout(()=>{  
          if ($("body").height() < $(window).height()) {
            $('footer').addClass('footer_fixed');
            this.globals.isLoading = false;
          } 
        },1000);
        this.globals.isLoading = false;
      }        
		}, 
		(error) => 
		{
      //alert('error');
      this.globals.isLoading = false;
	  this.router.navigate(['/pagenotfound']);
		});	 
  }

  

  finalSubmit()
	{	 debugger
    $('#PreviewModal').modal('show');	    	
  }

  confirmsubmit(){
    this.globals.isLoading = true;
    let CAssessmentId = this.route.snapshot.paramMap.get('id');
		this.AssessmentService.finalSubmit(CAssessmentId)
		.then((data) => 
		{
      $('#PreviewModal').modal('hide');	
      this.router.navigate(['/thankyou/'+CAssessmentId]);
      this.globals.isLoading = false;
    }, 
		(error) => 
		{
      this.globals.isLoading = false;
		});
  }

  selectRadio(no,ksa,i,j){     
    this.AssessmentService.saveKsa(ksa)
		.then((data) => 
		{
      var progress = document.getElementById("progress");
      $('#ksa' + no + '_dots').removeClass('fa-circle-o');
      $('#ksa' + no + '_dots').addClass('fa-dot-circle-o');
      this.checkprogress();
    }, 
		(error) => 
		{
			alert('error');
		});	 
  } 
  
  checkprogress(){
    let k = 0; 
      for(let i=1; i<=this.totalksa; i++){
        if($('#ksa' + i + '_dots').hasClass('fa-dot-circle-o')){
          k++;
        }
      }
      let addpro = (100*k)/this.totalksa;
	  this.percent = addpro.toFixed(1);
      var progress = document.getElementById("progress");
      $(progress).css("width", addpro+"%");
      if(k==this.totalksa){
        this.submit_true = false;
      } else {
        this.submit_true = true;
      }
  }

}
