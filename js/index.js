/*---------------------------
window.onload
- Isotope  作品集 篩選與排列效果

$(document).ready
- popup  作品集 跳出效果
--偵測寬度與是否顯示arrow

- clipboards  聯絡我 複製Email到剪貼板
- BS_tooltip 聯絡我 複製Email的小提醒
- smooth 點擊連結會滑動到位置
----------------------------*/


window.onload = function () {
	/*-- Isotope --*/
	//Isotope init 
	var $grid = $('.grid').isotope({
		itemSelector: '.grid_item',
		layoutMode: 'fitRows'
	});
	// bind filter button click
	$('.filters-button-group').on('click', 'button', function () {
		var filterValue = $(this).attr('data-filter');
		// use filterFn if matches value
		filterValue = $(this).attr('data-filter');
		$grid.isotope({ filter: filterValue });
	});
	// change is-checked class on buttons
	$('.button-group').each(function (i, buttonGroup) {
		var $buttonGroup = $(buttonGroup);
		$buttonGroup.on('click', 'button', function () {
			$buttonGroup.find('.active').removeClass('active');
			$(this).addClass('active');
		});
	});
};




$(document).ready(function () {

	/*-- popup --*/
	$('.popup-link').magnificPopup({
		type: 'inline',
		tClose: '關閉',
		tLoading: 'Loading...',
		mainClass: 'mfp-fade',
		removalDelay: 300,
		midClick: true,
		overflowY: 'scroll',
		fixedContentPos: true,
		gallery: {
			enabled: true, // set to true to enable gallery
			arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>', // markup of an arrow button
			tPrev: '上一張', // title for left button
			tNext: '下一張', // title for right button
		},
		callbacks: {
			open: function () {
				$('nav').css('margin-right', '15px');
				/*--讓在popup中按左右按鈕後，頁面滾動到最上面--*/
				$('.mfp-arrow').on('click', function () {
					$('.mfp-wrap').scrollTop(0);
					// 動畫方式不好閱讀
					// $('.mfp-wrap').animate({ 
					// 	scrollTop: 0,
					// }, 800)
				});
				changeArrow(checkMediaSm);

			},
			close: function () {
				$('nav').css('margin-right', '0');
			}
		}
	});
	/*--偵測寬度與是否顯示arrow--*/
	function changeArrow(x) {
		if (x.matches) { // If media query matches
			$('.mfp-arrow').hide();
		} else {
			$('.mfp-arrow').show();
		}
	}
	var checkMediaSm = window.matchMedia("(max-width: 576px)")
	changeArrow(checkMediaSm) // Call listener function at run time
	checkMediaSm.addListener(changeArrow) // Attach listener function on state changes


	/*-- clipboards --*/
	new ClipboardJS('.btn-clipboard');


	/*-- BS_tooltip --*/
	$('.btn-clipboard').tooltip();
	$('.btn-clipboard').click(function () {
		var clicked = $(this).attr('clicked');
		$('.btn-clipboard').attr('data-original-title', clicked).tooltip('show');
	});
	$('.btn-clipboard').on('hidden.bs.tooltip', function () {
		var origin = $(this).attr('origin');
		$('.btn-clipboard').attr('data-original-title', origin);
	})


	/*---smooth---*/
	// Add smooth scrolling to all links
	$("a").on('click', function (event) {
		// Make sure this.hash has a value before overriding default behavior

		if (this.hash !== "") {
			var thisClass = $(this).hasClass('popup-link');
			if (thisClass) {
				return;
			}
			// Prevent default anchor click behavior
			event.preventDefault();
			// Store hash
			var hash = this.hash;
			// Using jQuery's animate() method to add smooth page scroll
			// The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
			$('html, body').animate({// 有些瀏覽器只支援html，有些只支援body 所以兩個都寫進去
				scrollTop: $(hash).offset().top
			}, 800, function () {
				// Add hash (#) to URL when done scrolling (default click behavior)
				window.location.hash = hash;
			});
		} // End if
	});


});