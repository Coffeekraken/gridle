/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. Dual MIT/BSD license */

window.matchMedia || (window.matchMedia = function() {
    "use strict";

    // For browsers that support matchMedium api such as IE 9 and webkit
    var styleMedia = (window.styleMedia || window.media);

    // For those that don't support matchMedium
    if (!styleMedia) {
        var style       = document.createElement('style'),
            script      = document.getElementsByTagName('script')[0],
            info        = null;

        style.type  = 'text/css';
        style.id    = 'matchmediajs-test';

        script.parentNode.insertBefore(style, script);

        // 'style.currentStyle' is used by IE <= 8 and 'window.getComputedStyle' for all other browsers
        info = ('getComputedStyle' in window) && window.getComputedStyle(style, null) || style.currentStyle;

        styleMedia = {
            matchMedium: function(media) {
                var text = '@media ' + media + '{ #matchmediajs-test { width: 1px; } }';

                // 'style.styleSheet' is used by IE <= 8 and 'style.textContent' for all other browsers
                if (style.styleSheet) {
                    style.styleSheet.cssText = text;
                } else {
                    style.textContent = text;
                }

                // Test if media query is true or false
                return info.width === '1px';
            }
        };
    }

    return function(media) {
        return {
            matches: styleMedia.matchMedium(media || 'all'),
            media: media || 'all'
        };
    };
}());


/*
 * Gridle.js
 *
 * This little js file allow you to detect which or your gridle state is active, when states changes, etc...
 *
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 * @created 	20.05.14
 * @updated 	09.10.15
 * @version 	1.0.14
 */
(function(factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    factory();
  } else {
    factory();
  }
})(function() {

  /*
  	Little smokesignals implementation
   */
  var _domLoaded, domLoaded, smokesignals;
  smokesignals = {
    convert: function(obj, handlers) {
      handlers = {};
      obj.on = function(eventName, handler) {
        (handlers[eventName] = handlers[eventName] || []).push(handler);
        return obj;
      };
      obj.emit = function(eventName) {
        var handler, k, len, ref;
        if (!handlers[eventName]) {
          return;
        }
        ref = handlers[eventName];
        for (k = 0, len = ref.length; k < len; k++) {
          handler = ref[k];
          handler.apply(obj, Array.prototype.slice.call(arguments, 1));
          continue;
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
    _isReady: false,
    _statesInCss: null,
    _statesFindedInCss: false,
    _cssSettings: [],
    _states: [],
    _activeStates: [],
    _activeStatesNames: [],
    _inactiveStates: [],
    _inactiveStatesNames: [],
    _updatedStates: [],
    _updatedStatesNames: [],
    resizeTimeout: null,
    _settings: {
      onUpdate: null,
      debug: null,
      ignoredStates: []
    },

    /*
    		Init
     */
    init: function(settings) {
      var default_index;
      this._inited = true;
      if (((settings != null ? settings.ignoredStates : void 0) != null) && (default_index = settings.ignoredStates.indexOf('default')) > -1) {
        settings.ignoredStates.splice(default_index, 1);
      }
      if (settings) {
        this._settings = this._extend(this._settings, settings);
      }
      this._debug('waiting for content to be fully loaded');
      return domLoaded((function(_this) {
        return function() {
          return _this._parseCss();
        };
      })(this));
    },

    /*
    		Extending object function
     */
    _extend: function(object, properties) {
      var key, val;
      for (key in properties) {
        val = properties[key];
        object[key] = val;
      }
      return object;
    },

    /*
    		Load and parse css
     */
    _parseCss: function() {
      var e, error, i, idx, j, rule, rules, settings, settings_found;
      i = 0;
      j = document.styleSheets.length;
      settings_found = false;
      while (i < j) {
        try {
          rules = document.styleSheets[i].cssText || document.styleSheets[i].cssRules || document.styleSheets[i].rules;
          if (typeof rules === 'string') {
            settings = rules.match(/#gridle-settings(?:\s*)\{(?:\s*)content(?:\s*):(?:\s*)\"(.+)\"(;\s*|\s*)\}/) && RegExp.$1;
            if (settings) {
              settings = settings.toString().replace(/\\/g, '');
              settings = JSON.parse(settings);
              this._cssSettings = settings;
              settings_found = true;
              this._cssSettings = settings;
              this._statesInCss = settings.states;
            }
          } else {
            for (idx in rules) {
              rule = rules[idx];
              if (/#gridle-settings/.test(rule.cssText)) {
                settings = rule.cssText.toString().match(/:(.*);/) && RegExp.$1;
                settings = settings.toString().replace(/\\/g, '');
                settings = settings.trim();
                settings = settings.substr(1);
                settings = settings.substr(0, settings.length - 1);
                settings = JSON.parse(settings);
                if ((settings != null ? settings.states : void 0) != null) {
                  this._cssSettings = settings;
                  this._statesInCss = settings.states;
                  settings_found = true;
                  continue;
                }
              }
            }
          }
        } catch (error) {
          e = error;
          if (e.name !== 'SecurityError') {
            throw e;
          }
        }
        i++;
      }
      if (this._statesInCss) {
        return this._processFindedStates();
      } else {
        return this._debug("no states found...");
      }
    },

    /*
    		Process finded states
     */
    _processFindedStates: function() {
      var name, query, ref;
      this._debug('begin process finded states in css');
      ref = this._statesInCss;
      for (name in ref) {
        query = ref[name];
        if (this._settings.ignoredStates.indexOf(name) === -1) {
          this._registerState(name, query);
        }
      }
      return this._launch();
    },

    /*
    		Launch
     */
    _launch: function() {
      this._debug('launch');
      this._isReady = true;
      this._crossEmit('ready');
      this._addEvent(window, 'resize', (function(_this) {
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
      this._updateStatesStatus();
      if (this.getActiveStatesNames().length) {
        this._debug('active states', this.getActiveStatesNames().join(','));
      }
      if (this.getInactiveStatesNames().length) {
        this._debug('inactive states', this.getInactiveStatesNames().join(','));
      }
      if (this.getUpdatedStatesNames().length) {
        return this._debug('updated states', this.getUpdatedStatesNames().join(','));
      }
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
      this._states.push(infos);
      return this._debug('|--- register state', name, infos);
    },

    /*
    		Update states status
     */
    _updateStatesStatus: function() {
      var defaultState, defaultStateIdx, key, ref, state, wasDefault;
      defaultState = this.getDefaultState();
      defaultStateIdx = this._states.indexOf(defaultState);
      wasDefault = defaultState.status;
      this._activeStates = [];
      this._activeStatesNames = [];
      this._inactiveStates = [];
      this._inactiveStatesNames = [];
      this._updatedStates = [];
      this._updatedStatesNames = [];
      ref = this._states;
      for (key in ref) {
        state = ref[key];
        if (!state.updateOnResize) {
          continue;
        }
        this._states[key].previous_status = state.status;
        if (this._validateState(state)) {
          if (!this._states[key].status) {
            this._updatedStates.push(state);
            this._updatedStatesNames.push(state.name);
          }
          this._states[key].status = true;
          this._activeStates.push(state);
          this._activeStatesNames.push(state.name);
        } else if (state.name !== 'default') {
          if (this._states[key].status) {
            this._updatedStates.push(state);
            this._updatedStatesNames.push(state.name);
          }
          this._states[key].status = false;
          this._inactiveStates.push(state);
          this._inactiveStatesNames.push(state.name);
        }
      }
      if (!this._activeStates.length) {
        this._states[defaultStateIdx].status = true;
        this._activeStates.push(defaultState);
        this._activeStatesNames.push('default');
        if (!wasDefault) {
          this._updatedStates.push(defaultState);
          this._updatedStatesNames.push('default');
        }
      } else {
        this._states[defaultStateIdx].status = false;
        this._inactiveStates.push(defaultState);
        this._inactiveStatesNames.push('default');
        if (wasDefault) {
          this._updatedStates.push(defaultState);
          this._updatedStatesNames.push('default');
        }
      }
      if (this._updatedStates.length) {
        this._crossEmit('update', this._updatedStates, this._activeStates, this._inactiveStates);
      }
      if (this._updatedStates.length && this._settings.onUpdate) {
        return this._settings.onUpdate(this._updatedStates, this._activeStates, this._inactiveStates);
      }
    },

    /*
    		Validate state
     */
    _validateState: (function(_this) {
      return function(state) {
        return matchMedia(state.query).matches;
      };
    })(this),

    /*
    		Add event
     */
    _addEvent: function(elm, type, handler) {
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
        jQuery(this).trigger(eventName, Array.prototype.slice.call(arguments, 1));
        jQuery('body').trigger('gridle.' + eventName, Array.prototype.slice.call(arguments, 1));
      }
      return this.emit.apply(this, arguments);
    },

    /*
    		Ajax proxy
     */
    _ajax: function(opts) {
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
      http.open(args.type, args.url, true);
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
    		Get default state
     */
    getDefaultState: function() {
      var k, len, ref, state;
      ref = this.getRegisteredStates();
      for (k = 0, len = ref.length; k < len; k++) {
        state = ref[k];
        if (state.name === 'default') {
          return state;
        }
      }
    },

    /*
    		Get registered states
     */
    getRegisteredStates: function() {
      return this._states;
    },

    /*
    		Get changes states
     */
    getUpdatedStates: function() {
      return this._updatedStates;
    },

    /*
    		Get changes states names
     */
    getUpdatedStatesNames: function() {
      return this._updatedStatesNames;
    },

    /*
    		Get active states
     */
    getActiveStates: function() {
      return this._activeStates;
    },

    /*
    		Get active states names
     */
    getActiveStatesNames: function() {
      return this._activeStatesNames;
    },

    /*
    		Get unactive states
     */
    getInactiveStates: function() {
      return this._inactiveStates;
    },

    /*
    		Get unactive states names
     */
    getInactiveStatesNames: function() {
      return this._inactiveStatesNames;
    },

    /*
    		Check is a state is active
     */
    isActive: function(stateName) {
      var index, isActive, name, ref;
      isActive = false;
      ref = this._activeStatesNames;
      for (index in ref) {
        name = ref[index];
        if (stateName === name) {
          isActive = true;
        }
      }
      return isActive;
    },

    /*
    		Check if gridle is ready
     */
    isReady: function() {
      return this._isReady;
    },

    /*
    		Debug
     */
    _debug: function() {
      if (this._settings.debug) {
        return console.log('GRIDLE', arguments);
      }
    }
  };

  /*
  	 * DomLoaded
   */
  _domLoaded = false;
  domLoaded = function(callback) {
    var _loaded;
    _loaded = function(callback) {
      if (_domLoaded) {
        callback();
        return;
      }
      if (document.readyState === 'complete') {
        _domLoaded = true;
        callback();
        return;
      }
      return /* Internet Explorer */
			/*@cc_on
			@if (@_win32 || @_win64)
				document.write('<script id="ieScriptLoad" defer src="//:"><\/script>');
				document.getElementById('ieScriptLoad').onreadystatechange = function() {
					if (this.readyState == 'complete') {
						_domLoaded = true;
						callback();
					}
				};
			@end @*/
			/* Mozilla, Chrome, Opera */
			if (document.addEventListener) {
				document.addEventListener('DOMContentLoaded', function() {
					_domLoaded = true;
					callback();
				}, false);
			}
			/* Safari, iCab, Konqueror */
			if (/KHTML|WebKit|iCab/i.test(navigator.userAgent)) {
				var DOMLoadTimer = setInterval(function () {
					if (/loaded|complete/i.test(document.readyState)) {
						_domLoaded = true;
						callback();
						clearInterval(DOMLoadTimer);
					}
				}, 10);
			}
			/* Other web browsers */
			window.onload = function() {
				_domLoaded = true;
				callback();
			};;
    };
    if (window.addEventListener) {
      window.addEventListener('load', (function(_this) {
        return function() {
          _domLoaded = true;
          return callback();
        };
      })(this), false);
    } else {
      window.attachEvent('onload', (function(_this) {
        return function() {
          _domLoaded = true;
          return callback();
        };
      })(this));
    }
    return _loaded((function(_this) {
      return function() {
        return callback();
      };
    })(this));
  };
  smokesignals.convert(window.Gridle);
  domLoaded(function() {
    return setTimeout(function() {
      if (!Gridle._inited) {
        return Gridle.init();
      }
    }, 500);
  });
  return Gridle;
});

//# sourceMappingURL=gridle.js.map
