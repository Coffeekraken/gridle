
/*
 * Gridle.js
 *
 * This little js file allow you to detect witch or your gridle state is active, when states changes, etc...
 *
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 * @created 	20.05.14
 * @updated 	29.09.15
 * @version 	1.0.13
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
        var handler, i, len, ref;
        if (!handlers[eventName]) {
          return;
        }
        ref = handlers[eventName];
        for (i = 0, len = ref.length; i < len; i++) {
          handler = ref[i];
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
    _cssLinks: [],
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
      cssPath: null,
      onUpdate: null,
      debug: null
    },

    /*
    		Init
     */
    init: function(settings) {
      var _cssLinks, index, link, ref, ref1;
      this._inited = true;
      if (settings != null) {
        this._settings = settings;
      }
      if (settings && (settings.debug != null)) {
                if ((ref = this._settings.debug) != null) {
          ref;
        } else {
          settings.debug;
        };
      }
      if (settings && (settings.onStatesChange != null)) {
                if ((ref1 = this._settings.onStatesChange) != null) {
          ref1;
        } else {
          settings.onStatesChange;
        };
      }
      this._debug('ajax request on stylesheets to find gridle states');
      if (this._settings.cssPath) {
        this._cssLinks.push({
          href: this._settings.cssPath
        });
      } else {
        _cssLinks = document.getElementsByTagName('link');
        for (index in _cssLinks) {
          link = _cssLinks[index];
          if (!link) {
            return false;
          }
          this._cssLinks.push(link);
        }
      }
      return this._loadAndParseCss(this._cssLinks.length ? void 0 : this._launch);
    },

    /*
    		Load and parse css
     */
    _loadAndParseCss: function() {
      var index, link, ref;
      ref = this._cssLinks;
      for (index in ref) {
        link = ref[index];
        if (this._statesFindedInCss) {
          return false;
        }
        if (!link || !link.href) {
          continue;
        }
        this._debug('|--- ajax request on ', link.href);
        this._ajax({
          async: true,
          url: link.href,
          success: (function(_this) {
            return function(response) {
              var settings;
              if (_this._statesFindedInCss) {
                return false;
              }
              if (!response) {
                _this._noSettingsFindedInThisCss(link);
                return false;
              }
              settings = response.match(/#gridle-settings(?:\s*)\{(?:\s*)content(?:\s*):(?:\s*)\'(.+)\'(;\s*|\s*)\}/) && RegExp.$1;
              if (!settings) {
                _this._noSettingsFindedInThisCss(link);
                return false;
              }
              settings = settings.toString().replace(/\\/g, '');
              settings = JSON.parse(settings);
              _this._cssSettings = settings;
              if (!settings.states) {
                _this._debug('no queries finded in css');
                _this._noSettingsFindedInThisCss(link);
                return false;
              }
              _this._debug('|--- states finded in', link.href);
              _this._statesFindedInCss = true;
              _this._statesInCss = settings.states;
              return _this._processFindedStates();
            };
          })(this),
          error: (function(_this) {
            return function(error) {
              if (_this._statesFindedInCss) {
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
      this._cssLinks.shift;
      if (!this._cssLinks.length) {
        return this._debug('no settings finded in css');
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
        this._registerState(name, query);
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
    _validateState: function(state) {
      return matchMedia(state.query).matches;
    },

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
      var i, len, ref, state;
      ref = this.getRegisteredStates();
      for (i = 0, len = ref.length; i < len; i++) {
        state = ref[i];
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
  smokesignals.convert(window.Gridle);
  setTimeout(function() {
    if (!Gridle._inited) {
      return Gridle.init();
    }
  }, 500);
  if (typeof window.define === 'function' && window.define.amd) {
    return window.define([], function() {
      return window.Gridle;
    });
  }
})();

//# sourceMappingURL=gridle.js.map
