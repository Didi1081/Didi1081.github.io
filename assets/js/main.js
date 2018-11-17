
(function ($) {

	var $window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$all = $body.add($header);

	// Breakpoints.
	breakpoints({
		xxlarge: ['1681px', '1920px'],
		xlarge: ['1281px', '1680px'],
		large: ['1001px', '1280px'],
		medium: ['737px', '1000px'],
		small: ['481px', '736px'],
		xsmall: [null, '480px']
	});

	// Play initial animations on page load.
	$window.on('load', function () {
		setTimeout(function () {
			$body.removeClass('is-preload');
		}, 100);
	});

	// Touch mode.
	if (browser.mobile)
		$body.addClass('is-touch');
	else {

		breakpoints.on('<=small', function () {
			$body.addClass('is-touch');
		});

		breakpoints.on('>small', function () {
			$body.removeClass('is-touch');
		});

	}

	// Typing animation

	var heading = document.querySelector("h4");
	var data = ["Hi! I'm Didi!", "...well that's what they call me.","Pleasure to meet you.", "I'm a fullstack developer!", "Please look at my work below.", "Click that arrow button below...↙️", "..it will take you to the projects!", "You can also scroll down...🖱️", "...or use the nav bar on top. ↗️", "Have fun!", "What are you waiting for?","Nothing else to see here.","Still here?","humm...🤔","","You've been here for..."," ...a WHOLE minute now!", "Are you entertained?", "Do you just want to see how long this goes on for?", "What if I go for 3 hours?",  "I could tell you my entire life story...", "Want to hear it?", "If you want to hear my story, contact me.", "I'll tell you IRL.", "Well... it was nice to meet you.", "See you later and take care.", "Enjoy your lunch. 🍕 ", "Seriously, you may click on the arrow now.","Goodbye!","Sayonara!","Hasta la vista!","Ok, I'm really done now, byeee.","","You're going to just see the cursor if you stay...","","","","","","","","Just incase you missed it..."];
	var j = 0;
	var i = 0;


	var k;

	function typing() {
		if (heading.innerHTML.length === data[j].length) {
			k = 0;
			setTimeout(del, 1200);
		}
		if (i < data[j].length) {
			heading.innerHTML += data[j].charAt(i);
			i++;
			setTimeout(typing, 50);
		}
		else {
			j++;
			i = 0;
			k = 0;
			setTimeout(typing, 3000);
		}
		if (j === data.length) {
			j = 0;
		}
	}

	// var check = document.getElementById("check");
	// var k = 0;
	function del() {
		if (heading.innerHTML.length == 0) {
			clearTimeout(time);
		}
		else {
			heading.innerHTML = heading.innerHTML.slice(0, heading.innerHTML.length - k);
			k++;
			var time = setTimeout(del, 100);
		}
	}

	typing();

	//end typing animation

	// Fix: IE flexbox fix.
	if (browser.name == 'ie') {

		var $main = $('.main.fullscreen'),
			IEResizeTimeout;

		$window
			.on('resize.ie-flexbox-fix', function () {

				clearTimeout(IEResizeTimeout);

				IEResizeTimeout = setTimeout(function () {

					var wh = $window.height();

					$main.each(function () {

						var $this = $(this);

						$this.css('height', '');

						if ($this.height() <= wh)
							$this.css('height', (wh - 50) + 'px');

					});

				});

			})
			.triggerHandler('resize.ie-flexbox-fix');

	}

	// Gallery.
	$window.on('load', function () {

		var $gallery = $('.gallery');

		$gallery.poptrox({
			baseZIndex: 10001,
			useBodyOverflow: false,
			usePopupEasyClose: false,
			overlayColor: '#1f2328',
			overlayOpacity: 0.65,
			usePopupDefaultStyling: false,
			usePopupCaption: true,
			popupLoaderText: '',
			windowMargin: 50,
			usePopupNav: true
		});

		// Hack: Adjust margins when 'small' activates.
		breakpoints.on('>small', function () {
			$gallery.each(function () {
				$(this)[0]._poptrox.windowMargin = 50;
			});
		});

		breakpoints.on('<=small', function () {
			$gallery.each(function () {
				$(this)[0]._poptrox.windowMargin = 5;
			});
		});

	});

	// Section transitions.
	if (browser.canUse('transition')) {

		var on = function () {


			// Galleries.
			$('.gallery')
				.scrollex({
					top: '30vh',
					bottom: '30vh',
					delay: 50,
					initialize: function () { $(this).addClass('inactive'); },
					terminate: function () { $(this).removeClass('inactive'); },
					enter: function () { $(this).removeClass('inactive'); },
					leave: function () { $(this).addClass('inactive'); }
				});

			// Generic sections.
			$('.main.style1')
				.scrollex({
					mode: 'middle',
					delay: 100,
					initialize: function () { $(this).addClass('inactive'); },
					terminate: function () { $(this).removeClass('inactive'); },
					enter: function () { $(this).removeClass('inactive'); },
					leave: function () { $(this).addClass('inactive'); }
				});

			$('.main.style2')
				.scrollex({
					mode: 'middle',
					delay: 100,
					initialize: function () { $(this).addClass('inactive'); },
					terminate: function () { $(this).removeClass('inactive'); },
					enter: function () { $(this).removeClass('inactive'); },
					leave: function () { $(this).addClass('inactive'); }
				});

			// Contact.
			$('#contact')
				.scrollex({
					top: '50%',
					delay: 50,
					initialize: function () { $(this).addClass('inactive'); },
					terminate: function () { $(this).removeClass('inactive'); },
					enter: function () { $(this).removeClass('inactive'); },
					leave: function () { $(this).addClass('inactive'); }
				});

		};

		var off = function () {

			// Galleries.
			$('.gallery')
				.unscrollex();

			// Generic sections.
			$('.main.style1')
				.unscrollex();


			$('.main.style2')
				.unscrollex();


			// Contact.
			$('#contact')
				.unscrollex();

		};

		breakpoints.on('<=small', off);
		breakpoints.on('>small', on);

	}

	// Events.
	var resizeTimeout, resizeScrollTimeout;

	$window
		.on('resize', function () {

			// Disable animations/transitions.
			$body.addClass('is-resizing');

			clearTimeout(resizeTimeout);

			resizeTimeout = setTimeout(function () {

				// Update scrolly links.
				$('a[href^="#"]').scrolly({
					speed: 1500,
					offset: $header.outerHeight() - 1
				});

				// Re-enable animations/transitions.
				setTimeout(function () {
					$body.removeClass('is-resizing');
					$window.trigger('scroll');
				}, 0);

			}, 100);

		})
		.on('load', function () {
			$window.trigger('resize');
		});

})(jQuery);