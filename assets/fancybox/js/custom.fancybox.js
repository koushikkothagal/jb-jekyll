$(document).ready(function() {

	/*
	*  Different effects
	*/

	// Change title type, overlay closing speed
	$(".fancybox-effects-a").fancybox({
		helpers : {
			title : {
				type : 'outside'
			},
			overlay : {
				speedOut : 0
			}
		}
	});

	/*
	 *  Button helper. Disable animations, hide close button, change title type and content
	 */

	$('.fancybox-buttons').fancybox({
		openEffect : 'none',
		closeEffect : 'none',

		prevEffect : 'none',
		nextEffect : 'none',

		closeBtn : false,

		helpers : {
			title : {
				type : 'inside'
			},
			buttons : {}
		},

		afterLoad : function() {
			this.title = 'Image ' + (this.index + 1) + ' of ' + this.group.length + (this.title ? ' - ' + this.title : '');
		}
	});

	/*
	 *  Thumbnail helper. Disable animations, hide close button, arrows and slide to next gallery item if clicked
	 */

	$('.fancybox-thumbs').fancybox({
		prevEffect : 'none',
		nextEffect : 'none',

		closeBtn : false,
		arrows : false,
		nextClick : true,

		helpers : {
			thumbs : {
				width : 50,
				height : 50
			}
		}
	});

});