/*!
*	Bootstrap submenu fix
*	Version: 1.1
*	Author web-master72
*/

(function($){

	$(document).ready(function() {

		var navBreakpoint = 991,
			mobileTest;

		/* ---------------------------------------------- /*
		 * Mobile detect
		/* ---------------------------------------------- */

		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
			mobileTest = true;
		} else {
			mobileTest = false;
		}

		/* ---------------------------------------------- /*
		 * Nav hover/click dropdown
		/* ---------------------------------------------- */

		$(window).on('resize', function() {

			var width    = Math.max($(window).width(), window.innerWidth);
			var menuItem = $('.menu-item-has-children');

			if ( width > navBreakpoint ) {
				menuItem.removeClass('sub-menu-open');
			}

			if ( (width > navBreakpoint) && (mobileTest !== true) ) {
				menuItem.children('a').unbind('click');
				menuItem.unbind('mouseenter mouseleave');
				menuItem.on({
					mouseenter: function () {
						$(this).addClass('sub-menu-open');
					},
					mouseleave: function () {
						$(this).removeClass('sub-menu-open');
					}
				});
			} else {
				menuItem.unbind('mouseenter mouseleave');
				menuItem.children('a').unbind('click').click(function(e) {
					e.preventDefault();
					$(this).parent().toggleClass('sub-menu-open');
					// If device has big screen
					if ( (width > navBreakpoint) && (mobileTest == true) ) {
						$(this).parent().siblings().removeClass('sub-menu-open');
						$(this).parent().siblings().find('.sub-menu-open').removeClass('sub-menu-open');
					}
				});
			}

			//


		});

	});

})(jQuery);