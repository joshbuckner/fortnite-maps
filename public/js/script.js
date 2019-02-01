//enable tooltips
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

// Example starter JavaScript for disabling form submissions if there are invalid fields
$(function() {
	'use strict'

	window.addEventListener('load', function() {
		// Fetch all the forms we want to apply custom Bootstrap validation styles to
		var forms = $('.needs-validation')

		// Loop over them and prevent submission
		Array.prototype.filter.call(forms, function(form) {
			form.addEventListener('submit', function(event) {
				if (form.checkValidity() === false) {
					event.preventDefault()
					event.stopPropagation()
				}
				form.classList.add('was-validated')
			}, false)
		})
	}, false)
}())

function generateModalData(title, image, code, author,) {
	console.log(title, image, code, author)
	$('#modal-title')[0].innerHTML = title;
	$('#modal-image').attr("src", image);
	$('#modal-code')[0].innerHTML = code;
	$('#modal-author')[0].innerHTML = author;
}

function previewFile() {
  var preview = $(".file-preview");
  var file    = document.querySelector('input[type=file]').files[0];
  var reader  = new FileReader();

  reader.addEventListener("load", function () {

  	// var img = new Image();
  	// img.addEventListener("load", function() {
  	// 	var height = img.height;
  	// 	var width = img.width;
  	// 	if (width % 120 === 0 && height % 20 === 0){
  	// 		console.log(width);
  	// 		console.log(height);
  	// 		console.log("success");
  	// 		preview[0].src = reader.result;
  	// 	} else {
  	// 		console.log(width);
  	// 		console.log(height);
  	// 		preview[0].src = "";
  	// 		console.log(document.querySelector('input[type=file]').files);
  	// 	}
  	// });
  	// img.src = reader.result;
    preview[0].src = reader.result;
  }, false);

  if (file) {
    reader.readAsDataURL(file);
  } 
  $(".custom-file-label")[0].innerText = document.querySelector('input[type=file]').files[0].name;
}

// function insertHyphens() {
// 	$('#island-code')[0].value = $('#island-code')[0].value.replace(/(\d{4})(\d{4})(\d{4})/, "$1-$2-$3");
	
// }

function addHyphen() {
	let ele = $('#island-code')[0];
    ele = ele.value.split('-').join('');    // Remove dash (-) if mistakenly entered.

    let finalVal = ele.match(/.{1,4}/g).join('-');

    $('#island-code')[0].value = finalVal;
}


// console.log($('.map-name')[0].checkValidity());

$('#myForm').on('submit', function(e){
	$('#modal-title')[0].innerHTML = $('#map-name')[0].value;
	$('#modal-author')[0].innerHTML = $('#author')[0].value;
	$('#modal-code')[0].innerHTML = $('#island-code')[0].value;
	$('#modal-image').attr("src", $('#image-preview')[0].src);

  	// e.preventDefault();
  	
  	if ($('#map-name')[0].checkValidity() && 
  		$('#author')[0].checkValidity() && 
  		$('#island-code')[0].checkValidity() && 
  		$('#inputGroupFile01')[0].checkValidity() && 
  		$('#category')[0].checkValidity()) {
			$('#myModal').modal('show');
	}
	// resetForm();
	// setTimeout(function() {
	// 	resetForm();
	// });
});

function resetForm() {
	document.getElementById('myForm').reset();
	$('#image-preview')[0].src = "images/fortnite_creative_2.jpg";
	$(".custom-file-label")[0].innerText = "Choose Photo";
}

const copyToClipboard = () => {

	$('#copy-code').attr('data-original-title', 'Copied to Clipboard!').tooltip('show');

  	const el = document.createElement('textarea');
  	el.value = $('#map-code-text')[0].innerHTML.slice(0, 14);
  	document.body.appendChild(el);
  	el.select();
  	document.execCommand('copy');
  	document.body.removeChild(el);
};


// $('.nav-item').click(function(e) {
//         // e.preventDefault();
//         $('.nav-item').removeClass('active');
//         $('')
//         $(this).addClass('active');
//     });
