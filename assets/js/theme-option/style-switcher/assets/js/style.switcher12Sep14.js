jQuery(function($) {
	var styleSwitcher = {

		initialized : false,

		initialize : function() {

			var $this = this;

			if (this.initialized)
				return;
			this.initialized = true;

			// Style Switcher CSS
			$("head").append($('<link rel="stylesheet">').attr("href", "/assets/js/theme-option/style-switcher/assets/css/font-awesome.css"));
			$("head").append($('<link rel="stylesheet">').attr("href", "/assets/js/theme-option/style-switcher/assets/css/theme_panel.css"));
			$("head").append($('<link rel="stylesheet">').attr("href", "http://code.jquery.com/ui/1.11.1/themes/smoothness/jquery-ui.css"));

			$("head").append($('<script />').attr("src", "http://code.jquery.com/ui/1.11.1/jquery-ui.js"));

			$("head").append($('<link rel="stylesheet/less">').attr("href", "/assets/js/theme-option/style-switcher/assets/css/skin.less"));

			$.getScript("/assets/js/theme-option/style-switcher/assets/js/less.js", function(data, textStatus, jqxhr) {
				$("body").append('<div id="theme_panel"></div>');
				$("#theme_panel").load("/assets/js/theme-option/style-switcher/switcher.html");

				if ($.cookie("header") != null) {

					$('#header').addClass($.cookie("header"));

				}

				setTimeout(function() {
					$this.build();
					$this.events();

					if ($.cookie("skin") != null) {
						$this.setColor($.cookie("skin"));
					}

					if ($.cookie("initialized") == null) {
						$this.container.find("h4 a").click();
						$.cookie("initialized", true);
					}
				}, 100)

				setTimeout(function() {
					if ($.cookie("header") != null) {
						$('.header-items').removeClass('select-active')

						$('#header-style .theme-pager li').removeClass('current');
						//alert($.cookie("main_index"))

						$('.header-items-slider').eq($.cookie("main_index")).find('.header-items').eq($.cookie("index")).addClass('select-active')
						$('#header-style .theme-pager li').eq($.cookie("main_index")).addClass('current');
						var headerItemsWidth = $('.header-items-slider').width();
						lefty = $.cookie("main_index") * headerItemsWidth;

						$('.header-group').css('marginLeft', -lefty);

					} else {

						$('.header-items').removeClass('select-active')

						$('#header-style .theme-pager li').removeClass('current');
						//alert($.cookie("main_index"))

						$('.header-items-slider').eq(0).find('.header-items').eq(0).addClass('select-active')
						$('#header-style .theme-pager li').eq(0).addClass('current');

						$('.header-group').css('marginLeft', 0);
					}

					if ($.cookie("colorIndex") != null) {

						$('.swatches li').eq($.cookie("colorIndex")).find('a').addClass('color-fillactive');
					} else {

						$('.swatches li').eq(0).find('a').addClass('color-fillactive');
					}

					if ($.cookie("bool") != null) {
						if ($.cookie("bool") == "true") {
							bool = true;
							$('#sticky .layout-column').removeClass('radio-active');
							$('#sticky #boxed.layout-column').addClass('radio-active');

						} else {
							bool = false;
							$('#sticky .layout-column').removeClass('radio-active');
							$('#sticky #full-width.layout-column').addClass('radio-active');
						}

					} else {

						bool = false;
					}

				}, 500)

			});

		},

		build : function() {

			var $this = this;

			this.container = $("#theme_panel");

			// Colors Skins
			var colors = [{
				"Hex" : "#e1cc3f",
				"colorName" : "default"
			}, {
				"Hex" : "#28c2e4",
				"colorName" : "skyBlue"
			}, {
				"Hex" : "#d5586d",
				"colorName" : "pink"
			}, {
				"Hex" : "#9fb035",
				"colorName" : "green"
			}, {
				"Hex" : "#935397",
				"colorName" : "purple"
			}, {
				"Hex" : "#2ba09a",
				"colorName" : "greenblue"
			}, {
				"Hex" : "#f2ba66",
				"colorName" : "orange"
			}, {
				"Hex" : "#b33b1c",
				"colorName" : "darkred"
			}, {
				"Hex" : "#f0a01a",
				"colorName" : "darkyellow"
			}, {
				"Hex" : "#7e8588",
				"colorName" : "greyish"
			}];
			var colorList = this.container.find('.swatches');

			$.each(colors, function(i, value) {

				var color = $("<li />").append($("<a class='color-fill' />").css("background-color", colors[i].Hex).attr({
					"data-color-hex" : colors[i].Hex,
					"data-color-name" : colors[i].colorName,
					"href" : "#",
					"title" : colors[i].colorName
				}).append($('<i/>').addClass('fa fa-check active-color')));

				colorList.append(color);

			});
			$('#styleSwitcher').find("ul[data-type=colors] li a").find('.fa-check').hide();
			$('#styleSwitcher').find("ul[data-type=colors] li:first a").find('.fa-check').show();

			if ($.cookie("skin") != null) {

				var currentSkinColor = $.cookie("skin");

			} else {
				var currentSkinColor = colors[0].Hex;
			}

			colorList.find("a").click(function(e) {
				e.preventDefault();
				$this.setColor($(this).attr("data-color-hex"));
			});

		},

		events : function() {

			var $this = this;

			//switcher on off event
			$this.container.find("h4 a").click(function(e) {

				e.preventDefault();

				if ($this.container.hasClass("active")) {

					$this.container.animate({
						left : "-230px"
					}, 300).removeClass("active");

				} else {

					$this.container.animate({
						left : "0"
					}, 300).addClass("active");

				}

			})
			if ($.cookie("showSwitcher") != null) {
				$this.container.find("h4 a").click();
				$.removeCookie("showSwitcher");
			}
			//switcher on off event close

			//for custom slider

			var headerItemsLength = $('.header-items-slider').length;
			var headerItemsWidth = $('.header-items-slider').width();
			var totalWidth = headerItemsLength * headerItemsWidth;
			$('.header-group').width(totalWidth);

			$(document).on('click', '#header-style .theme-pager li', function() {
				$('#header-style .theme-pager li').removeClass('current')
				$(this).addClass('current');
				ind = $(this).index();
				alert(ind)
				alert(headerItemsWidth)

				lefty = ind * headerItemsWidth;

				$('.header-group').animate({
					'marginLeft' : -lefty
				}, 500)

			})
			//end custom slider

			//on off latest
			$(document).on('click', '.theme-heading', function() {

				$('.theme-heading').removeClass('on');
				$('.theme_panel_option').slideUp('normal');
				$('.fa-minus').removeClass('fa-minus');

				if ($(this).next().is(':hidden') == true) {
					$(this).addClass('on');
					$(this).next().slideDown('normal');
					$(this).find('.fa-plus').addClass('fa-minus');

				} else {

					$(this).find('.fa-plus').removeClass('fa-minus');
				}
			});
			$(document).on('mouseover', '.theme-heading', function() {
				$(this).addClass('over');
			}).mouseout(function() {
				$(this).removeClass('over');
			});
			$('.theme_panel_option').hide();

			//Radio active
			$(document).on('click', '#layout .layout-column', function() {
				$('#layout .layout-column').removeClass('radio-active')
				$(this).addClass('radio-active')
			})

			$(document).on('click', '#sticky .layout-column', function() {
				$('#sticky .layout-column').removeClass('radio-active')
				$(this).addClass('radio-active')
			})
			// Active Devices
			$(document).on('click', '.device-highlight', function() {
				$('.iphone-p-active').removeClass('iphone-p-active')
				$(this).addClass('iphone-p-active');

			})

			$(document).on('click', '.header-items', function() {
				$('.select-active').removeClass('select-active')
				$(this).addClass('select-active')
			})
			// Active Pages
			$(document).on('click', '.page-group a', function() {
				$('.active-page').removeClass('active-page')
				$(this).addClass('active-page')
			})

			$(document).on('click', '#theme_panel .theme-setting i', function() {

				var left = $('#theme_panel').outerWidth();
				if (!$('#theme_panel').hasClass('active')) {
					$('#theme_panel').addClass('active');

					$('#theme_panel').animate({
						'left' : -left
					}, 500)
				} else {

					$('#theme_panel').removeClass('active');
					$('#theme_panel').animate({
						'left' : 0
					}, 500)

				}

			})

			$(document).on('click', '.header-group .header-items', function() {
				$('#header').removeClass();

				var headername = $(this).attr('rel')
				var main_ind = $(this).closest('.header-items-slider').index();
				var ind = $(this).index();

				$('#header').addClass(headername);

				$.cookie("header", headername);
				$.cookie("index", ind);
				$.cookie("main_index", main_ind);

			})

			$(document).on('click', '.color-fill', function() {

				var colorIndex = $(this).closest('li').index();
				$.cookie("colorIndex", colorIndex);
				$('.color-fillactive').removeClass('color-fillactive');
				$(this).addClass('color-fillactive');
			});

			$(document).on('click', '#layout #boxed', function() {

				$('#wrapper').addClass('boxed')

			})
			// for sticky header
			$(document).on('click', '#sticky .layout-column', function() {

				if ($(this).attr('rel') == 'yes') {

					bool = true;
					$.cookie('bool', bool)
				} else {
					bool = false;

					$('#header').removeClass();
					$.cookie('bool', bool)
				}

			})
			var headerHeight = $('#header').outerHeight();
			var st = $(window).scrollTop();
			$(window).scroll(function() {
				if (bool) {

					var pos = $(window).scrollTop();

					if (pos > headerHeight) {
						if (pos > st) {
							console.log('downward')

							$('#header').removeClass('down')
							$('#header').addClass('fixed up')

						} else {
							console.log('upward')

							$('#header').removeClass('up')
							$('#header').addClass('fixed down')

						}
						st = pos;

					} else {

						$('#header').removeClass('fixed down up')
					}

				} else {
					$('#header').removeClass('fixed down up')
				}
			})
			// end for sticky header
		},

		setColor : function(color) {

			less.modifyVars({
				skinColor : color
			});

			$.cookie("skin", color);
			this.container.find("ul[data-type=colors] li a").find('i').hide();
			this.container.find("ul[data-type=colors] li a[data-color-hex=" + color + "]").find('i').show();
		},

		reset : function() {

			$.removeCookie("skin");
			$.removeCookie("layout");
			$.removeCookie("pattern");

			$.cookie("showSwitcher", true);
			window.location.reload();

		},
	};

	styleSwitcher.initialize();

})