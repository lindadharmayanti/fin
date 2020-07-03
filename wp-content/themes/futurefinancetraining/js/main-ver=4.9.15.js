//Window resize after
$.fn.superResize = function(options){
	var viewportW = 0,
			viewportH = 0,
			w = viewportW,
			h = viewportH,
			timer = false,
			defaults = {
				resizeAfter : function(){}
			},
			setting = $.extend(defaults, options);
	this.on('resize', function(){
		viewportW = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
		viewportH = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
	});
	this.on('load', function(){
		setting.resizeAfter();
	});
	this.on('resize', function(){
		if (timer !== false) clearTimeout(timer);
		timer = setTimeout(function(){
			if(w != viewportW || h != viewportH){
				setting.resizeAfter();
				w = viewportW;
				h = viewportH;
			}
		}, 300);
	});
	return(this);
};

//viewport
var viewportW = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
		viewportH = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
$(window).superResize({
	resizeAfter: function(){
		viewportW = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
		viewportH = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
	}
});

//matchHeight
function matchHeight($o,m,w) {
	$o.css('height','auto')
	var foo_length = $o.length,
			_width = $(window).width();

	if (w == null) {
		w = 0;
	}

	if(_width < w) {
		for(var k = 0; k < foo_length; k++){
			$o.eq(k).css('height', 'auto');
		}
	} else {
		for(var i = 0 ; i < Math.ceil(foo_length / m) ; i++) {
			var maxHeight = 0;
			for(var j = 0; j < m; j++) {
				if ($o.eq(i * m + j).outerHeight() > maxHeight) {
					maxHeight = $o.eq(i * m + j).outerHeight();
				}
			}
			for(var k = 0; k < m; k++) {
				$o.eq(i * m + k).css('height', maxHeight);
			}
		}
	}
}

$(function() {
	/* -----------------------------------------------------------
		animation
	----------------------------------------------------------- */
	$(window).on('load', function() {
		$('[data-animation]').on('inview', function (event, isInView) {
			var elm = $(this);
			var delay = elm.data('animation-delay');
			var ani = elm.data('animation');
			delay ? delay = elm.data('animation-delay') : delay = 0;
			viewportW < 768 ? delay = 0 : '';
			if (isInView) {
				setTimeout(function() {
					elm.addClass('animated ' + ani);
				}, delay);
			}
		});
	});

	
	/* -----------------------------------------------------------
		sf-menu
	----------------------------------------------------------- */

	(function($) {
		if (!$('.header .main_nav > ul.nav').length) return;

		//superfish menu
		$(window).superResize({
			resizeAfter: function(){
				if(viewportW >= 992) {
					$('.header .main_nav > ul.nav').superfish({
						cssArrows: false
					});
				} else {
					$('.header .main_nav > ul.nav').superfish('destroy');
				}
			}
		});

		// add class: .active
		$('.header .main_nav li.active').parents('li').addClass('active');
	})(jQuery);

	/* -----------------------------------------------------------
		header fixed
	----------------------------------------------------------- */
	$(window).on('scroll', function() {
		$(window).scrollTop() > 0 ? $('.header').addClass('fixed') : $('.header').removeClass('fixed');
	});

	/* -----------------------------------------------------------
		Off canvas menu
	----------------------------------------------------------- */
	(function($) {
		if (!$('.offcanvas').length) return;
		$('.header .main_nav').clone().prependTo('.offcanvas .oc_body');
		$('body').append($('<div />').addClass('toggle_offcanvas offcanvas_overlay'));
		$('.toggle_offcanvas').off('dbclick').on('click', function() {
			$('.offcanvas').css('height', viewportH);

			if (!$('body').hasClass('has_offcanvas')) {
				$('html').css('overflow', 'hidden');
				$('body').addClass('has_offcanvas offcanvas_show');
				$('.offcanvas').css('height', viewportH);
				$(window).on('resize', function() {
					$('.offcanvas').css('height', viewportH);
				});
			} else {
				$('body').removeClass('offcanvas_show');
				setTimeout(function() {
					$('body').removeClass('has_offcanvas');
					$('html').css('overflow', '');
				}, 200);
			}
		});
	})(jQuery);

	/* -----------------------------------------------------------
		add-select-tabs
	----------------------------------------------------------- */
	$('.nav-tabs.add-select-tabs').each(function(){
		// add select-tabs
		var nav_tabs = $(this),
				select = '<select class="select-tabs">';
		nav_tabs.find('li').each(function(){
			var a = $(this).find('a');
			var value = a.attr('href');
			var text = a.text();
			select += '<option value="'+ value +'">'+ text +'</option>';
		});
		select += '</select>';
		nav_tabs.after(select);

		$('.add-select-tabs li:first').addClass('active');
		$('.add-select-tabs li:first').addClass('active');
		// select-tabs
		nav_tabs.next('.select-tabs').on('change', function() {
			var target = $(this).val();
			if (!$(target).hasClass('active')) {
				$(target).addClass('active').siblings().removeClass('active');
			}
		});
	});

	/* -----------------------------------------------------------
		tab-content
	----------------------------------------------------------- */
	$('.tab-content .tab-pane:first').addClass('active');

	$('.tab-content .tab-pane').click(function() {           
		$(this).addClass('active').siblings().removeClass('active');           
	});


});


$(document).ready(function () {
    $(".nav > li > ul > li > ul").addClass("mega_content");
    $(".ft_main .ft_col:first").addClass("col_logo");
    $(".ft_main .ft_col:nth-child(2)").addClass("col_contact");
    $(".ft_main .ft_col:last").addClass("col_email");
    $(".comment-form .submit").addClass("btn btn-default");


	$('.dropdown-menu li:first').addClass('active');

	$('.dropdown-menu li').click(function() {           
		$(this).addClass('active').siblings().removeClass('active');           
	});

   $('.dropdown').on("click",function() {
      $(this).toggleClass("checked");

      if ($(".check.checked").length>0) {
        $('.ic_flag').prop('disabled', false);
      } else {
        $('.ic_flag2').prop('disabled', true);
      }
    });

  $(window).load(function () {
    calculatePadding();
  });

  calculatePadding();
	
  $(window).resize(function(){
    calculatePadding();
  });

  function calculatePadding() {
	  	  
	  


	if ($(window).width() > 1480) {     
      $('.con_home_intro').imagesLoaded( function() {
        var center = (($(".con_home_intro").height()-$(".con_home_intro .wc-contennt").height())/ 2) - 100 ;
        $(".con_home_intro .wc-contennt").css({"top":center});
      });

   }


	  
  }
	
	$('.wrap-bi-items').imagesLoaded( function() {
		$('.bi-items .btn-link-to').matchHeight({
			byRow: true
		});             
	});	
	
	$('.tabs-block .tabs nav ul').imagesLoaded( function() {
		$('.tabs-block .tabs nav ul li a').matchHeight({
			byRow: true
		});             
	});	
	
	// $("#wab").on("mouseover", ".btn-link-to", function () {
	// 	$("#" + $(this).data("hover")).css('visibility', 'visible');
	// });
	// $("#wab").on("mouseout", ".btn-link-to", function () {
	// 	$("#" + $(this).data("hover")).css('visibility', 'hidden');
	// });
		
	$(".tooltiptest .tooltiptext").each(function(){
		if(!$(this).find('i.fa').length)
			$(this).append('<i class="fa fa-times-circle" aria-hidden="true"></i>');
	})

	$(".tooltiptest").on("click", ".btn-link-to", function () {
		$(this).toggleClass('active');
	});	

	$(".tooltiptest").on("click", "i", function () {
		$(this).closest(".tooltiptest").find('.btn-link-to').removeClass('active');
	});	

	$(".tooltiptest .btn-link-to").hover(
	  function() {
	    $(this).addClass('active');
	  }, function() {
	    $(this).removeClass('active');
	  }
	);

	
  $('.tabs-block .tabs nav ul li:first').addClass('tab-current');

  $('.content-wrap section:first').addClass('tab-current');

	jQuery(document).ready(function($){
	    $('.page-id-20 .content-wrap p > img').unwrap();
	});

	$("#quickE").click(function() {
		$('html, body').animate({
			scrollTop: $("#quickEdiv").offset().top
		}, 2000);
	});

	$('body').find('.privacy-btn').attr('href', gdpr.privacy_url).attr('target', '_blank');
	
	// $('.hover').hover(function(){
	// 	$(this).addClass('flip');
	// },function(){
	// 	$(this).removeClass('flip');
	// });
	
});

(function() {

	[].slice.call( document.querySelectorAll( '.tabs' ) ).forEach( function( el ) {
		new CBPFWTabs( el );
	});

})();


