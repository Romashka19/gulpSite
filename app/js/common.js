(function(params) {
	$(document).ready(function() {
 
		$('.employeeDOB input').datepicker({ 
			"setDate": new Date(),
			format: "mm/dd/yyyy" 
		});


		$('#btnAdd').magnificPopup({
			type: 'inline',
			items:{
					src: '#modalEmployee'
			},
			removalDelay: 600,
			mainClass: 'mfp-fade'
		}).click(function(){ });

		$('.modalBtnClose').click(function() {
			$.magnificPopup.instance.close();
		});

		$.notifyDefaults({
			placement: {
				from: "bottom",
				align: "left"
			},
			template: `
			<div data-notify="container" class="pnAlertContainer" style="max-width: 340px;">
			<div class="wrapper wrpAlert">
				<div data-notify="type" class="pnAlert pnPanel pnAlert{0}">
					<button type="button" data-notify="dismiss" class="close btnAlertClose">
						<i class="fas fa-times"></i>
					</button>
					<span>
						<b data-notify="title"> {1} </b>
						<span data-notify="message">{2}</span>
					</span>
				</div>
			</div>
			</div>`
		});

		showNotify({
			title: 'uuu',
			message:'lgg',
			type: 'Success'
		});
	});
})();

function showNotify(params) {
	$.notify({
		title: params.title,
		message: params.message
	}, { type: params.type });
}