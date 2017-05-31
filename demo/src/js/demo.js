import jQuery from 'jquery';
import Gridle from '../../../dist/js/gridle';
require('../../../dist/js/gridle-eq');

jQuery(function($) {
	$('#medias li').click(function(e) {
		e.preventDefault();
		$('#medias li').removeClass('active');
		$('html').attr('class', '').addClass($(this).data('class'));
		$(this).addClass('active');
	});
	Gridle.on('update', function(updatedStates, activeStates, unactiveStates) {});
	Gridle.on('ready', function(e) {
		var states;
		states = Gridle.getRegisteredStates();
		$('.gr-12.gridle-debug').each(function() {
			var $this, $ul, first_clicked;
			$this = $(this);
			$ul = $('<ul class="selector selector--states" />');
			first_clicked = false;
			$.each(states, function(idx, item) {
				var $li;
				if (!item.settings.classes) {
					return;
				}
				$li = $('<li data-state="' + item.name + '">' + item.name + '</li>');
				$li.bind('click', function(e) {
					var $container, previous_class;
					$(this).siblings().removeClass('active');
					$(this).addClass('active');
					$container = $this;
					previous_class = $container.attr('data-active-state');
					$container.removeClass(previous_class).attr('data-active-state', 'state-' + item.name);
					if (item.name !== 'default') {
						$container.addClass('state-' + item.name);
					}
				});
				$ul.append($li);
				if (!first_clicked) {
					$li.trigger('click');
				}
				first_clicked = true;
			});
			$this.prepend($ul);
		});
	});
	Gridle.init({
		debug: true
	});
	$('[data-options]').each(function() {
		var $container, $this, groups, options;
		$this = $(this);
		$container = $this;
		if (!$this.hasClass('.gridle-debug')) {
			$container = $this.closest('.gr-12.gridle-debug');
		}
		options = $this.data('options');
		groups = options.split('|');
		$(groups).each(function(idx, item) {
			var $ul, opts;
			opts = item.split(',');
			$ul = $('<ul class="selector selector--options" />');
			$.each(opts, function(idx, item) {
				var $li;
				$li = $('<li>' + item + '</li>');
				$li.bind('click', function(e) {
					var previous_class;
					$(this).siblings().removeClass('active');
					$(this).addClass('active');
					previous_class = $(this).parent().attr('data-active');
					$(this).parent().attr('data-active', item);
					$this.removeClass(previous_class).addClass(item);
				});
				$ul.append($li);
				if (idx === 0) {
					$li.trigger('click');
				}
			});
			$container.prepend($ul);
		});
	});
});
