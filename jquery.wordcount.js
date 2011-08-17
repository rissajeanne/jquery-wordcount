(function($) {
	$.fn.wordCount = function(options) {

		var defaults = {
			'limit'		: '100',
			'show'		: true,
			'showElem'	: 'p'
		},
			opts = $.extend({}, defaults, options);

		if (opts.show) {
			this.after($('<' + opts.showElem + ' class="wordCount">'));
		}
			
		return this.bind('keypress click blur focus change paste', function(event) { 
			var that = $(this);

			var content = that.attr('value'),
				count = content.match(/[A-Za-z\'\-]+/g).length,
				wordsRemaining = parseInt(opts.limit) - parseInt(count);

			// Provide word count feedback for the user
			if (opts.show) {
				that.next('.wordCount').text(wordsRemaining + ' words left.');
			}

			// Prevent user from typing if they exceed the word limit
			// Allow backspace and delete keys.
			if (count > opts.limit && event.keyCode !== 46 && event.keyCode !== 8) {
				return false;
			} else {
				return true;
			}
		});

	};
})(jQuery);
