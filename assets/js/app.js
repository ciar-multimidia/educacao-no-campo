jQuery(document).ready(function($) {

	//////////////////////////////////// MENU
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




	///////////////////////////////////// NOTAS RODAPE
	// notas de rodapé
	var html = $('html')
	var corpo = $('body');
	var btRodape = $('button.botao-rodape');
	var notasRodape = $('.nota-rodape');

	notasRodape.each(function(index, el) {
		$(el).prepend('<button class=\'fechar\' title=\'Fechar nota de rodapé\'>&#10799;\</button>');

		$(el).find('.fechar').on('click', function(event) {
			$(el).addClass('easing-saida');
			notasRodape.removeClass('visivel');
			btRodape.removeClass('ativado');
			rodapeAtual = 0;
		});

		$(el).on(transitionendPrefixed, function(event) {
			if (!$(this).hasClass('visivel')) {
				$(this).removeClass('db easing-saida');
			}
		});
	});


	var rodapeAtual = 0;

	btRodape.on('click', function(event) {
		var thisNumero = parseInt($(this).attr('data-numero'));
		if (thisNumero !== rodapeAtual) {
			var thisTop = $(this).offset().top;
			var thisLeft = $(this).offset().left;
			var thisHeight = $(this).outerHeight();
			notasRodape.filter('[data-numero=\''+rodapeAtual+'\']').addClass('easing-saida');
			notasRodape.removeClass('visivel');
			var notaRevelar = notasRodape.filter('[data-numero=\'' + thisNumero + '\']');
			notaRevelar.addClass('db');
			notaRevelar.css({
				'top': '',
				'left': ''
			});

			var topNota = (function(){
				var topCalculado = thisTop - notaRevelar.outerHeight();
				if (topCalculado > 0) {
					notaRevelar.removeClass('origem-top');
					return thisTop - notaRevelar.outerHeight();
				} else{
					notaRevelar.addClass('origem-top');
					return thisTop + thisHeight;
				}
			})();

			var leftNota = (function(){
				var leftCalculado = thisLeft - notaRevelar.outerWidth()/2;
				if (leftCalculado < 0) {
					return 0;
				} else if(leftCalculado + notaRevelar.outerWidth() > corpo.width() ){
					return corpo.width() - notaRevelar.outerWidth();
				} else{
					return leftCalculado;
				}
			})();
			btRodape.removeClass('ativado');
			$(this).addClass('ativado');
			notaRevelar.css({
				'top': topNota,
				'left': leftNota
			}).addClass('visivel');


			if (topNota < html.scrollTop()) {
				html.animate({'scrollTop' : topNota}, 200);
			}

			rodapeAtual = thisNumero;
		}
	});



	//////////////////////////// TIMELINE
	var timeline = $('.timeline');

	if (timeline.length > 0) {

		var containerTextos = timeline.find('.textos');
		var scrollerTextos = containerTextos.find('.scroller');
		var tablesTextos = scrollerTextos.find('div.item');
		var containerBotoes = timeline.find('.tempos');
		var scrollerBotoes = containerBotoes.find('.scroller');
		var timelineBotoes = scrollerBotoes.find('button');

		var tempoAtual = 0;

		var crossBrowserTransform = function(valor){
			return {
				'-webkit-transform': valor,
				    '-ms-transform': valor,
				        'transform': valor
			};
		}
		
		var atualizarTempo = function(){
			var botaoAtual = timelineBotoes.eq(tempoAtual);
			timelineBotoes.removeClass('ativo traco-ativo');
			botaoAtual.addClass('ativo');
			var posScrollerBt = scrollerBotoes.width()/2 - botaoAtual.position().left - botaoAtual.outerWidth()/2 ;
			scrollerBotoes.css(crossBrowserTransform('translateX('+posScrollerBt+'px)'));

			for(i = 0; i < tempoAtual; i++){
				timelineBotoes.eq(i).addClass('traco-ativo');
			}

			var textoAtual = tablesTextos.eq(tempoAtual);
			tablesTextos.removeClass('ativo');
			textoAtual.addClass('ativo');
			var posScrollerTexto = scrollerTextos.width()/2 - textoAtual.position().left - textoAtual.outerWidth()/2 ;
			scrollerTextos.css(crossBrowserTransform('translateX('+posScrollerTexto+'px)'));
		}

		timelineBotoes.on('click', function(event) {
			tempoAtual = timelineBotoes.index($(this));
			atualizarTempo();
		});

		atualizarTempo();
	}
});