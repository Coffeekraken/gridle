
/*
 * Gridle.js
 *
 * This little js file allow you to detect witch or your gridle state is active, when states changes, etc...
 *
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 * @created 	20.05.14
 * @updated 	20.05.14
 * @version 	1.0
 */
(function() {

  /*
  	Little smokesignals implementation
   */
  var smokesignals;
  smokesignals = {
    convert: function(obj, handlers) {
      handlers = {};
      obj.on = function(eventName, handler) {
        (handlers[eventName] = handlers[eventName] || []).push(handler);
        return obj;
      };
      obj.emit = function(eventName) {
        var handler, index, _ref;
        _ref = handlers[eventName];
        for (index in _ref) {
          handler = _ref[index];
          handler.apply(obj, arguments);
        }
        return obj;
      };
      return obj;
    }
  };

  /*
  	Gridle.js
   */
  window.Gridle = {
    _inited: false,
    isReady: false,
    statesInCss: null,
    statesFindedInCss: false,
    cssLinks: [],
    cssSettings: [],
    states: [],
    activeStates: [],
    activeStatesNames: [],
    unactiveStates: [],
    unactiveStatesNames: [],
    changedStates: [],
    changedStatesNames: [],
    resizeTimeout: null,
    settings: {
      onUpdate: null,
      debug: null
    },

    /*
    		Init
     */
    init: function(settings) {
      var cssLinks, index, link, _ref, _ref1;
      this._inited = true;
      if (settings != null) {
        this.settings = settings;
      }
      if (settings && (settings.debug != null)) {
                if ((_ref = this.settings.debug) != null) {
          _ref;
        } else {
          settings.debug;
        };
      }
      if (settings && (settings.onStatesChange != null)) {
                if ((_ref1 = this.settings.onStatesChange) != null) {
          _ref1;
        } else {
          settings.onStatesChange;
        };
      }
      this._debug('ajax request on stylesheets to find gridle states');
      cssLinks = document.getElementsByTagName('link');
      for (index in cssLinks) {
        link = cssLinks[index];
        if (!link) {
          return false;
        }
        this.cssLinks.push(link);
      }
      return this.loadAndParseCss(cssLinks.length ? void 0 : this._launch);
    },

    /*
    		Load and parse css
     */
    loadAndParseCss: function() {
      var index, link, _ref;
      _ref = this.cssLinks;
      for (index in _ref) {
        link = _ref[index];
        if (this.statesFindedInCss) {
          return false;
        }
        this._debug('|--- ajax request on ', link.href);
        this.ajax({
          async: true,
          url: link.href,
          success: (function(_this) {
            return function(response) {
              var settings;
              if (_this.statesFindedInCss) {
                return false;
              }
              if (!response) {
                _this._noSettingsFindedInThisCss(link);
                return false;
              }
              settings = response.match(/#gridle-settings(?:\s*)\{(?:\s*)content(?:\s*):(?:\s*)\'(.+)\';?(?:\s*)\}/gi) && RegExp.$1;
              if (!settings) {
                _this._noSettingsFindedInThisCss(link);
                return false;
              }
              settings = JSON.parse(settings);
              _this.cssSettings = settings;
              if (!settings.states) {
                _this._debug('no queries finded in css');
                _this._noSettingsFindedInThisCss(link);
                return false;
              }
              _this._debug('|--- states finded in', link.href);
              _this.statesFindedInCss = true;
              _this.statesInCss = settings.states;
              return _this._processFindedStates();
            };
          })(this),
          error: (function(_this) {
            return function(error) {
              if (_this.statesFindedInCss) {
                return false;
              }
              return _this._noSettingsFindedInThisCss(link);
            };
          })(this),
          dataType: 'text'
        });
      }
    },

    /*
    		Css link processed
     */
    _noSettingsFindedInThisCss: function(link) {
      this.cssLinks.shift;
      if (!this.cssLinks.length) {
        return this._debug('no settings finded in css');
      }
    },

    /*
    		Process finded states
     */
    _processFindedStates: function() {
      var name, query, _ref;
      this._debug('begin process finded states in css');
      _ref = this.statesInCss;
      for (name in _ref) {
        query = _ref[name];
        this._registerState(name, query);
      }
      return this._launch();
    },

    /*
    		Launch
     */
    _launch: function() {
      this._debug('launch');
      this.isReady = true;
      this._crossEmit('ready');
      this.addEvent(window, 'resize', (function(_this) {
        return function(e) {
          clearTimeout(_this.resizeTimeout);
          return _this.resizeTimeout = setTimeout(function() {
            return _this._onResize();
          }, 100);
        };
      })(this));
      return this._onResize();
    },

    /*
    		On window resize
     */
    _onResize: function() {
      var updatedStates;
      updatedStates = [];
      return this._updateStatesStatus();
    },

    /*
    		Register a state
     */
    _registerState: function(name, state, updateOnResize) {
      var infos;
      infos = {
        name: name,
        query: state.query,
        settings: state,
        status: null,
        previous_status: null,
        updateOnResize: updateOnResize != null ? updateOnResize : true
      };
      this.states.push(infos);
      return this._debug('|--- register state', name, infos);
    },

    /*
    		Update states status
     */
    _updateStatesStatus: function() {
      var key, state, _ref;
      this.activeStates = [];
      this.activeStatesNames = [];
      this.unactiveStates = [];
      this.unactiveStatesNames = [];
      this.changedStates = [];
      this.changedStatesNames = [];
      _ref = this.states;
      for (key in _ref) {
        state = _ref[key];
        if (!state.updateOnResize) {
          continue;
        }
        this.states[key].previous_status = state.status;
        if (this.validateState(state)) {
          if (!this.states[key].status) {
            this.changedStates.push(state);
            this.changedStatesNames.push(state.name);
          }
          this.states[key].status = true;
          this.activeStates.push(state);
          this.activeStatesNames.push(state.name);
        } else {
          if (this.states[key].status) {
            this.changedStates.push(state);
            this.changedStatesNames.push(state);
          }
          this.states[key].status = false;
          this.unactiveStates.push(state);
          this.unactiveStatesNames.push(state.name);
        }
      }
      if (this.changedStates.length) {
        this._crossEmit('update', this.changedStates, this.activeStates, this.unactiveStates);
      }
      if (this.changedStates.length && this.settings.onUpdate) {
        return this.settings.onUpdate(this.changedStates, this.activeStates, this.unactiveStates);
      }
    },

    /*
    		Validate state
     */
    validateState: function(state) {
      return matchMedia(state.query).matches;
    },

    /*
    		Add event
     */
    addEvent: function(elm, type, handler) {
      if (!elm) {
        return false;
      }
      if (elm.addEventListener) {
        return elm.addEventListener(type, handler, false);
      } else if (elm.attachEvent) {
        return elm.attachEvent('on' + type, handler);
      } else {
        return elm['on' + type] = handler;
      }
    },

    /*
    		Cross emit for supporting jquery libs, etc...
     */
    _crossEmit: function(eventName) {
      if (typeof jQuery !== "undefined" && jQuery !== null) {
        jQuery(this).trigger('gridle.' + eventName, Array.prototype.slice.call(arguments, 1));
        jQuery('body').trigger('gridle.' + eventName, Array.prototype.slice.call(arguments, 1));
      }
      return this.emit.apply(this, arguments);
    },

    /*
    		Ajax proxy
     */
    ajax: function(opts) {
      var args, http;
      args = {
        type: opts.type || 'GET',
        url: opts.url,
        success: opts.success,
        error: opts.error,
        dataType: opts.dataType || 'text',
        context: opts.context
      };
      http = new XMLHttpRequest;
      if (args.context) {
        http.context = args.context;
      }
      http.open(args.type, args.url, false);
      http.onreadystatechange = function() {
        var response;
        if (http.readyState !== 4) {
          return false;
        }
        switch (http.status) {
          case 200:
            switch (args.dataType) {
              case 'json':
                response = JSON.parse(http.responseText);
                break;
              default:
                response = http.responseText;
            }
            if (args.success) {
              return args.success(response, http.status, http);
            }
        }
      };
      return http.send();
    },

    /*
    		Get registered states
     */
    getRegisteredStates: function() {
      return this.states;
    },

    /*
    		Get changes states
     */
    getChangedStates: function() {
      return this.changedStates;
    },

    /*
    		Get changes states names
     */
    getChangedStatesNames: function() {
      return this.changedStatesNames;
    },

    /*
    		Get active states
     */
    getActiveStates: function() {
      return this.activeStates;
    },

    /*
    		Get active states names
     */
    getActiveStatesNames: function() {
      return this.activeStatesNames;
    },

    /*
    		Get unactive states
     */
    getUnactiveStates: function() {
      return this.unactiveStates;
    },

    /*
    		Get unactive states names
     */
    getUnactiveStatesNames: function() {
      return this.unactiveStatesNames;
    },

    /*
    		Check is a state is active
     */
    isActive: function(stateName) {
      var index, isActive, name, _ref;
      isActive = false;
      _ref = this.activeStatesNames;
      for (index in _ref) {
        name = _ref[index];
        if (stateName === name) {
          isActive = true;
        }
      }
      return isActive;
    },

    /*
    		Debug
     */
    _debug: function() {
      if (this.settings.debug) {
        return console.log('GRIDLE', arguments);
      }
    }
  };
  smokesignals.convert(window.Gridle);
  return setTimeout(function() {
    if (!Gridle._inited) {
      return Gridle.init();
    }
  }, 500);
})();
