<!-- INVITATION CODE -->
$('.invitation_text .form-control').keyup(function(e){
	if($(this).val().length==$(this).attr('maxlength'))
	$(this).next('.form-control').focus()
})
<!-- END INVITATION CODE -->

<!-- REGISTER EMPLOYEE -->
$('[data-toggle="tooltip"]').tooltip()
$('#employee_btn').click(function () {
	$("#submit_Modal").modal('show');
});
<!-- END REGISTER EMPLOYEE -->

<!-- REGISTER COMPANY -->
$('#company_btn').click(function () {
	$("#submit_Modal").modal('show');
});
<!-- END REGISTER COMPANY -->


<!-- PROGRESS BAR ASSESSMENT -->
progress = document.getElementById("progress");
$(progress).css("width", "30%");
<!-- END PROGRESS BAR ASSESSMENT -->

<!-- ASSESSMENT -->
$('input[type="radio"]').change(function(){
	var i;
	for (i = 0; i < 57; i++) { 
		if($("input:radio[name='ksa" + i + "_radio']").is(":checked")) {
		  $('#ksa' + i + '_dots').removeClass('fa-circle-o');
		  $('#ksa' + i + '_dots').addClass('fa-dot-circle-o');
	  }
	}
});
<!-- END ASSESSMENT -->

<!-- TOOLTIP -->
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})
<!-- END TOOLTIP -->

