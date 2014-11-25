jQuery(function($) {"use strict";
	var Site = {

		initialized : false,
		initialize : function() {

			if (this.initialized)
				return;
			this.initialized = true;
			this.events();

		},

		events : function() {
			var animSection = function() {
				$('.anim-section').each(function() {
					if ($(window).scrollTop() > ($(this).offset().top - $(window).height() / 1.15)) {
						$(this).addClass('animate')
					}
				})
			}
			if ($('.anim-section').length) {
				animSection()
				$(window).scroll(function() {
					animSection()
				})
			}
			if ($(".various").length) {
				$(".various").fancybox({
					maxWidth : 800,
					maxHeight : 600,
					fitToView : false,
					width : '70%',
					height : '70%',
					autoSize : false,
					closeClick : false,
					openEffect : 'none',
					closeEffect : 'none'
				});
			}
			if ($("#header").length) {
				if ($(window).width() < 768) {
					$('.submenu-icon').click(function() {
						$(this).parent('li').siblings().find('.dropdown-nav').slideUp(200)
						$(this).parent('li').siblings().find('.submenu-icon').removeClass('active');
						$(this).next().slideToggle(200);
						$(this).toggleClass('active');
					});

				}

			}
			// Js for grid
			if ($('#grid').length) {
				new AnimOnScroll(document.getElementById('grid'), {
					minDuration : 0.4,
					maxDuration : 0.7,
					viewportFactor : 0.2
				});
			}

			if ($(".tip").length) {
				$(".tip").tooltip();

			}

			if ($('.img-slider').length) {
				$('.img-slider').slick({
					speed : 800,
					autoplay : true,
					fade : true,
					onInit : function() {
						$('.img-slider').fadeIn(500);
					}
				});
			}
			if ($('#map').length) {
				var map

				map = new GMaps({
					div : '#map',
					lat : 28.624761,
					lng : 77.380464,
					disableDefaultUI : true,
					zoom : 16,
					draggable : false,
					scrollwheel : false
				});
				map.drawOverlay({
					lat : map.getCenter().lat(),
					lng : map.getCenter().lng(),
					content : '<a href="javascript:;" class="map-pointer">  <span>Find us Here</span><small></small> </a>',
					verticalAlign : 'top',
					horizontalAlign : 'center'
				});
				var styles = [{
					stylers : [{
						lightness : -5
					}]
				}];

			}
			
			if ($('.hover').length){				
				$('.hover').bind('touchstart touchend', function(e) {
        e.preventDefault();
        $(this).toggleClass('hover_effect');
    });				
		}
			
		}
	};

	Site.initialize();
})
// ----------------- navgation dropdown ------------
