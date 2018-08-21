jQuery(document).ready(function($) {
	var transitionendPrefixed = 'transitionend webkitTransitionEnd oTransitionEnd otransitionend';
	var htmlecorpo = $('html, body');
	var footer = $('footer');
	var btsumario = footer.find('.sumario button');
	var fecharsumario = footer.find('button.fechar');
	var navsumario = footer.find('nav.cnt-sumario');

	btsumario.on('click', function(event) {
		event.preventDefault();
		htmlecorpo.addClass('blockscroll');
		footer.addClass('fullscreen');
		navsumario.addClass('db');
	});

	fecharsumario.on('click', function(event) {
		$(this).removeClass('visivel');
		event.preventDefault();
		htmlecorpo.removeClass('blockscroll');
		footer.removeClass('fullscreen');
	});

	$(window).on('keyup', function(event){
		switch(event.which){
			case 27: 
				if (footer.hasClass('fullscreen')) {
					fecharsumario.removeClass('visivel');
					htmlecorpo.removeClass('blockscroll');
					footer.removeClass('fullscreen');
				}
			break;	
		}
	});

	footer.on(transitionendPrefixed, function(){
		if ($(this).hasClass('fullscreen')) {
			fecharsumario.addClass('visivel');
		} else{
			navsumario.removeClass('db');
		}
	});

});