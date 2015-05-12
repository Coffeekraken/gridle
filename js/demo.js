jQuery(function($) {
  $('#medias li').click(function(e) {
    e.preventDefault();
    $('#medias li').removeClass('active');
    $('html').attr('class', '').addClass($(this).data('class'));
    $(this).addClass('active');
  });
  Gridle.on('update', function(e, updatedStates, activeStates, unactiveStates) {
    console.log('gridle update', updatedStates, activeStates, unactiveStates);
    if (Gridle.isActive('mobile')) {
      console.log('Mobile State Active');
    }
  });
  Gridle.on('ready', function(e) {
    var states;
    states = Gridle.getRegisteredStates();
    $('.container.gridle-debug').each(function() {
      var $this, $ul;
      $this = $(this);
      $ul = $('<ul class="state-selector" />');
      $.each(states, function(idx, item) {
        var $li;
        $li = $('<li>' + item.name + '</li>');
        $li.bind('click', function(e) {
          var $container, previous_class;
          $(this).siblings().removeClass('active');
          $(this).addClass('active');
          $container = $(this).parent().siblings('.container.gridle-debug');
          previous_class = $container.attr('data-active-state');
          $container.removeClass(previous_class).addClass('state-' + item.name).attr('data-active-state', 'state-' + item.name);
        });
        $ul.append($li);
        if (idx === 0) {
          $li.trigger('click');
        }
      });
      $this.before($ul);
    });
  });
  Gridle.init({
    debug: false
  });
  $('[data-options]').each(function() {
    var $container, $this, groups, options;
    $this = $(this);
    $container = $this;
    if (!$this.hasClass('.gridle-debug')) {
      $container = $this.closest('.gridle-debug');
    }
    options = $this.data('options');
    groups = options.split('|');
    $(groups).each(function(idx, item) {
      var $ul, opts;
      opts = item.split(',');
      $ul = $('<ul class="state-selector" />');
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
      $container.before($ul);
    });
  });
});

//# sourceMappingURL=demo.js.map
