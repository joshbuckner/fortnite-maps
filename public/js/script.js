// enable tooltips
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
});

// javaScript for disabling form submissions if there are invalid fields
$(function() {
	'use strict'
	window.addEventListener('load', function() {
		// fetch all the forms we want to apply custom Bootstrap validation styles to
		var forms = $('.needs-validation')
		// loop over them and prevent submission
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
}());

// set modal data to submission form input values
$('#myForm').on('submit', function(e){
	$('#modal-title')[0].innerHTML = $('#map-name')[0].value;
	$('#modal-author')[0].innerHTML = $('#author')[0].value;
	$('#modal-code')[0].innerHTML = $('#island-code')[0].value;
	$('#modal-image').attr("src", $('#image-preview')[0].src);
	// display modal if all input field requirements pass
  if ($('#map-name')[0].checkValidity() && 
  	$('#author')[0].checkValidity() && 
  	$('#island-code')[0].checkValidity() && 
  	$('#inputGroupFile01')[0].checkValidity() && 
  	$('#category')[0].checkValidity()) {
			$('#myModal').modal('show');
		}
});

// add a hyphen after every 4 characters in code input of submission form
function addHyphen() {
	let ele = $('#island-code')[0];
  ele = ele.value.split('-').join('');    // Remove dash (-) if mistakenly entered.
  let finalVal = ele.match(/.{1,4}/g).join('-');
  $('#island-code')[0].value = finalVal;
}

// display preview of photo selected in submission form
function previewFile() {
  var preview = $(".file-preview");
  var file    = document.querySelector('input[type=file]').files[0];
  var reader  = new FileReader();
  reader.addEventListener("load", function () {
  	preview[0].src = reader.result;
  }, false);
  if (file) {
    reader.readAsDataURL(file);
  }
  $(".custom-file-label")[0].innerText = document.querySelector('input[type=file]').files[0].name;
}

// copy text within element to clipboard and display tooltip
const copyToClipboard = () => {
	$('#copy-code').attr('data-original-title', 'Copied to Clipboard!').tooltip('show');
  const el = document.createElement('textarea');
  el.value = $('#map-code-text')[0].innerHTML.slice(0, 14);
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};

/* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
let prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  let currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    $('#navbar-main')[0].style.top = "0";
  } else {
    $('#navbar-main')[0].style.top = "-9.5rem";
  }
  prevScrollpos = currentScrollPos;
}

// Listen to scroll to change header opacity class
function checkScroll(){
  var startY = $('.navbar').height() * 2; //The point where the navbar changes in px
  if ($(window).scrollTop() > startY){
    $('.navbar').addClass("scrolled");
  } else{
    $('.navbar').removeClass("scrolled");
  }
}

if ($('.navbar').length > 0){
  $(window).on("scroll load resize", function(){
    checkScroll();
  });
}

